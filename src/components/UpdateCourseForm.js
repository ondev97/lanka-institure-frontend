import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Cropper } from "react-cropper";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useParams } from "react-router-dom";

export default function UpdateCourseForm({
  showCropper,
  handelSubmit,
  cropData,
  err,
  image,
  setCropper,
  courseValue,
  onChange,
  setshowCropper,
  getCropData,
  handelFormValues,
  hideError,
  courseErrors,
  hide,
  progress,
  setfreeac,
  freeac,
  setcourseValue,
  usDetails,
}) {
  const isfreeze = useRef();
  const [subjectType, setsubjectType] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (usDetails.key) {
      Axios.get(
        `${process.env.REACT_APP_LMS_MAIN_URL}/course-api/subject/${id}/`,
        {
          headers: { Authorization: "Token " + usDetails.key },
        }
      )
        .then((res) => {
          setsubjectType({ subjectType: res.data.subject_type });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [usDetails]);

  console.log(id);

  const activefree = (e) => {
    if (e.target.checked) {
      setfreeac(true);
    } else {
      if (courseValue.course_price > 0) {
        setcourseValue({ ...courseValue, course_price: 0 });
      }
      setfreeac(false);
    }
  };

  //course freeze function
  const setFreezeCourse = (e) => {
    if (e.target.checked) {
      setcourseValue({ ...courseValue, is_freeze: true });
    } else {
      setcourseValue({ ...courseValue, is_freeze: false });
    }
  };

  return (
    <form onSubmit={handelSubmit}>
      <p>
        <label htmlFor="cn">Chapter Name</label>
        <input
          type="text"
          name="course_name"
          value={courseValue.course_name}
          onChange={handelFormValues}
          onFocus={hideError}
        />
        {courseErrors.course_name && (
          <span className={`tip ${hide.course_name ? "hidetip" : ""}`}>
            {courseErrors.course_name}
          </span>
        )}
      </p>
      {subjectType.subjectType !== "free" ? (
        <p>
          <label htmlFor="cp">Chapter Price</label>
          <span className="on_row">
            <span className="curu">LKR</span>
            <input
              type="number"
              name="course_price"
              min="0"
              value={
                courseValue.course_price === null ? 0 : courseValue.course_price
              }
              onChange={handelFormValues}
              onFocus={hideError}
            />
          </span>
          {courseErrors.course_price && (
            <span className={`tip ${hide.course_price ? "hidetip" : ""}`}>
              {courseErrors.course_price}
            </span>
          )}
        </p>
      ) : (
        ""
      )}
      <p>
        <label htmlFor="cd">Chapter Description</label>
        <textarea
          name="course_description"
          id="cd"
          rows="10"
          value={
            courseValue.course_description !== "null"
              ? courseValue.course_description
              : ""
          }
          onChange={handelFormValues}
          onFocus={hideError}
        ></textarea>
        {courseErrors.course_description && (
          <span className={`tip ${hide.course_description ? "hidetip" : ""}`}>
            {courseErrors.course_description}
          </span>
        )}
      </p>
      <div className="up_pro_pic">
        {showCropper && cropData === "#" && !err.img && (
          <div className="cropper_be">
            <Cropper
              style={{ height: "100%", width: "100%" }}
              initialAspectRatio={16 / 9}
              aspectRatio={16 / 9}
              preview=".img-preview"
              src={image}
              viewMode={1}
              guides={true}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              onInitialized={(instance) => {
                setCropper(instance);
              }}
            />
          </div>
        )}
        {!showCropper && (
          <div className="finCropImg">
            <LazyLoadImage
              style={{ width: "100%" }}
              src={cropData === "#" ? courseValue.course_img : cropData}
              alt="cropped"
              effect="blur"
              width="100%"
              height="100%"
            />
          </div>
        )}
        <p>
          <label htmlFor="file">Changed Chapter Cover</label>
          <input
            type="file"
            name="file"
            id="file"
            onChange={(e) => {
              onChange(e);
              setshowCropper(true);
            }}
          />
          {showCropper && cropData === "#" && !err.img ? (
            <button
              className="cp"
              onClick={(e) => {
                getCropData(e);
                setshowCropper(false);
              }}
            >
              Crop Image
            </button>
          ) : (
            ""
          )}
        </p>
      </div>
      <div className="costtypefr">
        <label htmlFor="">Chapter Freeze</label>
        <label className="togglefr" htmlFor="myTogglecrezz">
          <input
            ref={isfreeze}
            type="checkbox"
            className="toggleinputfr"
            id="myTogglecrezz"
            onChange={setFreezeCourse}
          />
          <div className="fillfr"></div>
        </label>
      </div>
      <p>
        <label htmlFor="st">Total Hours</label>
        <input
          type="number"
          name="hr"
          min="0"
          step="0.1"
          value={courseValue.hr}
          onChange={handelFormValues}
        />
        <span className="hr">Hr</span>
        {courseErrors.hr && (
          <span className={`tip ${hide.hr ? "hidetip" : ""}`}>
            {courseErrors.hr}
          </span>
        )}
      </p>
      <p>
        <button
          className="sub"
          type={`${progress ? "button" : "submit"}`}
          name="create"
        >
          Update Chapter{" "}
          <i
            className={`fas fa-circle-notch notch ${!progress ? "dis" : ""}`}
          ></i>
        </button>
      </p>
    </form>
  );
}

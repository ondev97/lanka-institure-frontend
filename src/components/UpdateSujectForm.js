import React from "react";
import { Cropper } from "react-cropper";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function UpdateSujectForm({
  hadelChabgeFormValues,
  handelSubmit,
  hideError,
  hide,
  formErrors,
  image,
  getCropData,
  setCropper,
  onChange,
  err,
  showCropper,
  setshowCropper,
  isUploading,
  formValue,
  cropData,
}) {
  return (
    <form onSubmit={handelSubmit}>
      <p>
        <label htmlFor="st">Subject Title</label>
        <input
          type="text"
          name="subject_title"
          id="st"
          value={formValue.subject_title}
          onChange={hadelChabgeFormValues}
          onFocus={hideError}
        />
        {formErrors.subject_title && (
          <span className={`tip ${hide.subject_title ? "hidetip" : ""}`}>
            {formErrors.subject_title}
          </span>
        )}
      </p>
      <p>
        <label htmlFor="ssd">Subject Short Description</label>
        <input
          type="text"
          name="subject_shdes"
          id="ssd"
          value={formValue.subject_shdes}
          onChange={hadelChabgeFormValues}
          onFocus={hideError}
        />
        {formErrors.subject_shdes && (
          <span className={`tip ${hide.subject_shdes ? "hidetip" : ""}`}>
            {formErrors.subject_shdes}
          </span>
        )}
      </p>
      <p>
        <label htmlFor="sd">Subject Description</label>
        <textarea
          name="sub_des"
          id="sd"
          rows="10"
          value={formValue.sub_des}
          onChange={hadelChabgeFormValues}
          onFocus={hideError}
        ></textarea>
        {formErrors.subject_des && (
          <span className={`tip ${hide.subject_des ? "hidetip" : ""}`}>
            {formErrors.subject_des}
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
              src={cropData === "#" ? formValue.subject_cover : cropData}
              alt="cropped"
              effect="blur"
              width="100%"
              height="100%"
            />
          </div>
        )}
        <p>
          <label htmlFor="file">Change Subject Cover</label>
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
      <div className="sub_sect">
        <p>
          <label htmlFor="ct">Class Type</label>
          <select
            name="class_type"
            id="ct"
            value={formValue.class_type}
            onChange={hadelChabgeFormValues}
            onFocus={hideError}
          >
            <option value="" disabled>
              Select Class Type
            </option>
            <option value="revision">Revision</option>
            <option value="theory">Theory</option>
            <option value="Past Revision">Past Revision</option>
            <option value="paper">Paper</option>
          </select>
          {formErrors.class_type && (
            <span className={`tip ${hide.class_type ? "hidetip" : ""}`}>
              {formErrors.class_type}
            </span>
          )}
        </p>
        <p>
          <label htmlFor="st">Subject Type</label>
          <select
            name="subject_type"
            id="st"
            value={formValue.subject_type}
            onChange={hadelChabgeFormValues}
            onFocus={hideError}
          >
            <option value="" disabled>
              Select Subject Type
            </option>
            <option value="paid">Paid</option>
            <option value="free">Free</option>
          </select>
          {formErrors.subject_type && (
            <span className={`tip ${hide.subject_type ? "hidetip" : ""}`}>
              {formErrors.subject_type}
            </span>
          )}
        </p>
      </div>
      <p>
        <button
          className="sub"
          type={`${isUploading ? "button" : "submit"}`}
          name="create"
        >
          <span>Update Subject</span>{" "}
          <i
            className={`fas fa-circle-notch notch ${!isUploading ? "dis" : ""}`}
          ></i>
        </button>
      </p>
    </form>
  );
}

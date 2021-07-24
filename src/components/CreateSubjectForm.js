import React, { useState } from "react";
import Cropper from "react-cropper";

export default function CreateSubjectForm({
  formValue,
  hadelChabgeFormValues,
  handelSubmit,
  formErrors,
  hide,
  hideError,
  image,
  getCropData,
  setCropper,
  onChange,
  cropData,
  err,
  uploading,
}) {
  const [showCropper, setshowCropper] = useState(false);

  return (
    <form onSubmit={handelSubmit}>
      <p>
        <label htmlFor="st">
          Course Title <span>(Max 45 Characters)</span>
        </label>
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
        <label htmlFor="ssd">
          Course Short Description <span>(Max 50 Characters)</span>
        </label>
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
        <label htmlFor="sd">Course Description</label>
        <textarea
          name="sub_des"
          id="sd"
          rows="10"
          value={formValue.subject_des}
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
        {cropData !== "#" && (
          <div className="finCropImg">
            <img style={{ width: "100%" }} src={cropData} alt="cropped" />
          </div>
        )}
        <p>
          <label htmlFor="file">
            {cropData === "#" ? "Upload Course Cover" : "Changed Course Cover"}
          </label>
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
            <button className="cp" onClick={getCropData}>
              Crop Image
            </button>
          ) : (
            ""
          )}
        </p>
      </div>
      <div className="sub_sect">
        <p>
          <label htmlFor="ct">Course Category</label>
          <select
            name="class_type"
            id="ct"
            value={formValue.class_type}
            onChange={hadelChabgeFormValues}
            onFocus={hideError}
          >
            <option value="" disabled>
              Select Course Category
            </option>
            <option value="G.C.E. ORDINARY LEVEL">G.C.E. ORDINARY LEVEL</option>
            <option value="G.C.E. ADVANCED LEVEL">G.C.E. ADVANCED LEVEL</option>
            <option value="HIGHER EDUCATION">HIGHER EDUCATION</option>
            <option value="OTHERS">OTHERS</option>
          </select>
          {formErrors.class_type && (
            <span className={`tip ${hide.class_type ? "hidetip" : ""}`}>
              {formErrors.class_type}
            </span>
          )}
        </p>
        <p>
          <label htmlFor="st">Course Type</label>
          <select
            name="subject_type"
            id="st"
            value={formValue.subject_type}
            onChange={hadelChabgeFormValues}
            onFocus={hideError}
          >
            <option value="" disabled>
              Select Course Type
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
          type={`${uploading ? "button" : "submit"}`}
          name="create"
        >
          <span>Create Course</span>{" "}
          <i
            className={`fas fa-circle-notch notch ${!uploading ? "dis" : ""}`}
          ></i>
        </button>
      </p>
    </form>
  );
}

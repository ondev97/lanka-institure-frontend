import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactTimeAgo from "react-time-ago";
import { Link, Redirect, useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { CSVLink } from "react-csv";

export default function ModelsCourseDescri({ id }) {
  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);
  const [courseDetails, setcourseDetails] = useState({});
  const [redirect, setredirect] = useState(false);
  const [stDetails, setstDetails] = useState([]);
  const [subid, setsubid] = useState("");
  const { cid } = useParams();

  useEffect(async () => {
    if (usDetails.key) {
      await Axios.get(
        `${process.env.REACT_APP_LMS_MAIN_URL}/course-api/list/${id}/`,
        {
          headers: { Authorization: "Token " + usDetails.key },
        }
      ).then((res) => {
        setcourseDetails({ ...courseDetails, ...res.data });
        setsubid(res.data.subject);
      });
    }
    //getting student details
    downloadDetails();
  }, [usDetails]);

  const deleteCourse = async () => {
    let confirms = window.confirm("Are You Sure?");
    if (confirms) {
      await Axios.delete(
        `${process.env.REACT_APP_LMS_MAIN_URL}/course-api/deletecourse/${id}/`,
        {
          headers: { Authorization: "Token " + usDetails.key },
        }
      ).then(() => {
        setredirect(true);
      });
    }
  };

  /*Download student Details */
  const downloadDetails = () => {
    if (usDetails.key) {
      Axios.get(
        `${process.env.REACT_APP_LMS_MAIN_URL}/course-api/stureport/${id}/`,
        {
          headers: { Authorization: "Token " + usDetails.key },
        }
      )
        .then((res) => {
          setstDetails(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const csvFile = () => {
    let cvData = [];
    if (stDetails.length > 0) {
      stDetails.map((details, index) => {
        cvData.push({
          ID: index + 1,
          "Full Name": details.user.first_name + " " + details.user.last_name,
          "User Name": details.user.username,
          Email: details.user.email,
          "Phone Number": details.user.phone_no,
          "Parent Number": details.user.parent_number,
          "Telegram Number": details.user.telegram_number,
          Address: details.user.address,
          District: details.user.district,
        });
      });
    }

    return cvData;
  };

  if (redirect) {
    return <Redirect to={`/teacherdashboard/viewcourse/${subid}`} />;
  }

  return (
    <div className="colCourseView">
      {/*mobile lists */}
      <div className="mobile_list">
        <div className="hammenulist">
          <button>
            <i className="fas fa-bars"></i>
          </button>
          <div className="listmob">
            <ul>
              <Link to={`/teacherdashboard/keys/genkeys/${id}/${cid}/`}>
                <li>
                  <i className="fas fa-caret-right"></i> Generate Enrollment
                  Keys
                </li>
              </Link>
              <Link to={`/teacherdashboard/keys/viewallissuekey/${id}/${cid}/`}>
                <li>
                  <i className="fas fa-caret-right"></i> View Enrollment Keys
                </li>
              </Link>
              <Link to={`/teacherdashboard/addstudents/${id}`}>
                <li>
                  <i className="fas fa-caret-right"></i> Add Students For
                  Chapters
                </li>
              </Link>
              <Link to={`/teacherdashboard/viewallst/${id}`}>
                <li>
                  <i className="fas fa-caret-right"></i> View All Enrolled
                  Students
                </li>
              </Link>
              <li>
                <CSVLink filename="student-details.csv" data={csvFile()}>
                  <i className="fas fa-caret-right"></i> Download Student
                  Details
                </CSVLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="course_desc_head tc_course_desc_head">
        <div className="menulist">
          <ul>
            <Link to={`/teacherdashboard/keys/genkeys/${id}/${cid}/`}>
              <li>
                <i className="fas fa-caret-right"></i> Generate Enrollment Keys
              </li>
            </Link>
            <Link to={`/teacherdashboard/keys/viewallissuekey/${id}/${cid}/`}>
              <li>
                <i className="fas fa-caret-right"></i> View Enrollment Keys
              </li>
            </Link>
            <Link to={`/teacherdashboard/addstudents/${id}`}>
              <li>
                <i className="fas fa-caret-right"></i> Add Students For Courses
              </li>
            </Link>
            <Link to={`/teacherdashboard/viewallst/${id}`}>
              <li>
                <i className="fas fa-caret-right"></i> View All Enrolled
                Students
              </li>
            </Link>
            <li>
              <CSVLink filename="student-details.csv" data={csvFile()}>
                <i className="fas fa-caret-right"></i> Download Student Details
              </CSVLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="course_desc_body tc_course_desc_body">
        <div className="card_of_course">
          <div className="course_pic">
            <LazyLoadImage
              src={`${courseDetails.course_cover}`}
              alt=""
              effect="blur"
              width="100%"
              height="100%"
            />
            <div className="cos_options">
              <Link to={`/teacherdashboard/updatecourse/${id}/${cid}`}>
                <button title="Edit This Course">
                  <i className="fas fa-pencil-alt"></i>
                  <span>Edit Chapter</span>
                </button>
              </Link>
              <button title="Delete This Course" onClick={deleteCourse}>
                <i className="fas fa-trash-alt"></i>
                <span>Delete Chapter</span>
              </button>
            </div>
          </div>
          <div className="course_detail">
            <h2>{courseDetails.course_name}</h2>
            {courseDetails.created_at && (
              <h3>
                <ReactTimeAgo
                  date={Date.parse(courseDetails.created_at)}
                  locale="en-US"
                />
              </h3>
            )}
            {courseDetails.course_description !== "null" ? (
              <div className="course_short_desc">
                <h3>Course Description</h3>
                <p>{courseDetails.course_description}</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import "../../assets/css/student/stallsubjects.css";
import Axios from "axios";
import { useSelector } from "react-redux";
import useDebounce from "../../utils/hooks/useDebounce";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SubjectsCard from "../../components/student/SubjectsCard";
import "../../assets/css/mediaFiles/allsubjectmedia.css";
import ProfileLoader from "../../components/ProfileLoader";
import Empty from "../../components/Empty";

export default function StAllSubjects() {
  const [subDetails, setsubDetails] = useState([]);

  const [isLoading, setisLoading] = useState(false);
  const [nextPage, setnextPage] = useState(null);
  const [search, setsearch] = useState("");
  const [stype, setstype] = useState("");
  const [ctype, setctype] = useState("");
  const [page, setpage] = useState(1);
  //get acDetails from Redux Store
  const usDetails = useSelector((state) => state.accountDetails);

  const debounce = useDebounce(); //custom hook
  const url = `${process.env.REACT_APP_LMS_MAIN_URL}/course-api/subjectlist`;

  useEffect(() => {
    if (search === "" && ctype === "" && stype === "") {
      const fetchurl = `${url}/?page=${page}`;
      getSubjectDetails(fetchurl);
    } else {
      const fetchurl = `${url}/?page=${page}&search=${search}&subtype=${stype}&clstype=${ctype}`;
      getSubjectDetails(fetchurl);
    }
  }, [usDetails, page, search, stype, ctype]);

  const getSubjectDetails = async (fetchurl) => {
    setisLoading(true);
    if (usDetails.key) {
      await Axios.get(fetchurl, {
        headers: { Authorization: "Token " + usDetails.key },
      })
        .then((res) => {
          setisLoading(false);
          if (page > 1) {
            setsubDetails([...subDetails, ...res.data.results]);
          } else {
            setsubDetails([...res.data.results]);
          }
          setnextPage(res.data.next);
        })
        .catch((err) => {
          if (err.response.data) {
          }
        });
    }
  };

  function next() {
    if (nextPage) {
      setpage(page + 1);
    }
  }
  const handelSearchSubject = (e) => {
    const search = e.target.value;
    const name = e.target.name;
    console.log(name);
    if (name === "sClassType") {
      const classType = e.target.value;
      if (classType !== "other") {
        debounce(() => setctype(classType), 500);
      } else {
        debounce(() => setctype(""), 500);
      }
    } else if (name === "sSubjectType") {
      const subjectType = e.target.value;
      debounce(() => setstype(subjectType), 500);
    } else {
      debounce(() => setsearch(search), 500);
    }
    setpage(1);
  };

  return (
    <>
      <div className="all_st_subs">
        <div className="pagetop editep">
          <div className="search_row edited">
            <select
              type="text"
              name="sClassType"
              onChange={handelSearchSubject}
            >
              <option value="">Select Class Type</option>
              <option value="revision">Revision</option>
              <option value="theory">Theory</option>
              <option value="Past Revision">Past Revision</option>
              <option value="paper">Paper</option>
            </select>
            <select
              type="text"
              name="sSubjectType"
              onChange={handelSearchSubject}
            >
              <option value="">Select Subject Type</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
            <input
              type="text"
              name="search"
              placeholder="Search Subject"
              onChange={handelSearchSubject}
            />
            <button>
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>

        {subDetails.length > 0 ? (
          <div className="">
            <InfiniteScroll
              dataLength={subDetails.length}
              next={next}
              hasMore={true}
              className="all_sub_body"
            >
              {subDetails.map((det) => (
                <SubjectsCard
                  key={det.id}
                  id={det.id}
                  subject_name={det.subject_name}
                  subject_cover={det.subject_cover}
                  author={det.author}
                  created_at={det.created_at}
                  description={det.description}
                  short_description={det.short_description}
                  class_type={det.class_type}
                  subject_type={det.subject_type}
                  subject_medium={det.medium}
                />
              ))}
            </InfiniteScroll>
          </div>
        ) : isLoading ? (
          <ProfileLoader />
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
}

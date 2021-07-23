import "../../assets/css/student/stallsubjects.css";
import Axios from "axios";
import useDebounce from "../../utils/hooks/useDebounce";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ProfileLoader from "../../components/ProfileLoader";
import Empty from "../../components/Empty";
import FreeMySubjectsCard from "../../components/Free/FreeMySubjectCard";
import { useHistory } from "react-router-dom";

export default function FreeStudentMainDashboard() {
  const [subDetails, setsubDetails] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [nextPage, setnextPage] = useState(null);
  const [search, setsearch] = useState("");
  const [page, setpage] = useState(1);
  let history = useHistory();

  const debounce = useDebounce(); //custom hook
  const url = `${process.env.REACT_APP_LMS_MAIN_URL}/course-api/freesubjects`;

  useEffect(() => {
    if (search === "") {
      const fetchurl = `${url}/?page=${page}`;
      getSubjectDetails(fetchurl);
    } else {
      const fetchurl = `${url}/`;
      getSubjectDetails(fetchurl);
    }
  }, [page, search]);

  const getSubjectDetails = async (fetchurl) => {
    setisLoading(true);
    await Axios.get(fetchurl, {})
      .then((res) => {
        console.log(res);
        setisLoading(false);
        setsubDetails([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function next() {
    if (nextPage) {
      setpage(page + 1);
    }
  }

  const back = () => {
    history.push("/");
  };

  const handelSearchSubject = (e) => {
    const search = e.target.value;
    setpage(1);
    debounce(() => setsearch(search), 500);
  };

  return (
    <>
      <div className="all_st_subs free_st_sub">
        <div className="cr_models">
          <button onClick={back}>
            <i className="fas fa-chevron-circle-left"></i>Back to My Subjects
          </button>
        </div>
        <div className="pagetop">
          <h1>Free Classes</h1>
        </div>
        {subDetails.length !== 0 ? (
          <div className="">
            <InfiniteScroll
              dataLength={subDetails.length}
              hasMore={true}
              className="all_sub_body list_view_st"
            >
              {subDetails.map((det) => (
                <FreeMySubjectsCard
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
                />
              ))}
            </InfiniteScroll>
          </div>
        ) : (
          <Empty target="No Free Class" />
        )}
        {isLoading && <ProfileLoader />}
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import withUser from "./User";
import CourseService from "../../Services/Course";
import ItemCourse from "./MyCourse/ItemCourse";
import img from "../../assets/loading.svg";

const CourseNotApproval = props => {
  let [lstCourse, setLstCourse] = useState([]);
  let [myCourseFake, setMyCourseFake] = useState([]);
  let [myCourseFake2, setMyCourseFake2] = useState([]);
  let [isSearch, setIsSearch] = useState(false);
  useEffect(() => {
    let obj = {
      taiKhoan: props.information.match.params.id
    };
    setTimeout(() => {
      CourseService.fetchListCourseNotApproval(obj)
        .then(res => {
          setLstCourse(res.data);
          setMyCourseFake(res.data);
          setMyCourseFake2(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },600);
  }, []);
  const renderListCourse = data => {
    return data.map((item, index) => {
      return (
        <ItemCourse path={props.information.match} key={index} item={item} />
      );
    });
  };
  const _onKeyUp = event => {
    let fake = myCourseFake.filter(item => {
      if (event.target.value !== "") {
        setIsSearch(true);
        return (
          item.tenKhoaHoc
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase().trim()) > -1
        );
      } else if (event.target.value === "") {
        setIsSearch(false);
        return myCourseFake;
      }
    });
    setMyCourseFake2(fake);
  };
  const renderListCourseSearch = data => {
    return data.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.maKhoaHoc}</td>
          <td style={{ textTransform: "uppercase" }}>{item.tenKhoaHoc}</td>
          <td>
            <button className="btn btn-danger"  onClick={()=>window.scroll({top:305,behavior:"smooth"})}>XEM CHI TIẾT</button>
          </td>
        </tr>
      );
    });
  };
  const renderSearch = data => {
    if (data === true) {
      return (
        <div className=" thanhTimKiem">
          <table class="table">
            <thead>
              <tr>
                <th>Mã khóa học</th>
                <th>Tên khóa học</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>{renderListCourseSearch(myCourseFake2)}</tbody>
          </table>
        </div>
      );
    }
  };
  return (
    <>
      <div className="search">
        <input
          type="text"
          placeholder="Search course"
          onKeyUp={event => _onKeyUp(event)}
        />
        <span>SEARCH</span>
      </div>

      {renderSearch(isSearch)}
      <div className="mt-5">
        <div className="container d-flex flex-wrap">
          <div className="row container my-3 mx-auto">
            <div className="col-12">
              <div className="align-items-center d-flex justify-content-between mb-3 w-100">
                <h3 className=" text-white font-weight-bold">
                  DANH SÁCH KHÓA HỌC CHỜ XÉT DUYỆT{" "}
                </h3>
              </div>
            </div>
            {lstCourse.length !== 0 ? (
              renderListCourse(lstCourse)
            ) : (
              <img style={{ margin: "0 auto", marginTop: "100px" }} src={img} />
            )} 
          </div>
        </div>
      </div>
    </>
  );
};

export default withUser(CourseNotApproval);

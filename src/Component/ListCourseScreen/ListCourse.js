import React, { useEffect, useState } from "react";
import CourseService from "../../Services/Course";
import ItemCourse from "./ItemCourse";
import svg from "../../assets/loading.svg";
const ListCourse = ({ keyword }) => {
  let [lstCourse, setLstCourse] = useState([]);
  let [lstCourseTwo, setLstCourseTwo] = useState([]);
  let [valueOption, setValueOption] = useState("1");
  let [lstCourseMain, setLstCourseMain] = useState([]);
  let [danhMucKhoaHoc, setDanhMucKhoaHoc] = useState([]);
  let [isKeyword, setIsKeyword] = useState(false); 
  useEffect(() => {
    CourseService.fetchCourse()
      .then(res => {
        setLstCourse(res.data);
        setLstCourseMain(res.data)
        setLstCourseTwo(res.data);
      })
      .catch(err => {
        console.log(err);
      });
    if (localStorage.getItem("danhMucKhoaHoc")) {
      setDanhMucKhoaHoc(JSON.parse(localStorage.getItem("danhMucKhoaHoc")));
    }
    console.log(keyword);
  }, []);
  useEffect(() => {
    if (keyword !== "all") {
      let arr = lstCourse.filter(item => {
        return (
          item.tenKhoaHoc.toLowerCase().indexOf(keyword.toLowerCase().trim()) >
          -1
        );
      });
      setIsKeyword(true);
      setLstCourseMain(arr);
    } else if (keyword === "all") {
      setIsKeyword(false);
    }
  }, [lstCourse]);
  const renderLstCourse = data => {
    return data.map((item, index) => {
      return (
        <div className="col-md-3" key={index}>
          <ItemCourse item={item}></ItemCourse>
        </div>
      );
    });
  };

  // render list category
  const renderLstCategory = data => {
    return data.map((item, index) => {
      return (
        <option value={item} key={index}>
          {item}
        </option>
      );
    });
  };
  // filter khi change

  const renderCoursesFromOption = e => {
    let fake = lstCourse.filter(item => {
      if (item.danhMucKhoaHoc.tenDanhMucKhoaHoc === e) {
        return item;
      } else if (e == 1) {
        return lstCourse;
      }
    });
    setIsKeyword(false);
    setValueOption(e);
    setLstCourseMain(fake);
    setLstCourseTwo(fake);
  };
  const Search = e => {
    let arr = lstCourseMain.filter(item => {
      return (
        item.tenKhoaHoc
          .toLowerCase()
          .indexOf(e.target.value.toLowerCase().trim()) > -1
      );
    });
    console.log(lstCourseTwo);
    e.target.value.length !== 0
      ? setLstCourseMain(arr)
      : setLstCourseMain(lstCourseTwo);
  };
  const ValueSelect = () => {
    if (isKeyword === false) {
      return valueOption;
    } else return "2";
  };
  return (
    <div className="container-list-course">
      <div className="container">
        <div className="title">
          <h3>Danh sách khóa học :</h3>
          <div className="container-input">
            <input
              type="text"
              placeholder="Tìm kiếm khóa học"
              onKeyUp={e => Search(e)}
            />
            <span>
              <i class="fas fa-search"></i>
            </span>
          </div>
        </div>

        <div className="container-select">
          <select
            classname="danhMuc"
            value={ValueSelect()}
            onChange={e => renderCoursesFromOption(e.target.value)}
          >
            <option value="1">Tất cả</option>
            {renderLstCategory(danhMucKhoaHoc)}
            <option
              value="2"
              className={isKeyword === true ? " d-block" : "d-none"}
            >
              Đang tìm kiếm
            </option>
          </select>
        </div>
        <div className="row">
          {lstCourseMain.length === 0 ? <h4 style={{color:'#19224d',textAlign:'center',width:'100%',marginTop:'20px'}}>Không có khóa học muốn tìm</h4>:renderLstCourse(lstCourseMain)}
        </div>
      </div>
    </div>
  );
};

export default ListCourse;

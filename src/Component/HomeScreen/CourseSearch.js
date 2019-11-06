import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchCoursesFromDB,
  fetchListUserCourseFromDB
} from "../../Store/Actions/Course";
import "../../Screens/animate.css";
import { Link } from 'react-router-dom'
const CourseSearch = ({ courses, onFetchCourse, onFetchListUserCourse }) => {
  let danhSachTenDanhMuc = [];
  let [khoaHocDangChon, setKhoaHocDangChon] = useState();
  let [
    danhSachDanhMucKhoaHocKhongTrungTen,
    setdanhSachDanhMucKhoaHocKhongTrungTen
  ] = useState([]); 
  let [ category , setCategory ] = useState(false)
  let [ level , setLevel ] = useState(false)
  let [ course , setCourse ] = useState('')
  let [ submit , setSubmit ] = useState(true)
  useEffect(() => {
    onFetchCourse();
  }, []);

  useEffect(() => {
    // Lấy danh sách tên danh mục
    layDanhSachTenDanhMuc();
    // Lọc danh sách bị trùng tên
    let fake = danhSachTenDanhMuc.filter(
      (value, index) => danhSachTenDanhMuc.indexOf(value) === index
    );
    setdanhSachDanhMucKhoaHocKhongTrungTen(fake);
  }, [courses]);
  useEffect(()=>{
    localStorage.setItem("danhMucKhoaHoc",JSON.stringify(danhSachDanhMucKhoaHocKhongTrungTen))
  },[danhSachDanhMucKhoaHocKhongTrungTen])
  ///////////////////////////////////////////////////////////

  const layDanhSachTenDanhMuc = () => {
    courses.map(item => {
      danhSachTenDanhMuc.push(item.danhMucKhoaHoc.tenDanhMucKhoaHoc);
    });
  };
  const renderListCategory = list => {
    return list.map((item, index) => {
      return (
        <option key={index} value={item}>
          {item}
        </option>
      );
    });
  };

  const renderListSubject = () => {
    return courses.map((item, index) => {
      if (item.danhMucKhoaHoc.tenDanhMucKhoaHoc === khoaHocDangChon) {
        return (
          <option key={index} value={item.maKhoaHoc}>
            {item.tenKhoaHoc}
          </option>
        );
      }
    });
  };

  //////////////////////////////////////////////////////////
  return (
    <section className="banner_form py-5">
      <div className="container py-lg-3">
        <div className="row ban_form">
          <div className="col-lg-8 bg-white fom-left">
            <div className="categories_sub cats1">
              <h2 className="heading-agileinfo animated fadeInUp delay-1s">
                Chào mừng đến với <span> Passion</span>
              </h2>
              <p className="vam wow animated fadeInUp delay-0.5s">
                Passion khai thác nhu cầu tuyển dụng lập trình từ doanh nghiệp
                và tích hợp các dự án với công nghệ mới nhất vào phương pháp đào
                tạo tích cực cho các học viên. Chương trình giảng dạy năng động
                của chúng tôi luôn được tinh chỉnh và tối ưu hóa theo thời gian
                bởi các thành viên sáng lập của chúng tôi - một nhóm các nhà
                phát triển phần mềm và giám đốc công nghệ dày dạn kinh nghiệm.
              </p>
            </div>
          </div>
          <div className="col-lg-4 reg-fom animated fadeInUp delay-0.5s">
            <h4 className="text-white text-center">Tìm kiếm khóa học</h4>
            <form action="#" method="post">
              <div className="reg-fom-btm mt-5">
                <div className="fields">
                  <span className="text-white mb-2">Chọn cấp độ</span>
                  <select
                    className="form-control"
                    style={{ textTransform: "uppercase" }}
                    onChange={e => {
                      if(e.target.value !== '1'){
                        setLevel(true)
                      } else setLevel(false)
                    }}
                  >
                    <option value="1">CHỌN CẤP ĐỘ</option>
                    <option>Nhập môn</option>
                    <option>Trung cấp</option>
                    <option>Chuyên nghiệp</option>
                  </select>
                </div>
              </div>
              <div className="reg-fom-btm mt-3">
                <div className="fields">
                  <span className="text-white mb-2">Thể loại</span>
                  <select
                    className="form-control"
                    style={{ textTransform: "uppercase" }}
                    onChange={event => {
                      if(event.target.value !== '-1'){
                        setKhoaHocDangChon(event.target.value)
                        setCategory(true)
                      } else setCategory(false)
                    }}
                  >
                    <option value="-1">Chọn thể loại</option>
                    { level ? renderListCategory(danhSachDanhMucKhoaHocKhongTrungTen):<option value="-1">Vui lòng chọn cấp độ</option>}
                  </select>
                </div>
              </div>
              <div className="reg-fom-btm mt-3">
                <div className="fields">
                  <span className="text-white mb-2">Môn học</span>
                  <select
                    className="form-control"
                    style={{ textTransform: "uppercase" }}
                    onChange={e=>{setCourse(e.target.value);setSubmit(false)}}
                  >
                    <option value="-1">Chọn môn học</option>
                    { category ? renderListSubject():<option>Vui lòng chọn cấp độ và thể loại</option>}
                  </select>
                </div>
              </div>
              <div className="reg-fom-btm mt-3">
               <Link to={`/detail-course-home/${course}`} onClick={()=> window.scroll({top:0})}>
               <input disabled={submit} type="submit" defaultValue="Search" />
               </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
const mapStateToProps = state => {
  return {
    courses: state.course.courseList
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchCourse: () => dispatch(fetchCoursesFromDB())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseSearch);

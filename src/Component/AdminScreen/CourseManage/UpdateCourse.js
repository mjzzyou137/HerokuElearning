import React, { useEffect, useState } from "react";
// import { Formik, Form } from "formik";
import withAdminSettingCourse from "../AdminSettingCourse";
import { makeStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { fetchCourseDetailFromDB } from "../../../Store/Actions/Course";
import CourseService from "../../../Services/Course";
import SweetAlert from "sweetalert-react";
import { Route , Redirect } from 'react-router-dom'
const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
    color: "white"
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
}));

const UpdateCourse = ({ onGetDetailCourse, courseDetail, match ,history}) => {
  const classes = useStyles();
  let [objDetail, setObjectDetail] = useState({}); 

  let [maKhoaHoc, setmaKhoaHoc] = useState("");
  let [biDanh, setbiDanh] = useState("");
  let [tenKhoaHoc, settenKhoaHoc] = useState("");
  let [moTa, setmoTa] = useState("");
  let [luotXem, setluotXem] = useState();
  let [danhGia, setdanhGia] = useState(5);
  let [hinhAnh, sethinhAnh] = useState("");
  let [maNhom, setmaNhom] = useState("");
  let [ngayTao, setngayTao] = useState("");
  let [maDanhMucKhoaHoc, setmaDanhMucKhoaHoc] = useState("");
  let [taiKhoanNguoiTao, settaiKhoanNguoiTao] = useState("");
  let [isOk, setIsOk] = useState(false);
  useEffect(() => {
    onGetDetailCourse(match.params.id);
  }, []);
  useEffect(() => {
    console.log(courseDetail) 
    setmaKhoaHoc(courseDetail.maKhoaHoc);
    setbiDanh(courseDetail.biDanh);
    settenKhoaHoc(courseDetail.tenKhoaHoc);
    setmoTa(courseDetail.moTa);
    setluotXem(courseDetail.luotXem); 
    sethinhAnh(courseDetail.hinhAnh);
    setmaNhom(courseDetail.maNhom);
    setngayTao(courseDetail.ngayTao); 
    console.log(courseDetail)
    if(courseDetail.danhMucKhoaHoc){
      setmaDanhMucKhoaHoc(courseDetail.danhMucKhoaHoc.maDanhMucKhoahoc)
    }
    if(courseDetail.nguoiTao){
      settaiKhoanNguoiTao(courseDetail.nguoiTao.taiKhoan); 
    } 
    setObjectDetail(courseDetail);
  }, [objDetail, courseDetail]);
  const editCourse = () => {
    let obj = {
      maKhoaHoc: maKhoaHoc,
      biDanh: biDanh,
      tenKhoaHoc: tenKhoaHoc,
      moTa: moTa,
      luotXem: luotXem,
      danhGia: danhGia,
      hinhAnh: hinhAnh,
      maNhom: maNhom,
      ngayTao: ngayTao,
      maDanhMucKhoaHoc: maDanhMucKhoaHoc,
      taiKhoanNguoiTao: taiKhoanNguoiTao
    };
    console.log(obj)
    CourseService.updateCourse(obj)
      .then(res => {
        console.log(res.data);
        setIsOk(true);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <>
    <div className="header">
                <h5></h5>
                <div className="search-admin"> 
                  <div className="headerUser">
                    <div className="avatarUser">
                      <img
                        src="https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-male-3-512.png"
                        alt="img"
                      />
                    </div>
                    <span className="username">
                      {JSON.parse(localStorage.getItem("loginUser")).hoTen}
                    </span>
                  </div>
                </div>
              </div>
      <section className="w-100 mt-5 pb-5">
        <SweetAlert
          show={isOk}
          title="SỬA KHÓA HỌC THÀNH CÔNG"
          onConfirm={() => {
            setIsOk(false);
           history.push('/courses-manage')
          }}
        />
        <h3
          className="mb-4"
          style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
        >
          THAY ĐỔI THÔNG TIN KHÓA HỌC
        </h3>
        <div className="w-50 mx-auto text-white">
          <form>
            <div className="form-group">
              <label>Mã khóa học:</label>
              <input
                type="text"
                className="form-control"
                name="maKhoaHoc"
                value={maKhoaHoc}
                disabled
                onChange={e => setmaKhoaHoc(e.target.value)}
              />
            </div> 
            <div className="form-group">
              <label>Tên khóa học:</label>
              <input
                type="text"
                className="form-control"
                name="tenKhoaHoc"
                value={tenKhoaHoc}
                onChange={e => settenKhoaHoc(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Mô tả :</label>
              <input
                type="text"
                className="form-control"
                name="moTa"
                value={moTa}
                onChange={e => setmoTa(e.target.value)}
              />
            </div> 
            {/* <div className="form-group">
              <label>Đánh giá:</label>
              <input
                type="number"
                className="form-control"
                name="danhGia"
                value={danhGia}
                onChange={e => setdanhGia(e.target.value*1)}
              />
            </div> */}
            <div className="form-group">
              <label>Hình ảnh:</label>
              <input
                type="text"
                className="form-control"
                name="hinhAnh"
                value={hinhAnh}
                onChange={e => sethinhAnh(e.target.value)}
              />
            </div>  
            <button
              type="button"
              className="btn btn-danger w-100"
              onClick={() => editCourse()}
            >
              CHẤP NHẬN
            </button>
          </form>
        </div>
      </section>
    </>
  );
};
const mapStateToProps = state => {
  return {
    courseDetail: state.course.courseDetail
  };
};
const mapDispathToProps = dispatch => {
  return {
    onGetDetailCourse: courseID => dispatch(fetchCourseDetailFromDB(courseID))
  };
};

const HOC = withAdminSettingCourse(UpdateCourse);

export default connect(
  mapStateToProps,
  mapDispathToProps
)(HOC);

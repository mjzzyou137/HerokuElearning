import React, { useEffect, useState } from "react";
import withAdmin from "./Admin";
import CourseService from "../../Services/Course";
import ItemCourse from "./CourseManage/ItemCourse";
import { Formik, Form } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SweetAlert from "sweetalert-react";
import Axios from 'axios'
import {VerticleButton as ScrollUpButton} from "react-scroll-up-button";

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
const CoursesManage = () => {
  let [listCourse, setListCourse] = useState([]);
  let [addCourse, setAddCourse] = useState(false);
  let danhSachTenDanhMuc = [];
  let [danhMucDangChon, setDanhMucDangChon] = useState("1");
  let [lstTenDanhMuc, setLstTenDanhMuc] = useState([]);
  let [lstCourseFake, setLstCourseFake] = useState([]);
  let [ file , setFile ] = useState()
  useEffect(() => {
    CourseService.fetchCourse()
      .then(res => {
        setListCourse(res.data);
        setLstCourseFake(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    let fake = listCourse.filter(item => {
      return item.danhMucKhoaHoc.tenDanhMucKhoaHoc === danhMucDangChon;
    });
    // setListCourse(fake)
  }, [listCourse, danhMucDangChon]);
  useEffect(() => {
    lstCourseFake.map(item => {
      danhSachTenDanhMuc.push(item.danhMucKhoaHoc.tenDanhMucKhoaHoc);
    });
    let fake = danhSachTenDanhMuc.filter(
      (value, index) => danhSachTenDanhMuc.indexOf(value) === index
    );
    setLstTenDanhMuc(fake);
  }, [lstCourseFake]);
  useEffect(() => {
    console.log(danhMucDangChon);
  }, [danhMucDangChon]);
  const renderOption = data => {
    return data.map((item, index) => {
      return (
        <>
          <option key={index} value={item}>
            {item}
          </option>
        </>
      );
    });
  };
  const classes = useStyles();

  const renderListCourse = data => {
    return data.map((item, index) => {
      return <ItemCourse key={index} item={item} index={index} />;
    });
  };
  const renderCoursesFromOption = e => {
    let fake = lstCourseFake.filter(item => {
      if (item.danhMucKhoaHoc.tenDanhMucKhoaHoc === e.target.value) {
        return item;
      } else if (e.target.value == 1) {
        return listCourse;
      }
    });
    console.log(fake);
    setListCourse(fake);
  };
  const onChangeImage = e => { 
    setFile(e.target.files[0])
  }
  useEffect(()=>{
     console.log(file)
      localStorage.setItem("file",JSON.stringify(file)) 
  },[file])
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
      <SweetAlert
        show={addCourse}
        title="THÊM THÀNH CÔNG"
        text="KHÓA HỌC ĐÃ ĐƯỢC THÊM"
        onConfirm={() => setAddCourse(false)}
      />
      <div className="container"></div>
      <section style={{ paddingBottom: "50px" }}>
        <div className="container d-flex flex-wrap">
          <div
            className="align-items-center d-flex justify-content-between mb-3 w-100"
            style={{ padding: "0 10px" }}
          >
            <h3 className="font-weight-bold" style={{ color: "white" }}>
              DANH SÁCH KHÓA HỌC{" "}
            </h3>
            <button
              className="btn"
              style={{
                background: "linear-gradient(to right,purple,rgb(244,67,54))",
                color: "white"
              }}
              data-toggle="modal"
              data-target="#modelId"
            >
              <i class="fas fa-plus"></i> THÊM KHÓA HỌC
            </button>
            <div
              className="modal fade"
              id="modelId"
              tabIndex={-1}
              role="dialog"
              aria-labelledby="modelTitleId"
              aria-hidden="true"
            >
              <div
                className="modal-dialog"
                role="document"
                style={{ background: "white", maxWidth: "930px !important" }}
              >
                <div
                  className="modal-content"
                  style={{
                    background: "#19224d",
                    padding: "10px",
                    borderRadius: "0px"
                  }}
                >
                  <div
                    className="modal-body"
                    style={{
                      background: "white"
                    }}
                  >
                    <Formik
                      initialValues={{
                        maKhoaHoc: "",
                        biDanh: "",
                        tenKhoaHoc: "",
                        moTa: "",
                        luotXem: 0 * 1,
                        danhGia: 5 * 1,
                        hinhAnh: "http://elearning0706.cybersoft.edu.vn/hinhanh/web-developer.jpg",
                        maNhom: "GP01",
                        ngayTao: "",
                        maDanhMucKhoaHoc: "",
                        taiKhoanNguoiTao: ""
                      }}
                      onSubmit={values => { 
                        console.log(values)
                        CourseService.addCourse(values)
                          .then(res => {
                            setAddCourse(true); 
                          })
                          .catch(err => {
                            console.log(err);
                          });



                          var frm = new FormData()
                          frm.append('file',file);
                          frm.append('tenKhoaHoc',values.tenKhoaHoc)                        
                          setTimeout(()=>{
                            Axios({
                              method:'POST',
                              url: "http://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc",
                              data:frm 
                            }).then(res=> console.log("result",res)).catch(err=>{
                              console.log(err)
                            })
                          },200)
                      }}
                      render={({ handleChange, values, ...formikProps }) => (
                        <Form style={{ color: "white", overflow: "hidden" }}>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            style={{ color: "white" }}
                          >
                            <span aria-hidden="true">×</span>
                          </button>
                          <h4
                            style={{
                              textAlign: "center",
                              color: "#19224d",
                              fontWeight: "bold",
                              fontSize: "30px"
                            }}
                          >
                            THÊM KHÓA HỌC
                          </h4>

                          <div className="form-group">
                            <TextField
                              id="standard-name"
                              onChange={handleChange}
                              label="Mã khóa học"
                              name="maKhoaHoc"
                              className={classes.textField}
                              margin="normal"
                            />
                          </div>
                          <div className="form-group">
                            <TextField
                              id="standard-name"
                              label="Bí danh"
                              name="biDanh"
                              className={classes.textField}
                              style={{ color: "white !important" }}
                              onChange={handleChange}
                              margin="normal"
                            />
                          </div>
                          <div className="form-group">
                            <TextField
                              id="standard-name"
                              label="Tên khóa học"
                              name="tenKhoaHoc"
                              className={classes.textField}
                              style={{ color: "white !important" }}
                              onChange={handleChange}
                              margin="normal"
                            />
                          </div>
                          <div className="form-group">
                            <TextField
                              id="standard-name"
                              label="Mô tả"
                              name="moTa"
                              className={classes.textField}
                              style={{ color: "white !important" }}
                              onChange={handleChange}
                              margin="normal"
                            />
                          </div>
                          <div className="form-group">
                            <TextField
                              id="standard-name"
                              label="Lượt xem"
                              name="luotXem"
                              className={classes.textField}
                              style={{ color: "white !important" }}
                              onChange={handleChange}
                              margin="normal"
                            />
                          </div>
 
                            <label style={{color:'#19224d'}}>Hình ảnh</label>
                            <input
                              type="file"
                              className="form-control"
                              name="hinhAnh" 
                              onChange={(event)=>onChangeImage(event)} 
                            /> 

                          <div className="form-group">
                            <TextField
                              id="standard-name"
                              label="Ngày tạo"
                              name="ngayTao"
                              className={classes.textField}
                              style={{ color: "white !important" }}
                              onChange={handleChange}
                              margin="normal"
                            />
                          </div>
                          <div className="form-group">
                            <TextField
                              id="standard-name"
                              label="Mã danh mục khóa học"
                              name="maDanhMucKhoaHoc"
                              className={classes.textField}
                              style={{ color: "white !important" }}
                              onChange={handleChange}
                              margin="normal"
                            />
                          </div>
                          <div className="form-group">
                            <TextField
                              id="standard-name"
                              label="Tài khoản người tạo"
                              name="taiKhoanNguoiTao"
                              className={classes.textField}
                              style={{ color: "white !important" }}
                              onChange={handleChange}
                              margin="normal"
                            />
                          </div>
                          <div className="form-group text-right">
                            <button
                              type="submit"
                              className="btn btn-success btnChapNhanChinhSuaKhoaHoc"
                              style={{
                                color: "white",
                                border: "none",
                                fontWeight: "bold",
                                background: "rgb(20,8,97)"
                              }}
                            >
                              CHẤP NHẬN
                            </button>
                          </div>
                        </Form>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <select
            style={{
              marginLeft: "10px",
              marginBottom: "10px",
              display: "block",
              marginRight: "10px",
              width: "100%",
              borderRadius: "6px",
              padding: "5px 15px"
            }}
            onChange={event => renderCoursesFromOption(event)}
          >
            <option value="1">Tất cả</option>
            {renderOption(lstTenDanhMuc)}
          </select>
          {renderListCourse(listCourse)}
        </div>
      </section>
              <ScrollUpButton />
    </>
  );
};

export default withAdmin(CoursesManage);

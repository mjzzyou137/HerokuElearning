import React,{useState} from "react";
import "./style.css";
import { Link } from 'react-router-dom'
import { Formik, Form } from "formik";
import UserService from "../../Services/User";
import SweetAlert from "sweetalert-react"; 
const Register = (props) => {
  let [ isReg , setIsReg ] = useState(false)
  return (
    <div className="home">
       <SweetAlert
        show={isReg}
        title="Đăng ký thành công"
        text=""
        onConfirm={() => {
          setIsReg(false)
          props.history.replace('/signin')
        }}
      />
      <div className="left">
        <div className="login" style={{ height: "92.5%", width: "73%" }}>
          <div className="content">
            <div className="logo">
              <div className="blue">
                <p>Pass</p>
              </div>
              <span className="ion">ion</span>
              <span className="academy">&nbsp;Academy</span>
            </div>
            <Formik
              initialValues={{
                taiKhoan: "",
                matKhau: "",
                hoTen: "",
                soDT: "",
                maNhom: "GP01",
                email: "",
                maLoaiNguoiDung: "GV",
              }}
              onSubmit={values => {
                console.log(values)
                UserService.Register(values).then(res => {
                  setIsReg(true)
                }).catch(err => {
                  console.log(err)
                })
              }}
              render={({ handleChange, ...formikProps }) => (
                <Form>
                  <div className="form-group">
                    <label>Tài khoản:</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      name="taiKhoan"
                    />
                  </div>
                  <div className="form-group">
                    <label>Mật khẩu:</label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={handleChange}
                      name="matKhau"
                    />
                  </div>
                  <div className="form-group">
                    <label>Họ tên:</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                      name="hoTen"
                    />
                  </div>
                  <div className="form-group">
                    <label>Số điện thoại:</label>
                    <input
                      type="number"
                      className="form-control"
                      onChange={handleChange}
                      name="soDT"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pwd">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      onChange={handleChange}
                      name="email"
                    />
                  </div>
                  <button type="submit" className="btn">
                    Đăng ký
                  </button>
                  <Link to="/signin">
                  <p
                    className="py-2"
                    style={{
                      color: "#1C3B68",
                      fontWeight: "bold",
                      cursor: "pointer",
                      marginBottom: 0,
                      fontSize: 20,
                      borderTop:'1px soild black'
                    }}
                  >
                    Đăng nhập ngay
                  </p> 
                  </Link>
                  <div className="social" style={{ borderBottom: "unset" }}>
                    <div className="containerSocial">
                      <div className="circle facebook">
                        <i className="fab fa-facebook-f" />
                      </div>
                      <div className="circle twitter">
                        <i className="fab fa-twitter" />
                      </div>
                      <div className="circle google">
                        <i className="fab fa-google" />
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            />
          </div>
        </div>
      </div>
      <div className="right">
        <div className="introduce" style={{ height: "92.5%", width: "73%" }}>
          <div className="content">
            <h4 className="display-5">
              Welcome to <span>Passion Academy</span>
            </h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
              ab consequatur quo voluptate asperiores eius corporis modi. Iusto,
              officia mollitia!
            </p> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

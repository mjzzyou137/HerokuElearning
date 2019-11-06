import React,{useState} from "react";
import "./style.css";
import { Link } from 'react-router-dom'
import { Formik, Form } from "formik";
import { Signup } from "../../Store/Actions/User";
import { connect } from "react-redux";
import SweetAlert from "sweetalert-react"; 
const Login = ({onSignUp,history}) => { 
  let [ isLogin , setIsLogin ] = useState(false)
  return (
    <div className="home">
       <SweetAlert
        show={isLogin}
        title="Đăng nhập thành công"
        text=""
        onConfirm={() => {
          setIsLogin(false)
          history.replace('/')
        }}
      />
      <div className="left">
        <div className="login">
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
                matKhau: ""
              }}
              onSubmit={values => { 
                onSignUp(values);
                setIsLogin(true)
              }}
              render={({ handleChange, ...formikProps }) => (
                <Form>
                  <div className="form-group">
                    <label>Tài khoản:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="taiKhoan"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pwd">Mật khẩu:</label>
                    <input
                      type="password"
                      className="form-control"
                      name="matKhau"
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="btn">
                   Đăng nhập
                  </button>
                  <p className="signUpUsing">Or sign up using</p>
                  <div class="social">
                <div class="containerSocial">
                        <div class="circle facebook">
                                <i class="fab fa-facebook-f"></i>
                              </div>
                              <div class="circle twitter">
                                <i class="fab fa-twitter"></i>
                              </div>
                              <div class="circle google">
                                <i class="fab fa-google"></i>
                              </div>
                </div>
              </div>

                 <Link to="/signup">
                 <p
                    className="py-2"
                    style={{
                      color: "#1C3B68 !important",
                      fontWeight: "bold",
                      cursor: "pointer",
                      marginBottom: 0,
                      fontSize: 20
                    }}
                  >
                    ĐĂNG KÝ NGAY
                  </p>
                 </Link>
                </Form>
              )}
            />
          </div>
        </div>
      </div>
      <div className="right">
        <div className="introduce">
          <div className="content">
            <h4 className="display-5">
              Welcome to <span>Passion Academy</span>
            </h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
              ab consequatur quo voluptate asperiores eius corporis modi. Iusto,
              officia mollitia!
            </p>
            <button className="btn">Read more...</button>
          </div>
        </div>
      </div>
    </div>
  );
}; 
const mapDispatchToProps = dispatch => {
  return{
    onSignUp: (values,replace) => dispatch(Signup(values,replace)),
  }
}
export default connect(null,mapDispatchToProps)(Login);

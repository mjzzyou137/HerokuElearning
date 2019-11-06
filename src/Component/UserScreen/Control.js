import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux"; 
const Control = props => {
  return (
    <div className="col-md-3 profile-col-md-3">
      <Link to="/" onClick={()=>{
        window.scroll({top:0})
      }}>
      
      <div className="logo text-center">
        <div className="blue">
          <p>Pass</p>
        </div>
        <span className="ion" style={{marginLeft:0}}>ion</span>
        <span className="academy">&nbsp;Academy</span>
      </div></Link>
      <div className="profile-avatar">
        <img
          src="https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-male-3-512.png"
          alt
        />
        <h5
          className="profile-name text-white"
          style={{ fontSize: "25px !important" }}
        >
          {JSON.parse(localStorage.getItem("loginUser")).hoTen}
        </h5>
      </div>
      <div className="profile-setting">
        <div className="container-edit-profile">
          <button className="btn">
            <Link
              style={{ color: "white" }}
              to={`/user/change-information/${props.user.taiKhoan}`}
              onClick={()=>window.scroll({top:0,behavior:"smooth"})}
            >
              THAY ĐỔI THÔNG TIN
            </Link>
          </button>
        </div>
        <div className="controller">
          <ul style={{ fontSize: "20px", color: "white" }}>
            <Link
              to={`/user/${props.user.taiKhoan}`}
              style={{ color: "#0000FF" }}
              onClick={()=>window.scroll({top:0,behavior:"smooth"})}
            >
              {" "}
              <li className="khoaHocCuaToi">
                <i
                  style={{ width: 50 }}
                  className="fas fa-desktop"
                />
                KHÓA HỌC CỦA TÔI
              </li>
            </Link>
            <Link
              to={`/user/subscribe-course/${props.user.taiKhoan}`}
              style={{ color: "#F6495C" }}
              onClick={()=>window.scroll({top:0,behavior:"smooth"})}
            >
              <li className="dangKyKhoaHoc">
                <i
                  style={{ width: 50, paddingLeft: 1 }}
                  className="fas fa-table"
                />
                ĐĂNG KÝ KHÓA HỌC
              </li>
            </Link>
            <Link
              to={`/user/course-not-approval/${props.user.taiKhoan}`}
              onClick={()=>window.scroll({top:0,behavior:"smooth"})}
            >
              {" "}
              <li className="khoaHocChoXetDuyet">
              <i style={{ width: 50 }} className="fas fa-pen"></i>
                KH CHỜ XÉT DUYỆT
              </li>
            </Link>
            <Link
              to={`/user/award/${props.user.taiKhoan}`}
              onClick={()=>window.scroll({top:0,behavior:"smooth"})}
            >
              {" "}
              <li className="khoaHocChoXetDuyet">
              <i style={{ width: 50 }}  className="fas fa-award"></i>
                CÁC HUY HIỆU
              </li>
            </Link>
            <Link to="/" 
           onClick={()=>{
            window.scroll({
             top: 0,
             behavior: "smooth"
           });
          }}
            >
              <li className="thoat">
              
                <i
                  style={{ width: 50 }}
                  className="fas fa-sign-out-alt"
                ></i>
                THOÁT
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default connect()(Control); 
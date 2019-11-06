import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import withAdminSettingCourse from "../AdminSettingCourse";
import CourseService from "../../../Services/Course";
import SweetAlert from 'sweetalert-react';
import UserService from "../../../Services/User"; 
const ListUserCourse = ({ match }) => {
  let [lstHocVien, setLstHocVien] = useState([]);
  let [unsubscribe,setUnsubscribe] = useState(false)
  let [lstUserSearchFake,setLstUserSearchFake ] = useState([])

  useEffect(() => {
    CourseService.fetchListUserCourse(match.params.id)
      .then(res => {
        setLstHocVien(res.data.lstHocVien);
        setLstUserSearchFake(res.data.lstHocVien)
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const unsubscribeCourse = data => {
      const obj = {
          maKhoaHoc: match.params.id,
          taiKhoan:data,
      }
      CourseService.unsubscribeCourse(obj).then(res=>{ 
          setUnsubscribe(true)

      }).catch(err => {
          console.log(err)
      })
  }
  const renderLstHocVien = data => {
    return data.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.taiKhoan}</td>
          <td>{item.hoTen}</td>
          <td>{item.biDanh === null ? "Chưa có bí danh" : `${item.biDanh}`}</td>
          <td>
            <button className="btn btn-danger" onClick={()=>unsubscribeCourse(item.taiKhoan)}>XÓA GHI DANH</button>
          </td>
        </tr>
      );
    });
  };
  const searchUser = e => {
    UserService.searchUser(e.target.value).then(res=>{
      if(res.data.length !== 0){ 
        return setLstHocVien(res.data)
      }

      return setLstHocVien(lstUserSearchFake)
    }).catch(err=>{
      console.log(err)
    })
  }
  return (
    <>
    <SweetAlert 
        show={unsubscribe}
        title="HỦY GHI DANH THÀNH CÔNG"
        text="HỌC VIÊN ĐÃ BỊ HỦY"
        onConfirm={() => {
            setUnsubscribe(false)
          window.location.reload();
        }}
      />
       <div className="header">
                <h5>BẢNG ĐIỀU KHIỂN</h5>
                <div className="search-admin">
                  <div className="search-admin-user">
                    <i
                      className="fa fa-search icon-search"
                      aria-hidden="true"
                    />
                    <input
                      type="text"
                      placeholder="Tìm kiếm"
                      onKeyUp={(event) => searchUser(event)}
                    />
                  </div>
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
      <div class="container">
        <table class="table" style={{ color: "white" }}>
          <thead>
            <tr>
              <th>Tài khoản</th>
              <th>Họ tên</th>
              <th>Bí danh</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>{renderLstHocVien(lstHocVien)}</tbody>
        </table>
      </div>
    </>
  );
};

const HOC = withAdminSettingCourse(ListUserCourse);

export default connect()(HOC);

import React, { useEffect, useState } from "react";
import withAdminSettingCourse from "../AdminSettingCourse";
import SweetAlert from "sweetalert-react";
import { connect } from "react-redux";
import CourseService from "../../../Services/Course"; 
import UserService from "../../../Services/User"; 
const ListUserWaitApproval = ({match}) => {
    let [lstHocVienChoXetDuyet, setlstHocVienChoXetDuyet] = useState([]);
  let [isAlert, setIsAlert] = useState(false);
  let [lstUserSearchFake,setLstUserSearchFake ] = useState([])

  useEffect(() => {
    let obj = {
      maKhoaHoc: match.params.id
    };
    CourseService.fetchListUserNotApproval(obj)
      .then(res => {
        setlstHocVienChoXetDuyet(res.data);
        setLstUserSearchFake(res.data)
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const approvalUser = data => {
      let obj = {
          maKhoaHoc:match.params.id,
          taiKhoan:data,
      }
      CourseService.subscribeCourse(obj).then(res=>{
        setIsAlert(true)
      }).catch(err => {
          console.log(err)
      })   
         const listCart = localStorage.getItem("listCart")

      if(listCart){
        let index = JSON.parse(listCart).findIndex(item=>{
            return (item.maKhoaHoc === match.params.id && item.taiKhoan === data)
        })
        if(index !== -1){
            let arr = JSON.parse(listCart)
            arr.splice(index,1)
            localStorage.removeItem("listCart")
            localStorage.setItem("listCart",JSON.stringify(arr))
        }
    }
  }
  const renderListUser = data => {
    return data.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.taiKhoan}</td>
          <td>{item.hoTen}</td>
          <td>{item.biDanh === null ? "Chưa có bí danh" : `${item.biDanh}`}</td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => approvalUser(item.taiKhoan)}
            >
              XÉT DUYỆT
            </button>
          </td>
        </tr>
      );
    });
  };
  const searchUser = e => {
    UserService.searchUser(e.target.value).then(res=>{
      if(res.data.length !== 0){ 
        return setlstHocVienChoXetDuyet(res.data)
      }

      return setlstHocVienChoXetDuyet(lstUserSearchFake)
    }).catch(err=>{
      console.log(err)
    })
  }
    return (
        <>
     <SweetAlert 
        show={isAlert}
        title="XÉT DUYỆT THÀNH CÔNG"
        text="HỌC VIÊN ĐÃ ĐƯỢC XÉT DUYỆT"
        onConfirm={() => {
            setIsAlert(false)
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
          <tbody>{renderListUser(lstHocVienChoXetDuyet)}</tbody>
        </table>
      </div>
    </>
    );
};

const HOC = withAdminSettingCourse(ListUserWaitApproval);

export default connect()(HOC);

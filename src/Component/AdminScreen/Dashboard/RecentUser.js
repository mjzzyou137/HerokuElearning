import React, { useEffect, useState } from "react";
import UserService from "../../../Services/User";
const RecentUser = () => { 
  let [listUser,setListUser] = useState([])
  useEffect(()=>{
    UserService.fetchListUser().then(res=>{
      let arr = res.data
      setListUser(res.data)
    }).catch(err=>{
      console.log(err)
    })
  },[]) 
  const renderRecentUser = (value) => { 
    return value.map((item, index) => {
      return (
        <tr>
          <td>{item.hoTen}</td>
          <td>{item.email}</td>
          <td>{item.soDt}</td>
        </tr>
      );
    });
  };
  return (
    <div className="recent-user recent ">
      <h4 style={{color:'#19224d'}} className=" text-center font-weight-bold mb-2">Danh sách học viên</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Tên học viên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
          </tr>
        </thead>
        <tbody>{renderRecentUser(listUser)}</tbody>
      </table>
    </div>
  );
};

export default RecentUser;

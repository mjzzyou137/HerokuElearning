import React, { Component } from 'react';
import { Route , Redirect } from 'react-router-dom'
import SweetAlert from "sweetalert-react";

const Admin = ({component:Component,...rest}) => {
    return <Route {...rest} render={(props)=>{
        if(localStorage.getItem("loginUser")){
            if(JSON.parse(localStorage.getItem('loginUser')).maLoaiNguoiDung === 'GV'){
                
            return <Component {...props}/>
            }
        }
        alert("Bạn không có quyền truy cập");
        return <Redirect to="/" />
    }} 
    />
}
export default Admin
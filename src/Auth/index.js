import React, { Component } from 'react';
import { Route , Redirect } from 'react-router-dom'
const Auth = ({component:Component,...rest}) => {
    return <Route {...rest} render={(props)=>{
        if(localStorage.getItem("loginUser")){
            return <Component {...props}/>
        }
        alert("Bạn chưa đăng nhập");
        return <Redirect to="/signin" />
    }} 
    />
}
export default Auth
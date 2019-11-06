import React from "react";
import Control from './Control'
import Header from './Dashboard/Header'
import Statistic from './Dashboard/Statistic'
import RecentUser from './Dashboard/RecentUser'
import RecentCourses from './Dashboard/RecentCourses'
import withAdmin from './Admin'
const Dashboard = () => {
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
        <span className="username">{JSON.parse(localStorage.getItem("loginUser")).hoTen}</span>
      </div>
    </div>
  </div>
          <div className="intro">
            <Statistic/>
            <div className="container-recent d-flex">
             <RecentUser></RecentUser>
              <RecentCourses></RecentCourses>
            </div>
          </div>  
    </>
  );
};

export default withAdmin(Dashboard);

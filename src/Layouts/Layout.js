import React from "react";
import HomeScreen from "../Screens/HomeScreen";
import Login from '../Component/Login-Register/Login'
import Register from '../Component/Login-Register/Register'
import { BrowserRouter, Route,  Switch } from "react-router-dom"; 
import AdminScreen from '../Screens/AdminScreen'
import CoursesManage from '../Component/AdminScreen/CoursesManage'
import UsersManage from '../Component/AdminScreen/UsersManage'
import Auth from '../Auth/index'
import ListUserCourse from '../Component/AdminScreen/CourseManage/ListUserCourse'
import UpdateCourse from '../Component/AdminScreen/CourseManage/UpdateCourse'
import SubscribeUserCourse from '../Component/AdminScreen/CourseManage/SubscribeUserCourse'
import ListUserWaitApproval from '../Component/AdminScreen/CourseManage/ListUserWaitApproval'
import UserScreen from '../Screens/UserScreen'
import SubscribeCourse from '../Component/UserScreen/SubscribeCourse'
import ChangeInformationUser from '../Component/UserScreen/ChangeInformation'
import CourseNotApproval from '../Component/UserScreen/CourseNotApproval'
import AuthAdmin from '../Auth/Admin'
import Map from '../Component/AdminScreen/map'
import DetailCourseScreen from '../Screens/DetailCourseScreen'
import Notification from '../Component/AdminScreen/CourseManage/Notification'
import Exercise from "../Component/AdminScreen/CourseManage/Exercise";
import Lesson from "../Component/AdminScreen/CourseManage/Lesson";
import ListUser from "../Component/UserScreen/MyCourse/ListUser";
import Award from '../Component/UserScreen/Award'
import ListCourseScreen from '../Screens/ListCourseScreen'
import DetailCourseHomeScreen from "../Screens/DetailCourseHomeScreen";
import CartScreen from "../Screens/CartScreen";
import ProfileScreen from "../Screens/ProfileScreen";










const Layout = () => {
  
  return (
    <BrowserRouter> 

      <Switch> 
        <AuthAdmin path="/admin/map" component={Map}/>
      <Auth path="/user/change-information/:id" component={ChangeInformationUser}/>
      <Auth path="/user/subscribe-course/:id" component={SubscribeCourse}/>
      <Auth path="/user/course-not-approval/:id" component={CourseNotApproval}/> 
      <Auth path="/user/award/:id" component={Award}/> 
      <Auth path="/user/chi-tiet-khoa-hoc/:taikhoan/:makhoahoc" component={DetailCourseScreen}/>
      <Auth path="/user/danh-sach-hoc-vien/:taikhoan/:makhoahoc" component={ListUser}/>
      <Auth path="/profile/:id" component={ProfileScreen}/>
        <Route path="/signin" component={Login} />
        <Route path="/signup" component={Register} /> 
        <AuthAdmin path="/admin" component={AdminScreen} /> 
        <AuthAdmin path="/courses-manage" component={CoursesManage} /> 
        <AuthAdmin path="/update-course/:id" component={UpdateCourse} /> 
        <AuthAdmin path="/list-user-course/:id" component={ListUserCourse} /> 
        <AuthAdmin path="/notification/:id" component={Notification}/>
        <AuthAdmin path="/exercise/:id" component={Exercise}/>
        <AuthAdmin path="/lesson/:id" component={Lesson}/>
        <AuthAdmin path="/subscribe-user-course/:id" component={SubscribeUserCourse} /> 
        <AuthAdmin path="/list-user-wait-approval/:id" component={ListUserWaitApproval} /> 
        <AuthAdmin path="/users-manage" component={UsersManage} /> 
        <Auth path="/user/:id" component={UserScreen}/>
        <Auth path="/shopping-cart/:taikhoan" component={CartScreen} />
        <Route path="/detail-course-home/:id" component={DetailCourseHomeScreen}/>
        <Route path="/list-course/:keyword" component={ListCourseScreen}/>
        <Route path="/" component={HomeScreen} />
      </Switch>
    </BrowserRouter>
  );
};

export default Layout;

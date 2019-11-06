import React,{useEffect,useState} from 'react';
import './DetailCourseScreen.scss'
import Header from '../Component/DetailCourse/Header'
import Banner from '../Component/DetailCourse/Banner'
import GioiThieuKhoaHoc from "../Component/DetailCourse/GioiThieuKhoaHoc";
import NoiDungKhoaHoc from "../Component/DetailCourse/NoiDungKhoaHoc";
import DanhGia from "../Component/DetailCourse/DanhGia";
import BaiTap from "../Component/DetailCourse/BaiTap";
import ThongBao from "../Component/DetailCourse/ThongBao";
import {VerticleButton as ScrollUpButton} from "react-scroll-up-button";
import { actFetchLoginUser } from '../Store/Actions/User';
import { restConnector } from '../Connectors/Axios';
import { connect } from 'react-redux'
import { fetchCourseDetailFromDB } from '../Store/Actions/Course';
const DetailCourseScreen = (props) => {
  let [ falseTrue , setFalseTrue ] = useState(false)
  let [ isRate ,setIsRate ] = useState(false)
  useEffect(()=> {   
    const loginUser = localStorage.getItem("loginUser");
    console.log(loginUser)
    if(loginUser) {
      props.onGetUser(JSON.parse(loginUser))
      restConnector.defaults.headers["Authorization"] = `Bearer ${JSON.parse(loginUser).accessToken}`;
    }  
    props.onGetDetailCourse(props.match.params.makhoahoc)
  },[]
  ) 
  const isRate1 = data => {
    setFalseTrue(data)
    setIsRate(data) 
  }
  return (
    <section className="thong-tin-khoa-hoc">
      <Header history={props} MaKhoaHoc={props.match.params.makhoahoc}/>
      <Banner  statusRate={isRate} MaKhoaHoc={props.match.params.makhoahoc}/>
      <section className="main">
        <div className="container">
          {/* Nav tabs */}
          <ul className="nav nav-tabs py-3" role="tablist">
            <li className="nav-item">
              <p className="nav-link active " data-toggle="tab" href="#home">
                Giới thiệu
              </p>
            </li>
            <li className="nav-item">
              <p className="nav-link" data-toggle="tab" href="#menu1">
                Nội dung bài học
              </p>
            </li>
            <li className="nav-item">
              <p className="nav-link " data-toggle="tab" href="#menu2">
                Đánh giá
              </p>
            </li>
            <li className="nav-item">
              <p className="nav-link" data-toggle="tab" href="#menu3">
                Bài tập
              </p>
            </li>
            <li className="nav-item">
              <p className="nav-link" data-toggle="tab" href="#menu4">
                Thông báo
              </p>
            </li>
          </ul>
        </div>
        {/* Tab panes */}
        <div className="tab-content py-5 text-white">
          <div id="home" className="container tab-pane active">
            <br />
            <GioiThieuKhoaHoc/>
          </div>
          <div id="menu1" className="container tab-pane fade">
            <br />
            <NoiDungKhoaHoc MaKhoaHoc={props.match.params.makhoahoc}/>
          </div>
          <div id="menu2" className="container tab-pane fade">
            <br />
             <DanhGia falseTrue={falseTrue} funcIsRate={isRate1} MaKhoaHoc={props.match.params.makhoahoc}/>
          </div>
          <div id="menu3" className="container tab-pane fade">
            <br />
            <BaiTap MaKhoaHoc={props.match.params.makhoahoc}/>
          </div>
          <div id="menu4" className="container tab-pane fade">
            <br />
           <ThongBao MaKhoaHoc={props.match.params.makhoahoc}/>
          </div>
        </div>
      </section>
            <ScrollUpButton />
    </section>
  );
};
const mapDispatchToProps = dispatch => {
  return {
    onGetUser:(user) => dispatch(actFetchLoginUser(user)),
    onGetDetailCourse:(courseID) => dispatch(fetchCourseDetailFromDB(courseID))
  }
}
export default connect(null,mapDispatchToProps)(DetailCourseScreen);

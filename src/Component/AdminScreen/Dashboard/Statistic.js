import React,{useEffect,useState} from 'react';
import UserService from '../../../Services/User'
import CourseService from '../../../Services/Course'
const Statistic = () => {
  let [user,setUser] = useState(0) 
  let [course,setCourse] = useState(0)
  useEffect(()=>{
    UserService.fetchListUser().then(res=>{ 
      setUser(res.data.length)
    }).catch(err =>{
      console.log(err)
    })
    CourseService.fetchCourse().then(res=>{
      setCourse(res.data.length)
    }).catch(err=>{
      console.log(err)
    })
  },[])
    return (
        <div className="wrapper">
        <div className="param course">
          <div className="icon-course icon">
            <i className="fab fa-leanpub" />
          </div>
          {course} Khóa học
        </div>
        <div className="param user">
          <div className="icon icon-user">
            {" "}
            <i className="fas fa-users" />
          </div>
          {user} Học viên
        </div>
        <div className="param lecturers">
          <div className="icon icon-lecturers">
            {" "}
            <i className="fas fa-user-secret" />
          </div>
          5 giảng viên
        </div>
        <div className="param year">
          <div className="icon icon-year">
            {" "}
            <i className="fas fa-trophy" />
          </div>
          10 Năm kinh nghiệm
        </div>
      </div>
    );
};

export default Statistic;
import React, { useEffect, useState } from "react";
import CourseService from "../../../Services/Course";

const RecentCourses = () => {
  let [listCourse,setListCourse] = useState([])
  useEffect(()=>{
    CourseService.fetchCourse().then(res=>{ 
      setListCourse(res.data)
    }).catch(err=>{
      console.log(err)
    })
  },[])  
  const renderRecentCourse = (value) => { 
    return value.map((item, index) => {
      return (
        <tr key={index}>
          <td style={{textTransform:'uppercase'}}>{item.tenKhoaHoc}</td> 
        </tr>
      );
    });
  };
    return (
        <div className="recent-course recent">
                <h4  style={{color:'#19224d'}} className="text-center font-weight-bold mb-2">Danh sách khóa học</h4>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Tên khóa học</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderRecentCourse(listCourse)}
                  </tbody>
                </table>
              </div>
    );
};

export default RecentCourses;
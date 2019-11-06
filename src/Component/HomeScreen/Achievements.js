import React,{useEffect,useState} from 'react';
import UserService from '../../Services/User'
import CourseService from '../../Services/Course'
const Achievements = () => {
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
   <section className="stats py-5">
  <div className="container py-md-5">
    <h3 className="heading-agileinfo text-center">Những <span>thành tựu</span> vượt bậc</h3>
    <span className="w3-line black" />	
    <div className="row inner_w3l_agile_grids-1 pt-md-5 mt-4">
      <div className="col-lg-3 col-sm-6 w3layouts_stats_left w3_counter_grid">
        <i className="fas fa-trophy mb-2" />
        <p className="counter">10</p>
        <h3>Năm kinh nghiệm</h3>
      </div>
      <div className="col-lg-3 col-sm-6 w3layouts_stats_left w3_counter_grid1">
        <i className="fas fa-graduation-cap mb-2" />
        <p className="counter">{course}</p>
        <h3>Khóa học</h3>
      </div>
      <div className="col-lg-3 col-sm-6 w3layouts_stats_left w3_counter_grid2">
        <i className="fas fa-user mb-2" />
  <p className="counter">5</p>
        <h3>Giảng viên</h3>
      </div>
      <div className="col-lg-3 col-sm-6 w3layouts_stats_left w3_counter_grid2">
        <i className="fas fa-users mb-2" /> 
        <p className="counter">{user}</p>
        <h3>Học viên</h3>
      </div>
    </div>
  </div>	
</section>

    );
};

export default Achievements;
import React,{useEffect,useState} from 'react';
import CourseService from '../../../Services/Course'
import { Link } from 'react-router-dom'
const ItemCourse = ({category,MoveOut,match}) => {
    let [ lstCourseService , setLstCourseService ] = useState([])
    let [ lstCourse , setLstCourse ] = useState([]) 
    useEffect(()=>{
        CourseService.fetchCourse().then(res=>{
            setLstCourseService(res.data)
        })
        console.log(match)
    },[category])
    
    useEffect(()=>{
       if(lstCourseService.length !== 0){
        setLstCourse(lstCourseService.filter(item=>{
            return item.danhMucKhoaHoc.tenDanhMucKhoaHoc === category
        }))
       }
       console.log(match)
    },[lstCourseService])
    const renderListCourse = data => {
       return data.map((item,index)=>{
           return( 
             <Link to={`/detail-course-home/${item.maKhoaHoc}`} onClick={()=>{
                setTimeout(()=>{
                    if(match.path === "/detail-course-home/:id"){
                        window.location.reload()
                    } else window.scroll({top:0})
                },500)
             }}>
               <li key={index}>
                   {item.tenKhoaHoc}
               </li></Link> 
           )
       })
    }
    return (
        <div className="content-category"  >
            <ul>
              {renderListCourse(lstCourse)}
            </ul>
          </div>
    );
};

export default ItemCourse;
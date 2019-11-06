import React,{useState,useEffect} from 'react';
import CourseService from '../../Services/Course'
const ItemCourseProfile = ({item}) => {
    let [ detail , setDetail ] = useState({})
    useEffect(()=>{
        CourseService.fetchCourseDetail(item.maKhoaHoc).then(res=>{
            setDetail(res.data)
        })
    },[])
    return (
      <>
  <img src={detail.hinhAnh} />
        <div className="content ml-2 py-3">
            <h4 style={{textTransform:'uppercase'}}>
                {detail.tenKhoaHoc}
            </h4>
            <p style={{textTransform:'uppercase'}}>{detail.moTa}</p>
        </div>
      </>
    );
};

export default ItemCourseProfile;
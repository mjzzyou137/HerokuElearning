import React,{useEffect,useState} from "react";
import withUser from "../User";
import UserService from '../../../Services/User'
import CourseService from '../../../Services/Course'
import { Link } from 'react-router-dom'
const ListUser = ({information}) => { 
    let [ listUser , setListUser ] = useState([])
    let [ detail , setDetail ] = useState({})
    useEffect(()=>{
        let obj = {
            maKhoaHoc:information.match.params.makhoahoc
        }
        UserService.fetListUserCourse(obj).then(res=>{
            setListUser(res.data)
        }).catch(err=>{
            console.log(err)
        })
        CourseService.fetchCourseDetail(information.match.params.makhoahoc).then(res=>{
            setDetail(res.data)
        })
    },[])
  const style = {
    title: {
      color: "white",
      textAlign: "center"
    },
    listUser:{
        padding:'15px 0'
    }, 
  };
  const renderListUser = data => {
      return data.map((item,index)=>{
          return (
              <tr key={index}>
                  
                  <td >
             <Link className="text-white" to={`/profile/${item.taiKhoan}`}>{item.taiKhoan} </Link></td>
                  <td>
             <Link className="text-white" to={`/profile/${item.taiKhoan}`}>{item.hoTen} </Link></td>
                  <td>
             <Link className="text-white" to={`/profile/${item.taiKhoan}`}>{item.biDanh} </Link></td>
                 
              </tr> 
          )
      })
  }
  return (
    <div style={style.listUser}>
      <h1 style={style.title}>Khóa học <span style={{textTransform:'uppercase'}}>{detail.tenKhoaHoc}</span></h1>
      <h2 style={style.title}>Danh sách học viên</h2>
        <div className="container">
            <table className="table table-list-user mt-3" >
                <thead>
                    <tr>
                        <th  >Tài khoản</th>
                        <th >Họ tên</th>
                        <th>Bí danh</th>
                    </tr>
                </thead>
                <tbody>
                   {renderListUser(listUser)} 
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default withUser(ListUser);

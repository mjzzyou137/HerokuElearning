import React, { useState, useEffect } from "react";
import Axios from 'axios'
const BaiTap = ({ MaKhoaHoc }) => {
  let [arrExercise, setArrExercise] = useState([]);
  let [ file , setFile ] = useState() 
  useEffect(() => {
    if (localStorage.getItem("arrExercise")) {
      const localExercise = JSON.parse(localStorage.getItem("arrExercise"));
      let arr = localExercise.filter(item => {
        return item.maKhoaHoc === MaKhoaHoc;
      });
      setArrExercise(arr);
    }
  }, []);
  const renderListExercise = data => {
    return data.map((item, index) => {
      return (
        <div className="container-thong-bao-bai-tap" key={index}>
          <div
            className="d-flex justify-content-between item"
            data-toggle="collapse"
            data-target={`#${item.target}`}
          >
            <p>
              <i className="fas fa-briefcase" /> {item.tieuDe}
            </p>
            <p>(+)</p>
          </div>
          <div id={item.target} className="collapse ">
            <div>
              <p>Deadline : {item.deadline}</p>
              <p>Mô tả : {item.moTa}</p>
              <p>Link : {item.link}</p>
            </div> 
            
           </div>
        </div>
      );
    });
  }; 
  const onChange = e => { 
    setFile(e.target.files[0]) 
  }
  const SendExercise = data => {  
    var frm = {file:data,tenKhoaHoc:'ReactJS'}
    // frm.append('file',data);
    // frm.append('tenKhoaHoc','ReactJS')  
    // console.log(data)
    // console.log(frm)
      Axios({
        method:'POST',
        url: "http://elearning0706.cybersoft.edu.vn/api/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc",
        data:frm 
      }).then(res=> console.log("result",res)).catch(err=>{
        console.log(err)
      })
  }
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <h3>Bài tập</h3>
          {arrExercise.length !== 0 ? (
            renderListExercise(arrExercise)
          ) : (
            <h1 className="mt-3" style={{ color: "#19224D" }}>
              Chưa có bài tập
            </h1>
          )}
          {/*  */}
        </div>
      </div>  </>
  );
};

export default BaiTap;

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SweetAlert from 'sweetalert-react';
import {actTotalPointRate } from '../../Store/Actions/Course'
const DanhGia = ({ user,courseDetail,MaKhoaHoc,funcIsRate,falseTrue }) => {
  let [danhGia, setDanhGia] = useState("");
  let [soDiem, setSoDiem] = useState("");
  let [objDanhGia, setObjDanhGia] = useState({});
  let [arrDanhGia, setArrDanhGia] = useState([]);
  let [arrDanhGiaHienThi, setArrDanhGiaHienThi] = useState([]);
  let [ isRate , setIsRate ] = useState(false)
  let [ arrPoint , setArrPoint ] = useState([]) 
  let count = true
  useEffect(()=>{
    const localDanhGia = localStorage.getItem("arrDanhGia") 
    let totalPointRate = localStorage.getItem("totalPointRate")
    if(localDanhGia){
      let fake = []
      fake = JSON.parse(localDanhGia)
      let arr = fake.filter(item=>{
        return item.maKhoaHoc == MaKhoaHoc
      })
      setArrDanhGiaHienThi(arr)
      setArrDanhGia(fake)
    }
    if(totalPointRate){
      setArrPoint(JSON.parse(totalPointRate))
    } 
  },[])
  useEffect(() => {
    let obj = {
      maKhoaHoc: courseDetail.maKhoaHoc,
      hoten: user.user.hoTen,
      email: user.user.email,
      danhGia: danhGia,
      soDiem: soDiem
    };
    setObjDanhGia(obj);
  }, [danhGia, soDiem]);
  const renderDanhGia = obj => {
    // Tinh điểm tổng
    let ArrPoint = arrPoint
    let objPoint = {
      maKhoaHoc:MaKhoaHoc,
      totalPointRate: obj.soDiem*1
    }
    ArrPoint.push(objPoint)
    setArrPoint(ArrPoint)
    localStorage.setItem("totalPointRate",JSON.stringify(ArrPoint))
    

    // Hiện thị mảng
    let arr = arrDanhGia
    let arrHienThi = arrDanhGiaHienThi
    arr.unshift(obj)
    arrHienThi.unshift(obj) 
    setArrDanhGia(arr) 
    setArrDanhGiaHienThi(arrHienThi)
    localStorage.setItem("arrDanhGia",JSON.stringify(arrDanhGia))
    
    count = !count
    console.log(count) 
    funcIsRate(!falseTrue)
    setIsRate(true) 
  }; 
  // useEffect(()=>{
  //   // tongPhanTramDanhGia =  ((tongDiemDanhGia/arrDanhGiaHienThi.length)*100)/5;
  //   let obj = {
  //     maKhoaHoc:MaKhoaHoc,
  //     totalPointRate:Math.ceil(tongPhanTramDanhGia)
  //   }

  //   // localStorage.setItem("totalPointRate",JSON.stringify(obj))
    

  // },[tongDiemDanhGia,arrDanhGiaHienThi])
  const renderArrDanhGia = data => {
      return data.map((item, index) => {
        return (
          <div className="thong-tin-danh-gia" key={index}>
            <span className="username">{item.hoten}</span>  
            <i className="fas fa-star" /> {item.soDiem}
            <p className="email">{item.email}</p>
            <p className="nhan-xet">{item.danhGia}</p>
          </div>
        );
      }); 
  };
  return (
    <>
  <SweetAlert 
        show={isRate}
        title="CÁM ƠN BẠN ĐÃ ĐÁNH GIÁ KHÓA HỌC"
        text=""
        onConfirm={() => {
          setIsRate(false) 
        }}
      />

<div className="row">
      <div className="col-md-12">
        <h3>ĐÁNH GIÁ</h3>
        <div className="row danh-gia">
          <div className="col-md-5">
            <form>
              <div className="form-group">
                <label htmlFor>Họ và tên</label>
                <input
                  type="text"
                  className="form-control"
                  value={user.user.hoTen}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor>Email của bạn</label>
                <input
                  type="email"
                  className="form-control"
                  value={user.user.email}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor>Nhận xét</label>
                <textarea
                  className="form-control"
                  onChange={event => setDanhGia(event.target.value)}
                  rows={6}
                  defaultValue={""}
                />
              </div>
              <div className="form-group">
                <label>Điểm đánh giá</label>
                <select
                  className="form-control bg-white"
                  onChange={event => setSoDiem(event.target.value)}
                >
                  <option className="bg-white" value="-1">
                    Chọn số điểm
                  </option>
                  <option className="bg-white" value="1">
                    1
                  </option>
                  <option className="bg-white" value="2">
                    2
                  </option>
                  <option className="bg-white" value="3">
                    3
                  </option>
                  <option className="bg-white" value="4">
                    4
                  </option>
                  <option className="bg-white" value="5">
                    5
                  </option>
                </select>
              </div>
              <button
                className="btn"
                type="button"
                onClick={() => renderDanhGia(objDanhGia)}
              >
                ĐÁNH GIÁ
              </button>
            </form>
          </div>
          <div className="col-md-7">{arrDanhGiaHienThi.length === 0 ? <h4 className='d-flex h-100 align-items-center justify-content-center' style={{color:'#19224d'}}>Chưa có đánh giá</h4>: renderArrDanhGia(arrDanhGiaHienThi)}</div>
        </div>
      </div>
    </div>
    </>
  );
};
const mapStateToProps = state => {
  return {
    user: state.user,
    courseDetail:state.course.courseDetail
  };
};
export default connect(mapStateToProps)(DanhGia);

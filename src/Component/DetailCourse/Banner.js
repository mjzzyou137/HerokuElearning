import React,{useEffect,useState} from 'react';
import { connect } from "react-redux";
const Banner = ({MaKhoaHoc,courseDetail,statusRate}) => { 
  let [ totalPointRate , setTotalPointRate ] = useState()
  let [ arrTotalPointRate , setArrTotalPointRate ] = useState([])
  useEffect(()=>{ 
    const totalPointRate = localStorage.getItem("totalPointRate")
    if(totalPointRate){
      let fake = JSON.parse(totalPointRate)
      let arr = fake.filter(item=>{
        return item.maKhoaHoc === MaKhoaHoc
      }) 
      setArrTotalPointRate(arr)
    }
  },[statusRate])
  useEffect(()=>{ 
    let total = 0;
    let tongPhamTramDanhGia = 0;
    arrTotalPointRate.map(item=>{  
      total += item.totalPointRate
    })
    tongPhamTramDanhGia = ((total/arrTotalPointRate.length)*100)/5
    setTotalPointRate(Math.ceil(tongPhamTramDanhGia))
  },[arrTotalPointRate])
    return (
        <section className="banner">
        <div className="text-khoa-hoc">
          <h3 style={{textTransform:'uppercase'}}>{courseDetail.tenKhoaHoc}</h3>
          <div className="d-flex justify-content-center">
            <p className="mb-0">Đánh giá khóa học: </p>
            <div>
              <i className={totalPointRate ? 'fas fa-star':'d-none'}/>
              {totalPointRate ? `${totalPointRate}%`:'Chưa đánh giá'}
            </div>
          </div>
          <button className="btn start" onClick={()=> {
            window.scroll({
              top: 1500, 
              behavior: 'smooth'
            });
          }}>BẮT ĐẦU NGAY</button>
        </div>
      </section>
    );
}; 
const mapStateToProps = state => {
  return {
    courseDetail:state.course.courseDetail
  }
}
export default connect(mapStateToProps)(Banner);
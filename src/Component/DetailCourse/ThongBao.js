import React, { useState, useEffect } from "react";

const ThongBao = ({ MaKhoaHoc }) => {
  let [arrNotification, setArrNotification] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("arrNotification")) {
      const localNotification = JSON.parse(
        localStorage.getItem("arrNotification")
      );
      let arr = localNotification.filter(item => {
        return item.maKhoaHoc === MaKhoaHoc;
      });
      setArrNotification(arr);
    }
  }, []); 
  const renderNotification = data => {
    return data.map((item, index) => {
      return ( 
          <div className="d-flex justify-content-between">
<p
            key={index}> 
            <i className="fas fa-angle-double-right mr-2" />
            {item.notificationContent}
          </p>
          <p className="float-right">{item.date}</p> 
          </div>
      );
    });
  };
  return (
    <div className="row">
      <div className="col-md-12">
        <h3>Thông báo</h3>
        {arrNotification.length !== 0
            ? <div className="container-thong-bao-bai-tap">{renderNotification(arrNotification)}</div>
            : <h1 className="mt-3" style={{color:"#19224D"}}>Chưa có thông báo</h1>}
        
           
        
      </div>
    </div>
  );
};

export default ThongBao;

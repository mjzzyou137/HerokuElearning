import React, { useEffect, useState } from "react";
import withUser from "./User";
const Award = ({ information }) => {
  let [arrAward, setArrAward] = useState([]);
  useEffect(() => {
    const LocalStorage = localStorage.getItem("arrHuyHieu");
    if (LocalStorage) {
      setArrAward(
        JSON.parse(LocalStorage).filter(
          item => item.taiKhoan === information.match.params.id
        )
      );
    }
  });
  const renderListAward = data => {
    return data.map((item, index) => {
      return (
        <ul className="container-huy-hieu">
        <li key={index}>
          <img style={{ width: "50px", height: "50px" }} src={item.hinhAnh} />
          <span
            style={{
              color: "#19224d",
              marginLeft: "10px",
              fontWeight: "bold",
              fontSize: "20px"
            }}
          >
            {item.moTa}
          </span>
        </li>
        </ul>
      );
    });
  };
  return (
    <div>
      <h2 className="text-white ml-5">Các huy hiệu hiện có : </h2>
     {arrAward.length !== 0 ? renderListAward(arrAward):<span className="ml-5 text-white" style={{fontSize:'35px',marginTop:'40px'}}>Chưa có huy hiệu</span>} 
    </div>
  );
};

export default withUser(Award);

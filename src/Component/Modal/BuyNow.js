import React, { useEffect, useState } from "react";
import "../../Screens/CartScreen.scss";
import SweetAlert from "sweetalert-react";
import CourseService from "../../Services/Course";
const BuyNow = ({ detailCourse }) => {
  let [total, setTotal] = useState(undefined);
  let [phi, setPhi] = useState(false);
  let [isCheckOut, setIsCheckOut] = useState(false);
  let [isPhi, setIsPhi] = useState(false);
  let [detail, setDetail] = useState({});
  const CheckOut = () => {
    if (phi) {
      let obj = {
        maKhoaHoc: detail.maKhoaHoc,
        taiKhoan: JSON.parse(localStorage.getItem("loginUser")).taiKhoan
      };
      CourseService.registerCourse(obj).then(res => {
        setIsCheckOut(true);
      });
      const listCart = localStorage.getItem("listCart")
      if(listCart){
          let index = JSON.parse(listCart).findIndex(item=>{
              return (item.maKhoaHoc === detail.maKhoaHoc && item.taiKhoan === JSON.parse(localStorage.getItem("loginUser")).taiKhoan)
          })
          if(index !== -1){
              let arr = JSON.parse(listCart)
              arr.splice(index,1)
              localStorage.removeItem("listCart")
              localStorage.setItem("listCart",JSON.stringify(arr))
          }
      }
    } else setIsPhi(true);
  };
  useEffect(() => {
    setDetail(detailCourse);
  }, [detailCourse]);
  useEffect(() => {
    console.log(detail);
  }, [detail]);
  return (
    <div>
      <SweetAlert
        show={isPhi}
        title="Vui lòng chọn hình thức thanh toán"
        text=""
        onConfirm={() => {
          setIsPhi(false);
        }}
      />
      <SweetAlert
        show={isCheckOut}
        title="Thanh toán thành công"
        text="Vui lòng chờ xét duyệt"
        onConfirm={() => {
          setIsCheckOut(false);
          window.location.reload();
        }}
      />
      <div
        className="modal fade"
        id="modelId"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content"> 
            <div className="modal-body buyNow">
              <table class="table">
                <thead
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "20px",
                    background: "#19224d"
                  }}
                >
                  <tr>
                    <th>Khóa học</th>
                    <th className="text-right">Giá</th>
                  </tr>
                </thead>
                <tbody
                  style={{
                    color: "#19224d",
                    fontWeight: "bold",
                    fontSize: "20px"
                  }}
                >
                  <tr>
                    <td>
                      <div className="d-flex">
                        <img
                          style={{ width: "160px", height: "90px" }}
                          src={detail.hinhAnh}
                        />
                        <div>
                          <p style={{ textTransform: " uppercase " }}>
                            {" "}
                            {detail.tenKhoaHoc}{" "}
                          </p>
                          <p style={{ textTransform: "capitalize" }}>
                            {" "}
                            {detail.moTa}{" "}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <h2>${detail.luotXem}.99</h2>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="right1">
                <p className=" mb-2">Hình thức thành toán : </p>
                <select
                  className="w-100 pl-2 py-1"
                  onChange={e => {
                    if (e.target.value === "2") {
                      setTotal(detail.luotXem * 1 + (0.99 + 1));
                      setPhi(!phi);
                    } else {
                      setTotal(detail.luotXem * 1 + 0.99);
                      setPhi(!phi);
                    }
                  }}
                >
                  <option value="1">Vui lòng chọn hình thức thanh toán</option>
                  <option value="2">Thanh toán khi nhận hàng</option>
                </select>
                <p className={phi ? "mt-1" : "d-none"}>Phí giao hàng : $1</p>
                Tổng tiền :{" "}
                <span className="total">
                  $
                  {total === undefined ? `${detail.luotXem * 1 + 0.99}` : total}
                </span>
                <button className="btn mt-2" onClick={() => CheckOut()}>
                  THANH TOÁN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;

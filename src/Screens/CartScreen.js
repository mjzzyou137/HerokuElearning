import React, { useEffect, useState } from "react";
import Header from "../Component/HomeScreen/Header";
import Footer from "../Component/HomeScreen/Footer";
import "./CartScreen.scss";
import SweetAlert from "sweetalert-react";
import CourseService from "../Services/Course";
const CartScreen = ({ history,match }) => {
  let [listCart, setListCart] = useState([]);
  let [totalPrice, setTotalPrice] = useState();
  let [totalPrice1, setTotalPrice1] = useState();
  let [totalPriceMethod, setTotalPriceMethod] = useState();
  let [method, setMethod] = useState("1");
  let [isMethod, setIsMethod] = useState(false);
  let [isCheckOut, setIsCheckOut] = useState(false);
  let [listCartUpdate, setListCartUpdate] = useState([]);
  useEffect(() => {
    localStorage.getItem("listCartShopping") &&
      setListCart(JSON.parse(localStorage.getItem("listCartShopping")));
  }, []);
  useEffect(() => {
    setTotalPrice(
      listCart.reduce((total, item) => total + item.luotXem * 1, 0)
    );
    setTotalPrice1(
      listCart.reduce((total, item) => total + (item.luotXem * 1), 0)
    );
  }, [listCart]);
  useEffect(() => {
    setTotalPriceMethod(totalPrice);
  }, [totalPrice]);
  const XoaItemGioHang = data => {
    const listCartLocal = localStorage.getItem("listCart")
    let index = JSON.parse(listCartLocal).findIndex(item=>{
      return (item.maKhoaHoc === data && item.taiKhoan === JSON.parse(localStorage.getItem("loginUser")).taiKhoan)
  })
  if(index !== -1){
      let arr = JSON.parse(listCartLocal)
      arr.splice(index,1) 
      localStorage.setItem("listCart",JSON.stringify(arr))
      if(method === '2'){
        window.location.reload()
      }
  }  
      setListCart(listCart.filter(item=>item.maKhoaHoc !== data))  
  }; 
  useEffect(()=>{ 
    console.log(listCart)
    localStorage.removeItem("listCartShopping")
    localStorage.setItem("listCartShopping",JSON.stringify(listCart))
  },[listCart])
  const renderListCartShopping = data => {
    return data !== undefined && data.map((item, index) => {
      return (
        <tr key={index}>
          <td>
            <div className="d-flex">
              <img
                style={{ width: "160px", height: "90px" }}
                src={item.hinhAnh}
              />
              <div>
                <p style={{ textTransform: "capitalize  " }}>
                  {" "}
                  {item.tenKhoaHoc}{" "}
                </p>
                <p style={{ textTransform: "uppercase" }}> {item.moTa} </p>
              </div>
            </div>
          </td>
          <td>
            <h2>${item.luotXem}.99</h2>
            <p
              className="remove"
              onClick={() => XoaItemGioHang(item.maKhoaHoc)}
            >
              Xóa khỏi giỏ hàng
            </p>
          </td>
        </tr>
      );
    });
  };
  const CheckOut = () => {
    if (method === "2") {
      //  Check 2 mảng để loại bỏ những cái đã thanh toán ra
      let ListCartAll = localStorage.getItem("listCart");
      let arr = [];
      JSON.parse(ListCartAll).map(item1 => {
        let index = listCart.findIndex(item2 => {
          return item2.target === item1.target;
        });

        // Giống thì loại bỏ đi ( đang mún )
        // Khác nhau thì push vô
        index === -1 && arr.push(item1);
      });
      
      localStorage.removeItem("listCartShopping");
      localStorage.setItem("listCart", JSON.stringify(arr));
      listCart.map(item => {
        let obj = {
          maKhoaHoc: item.maKhoaHoc,
          taiKhoan: item.taiKhoan
        };
        CourseService.registerCourse(obj).then(res => {
          setIsCheckOut(true);
        });
      }); 
    } else setIsMethod(true);
  }; 
  return (
    <div className="cart-screen">
      <SweetAlert
        show={isMethod}
        title="Vui lòng chọn hình thức thanh toán"
        text=""
        onConfirm={() => {
          setIsMethod(false);
        }}
      />
      <SweetAlert
        show={isCheckOut}
        title="Thanh toán thành công"
        text="Vui lòng chờ xét duyệt"
        onConfirm={() => {
          setListCart([])
          setIsCheckOut(false);
          history.replace("/");
          window.scroll({ top: 0 });
        }}
      />
      <Header lstCart={listCart} match={match} />
      <h3 className="title">Shopping Cart</h3>
      <div className="container">
        <div className="container-cart mb-5">
          <div className="left">
            <table class="table">
              <thead>
                <tr>
                  <th>Khóa học</th>
                  <th className="text-right">Giá</th>
                </tr>
              </thead>
              <tbody>{renderListCartShopping(listCart)}</tbody>
            </table>
          </div>
          <div className="right">
            <h4>Thông tin đơn hàng</h4>
            <div className="d-flex justify-content-between mt-2 mb-1 align-items-center">
              <p>Số lượng : {listCart.length}</p>
              <span className="total">${totalPrice * 1 + (0.99 * listCart.length)}</span>
            </div>
            <p className="mt-4 mb-2">Hình thức thành toán : </p>
            <select
              className="w-100 pl-2 py-1"
              onChange={e => {
                if (totalPriceMethod === totalPrice) {
                  setTotalPriceMethod(
                    totalPrice + (1 + 0.99 * listCart.length)
                  );
                } else if (totalPriceMethod !== totalPrice) {
                  setTotalPriceMethod(totalPrice);
                }
                setMethod(e.target.value);
              }}
            >
              <option value="1">Vui lòng chọn hình thức thanh toán</option>
              <option value="2">Thanh toán khi nhận hàng</option>
            </select>
            <hr />
            {method !== "1" && <p>Phí giao hàng : $1</p>}
            Tổng tiền :{" "}
            <span className="total">
              $
              {method === "1"
                ? `${totalPrice * 1 + (0.99 * listCart.length)}`
                : totalPriceMethod}
            </span>
            <button className="btn mt-2" onClick={() => CheckOut()}>
              THANH TOÁN
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartScreen;

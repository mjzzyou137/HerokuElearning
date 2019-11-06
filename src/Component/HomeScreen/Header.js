import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actFetchLoginUser } from "../../Store/Actions/User";
import ItemHeader from "./Header/ItemHeader";
import SweetAlert from "sweetalert-react";
import UserService from "../../Services/User";
import { restConnector } from "../../Connectors/Axios";
import "../../Screens/animate.css";
import WOW from "wowjs";

const Header = ({ onGetUser, listCourse, lstCart, match }) => {
  let [lstDanhMuc, setLstDanhMuc] = useState([]);
  let [listCart, setListCart] = useState(lstCart);
  let [isClick, setIsClick] = useState(false);
  let [isCart, setIsCart] = useState(false);
  let [totalPrice, setTotalPrice] = useState();
  let [arrMessage, setArrMessage] = useState([]);
  let [arrFriend, setArrFriend] = useState([]);
  let [isMessage, setIsMessage] = useState(false);
  let [isFriend, setIsFriend] = useState(false);
  useEffect(() => {
    localStorage.getItem("loginUser") &&
      onGetUser(JSON.parse(localStorage.getItem("loginUser")));
    localStorage.getItem("danhMucKhoaHoc") &&
      setLstDanhMuc(JSON.parse(localStorage.getItem("danhMucKhoaHoc")));

    // cart
    let loginUser = localStorage.getItem("loginUser");
    let ListCart = localStorage.getItem("listCart");
    if (ListCart && loginUser) {
      setListCart(
        JSON.parse(ListCart).filter(
          item => item.taiKhoan === JSON.parse(loginUser).taiKhoan
        )
      );
    }
    // Cấp quyền admin để lấy danh sách khóa học đã xét duyệt
    let obj = {
      taiKhoan: "NguyenTheMan",
      matKhau: "123123123"
    };
    UserService.Login(obj)
      .then(res => {
        restConnector.defaults.headers[
          "Authorization"
        ] = `Bearer ${res.data.accessToken}`;
        onGetUser(JSON.parse(localStorage.getItem("loginUser")));
      })
      .catch(err => {
        console.log(err);
      }); 
    new WOW.WOW().init();
  }, []);
  useEffect(() => {
    lstCart && setListCart(lstCart);
  }, [lstCart]);
  const LogOut = () => {
    onGetUser({});
    localStorage.removeItem("loginUser");
    setIsClick(true);
  };
  const renderAdmin = () => {
    if (
      JSON.parse(localStorage.getItem("loginUser")).maLoaiNguoiDung === "GV"
    ) {
      return (
        <Link
          to="/admin"
          className="dropdown-item"
          style={{ cursor: "pointer" }}
        >
          Quản trị hệ thống
        </Link>
      );
    }
  };
  const renderUserHeader = () => {
    if (localStorage.getItem("loginUser")) {
      return (
        <>
          <a
            className="nav-link dropdown-toggle d-flex align-items-center"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <div className="headerUser">
              <div className="avatarUser">
                <img
                  src="https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-male-3-512.png"
                  alt="img"
                />
              </div>
              <span id="username-header" className="username">
                {JSON.parse(localStorage.getItem("loginUser")).hoTen}
              </span>
            </div>
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link
              to={`/profile/${
                JSON.parse(localStorage.getItem("loginUser")).taiKhoan
              }`}
              className="dropdown-item"
              onClick={()=>window.scroll({top:0})}
              style={{ cursor: "pointer" }}
            >
              Thông tin cá nhân
            </Link>
            <Link
              to={`/user/${
                JSON.parse(localStorage.getItem("loginUser")).taiKhoan
              }`}
              className="dropdown-item"
              onClick={()=>window.scroll({top:0})}
              style={{ cursor: "pointer" }}
            >
              Khóa học của tôi
            </Link>
            {renderAdmin()}
            <div className="dropdown-divider" />
            <Link
              to="/"
              className="dropdown-item"
              style={{ cursor: "pointer" }}
              onClick={() => {
                LogOut();
              }}
            >
              Đăng xuất
            </Link>
          </div>
        </>
      );
    }
    return (
      <>
        <li className="nav-item">
          <Link to="/signup" className="nav-link" id="dang-ky">
            Đăng ký
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/signin" className="nav-link" id="dang-nhap">
            Đăng nhập
          </Link>
        </li>
      </>
    );
  };

  const renderListCategory = data => {
    return data.map((item, index) => {
      return (
        <ItemHeader match={match} isCart={isCart} key={index} item={item} />
      );
    });
  };
  const renderListCart = data => {
    return data.map((item, index) => {
      return (
        <li key={index}>
          <div className="img-1">
            <img src={item.hinhAnh} />
          </div>
          <div className="content">
            <p>{item.tenKhoaHoc}</p>
            <h5>${item.luotXem}.99</h5>
          </div>
        </li>
      );
    });
  };
  useEffect(() => {
    listCart !== undefined && listCart.length !== 0 && setTotalPrice(
      listCart.reduce((total, item) => total + (item.luotXem * 1 + 0.99), 0)
    );
  }, [listCart]);
  useEffect(() => {
    let message = localStorage.getItem("arrMessage");
    let friend = localStorage.getItem("arrFriend");
    let user = localStorage.getItem("loginUser");
    if (message && user) {
      setArrMessage(
        JSON.parse(message).filter(
          item => item.taiKhoanNguoiNhan === JSON.parse(user).taiKhoan
        )
      );
    }
    if (friend && user) {
      let arr = JSON.parse(friend).filter(
        item => item.taiKhoanNguoiNhan === JSON.parse(user).taiKhoan
      );
      setArrFriend(
        JSON.parse(friend).filter(
          item => item.taiKhoanNguoiNhan === JSON.parse(user).taiKhoan
        )
      );
    }
  }, []);
  const renderListMessage = data => {
    return data.map((item, index) => {
      return (
        <>
          <li key={index} className={index % 2 && "bg-secondary text-white"}>
            <img src="https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-male-3-512.png" />
            <div className="content px-2 w-100">
              <div className="d-flex justify-content-between w-100">
                <p className="font-weight-bold">{item.nguoiGui}</p>
                <span style={{ fontSize: "12px" }}>({item.date})</span>
              </div>
              <div className="d-flex justify-content-between align-items-center"> 
              <p className="noidung">{item.noiDung}</p>
              {index % 2 ? <span onClick={()=>XoaTinNhan(item)}  style={{ fontSize: "12px",marginTop:'-10px',color:'white',fontWeight:'bold' }}>Xóa</span>:<span  onClick={()=>XoaTinNhan(item)} style={{ fontSize: "12px",marginTop:'-10px',color:'#EC5252',fontWeight:'bold' }}>Xóa</span>}
              </div>
            </div>
          </li>
        </>
      );
    });
  };
  const XoaTinNhan = data => {
    let arr = JSON.parse(localStorage.getItem("arrMessage"))
    let index = arr.findIndex(item=>{
      return (item.taiKhoanNguoiNhan === JSON.parse(localStorage.getItem("loginUser")).taiKhoan) && (item.taiKhoanNguoiGui === data.taiKhoanNguoiGui)
    })
    arr.splice(index,1)
    setArrMessage(arr)
    localStorage.setItem("arrMessage",JSON.stringify(arr))
  }
  const AcceptFriend = data => {
    // PUSH LEN LOCAL
    let listFriendAll = localStorage.getItem("ListFriendAll");
    let loginUser = localStorage.getItem("loginUser");
    if (listFriendAll) {
      let listFriendUser = JSON.parse(listFriendAll);
      for (let item of listFriendUser) {
        if (item.taiKhoan === JSON.parse(loginUser).taiKhoan) {
          let obj = {
            taiKhoan: data.taiKhoanNguoiGui,
            hoTen: data.nguoiGui
          };
          item.listFriend.push(obj);
        }
        if (item.taiKhoan === data.taiKhoanNguoiGui) {
          let obj = {
            taiKhoan: JSON.parse(localStorage.getItem("loginUser")).taiKhoan,
            hoTen: JSON.parse(localStorage.getItem("loginUser")).hoTen
          };
          item.listFriend.push(obj);
        }
      }
      let index = listFriendUser.findIndex(item => {
        return item.taiKhoan === JSON.parse(loginUser).taiKhoan;
      });
      if (index === -1) {
        let obj = {
          taiKhoan: JSON.parse(loginUser).taiKhoan,
          hoTen: JSON.parse(loginUser).hoTen,
          listFriend: [
            { taiKhoan: data.taiKhoanNguoiGui, hoTen: data.nguoiGui }
          ]
        };
        listFriendUser.push(obj);
      }
      let index2 = listFriendUser.findIndex(item => {
        return item.taiKhoan === data.taiKhoanNguoiGui;
      });
      if (index2 === -1) {
        let obj = {
          taiKhoan: data.taiKhoanNguoiGui,
          hoTen: data.nguoiGui,
          listFriend: [
            {
              taiKhoan: JSON.parse(loginUser).taiKhoan,
              hoTen: JSON.parse(loginUser).hoTen
            }
          ]
        };
        listFriendUser.push(obj);
      }
      localStorage.setItem("ListFriendAll", JSON.stringify(listFriendUser));
    } else {
      let nguoiDongY = {
        taiKhoan: JSON.parse(localStorage.getItem("loginUser")).taiKhoan,
        hoTen: JSON.parse(localStorage.getItem("loginUser")).hoTen,
        listFriend: [{ taiKhoan: data.taiKhoanNguoiGui, hoTen: data.nguoiGui }]
      };
      let nguoiDuocDongY = {
        taiKhoan: data.taiKhoanNguoiGui,
        hoTen: data.nguoiGui,
        listFriend: [
          {
            taiKhoan: JSON.parse(localStorage.getItem("loginUser")).taiKhoan,
            hoTen: JSON.parse(localStorage.getItem("loginUser")).hoTen
          }
        ]
      };
      let arr = [];
      arr.push(nguoiDongY);
      arr.push(nguoiDuocDongY);
      localStorage.setItem("ListFriendAll", JSON.stringify(arr));
    }

    // Khi chấp nhận kết bạn thì local bị xóa đi
    let arrFriend2 = JSON.parse(localStorage.getItem("arrFriend"));
    let indexRemove = arrFriend.findIndex(item=>{
      return  (item.taiKhoanNguoiNhan === JSON.parse(localStorage.getItem("loginUser")).taiKhoan) && ( item.taiKhoanNguoiGui === data.taiKhoanNguoiGui)
    })
    arrFriend2.splice(indexRemove,1)
    setArrFriend(arrFriend2)
    localStorage.setItem("arrFriend",JSON.stringify(arrFriend2))
  };
  const renderListFriend = data => {
    return data.map((item, index) => {
      return (
        <>
          <li key={index} className=" my-2">
            <img src="https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-male-3-512.png" />
            <div className="content px-2 w-100">
              <div className="d-flex justify-content-between w-100">
                <p className="font-weight-bold">{item.nguoiGui}</p>
                <span style={{ fontSize: "12px" }}>({item.date})</span>
              </div>
              <div
                className="btn-group d-flex w-50"
                role="group"
                aria-label="Basic example"
              >
                <button
                  type="button"
                  className="btn text-white"
                  style={{ background: "#19224d" }}
                  onClick={() => AcceptFriend(item)}
                >
                  Chấp nhận
                </button>
                <button type="button" className="btn btn-secondary">
                  Xóa
                </button>
              </div>
            </div>
          </li>
        </>
      );
    });
  };
  const XoaTatCa = data => {
    let arr = []
    let arrMessLocal = JSON.parse(localStorage.getItem("arrMessage"))
    arrMessLocal.map(item1=>{
      let index = data.findIndex(item2=>{
        return (item2.taiKhoanNguoiGui+item2.taiKhoanNguoiNhan) === (item1.taiKhoanNguoiGui+item1.taiKhoanNguoiNhan)
      })
      index === -1 && arr.push(item1)
    })
    setArrMessage([])
    localStorage.setItem("arrMessage",JSON.stringify(arr))
  }
  return (
    <>
      <SweetAlert
        show={isClick}
        title="ĐĂNG XUẤT THÀNH CÔNG"
        text=""
        onConfirm={() => {
          window.location.reload();
          setIsClick(false);
        }}
      />
      <header id="navbar">
        <nav className="navbar navbar-expand-lg navbar-light bg-gradient-secondary pt-3">
          <h1>
            <Link
              id="logo"
              to="/"
              className="navbar-brand"
              onClick={() => {
                window.scroll({
                  top: 0,
                  behavior: "smooth"
                });
              }}
            >
              Passion
            </Link>
          </h1>
          <button
            className="navbar-toggler ml-md-auto"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto d-flex align-items-center">
              <li
                className="nav-item active"
                style={{ borderBottom: "1px soild #555555" }}
              >
                <Link
                  id="index"
                  to="/"
                  className="nav-link"
                  onClick={() => {
                    if (!listCourse) {
                      window.scroll({
                        top: 0,
                        behavior: "smooth"
                      });
                    }
                  }}
                >
                  Trang chủ
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item  my-lg-0 my-3">
                <button className="btn  " disabled={listCourse}>
                  <Link
                    id="list-course"
                    to="/list-course/all"
                    className="nav-link"
                    onClick={() => {
                      if (!listCourse) {
                        window.scroll({
                          top: 640,
                          behavior: "smooth"
                        });
                      }
                    }}
                  >
                    Danh sách khóa học
                  </Link>
                </button>
              </li>
              <li
                className={arrFriend.length !== 0 ? "friend" : "d-none"}
                onClick={() => setIsFriend(!isFriend)}
              >
                <i
                  className="far fa-user wow swing infinite"
                  style={{ fontSize: "25px" }}
                />
                <div className="circle ">{arrFriend.length}</div>
                <div>
                  <div className={isFriend ? " arrow-cart" : "d-none"}></div>
                  <div className={isFriend ? "information-cart" : "d-none"}>
                    <div className="footer-information-cart">
                      <h5
                        style={{
                          borderBottom: "1px solid gray",
                          paddingBottom: "5px"
                        }}
                      >
                        Yêu cầu kết bạn
                      </h5>
                      <ul>{renderListFriend(arrFriend)}</ul>
                    </div>
                  </div>
                </div>
              </li>
              <li className={arrMessage.length !== 0 ? "message" : "d-none"}
                  onClick={() => setIsMessage(!isMessage)}>
                <i
                  className=" far fa-bell wow swing infinite"
                  style={{ fontSize: "25px" }}
                />
                <div className="circle ">{arrMessage.length}</div>
                <div>
                  <div className={isMessage ? " arrow-cart" : "d-none"}></div>
                  <div className={isMessage ? "information-cart" : "d-none"}>
                    <div className="footer-information-cart">
                      <div className="d-flex justify-content-between align-items-center" 
                        style={{
                          borderBottom: "1px solid gray",
                          paddingBottom: "5px",
                          textAlign:'left'
                        }}>
                      <h5
                      >
                        Tin nhắn
                      </h5>
                      <span style={{color:'#EC5252'}} onClick={()=>XoaTatCa(arrMessage)} >Xóa tất cả</span>
                      </div>

                      <ul>{renderListMessage(arrMessage)}</ul>
                    </div>
                  </div>
                </div>
              </li>
              <li
                className="nav-item mr-3 my-lg-0 my-3 cart"
                onClick={() => {
                  if (localStorage.getItem("loginUser")) {
                    if (listCart !== undefined && listCart.length !== 0) {
                      setIsCart(!isCart);
                    }
                  }
                }}
              >
                <i className="fas fa-shopping-cart"></i>
                <div className={listCart !== undefined && listCart.length !== 0 ?  "circle ":"d-none"}>
                  {listCart !== undefined && listCart.length !== 0 ? listCart.length : ""}
                </div>
                <div>
                  <div className={isCart ? "arrow-cart" : "d-none"}></div>
                  <div className={isCart ? "information-cart" : "d-none"}>
                    <ul>{listCart !== undefined && listCart.length !== 0 && renderListCart(listCart)}</ul>
                    <div className="footer-information-cart">
                    
                      {localStorage.getItem("loginUser") && (
                        <Link
                          to={`/shopping-cart/${
                            JSON.parse(localStorage.getItem("loginUser"))
                              .taiKhoan
                          }`}
                          onClick={() => {
                            localStorage.setItem(
                              "listCartShopping",
                              JSON.stringify(listCart)
                            );
                          }}
                        >
                          <button className="btn" onClick={()=>window.scroll({top:0,behavior:'smooth'})}>ĐI ĐẾN GIỎ HÀNG</button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-item dropdown d-flex">{renderUserHeader()}</li>
            </ul>
          </div>
        </nav>
        <ul
          id="scroll-header"
          className="scroll-header"
          style={
            !isCart ? { justifyContent: "center" } : { justifyContent: "unset" }
          }
        >
          {renderListCategory(lstDanhMuc)}
        </ul>
      </header>
    </>
  );
};
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onGetUser: user => dispatch(actFetchLoginUser(user))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

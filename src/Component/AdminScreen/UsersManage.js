import React, { useState, useEffect } from "react";
import withAdmin from "./Admin";
import UserService from "../../Services/User";
import CourseService from "../../Services/Course";
import SweetAlert from "sweetalert-react";
import kiniem2nam from "../../assets/Huy hiệu/ki-niem-2-nam.png";
import doatgiaitruong from "../../assets/Huy hiệu/doat-giai-truong.png";
import thanhviencuathang from "../../assets/Huy hiệu/thanh-vien-cua-thang.png";
import thanhviendoatdiemcao from "../../assets/Huy hiệu/thanh-vien-dat-diem-cao.png";
import thanhviensoinoi from "../../assets/Huy hiệu/thanh-vien-soi-noi.png";
import thanhvientichcuc from "../../assets/Huy hiệu/thanh-vien-tich-cuc.png";
import thanhvienvip from "../../assets/Huy hiệu/user-vip.png";
import {VerticleButton as ScrollUpButton} from "react-scroll-up-button";

const huyHieu = [
  {
    id:1,
    hinhAnh: kiniem2nam,
    moTa: "Kỉ niệm 2 năm thành lập"
  },
  {
    id:2,
    hinhAnh: doatgiaitruong,
    moTa: "Đoạt giải cao"
  },
  {
    id:3,
    hinhAnh: thanhviencuathang,
    moTa: "Học viên của tháng"
  },
  {
    id:4,
    hinhAnh: thanhviendoatdiemcao,
    moTa: "Học viên có điểm số cao"
  },
  {
    id:5,
    hinhAnh: thanhviensoinoi,
    moTa: "Học viên sôi nổi"
  },
  {
    id:6,
    hinhAnh: thanhvientichcuc,
    moTa: "Học viên tích cực"
  },
  {
    id:7,
    hinhAnh: thanhvienvip,
    moTa: "Học viên VIP"
  }
];
const UsersManage = () => {
  let [lstUser, setLstUser] = useState([]);
  let [lstUserSearchFake, setLstUserSearchFake] = useState([]);
  let [taiKhoan, settaiKhoan] = useState("");
  let [matKhau, setmatKhau] = useState("");
  let [hoTen, sethoTen] = useState("");
  let [soDT, setsoDT] = useState("");
  let [maLoaiNguoiDung, setmaLoaiNguoiDung] = useState("");
  let [maNhom, setmaNhom] = useState("");
  let [email, setemail] = useState("");
  let [deleteOK, setDeleteOK] = useState(false);
  let [deleteERR, setDeleteERR] = useState(false);
  let [editOK, setEditOK] = useState(false);
  let [detailCourseSubscribe, setDetailCourseSubscribe] = useState([]);
  let [taiKhoanClickDuocGhiDanh, setTaiKhoanClickDuocGhiDanh] = useState("");
  let [isHuyGhiDanh, setIsHuyGhiDanh] = useState(false);
  let [isAddUser, setIsAddUser] = useState(false);
  let [lstKhoaHocChoXet, setLstKhoaHocChoXet] = useState([]);
  let [ghiDanhThanhCong, setGhiDanhThanhCong] = useState(false);
  let [taiKhoanChonHuyHieu, setTaiKhoanChonHuyHieu] = useState("");
  let [arrHuyHieu, setArrHuyHieu] = useState([]);
  let [arrHuyHieuTwo, setArrHuyHieuTwo] = useState([]);
  let [ isHuyHieuOk , setIsHuyHieuOk ] = useState(false)
  let [ isHuyHieuRemove , setIsHuyHieuRemove ] = useState(false) 
  useEffect(() => {
    UserService.fetchListUser()
      .then(res => {
        setLstUser(res.data);
        setLstUserSearchFake(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    let LocalArrHuyHieu = localStorage.getItem("arrHuyHieu");
    if (LocalArrHuyHieu) {
      setArrHuyHieuTwo(
        JSON.parse(LocalArrHuyHieu).filter(
          item => item.taiKhoan === taiKhoanChonHuyHieu
        )
      );
      setArrHuyHieu(JSON.parse(LocalArrHuyHieu))
    }
  }, [taiKhoanChonHuyHieu]);
  const DeleteUser = data => {
    UserService.deleteUser(data)
      .then(res => {
        setDeleteOK(true);
      })
      .catch(err => {
        setDeleteERR(true);
      });
  };
  const EditUser = (taiKhoan, matKhau) => {
    const obj = {
      taiKhoan: taiKhoan,
      matKhau: matKhau
    };
    UserService.fetchInformationUser(obj)
      .then(res => {
        settaiKhoan(res.data.taiKhoan);
        setmatKhau(res.data.matKhau);
        sethoTen(res.data.hoTen);
        setsoDT(res.data.soDT);
        setmaLoaiNguoiDung(res.data.maLoaiNguoiDung);
        setmaNhom(res.data.maNhom);
        setemail(res.data.email);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const fetchDetail = (taiKhoan, matKhau) => {
    const obj = {
      taiKhoan: taiKhoan,
      matKhau: matKhau
    };
    setTaiKhoanClickDuocGhiDanh(taiKhoan);
    CourseService.fetListCourseUserSubscribe(obj)
      .then(res => {
        setDetailCourseSubscribe(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const WaitingSubscribe = data => {
    let obj = {
      taiKhoan: data
    };
    CourseService.fetchListCourseNotApproval(obj)
      .then(res => {
        setLstKhoaHocChoXet(res.data);
        setTaiKhoanClickDuocGhiDanh(data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const renderLstUser = data => {
    return data.map((item, index) => {
      return (
        <tr key={index}>
          <td width="10%">{item.taiKhoan}</td>
          <td>{item.hoTen}</td>
          <td>{item.email}</td>
          <td>{item.soDt}</td>
          <td>
            <button
              className="btnSettingCourse huyHieu  w-100 mb-1"
              data-toggle="modal"
              data-target="#huyhieu"
              onClick={() => setTaiKhoanChonHuyHieu(item.taiKhoan)}
            >
              HUY HIỆU
            </button>
            <button
              className="btnSettingCourse choXetDuyet w-100 mb-1"
              data-toggle="modal"
              data-target="#choXetDuyet"
              onClick={() => WaitingSubscribe(item.taiKhoan)}
            >
              KH CHỜ XÉT DUYỆT
            </button>
            <button
              className="btnSettingCourse daGhiDanh w-100 mb-1"
              data-toggle="modal"
              data-target="#daGhiDanh"
              onClick={() => fetchDetail(item.taiKhoan, item.matKhau)}
            >
              KH ĐÃ GHI DANH
            </button>
            <button
              className="btnSettingCourse chinhSua w-100 mb-1"
              data-toggle="modal"
              data-target="#editUser"
              onClick={() => EditUser(item.taiKhoan, item.matKhau)}
            >
              CHỈNH SỬA
            </button>
            <button
              className="btnSettingCourse xoa w-100"
              onClick={() => DeleteUser(item.taiKhoan)}
            >
              XÓA
            </button>
          </td>
        </tr>
      );
    });
  };
  const _saveUser = () => {
    let obj = {
      taiKhoan: taiKhoan,
      matKhau: matKhau,
      hoTen: hoTen,
      soDT: soDT,
      maLoaiNguoiDung: maLoaiNguoiDung,
      maNhom: maNhom,
      email: email
    };
    UserService.updateInformationUser(obj)
      .then(res => {
        setEditOK(true);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const renderDeltaiCourseSubscribe = data => {
    return data.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.maKhoaHoc}</td>
          <td>{item.tenKhoaHoc}</td>
          <td>
            <button
              className="btn btn-outline-info"
              onClick={() => UnsubscribeCourse(item.maKhoaHoc)}
            >
              HỦY GHI DANH
            </button>
          </td>
        </tr>
      );
    });
  };
  const UnsubscribeCourse = data => {
    let obj = {
      taiKhoan: taiKhoanClickDuocGhiDanh,
      maKhoaHoc: data
    };
    CourseService.unsubscribeCourse(obj)
      .then(res => {
        setIsHuyGhiDanh(true);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const _addUser = () => {
    settaiKhoan("");
    setmatKhau("");
    sethoTen("");
    setsoDT("");
    setmaLoaiNguoiDung("");
    setmaNhom("");
    setemail("");
  };
  const btnAddUser = () => {
    let obj = {
      taiKhoan: taiKhoan,
      matKhau: matKhau,
      hoTen: hoTen,
      soDT: soDT,
      maLoaiNguoiDung: maLoaiNguoiDung,
      maNhom: maNhom,
      email: email
    };
    UserService.addUser(obj)
      .then(res => {
        setIsAddUser(true);
      })
      .catch(err => {});
  };
  const searchUser = e => {
    UserService.searchUser(e.target.value)
      .then(res => {
        if (res.data.length !== 0) {
          return setLstUser(res.data);
        }

        return setLstUser(lstUserSearchFake);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const subscribe = data => {
    let obj = {
      maKhoaHoc: data,
      taiKhoan: taiKhoanClickDuocGhiDanh
    };
    CourseService.subscribeCourse(obj)
      .then(res => {
        setGhiDanhThanhCong(true);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const HuyGhiDanh = data => {
    let obj = {
      maKhoaHoc: data,
      taiKhoan: taiKhoanClickDuocGhiDanh
    };
    CourseService.subscribeCourse(obj)
    .then(res => { 
    })
    .catch(err => {
      console.log(err);
    });
    setTimeout(()=>{
      CourseService.unsubscribeCourse(obj)
    .then(res => { 
      setIsHuyGhiDanh(true)
    })
    .catch(err => {
      console.log(err);
    });
    },400)
  }
  const renderLstCourseNotApproval = data => {
    return data.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.maKhoaHoc}</td>
          <td>{item.tenKhoaHoc}</td>
          <td>
            <button
              className="btn w-100 btn-outline-info" 
              onClick={() => subscribe(item.maKhoaHoc)}
            >
              GHI DANH
            </button>
            <button
              className="btn btn-outline-danger w-100" 
              onClick={() => HuyGhiDanh(item.maKhoaHoc)}
            >
              HỦY
            </button>
          </td>
        </tr>
      );
    });
  };
  const AddHuyHieu = data => { 
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    let obj = {
      target:text,
      id: data.id,
      taiKhoan: taiKhoanChonHuyHieu,
      hinhAnh: data.hinhAnh,
      moTa: data.moTa
    };
    let arr = arrHuyHieu;
    let index = arr.findIndex(item=>{
     return item.id === obj.id && item.taiKhoan === obj.taiKhoan
    })
    if(index === -1) {
      arr.push(obj);
      setArrHuyHieuTwo([...arrHuyHieuTwo,obj]);
      setIsHuyHieuOk(true)
    }  
    setArrHuyHieu(arr);
    
    localStorage.setItem("arrHuyHieu", JSON.stringify(arrHuyHieu));
  };
  const renderListHuyHieu = data => {
    let arr = []
  data.map(item=>{
    let index = arrHuyHieuTwo.findIndex(item1=>{
      return item1.id === item.id
    })
    index === -1 && arr.push(item)
  })
    return arr.map((item, index) => {
      return (
        <tr key={index} className="border border-top">
          <td>
            <img style={{ width: "70px", height: "70px" }} src={item.hinhAnh} />
          </td>
          <td style={{color:'#19224d',fontWeight:'bold'}}>{item.moTa}</td>
          <td>
            <button className="btn" style={{background:"#19224d",color:'white'}} onClick={() => AddHuyHieu(item)}>
              THÊM
            </button>
          </td>
        </tr>
      );
    });
  };
  const RemoveAward = data => { 
    setArrHuyHieuTwo(arrHuyHieuTwo.filter(item=>item.target!== data.target ))
    setArrHuyHieu(arrHuyHieu.filter(item=>item.target!== data.target ))
    setIsHuyHieuRemove(true)
  }
  useEffect(()=>{
    localStorage.setItem("arrHuyHieu", JSON.stringify(arrHuyHieu));
  },[arrHuyHieu])
  const renderHuyHieuDangCo = data => {
    return data.map((item, index) => {
      return (
        <div className="divHuyHieu" key={index} onClick={()=>RemoveAward(item)}>
          <img className="huyHieu" src={item.hinhAnh} />
        </div>
      );
    });
  };
  return (
    <>
      <div className="header">
        <h5></h5>
        <div className="search-admin">
          <div className="search-admin-user">
            <i className="fa fa-search icon-search" aria-hidden="true" />
            <input
              type="text"
              placeholder="Tìm kiếm"
              onKeyUp={event => searchUser(event)}
            />
          </div>
          <div className="headerUser">
            <div className="avatarUser">
              <img
                src="https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-male-3-512.png"
                alt="img"
              />
            </div>
            <span className="username">
              {JSON.parse(localStorage.getItem("loginUser")).hoTen}
            </span>
          </div>
        </div>
      </div>

      {/* Huy hiệu */}
      <SweetAlert
        show={isHuyHieuOk}
        title="Thêm huy hiệu cho người dùng thành công"
        text=""
        onConfirm={() => {
          setIsHuyHieuOk(false); 
        }}
      />


<SweetAlert
        show={isHuyHieuRemove}
        title="Đã xóa huy hiệu thành công"
        text=""
        onConfirm={() => {
          setIsHuyHieuRemove(false); 
        }}
      />

 

      {/* End huy hiệu */}
      <SweetAlert
        show={ghiDanhThanhCong}
        title="GHI DANH THÀNH CÔNG"
        text="ĐÃ GHI DANH KHÓA HỌC"
        onConfirm={() => {
          setGhiDanhThanhCong(false);
          window.location.reload();
        }}
      />
      <SweetAlert
        show={editOK}
        title="SỬA THÔNG TIN THÀNH CÔNG"
        text="HỌC VIÊN ĐÃ ĐƯỢC SỬA THÔNG TIN"
        onConfirm={() => {
          setEditOK(false);
          window.location.reload();
        }}
      />
      <SweetAlert
        show={isAddUser}
        title="THÊM THÀNH CÔNG"
        text="NGƯỜI DÙNG ĐÃ ĐƯỢC THÊM"
        onConfirm={() => {
          setIsAddUser(false);
          window.location.reload();
        }}
      />
      <SweetAlert
        show={isHuyGhiDanh}
        title="HỦY THÀNH CÔNG"
        text="ĐÃ HỦY GHI DANH HỌC VIÊN"
        onConfirm={() => {
          setIsHuyGhiDanh(false);
          window.location.reload();
        }}
      />
      <div
        className="modal fade"
        id="huyhieu"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content" style={{background:'#19224d'}}>
            <div className="modal-body"style={{background:'white',margin:'10px'}} >
              <h4
                className="text-center mt-3 "
                style={{ color: "#19224d", fontWeight: "bold" }}
              >
                Huy hiệu hiện có
              </h4>
              <div className="d-flex justify-content-center m-2 huy-hieu-hien-co mb-3">
                {renderHuyHieuDangCo(arrHuyHieuTwo)}
              </div>

              <table class="table">
                <thead>
                  <tr>
                    <th style={{color:'#19224d',fontWeight:'bold'}}>Huy hiệu</th>
                    <th style={{color:'#19224d',fontWeight:'bold'}}>Mô tả</th>
                    <th style={{color:'#19224d',fontWeight:'bold'}}>Chức năng</th>
                  </tr>
                </thead>
                <tbody>{renderListHuyHieu(huyHieu)}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="daGhiDanh"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Danh sách khóa học đang theo học</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <table class="table">
                <thead>
                  <tr>
                    <th>Mã khóa học</th>
                    <th>Tên khóa học</th>
                    <th>Chức năng</th>
                  </tr>
                </thead>
                <tbody>
                  {renderDeltaiCourseSubscribe(detailCourseSubscribe)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="choXetDuyet"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Danh sách khóa học đang chờ xét duyệt
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <table class="table">
                <thead>
                  <tr>
                    <th>Mã khóa học</th>
                    <th>Tên khóa học</th>
                    <th>Chức năng</th>
                  </tr>
                </thead>
                <tbody>{renderLstCourseNotApproval(lstKhoaHocChoXet)}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="addUser"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" style={{ fontSize: "32px" }}>
                THÊM HỌC VIÊN
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Tài khoản:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="taiKhoan"
                    value={taiKhoan}
                    onChange={e => settaiKhoan(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Mật khẩu:</label>
                  <input
                    type="password"
                    className="form-control"
                    name="matKhau"
                    value={matKhau}
                    onChange={e => setmatKhau(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Họ tên:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="hoTen"
                    value={hoTen}
                    onChange={e => sethoTen(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Số điện thoại:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="soDt"
                    value={soDT}
                    onChange={e => setsoDT(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Mã loại người dùng:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="maLoaiNguonameung"
                    value={maLoaiNguoiDung}
                    onChange={e => setmaLoaiNguoiDung(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Mã nhóm:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="maNhom"
                    value={maNhom}
                    onChange={e => setmaNhom(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={e => setemail(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                THOÁT
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={btnAddUser}
              >
                THÊM
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="editUser"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">CHỈNH SỬA HỌC VIÊN</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label>Tài khoản:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="taiKhoan"
                    value={taiKhoan}
                    disabled
                    onChange={e => settaiKhoan(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Mật khẩu:</label>
                  <input
                    type="password"
                    className="form-control"
                    name="matKhau"
                    value={matKhau}
                    onChange={e => setmatKhau(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Họ tên:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="hoTen"
                    value={hoTen}
                    onChange={e => sethoTen(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Số điện thoại:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="soDt"
                    value={soDT}
                    onChange={e => setsoDT(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Mã loại người dùng:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="maLoaiNguonameung"
                    value={maLoaiNguoiDung}
                    onChange={e => setmaLoaiNguoiDung(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Mã nhóm:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="maNhom"
                    value={maNhom}
                    onChange={e => setmaNhom(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={e => setemail(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                THOÁT
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={_saveUser}
              >
                LƯU
              </button>
            </div>
          </div>
        </div>
      </div>

      <SweetAlert
        show={deleteOK}
        title="XÓA THÀNH CÔNG"
        text="HỌC VIÊN ĐÃ BỊ XÓA"
        onConfirm={() => {
          setDeleteOK(false);
          window.location.reload();
        }}
      />
      <SweetAlert
        show={deleteERR}
        title="XÓA THẤT BẠI"
        text="NGƯỜI DÙNG ĐÃ GHI DANH KHÔNG THỂ XÓA"
        onConfirm={() => setDeleteERR(false)}
      />

      <div style={{width:'95%',margin:'0 auto'}}>
        <div className="align-items-center d-flex justify-content-between mb-3 w-100">
          <h3 className=" text-white font-weight-bold">DANH SÁCH HỌC VIÊN</h3>
          <button
            className="btn"
            style={{
              background: "white",
              color: "black"
            }}
            data-toggle="modal"
            data-target="#addUser"
            onClick={_addUser}
          >
            {" "}
            <i class="fas fa-plus"></i> THÊM HỌC VIÊN
          </button>
        </div>
        <table class="table" style={{ color: "white",width:'100%' }}>
          <thead>
            <tr>
              <th>Tài khoản</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>{renderLstUser(lstUser)}</tbody>
        </table>
      </div>    
              <ScrollUpButton />

    </>
  );
};

export default withAdmin(UsersManage);

import React,{useEffect,useState} from 'react';
import withUser from './User.jsx'
import UserService from '../../Services/User'
import SweetAlert from "sweetalert-react";

const ChangeInformation = (props) => {
    let [taiKhoan, settaiKhoan] = useState("");
  let [matKhau, setmatKhau] = useState("");
  let [hoTen, sethoTen] = useState("");
  let [soDT, setsoDT] = useState("");
  let [maLoaiNguoiDung, setmaLoaiNguoiDung] = useState('');
  let [maNhom, setmaNhom] = useState('');
  let [email, setemail] = useState("");
  let [dataUser,setDataUser] = useState({})
  let [ isOk , setIsOk ] = useState(false)
  useEffect(()=>{
    UserService.searchUser(props.information.match.params.id).then(res=>{ 
      res.data.map(item=>{
        setDataUser(item)
      }) 
      
    }).catch(err=>{
      console.log(err)
    })
  },[])
  useEffect(()=>{    
      settaiKhoan(dataUser.taiKhoan);
        setmatKhau(dataUser.matKhau);
        sethoTen(dataUser.hoTen);
        setsoDT(dataUser.soDt);
        setemail(dataUser.email);
        setmaLoaiNguoiDung(props.user.user.maLoaiNguoiDung)
        setmaNhom(props.user.user.maNhom)
  },[dataUser])
  const editUser = () => {
    let obj = {
      taiKhoan: taiKhoan,
      matKhau: matKhau,
      hoTen: hoTen,
      soDT: soDT,
      maLoaiNguoiDung: maLoaiNguoiDung,
      maNhom: maNhom,
      email: email
    };
    UserService.updateInformationUser(obj).then(res=>{ 
      let loginUser = localStorage.getItem("loginUser")
      if(loginUser){
        var user = JSON.parse(loginUser)
      }
      user.hoTen = hoTen;
      localStorage.removeItem("loginUser") 
      localStorage.setItem("loginUser",JSON.stringify(user))
      setIsOk(true)
    }).catch(err=>{
      console.log(err)
    })
  }
    return (
        <section className="w-100 mt-5">
          <SweetAlert
        show={isOk}
        title="SỬA THÔNG TIN THÀNH CÔNG" 
        onConfirm={() => {
          setIsOk(false);   
          window.location.reload()
        }}
      />
            <h3 className="mb-4" style={{color:'white',textAlign:'center',fontWeight:'bold'}}>THAY ĐỔI THÔNG TIN CÁ NHÂN</h3>
             <div className="w-50 mx-auto text-white">
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
                  <label>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={e => setemail(e.target.value)}
                  />
                </div>
                <button  type="button" className="btn btn-danger w-100" onClick={editUser}>CHẤP NHẬN</button>
              </form>
        </div> 
        </section>
    );
};

export default withUser(ChangeInformation);
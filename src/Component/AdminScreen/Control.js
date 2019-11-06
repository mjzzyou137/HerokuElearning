import React,{useEffect} from 'react';
import { Link,Redirect } from "react-router-dom"; 
import { connect } from 'react-redux'
import { actFetchLoginUser } from '../../Store/Actions/User';
import { restConnector } from '../../Connectors/Axios';

const Control = (props) => {
  useEffect(()=> {  
    const loginUser = localStorage.getItem("loginUser");
    console.log(loginUser)
    if(loginUser) {
      props.dispatch(actFetchLoginUser(JSON.parse(loginUser)));
      restConnector.defaults.headers["Authorization"] = `Bearer ${JSON.parse(loginUser).accessToken}`;
    }
  })
  return (
    <div className="admin-left">
      <Link to="/">
      <div className="logo text-center">
        <div className="blue">
          <p>Pass</p>
        </div>
        <span className="ion" style={{marginLeft:0}}>ion</span>
        <span className="academy">&nbsp;Academy</span>
      </div>
      </Link>
      <ul className="navbar-nav mt-5">
        <li className="nav-item">
          <Link to='/admin' className="nav-link dashboard" style={{padding:'10px 0'}}>
            <i style={{ width: 50 }} className="fas fa-desktop text-primary" />{" "}
            Bảng điều khiển
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/courses-manage" className="nav-link course" style={{padding:'10px 0'}}>
            <i style={{ width: 50, paddingLeft: 1 }} className="fas fa-table" />{" "}
            Quản lý khóa học
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/users-manage" className="nav-link user" style={{padding:'10px 0'}} >
            <i style={{ width: 50 }} className="fas fa-users text-yellow" />{" "}
            Quản lý người dùng
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/map" className="nav-link map">
            <i
              style={{ width: 50, paddingLeft: 3,padding:8 }}
              className="fas fa-map-marker-alt"
            />{" "}
            Bản đồ
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default connect()(Control);

import React from "react";
import Control from "./Control";
import { connect } from "react-redux"; 
import UserService from '../../Services/User'
import { restConnector } from "../../Connectors/Axios";
import { actFetchLoginUser } from "../../Store/Actions/User";
const withUser = Component => {
  class User extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        user: this.props.user
      }
      console.log(this.props)
    }
    componentDidMount(){ 
      let obj = {
        taiKhoan: 'NguyenTheMan',
        matKhau: '123123123'
      }
      UserService.Login(obj).then(res=>{  
      restConnector.defaults.headers["Authorization"] = `Bearer ${res.data.accessToken}`  
      this.props.onGetUser(JSON.parse(localStorage.getItem("loginUser")))
      }).catch(err=>{
        console.log(err)
      })
  
    }
    render() {
      return (
        <div className="profile-index">
          <div className="row ml-0 mr-0">
            <Control {...this.state.user}></Control>
            <div className="col-md-9 profile-col-md-9">
              <Component user={this.state.user} information={this.props} ></Component>
            </div>
          </div>
        </div>
      );
    }
  }
  const mapStateToProps = state => {
    return {
      user:state.user
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      onGetUser: (user) => dispatch(actFetchLoginUser(user))
    }
  }
  return connect(mapStateToProps,mapDispatchToProps)(User);
};

export default withUser;

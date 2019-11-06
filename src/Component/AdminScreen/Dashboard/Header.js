import React from 'react';

const Header = () => {
    return (
        <div className="header">
        <h5>BẢNG ĐIỀU KHIỂN</h5>
        <div className="search-admin">
          <div className="search-admin-user">
            <i className="fa fa-search icon-search" aria-hidden="true" />
            <input type="text" placeholder="Tìm kiếm" />
          </div>
          <div className="headerUser">
            <div className="avatarUser">
              <img
                src="https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-male-3-512.png"
                alt="img"
              />
            </div>
            <span className="username">{JSON.parse(localStorage.getItem("loginUser")).hoTen}</span>
          </div>
        </div>
      </div>
    );
};

export default Header;
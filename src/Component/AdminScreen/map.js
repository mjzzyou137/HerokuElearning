import React from "react";
import withAdmin from "./Admin"; 
const map = () => {
  return (
    <div>
         <div className="header">
        <h5>BẢNG ĐIỀU KHIỂN</h5>
        <div className="search-admin">
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
     <div class="container">
     <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1589.512386223155!2d106.66799299525603!3d10.773399436141318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752edc6e67e773%3A0x7a9e70f57ee7f9d1!2zNDU5IFPGsCBW4bqhbiBI4bqhbmgsIFBoxrDhu51uZyAxMiwgUXXhuq1uIDEwLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1567754940748!5m2!1svi!2s"
        width={'100%'}
        height={650}
        frameBorder={0}
        style={{ border: 0 }}
        allowFullScreen
      />
     </div>
    </div>
  );
};

export default withAdmin(map);

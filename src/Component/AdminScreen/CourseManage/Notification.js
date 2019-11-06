import React, { useEffect, useState,useRef } from "react";
import withAdminSettingCourse from "../AdminSettingCourse";
import SweetAlert from "sweetalert-react";
const Notification = ({ match }) => {
  let [content, setContent] = useState("");
  let [arrContent, setArrContent] = useState([]);
  let [arrContentTwo, setArrContentTwo] = useState([]);
  let [thongBaoEdit, setThongBaoEdit] = useState({});
  let [ isSua , setIsSua ] = useState(false)
  let [ isXoa , setIsXoa ] = useState(false)
  let [ isThem , setIsThem ] = useState(false)
  const inputEl = useRef(null);
  const inputEl2 = useRef(null);
  useEffect(() => {
    if (localStorage.getItem("arrNotification")) {
      const localNotification = JSON.parse(
        localStorage.getItem("arrNotification")
      );
      let arr = localNotification.filter(item => {
        return item.maKhoaHoc === match.params.id;
      });
      setArrContentTwo(arr);
      setArrContent(localNotification);
    }
  }, []);
  const AcceptNotification = content => {
    var timeObj = new Date();
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    let obj = {
      target: text,
      maKhoaHoc: match.params.id,
      date: `${timeObj.getDate()}/${timeObj.getMonth() +
        1}/${timeObj.getFullYear()} (${timeObj.getHours()}:${timeObj.getMinutes()})`,
      notificationContent: content
    };
    setArrContentTwo([...arrContentTwo, obj]);
    setArrContent([...arrContent, obj]);
    setIsThem(true)
     
  };
  useEffect(() => {
    localStorage.setItem("arrNotification", JSON.stringify(arrContent));
    localStorage.setItem("arrNotificationTwo", JSON.stringify(arrContent));
  }, [arrContent]);
  const renderContent = arr => {
    console.log(arr);
    return arr.map((item, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.notificationContent}</td>
          <td>{item.date}</td>
          <td>
            <button
              className="btn btn-outline-light mr-2"
              data-toggle="modal"
              data-target="#modelEdit"
              onClick={() => setThongBaoEdit(item)}
            >
              CHỈNH SỬA
            </button>
            <button className="btn btn-outline-info" onClick={()=> RemoveNotification(item)}>XÓA</button>
          </td>
        </tr>
      );
    });
  };
  const RemoveNotification = data => {
    setArrContentTwo(arrContentTwo.filter(item=>item.target !== data.target))
    setArrContent(arrContent.filter(item=>item.target !== data.target))
    setIsXoa(true)
  }
  const EditNotification = data => {
    setArrContentTwo(
      arrContentTwo.map(item =>
        item.target === data.target ? { ...data } : item
      )
    );
    setArrContent(
      arrContent.map(item =>
        item.target === data.target ? { ...data } : item
      )
    )
    setIsSua(true)
  };
  return (
    <>
    <SweetAlert 
        show={isSua}
        title="SỬA THÔNG BÁO THÀNH CÔNG"
        text=""
        onConfirm={() => {
            setIsSua(false) 
            inputEl.current.click();
        }}
      />
      <SweetAlert 
        show={isThem}
        title="THÊM THÀNH CÔNG" 
        text=""
        onConfirm={() => {
            setIsThem(false) 
            inputEl2.current.click();
        }}
      />
       <SweetAlert 
        show={isXoa}
        title="XÓA THÔNG BÁO THÀNH CÔNG"
        text=""
        onConfirm={() => {
            setIsXoa(false) 
        }}
      />
      <div className="header">
        <h5> </h5>
        <div className="search-admin">
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
      <div className="container pb-5">
        <div className="row mb-2">
          <div className="col-md-12 d-flex justify-content-between text-white align-items-center">
            <h3>Danh sách thông báo</h3>
            <button
              data-toggle="modal"
              data-target="#modelId"
              className="btn text-white"
              style={{ background: "#52BEAE" }}
            >
              THÊM THÔNG BÁO
            </button>
          </div>
        </div>
        <table className="table text-white">
          <thead>
            <tr>
              <th style={{ width: "10%" }}>STT</th>
              <th style={{ width: "50%" }}>Nội dung</th>
              <th style={{ width: "10%" }}>Ngày</th>
              <th style={{ width: "30%" }}>Chức năng</th>
            </tr>
          </thead>
          <tbody>{renderContent(arrContentTwo)}</tbody>
        </table>
      </div>

      <div>
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
              <div className="modal-header">
                <h5 className="modal-title">Thêm thông báo</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close" 
                  ref={inputEl2}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div class="form-group">
                  <label>Nội dung thông báo</label>
                  <textarea
                    class="form-control"
                    name="content"
                    rows="3"
                    onChange={event => setContent(event.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn"
                  style={{ background: "#52BEAE", color: "white" }}
                  onClick={() => AcceptNotification(content)}
                >
                  Chấp nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT */}
      <div>
        <div
          className="modal fade"
          id="modelEdit"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Cập nhật thông báo</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  ref={inputEl}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div class="form-group">
                  <label>Nội dung thông báo</label>
                  <textarea
                    class="form-control"
                    name="content"
                    rows="3"
                    value={thongBaoEdit.notificationContent}
                    onChange={event =>
                      setThongBaoEdit({
                        ...thongBaoEdit,
                        notificationContent: event.target.value
                      })
                    }
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn"
                  style={{ background: "#52BEAE", color: "white" }}
                  onClick={() => EditNotification(thongBaoEdit)}
                >
                  Chấp nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withAdminSettingCourse(Notification);

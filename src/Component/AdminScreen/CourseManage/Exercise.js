import React, { useState, useEffect, useRef } from "react";
import withAdminSettingCourse from "../AdminSettingCourse";
import SweetAlert from "sweetalert-react";

const Exercise = ({ match }) => {
  let [tieuDe, setTieuDe] = useState("");
  let [moTa, setMoTa] = useState("");
  let [deadline, setDeadline] = useState("");
  let [link, setLink] = useState("");
  let [arrContent, setArrContent] = useState([]);
  let [arrContentTwo, setArrContentTwo] = useState([]);
  let [exerciseEdit, setExerciseEdit] = useState({});
  let [isSua, setIsSua] = useState(false);
  let [isXoa, setIsXoa] = useState(false);
  let [isThem, setIsThem] = useState(false);
  const inputEl5 = useRef(null);
  const inputEl6 = useRef(null);
  useEffect(() => {
    if (localStorage.getItem("arrExercise")) {
      const localNotification = JSON.parse(localStorage.getItem("arrExercise"));
      let arr = localNotification.filter(item => {
        return item.maKhoaHoc === match.params.id;
      });
      setArrContentTwo(arr);
      setArrContent(localNotification);
    }
  }, []);
  const AcceptExercise = () => {
    var timeObj = new Date();
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; 
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
 
    let obj = {
      target:text,
      maKhoaHoc: match.params.id,
      tieuDe: tieuDe,
      moTa: moTa,
      deadline: deadline,
      link: link,
      date: `${timeObj.getDate()}/${timeObj.getMonth() +
        1}/${timeObj.getFullYear()} (${timeObj.getHours()}:${timeObj.getMinutes()})`
    };
    setArrContentTwo([...arrContentTwo, obj]);
    setArrContent([...arrContent, obj]);
    setIsThem(true);
  };
  useEffect(() => {
    localStorage.setItem("arrExercise", JSON.stringify(arrContent));
    localStorage.setItem("arrExerciseTwo", JSON.stringify(arrContent));
  }, [arrContent]);
  const renderContent = arr => {
    return arr.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.tieuDe}</td>
          <td>{item.moTa}</td>
          <td>{item.link}</td>
          <td>{item.deadline}</td>
          <td>
            <button className="btn btn-outline-light mr-2 w-100 mb-2" 
              onClick={() => setExerciseEdit(item)}
              data-toggle="modal"
              data-target="#modelEdit">
              CHỈNH SỬA
            </button>
            <button className="btn btn-outline-info w-100" 
              onClick={() => RemoveExercise(item)}>XÓA</button>
          </td>
        </tr>
      );
    });
  };
  const RemoveExercise = data => {
    setArrContentTwo(arrContentTwo.filter(item => item.target !== data.target));
    setArrContent(arrContent.filter(item => item.target !== data.target));
    setIsXoa(true);
  };
  const EditExercise = data => {
    setArrContentTwo(
      arrContentTwo.map(item =>
        item.target === data.target ? { ...data } : item
      )
    );
    setArrContent(
      arrContent.map(item => (item.target === data.target ? { ...data } : item))
    );
    setIsSua(true);
  };
  return (
    <>
     <SweetAlert
        show={isSua}
        title="SỬA BÀI TẬP THÀNH CÔNG"
        text=""
        onConfirm={() => {
          setIsSua(false);
          inputEl6.current.click();
        }}
      />
      <SweetAlert
        show={isThem}
        title="THÊM THÀNH CÔNG"
        text=""
        onConfirm={() => {
          setIsThem(false);
          inputEl5.current.click();
        }}
      />
      <SweetAlert
        show={isXoa}
        title="XÓA BÀI TẬP THÀNH CÔNG"
        text=""
        onConfirm={() => {
          setIsXoa(false);
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
            <h3>Danh sách bài tập</h3>
            <button
              data-toggle="modal"
              data-target="#modelId"
              className="btn text-white"
              style={{ background: "linear-gradient(to right,#4970b3,#379470)" }}
            >
              THÊM BÀI TẬP
            </button>
          </div>
        </div>
        <table className="table text-white">
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Tiêu đề</th>
              <th style={{ width: "30%" }}>Mô tả</th>
              <th style={{ width: "20%" }}>Link</th>
              <th style={{ width: "10%" }}>Deadline</th>
              <th style={{ width: "20%" }}>Chức năng</th>
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
                <h5 className="modal-title">Thêm bài tập</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  ref={inputEl5}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Tiêu đề:</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={event => setTieuDe(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Mô tả:</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={event => setMoTa(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Link:</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={event => setLink(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Deadline:</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={event => setDeadline(event.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn"
                  style={{ background: "#52BEAE", color: "white" }}
                  onClick={() => AcceptExercise()}
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
                <h5 className="modal-title">Cập nhật bài tập</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  
                  ref={inputEl6}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Tiêu đề:</label>
                    <input
                      type="text"
                      className="form-control" value={exerciseEdit.tieuDe}
                      onChange={event => setExerciseEdit({
                        ...exerciseEdit,
                        tieuDe:event.target.value
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Mô tả:</label>
                    <input
                      type="text"
                      className="form-control" value={exerciseEdit.moTa}
                      onChange={event => setExerciseEdit({
                        ...exerciseEdit,
                        mota:event.target.value
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Link:</label>
                    <input
                      type="text"
                      className="form-control" value={exerciseEdit.link}
                      onChange={event => setExerciseEdit({
                        ...exerciseEdit,
                        link:event.target.value
                      })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Deadline:</label>
                    <input
                      type="text"
                      className="form-control" value={exerciseEdit.deadline}
                      onChange={event => setExerciseEdit({
                        ...exerciseEdit,
                        deadline:event.target.value
                      })}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn"
                  style={{ background: "#52BEAE", color: "white" }}
                  onClick={() => EditExercise(exerciseEdit)}
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

export default withAdminSettingCourse(Exercise);

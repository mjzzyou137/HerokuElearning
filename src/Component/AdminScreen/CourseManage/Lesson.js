import React, { useState, useEffect, useRef } from "react";
import withAdminSettingCourse from "../AdminSettingCourse";
import SweetAlert from "sweetalert-react";

const Lesson = ({ match }) => {
  let [name, setName] = useState("");
  let [link, setLink] = useState("");
  let [arrLesson, setArrLesson] = useState([]);
  let [arrLessonTwo, setArrLessonTwo] = useState([]);
  let [lessonEdit, setLessonEdit] = useState({});
  let [isSua, setIsSua] = useState(false);
  let [isXoa, setIsXoa] = useState(false);
  let [isThem, setIsThem] = useState(false);
  const inputEl3 = useRef(null);
  const inputEl4 = useRef(null);
  useEffect(() => {
    let LocalLesson = localStorage.getItem("arrLesson");
    if (LocalLesson) {
      let arr = JSON.parse(LocalLesson).filter(item => {
        return item.maKhoaHoc === match.params.id;
      });
      setArrLessonTwo(arr);
      setArrLesson(JSON.parse(LocalLesson));
    }
  }, []);
  const AcceptLesson = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    let obj = {
      target: text,
      maKhoaHoc: match.params.id,
      name: name,
      link: link
    };
    setArrLesson(prevState => [...prevState, obj]);
    setArrLessonTwo(prevState => [...prevState, obj]);
    setIsThem(true);
  };
  useEffect(() => {
    localStorage.setItem("arrLesson", JSON.stringify(arrLesson));
    localStorage.setItem("arrLessonTwo", JSON.stringify(arrLesson));
  }, [arrLesson]);
  const renderContent = data => {
    return data.map((item, index) => {
      return (
        <tr key={index}>
          <td style={{ width: "10%" }}>{index + 1}</td>
          <td> {item.name} </td>
          <td> {item.link} </td>
          <td style={{ width: "20%" }}>
            <button
              className="btn btn-outline-light mr-2 w-100 mb-2"
              onClick={() => setLessonEdit(item)}
              data-toggle="modal"
              data-target="#modelEdit"
            >
              CHỈNH SỬA
            </button>
            <button
              className="btn btn-outline-primary w-100"
              onClick={() => RemoveLesson(item)}
            >
              XÓA
            </button>
          </td>
        </tr>
      );
    });
  };
  const RemoveLesson = data => {
    setArrLessonTwo(arrLessonTwo.filter(item => item.target !== data.target));
    setArrLesson(arrLesson.filter(item => item.target !== data.target));
    setIsXoa(true);
  };
  const EditLesson = data => {
    setArrLessonTwo(
      arrLessonTwo.map(item =>
        item.target === data.target ? { ...data } : item
      )
    );
    setArrLesson(
      arrLesson.map(item => (item.target === data.target ? { ...data } : item))
    );
    setIsSua(true);
  };
  return (
    <>
      <SweetAlert
        show={isSua}
        title="SỬA BÀI HỌC THÀNH CÔNG"
        text=""
        onConfirm={() => {
          setIsSua(false);
          inputEl4.current.click();
        }}
      />
      <SweetAlert
        show={isThem}
        title="THÊM THÀNH CÔNG"
        text=""
        onConfirm={() => {
          setIsThem(false);
          inputEl3.current.click();
        }}
      />
      <SweetAlert
        show={isXoa}
        title="XÓA BÀI HỌC THÀNH CÔNG"
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
              style={{ background: "linear-gradient(to right,#f94d5d,#379470)" }}
            >
              THÊM BÀI TẬP
            </button>
          </div>
        </div>
        <table className="table text-white">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên bài học</th>
              <th>Link bài học</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>{renderContent(arrLessonTwo)}</tbody>
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
                  ref={inputEl3}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Tên bài học:</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={event => setName(event.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Link bài học:</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={event => setLink(event.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn"
                  style={{ background: "#52BEAE", color: "white" }}
                  onClick={() => AcceptLesson()}
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
                  ref={inputEl4}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Tên bài học:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={lessonEdit.name}
                      onChange={event =>
                        setLessonEdit({
                          ...lessonEdit,
                          name: event.target.value
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Link bài học:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={lessonEdit.link}
                      onChange={event =>
                        setLessonEdit({
                          ...lessonEdit,
                          link: event.target.value
                        })
                      }
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn"
                  style={{ background: "#52BEAE", color: "white" }}
                  onClick={() => EditLesson(lessonEdit)}
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

export default withAdminSettingCourse(Lesson);

import React, { useEffect, useState } from "react";
import "./ProfileScreen.scss";
import Header from "../Component/HomeScreen/Header";
import UserService from "../Services/User";
import ItemCourseProfile from "../Component/ProfileScreen/ItemCourseProfile";
import loading from "../assets/loading-red-blue.svg";
import Camera from "../assets/Camera.png";
import Video from "../assets/Video.png";
import Like from "../assets/Like.png";
import Comment from "../assets/Comment.png";
import Send from "../assets/Send.png";
import HeartBlack from "../assets/HeartBlack.png";
import HeartRed from "../assets/HeartRed.png";
import Album from "../Component/Modal/Album";
import SweetAlert from "sweetalert-react";
import Carousel, { Modal, ModalGateway } from "react-images";
import CourseService from "../Services/Course";
import { Link } from "react-router-dom";
const ProfileScreen = ({ match, history }) => {
  let [userFake, setUserFake] = useState([]);
  let [user, setUser] = useState();
  let [detail, setDetail] = useState({});
  let [arrDanhHieu, setArrDanhHieu] = useState([]);
  let [listCourse, setListCourse] = useState([]);
  let [isMessage, setIsMessage] = useState(false);
  let [content, setContent] = useState("");
  let [arrMessage, setArrMessage] = useState([]);
  let [arrFriend, setArrFriend] = useState([]);
  let [status, setStatus] = useState("Kết bạn");
  let [isGuiKetBan, setIsGuiKetBan] = useState(false);
  let [listFriend, setListFriend] = useState({});
  let [contenPost, setContentPost] = useState("");
  let [objPost, setObjPost] = useState(undefined);
  let [tab, setTab] = useState(true);
  let [comment, setComment] = useState("");
  let [targetComment, setCommentTarget] = useState("");
  let [contentEdit, setContentEdit] = useState({});
  let [isChinhSua, setIsChinhSua] = useState();
  let [isChonAnh, setIsChonAnh] = useState(false);
  let [isChonVideo, setIsChonVideo] = useState(false);
  let [imgSrc, setImgSrc] = useState("");
  let [videoSrc, setVideoSrc] = useState("");
  let [isClickImage, setIsClickImage] = useState(false);
  let [imgSrcClick, setImgSrcClick] = useState("");
  let [arrImgSrc, setArrImgSrc] = useState([]);
  let [isNhanTin, setIsNhanTin] = useState(false);
  let [listLiked, setListLiked] = useState(false);
  let [targetLike, setTargetLike] = useState("");
  const images = [{ source: imgSrcClick }];

  // RENDER LIST POST
  useEffect(() => {
    let listArrPost = localStorage.getItem("arrPost");
    if (listArrPost) {
      JSON.parse(listArrPost).map(item => {
        // phải xét = với aram để những ng khác đều thấy
        if (item.taiKhoan === match.params.id) {
          // set để render lại
          setObjPost(item);
        }
      });
    }
  }, []);
  // Lấy album ảnh
  useEffect(() => {
    const arrPostLocal = localStorage.getItem("arrPost");
    if (arrPostLocal) {
      JSON.parse(arrPostLocal).map(item => {
        if (item.taiKhoan === match.params.id) {
          let arr = item.listPost.filter(item1 => {
            return item1.imgSrc !== "";
          });
          setArrImgSrc(arr);
        }
      });
    }
  }, []);

  useEffect(() => {
    UserService.fetchListUser().then(res => {
      setUserFake(res.data);
    });

    const danhHieu = localStorage.getItem("arrHuyHieu");
    if (danhHieu) {
      setArrDanhHieu(
        JSON.parse(danhHieu).filter(item => item.taiKhoan === match.params.id)
      );
    }
    let message = localStorage.getItem("arrMessage");
    message && setArrMessage(JSON.parse(message));
    let banBe = localStorage.getItem("arrFriend");
    banBe && setArrFriend(JSON.parse(banBe));
  }, []);
  // Hiện danh sách bạn bè
  useEffect(() => {
    const listFriendAll = localStorage.getItem("ListFriendAll");
    if (listFriendAll) {
      JSON.parse(listFriendAll).map(item => {
        if (item.taiKhoan === match.params.id) {
          setListFriend(item);
        }
      });
    }
  }, []);
  // quét list xem đã kết bạn chưa
  useEffect(() => {
    const listFriendAll = localStorage.getItem("ListFriendAll");
    const loginUser = localStorage.getItem("loginUser");
    let user = JSON.parse(loginUser);
    let arrListFriendAll = JSON.parse(listFriendAll);
    if (listFriendAll) {
      for (let item of arrListFriendAll) {
        if (item.taiKhoan === user.taiKhoan) {
          for (let user of item.listFriend) {
            if (user.taiKhoan === match.params.id) {
              setStatus("Bạn bè");
            }
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    userFake.map(item => {
      if (item.taiKhoan === match.params.id) {
        setUser(item);
      }
    });
  }, [userFake]);
  useEffect(() => {
    let arrFriend = localStorage.getItem("arrFriend");
    if (arrFriend) {
      JSON.parse(arrFriend).map(item => {
        if (
          item.target ===
          JSON.parse(localStorage.getItem("loginUser")).taiKhoan +
            "fadsfadsfa" +
            match.params.id
        ) {
          setStatus("Đã gửi kết bạn");
        }
      });
    }
  }, []);
  useEffect(() => {
    setTimeout(() => {
      if (user) {
        let obj = {
          taiKhoan: user.taiKhoan,
          matKhau: user.matKhau
        };
        let obj1 = {
          taiKhoan: user.taiKhoan
        };
        UserService.fetchInformationUser(obj).then(res => {
          setDetail(res.data);
        });
        CourseService.fetListCourseUserSubscribe(obj1).then(res => {
          setListCourse(res.data);
        });
      }
    }, 300);
  }, [user]);
  const renderListDanhHieu = data => {
    return data.map((item, index) => {
      return (
        <li key={index}>
          <img src={item.hinhAnh} />
          {item.moTa}
        </li>
      );
    });
  };
  const renderListCourse = data => {
    return data.map((item, index) => {
      return (
        <li key={index} className="d-flex my-2">
          <ItemCourseProfile item={item} />
        </li>
      );
    });
  };
  const SendMessage = data => {
    var timeObj = new Date();
    let obj = {
      taiKhoanNguoiGui: JSON.parse(localStorage.getItem("loginUser")).taiKhoan,
      nguoiGui: JSON.parse(localStorage.getItem("loginUser")).hoTen,
      taiKhoanNguoiNhan: data.taiKhoan,
      nguoiNhan: data.hoTen,
      noiDung: content,
      date: `${timeObj.getDate()}/${timeObj.getMonth() +
        1}/${timeObj.getFullYear()} (${timeObj.getHours()}:${timeObj.getMinutes()})`
    };
    if (localStorage.getItem("arrMessage")) {
      let arr = arrMessage;
      arr.push(obj);
      setIsNhanTin(true);
      localStorage.setItem("arrMessage", JSON.stringify(arr));
    } else {
      let arr = [];
      arr.push(obj);
      setIsNhanTin(true);
      localStorage.setItem("arrMessage", JSON.stringify(arr));
    }
  };
  const AddFriend = () => {
    var timeObj = new Date();
    let obj = {
      taiKhoanNguoiGui: JSON.parse(localStorage.getItem("loginUser")).taiKhoan,
      nguoiGui: JSON.parse(localStorage.getItem("loginUser")).hoTen,
      target:
        JSON.parse(localStorage.getItem("loginUser")).taiKhoan +
        "fadsfadsfa" +
        detail.taiKhoan,
      nguoiNhan: detail.hoTen,
      taiKhoanNguoiNhan: detail.taiKhoan,
      date: `${timeObj.getDate()}/${timeObj.getMonth() +
        1}/${timeObj.getFullYear()} (${timeObj.getHours()}:${timeObj.getMinutes()})`
    };
    if (localStorage.getItem("arrFriend")) {
      let arr = arrFriend;
      let index = arr.findIndex(item => {
        return item.target === obj.target;
      });
      index === -1 && arr.push(obj);
      localStorage.setItem("arrFriend", JSON.stringify(arr));
    } else {
      let arr = [];
      arr.push(obj);
      localStorage.setItem("arrFriend", JSON.stringify(arr));
    }
    setStatus("Đã gửi kết bạn");
  };
  const renderListButton = status => {
    if (status === "Kết bạn") {
      return (
        <button
          className="mess2 ml-2 btn"
          style={{ background: "#37936F" }}
          onClick={() => {
            AddFriend();
          }}
        >
          <i class="fas fa-user-plus mr-2"></i>Kết bạn
        </button>
      );
    } else if (status === "Đã gửi kết bạn") {
      return (
        <>
          <button
            className="mess2 ml-2 btn btn-success"
            style={{ background: "#37936F" }}
            onClick={() => {
              setIsGuiKetBan(!isGuiKetBan);
            }}
          >
            <i class="fas fa-user-plus mr-2"></i>
            {status}
          </button>
          <div className={isGuiKetBan ? "tinNhan" : "d-none "}>
            <button
              className="btn w-100 text-white"
              style={{ background: "#52BEAE" }}
              onClick={() => HuyLoiMoiKetBan()}
            >
              Hủy lời mời kết bạn
            </button>
          </div>
          <div className={isGuiKetBan ? "arrowMess" : "d-none "}></div>
        </>
      );
    } else if (status === "Bạn bè") {
      return (
        <>
          <button
            className="mess2 ml-2 btn btn-success"
            style={{ background: "#37936F" }}
            onClick={() => {
              setIsGuiKetBan(!isGuiKetBan);
            }}
          >
            <i class="fas fa-check mr-2"></i>
            {status}
          </button>
          <div className={isGuiKetBan ? "tinNhan" : "d-none "}>
            <button
              className="btn w-100 text-white"
              style={{ background: "#52BEAE" }}
              onClick={() => HuyKetBan()}
            >
              Hủy kết bạn
            </button>
          </div>
          <div className={isGuiKetBan ? "arrowMess" : "d-none "}></div>
        </>
      );
    }
  };
  const HuyKetBan = () => {
    const listFriendAll = localStorage.getItem("ListFriendAll");
    let arrListFriendAll = JSON.parse(listFriendAll);
    const loginUser = localStorage.getItem("loginUser");
    let user = JSON.parse(loginUser);
    // xóa user mún hủy kết bạn từ account localstorage trước
    for (let item of arrListFriendAll) {
      if (item.taiKhoan === user.taiKhoan) {
        let index = item.listFriend.findIndex(item2 => {
          return item2.taiKhoan === match.params.id;
        });
        item.listFriend.splice(index, 1);
      }
    }
    // xóa user localstorage từ user muốn xóa
    for (let item3 of arrListFriendAll) {
      if (item3.taiKhoan === match.params.id) {
        let index = item3.listFriend.findIndex(item4 => {
          return item4.taiKhoan === user.taiKhoan;
        });
        item3.listFriend.splice(index, 1);
      }
    }
    // xóa user mảng listFriend bị rỗng
    let userLocal = arrListFriendAll.findIndex(item => {
      return item.listFriend.length === 0;
    });
    arrListFriendAll.splice(userLocal, 1);
    localStorage.setItem("ListFriendAll", JSON.stringify(arrListFriendAll));
    setStatus("Kết bạn");
  };
  const HuyLoiMoiKetBan = () => {
    let arrFriend = localStorage.getItem("arrFriend");
    let arr = JSON.parse(arrFriend);
    if (arrFriend) {
      let index = arr.findIndex(item => {
        return (
          item.target ===
          JSON.parse(localStorage.getItem("loginUser")).taiKhoan +
            "fadsfadsfa" +
            match.params.id
        );
      });
      console.log(index);
      arr.splice(index, 1);
      console.log(arr);
      localStorage.setItem("arrFriend", JSON.stringify(arr));
      setStatus("Kết bạn");
      setIsGuiKetBan(!isGuiKetBan);
    }
  };
  const renderListFriend = data => {
    if (data.listFriend) {
      return data.listFriend.map((item, index) => {
        return (
          <div
            key={index}
            className="d-flex"
            style={{ color: "#19224d", cursor: "pointer" }}
            onClick={() => {
              setTimeout(() => {
                history.replace(`/profile/${item.taiKhoan}`);
                window.location.reload();
                window.scroll({ top: 0 });
              }, 300);
            }}
          >
            <img
              style={{ width: "30px", height: "30px" }}
              src="https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-male-3-512.png"
            />
            <p className="ml-2" style={{ fontSize: "17px", padding: "5px 0" }}>
              {item.hoTen}
            </p>
          </div>
        );
      });
    }
  };
  const SendPost = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    let localArrPost = localStorage.getItem("arrPost");
    // kiểm tra xem trên local có arrPost không ?
    if (localArrPost) {
      let timeObj = new Date();
      let arr = JSON.parse(localArrPost);
      let isRunning = true;
      let localArrPostParse = JSON.parse(localArrPost);
      // nếu có và trong arrPost có tài khoản trên localStorage thì thực hiện quét
      // và so sánh điều kiện như bên dưới
      localArrPostParse.map(item => {
        if (
          item.taiKhoan ===
          JSON.parse(localStorage.getItem("loginUser")).taiKhoan
        ) {
          let obj = {
            target: text,
            taiKhoan: JSON.parse(localStorage.getItem("loginUser")).taiKhoan,
            hoTen: JSON.parse(localStorage.getItem("loginUser")).hoTen,
            content: contenPost,
            imgSrc: imgSrc,
            videoSrc: videoSrc,
            date: `${timeObj.getDate()}/${timeObj.getMonth() +
              1}/${timeObj.getFullYear()} (${timeObj.getHours()}:${timeObj.getMinutes()})`,
            listLike: [],
            listComment: []
          };
          // post thêm bài mới vào cái tài khoản trên arrPost
          item.listPost.unshift(obj);
          // sau đó lưu lên lại localStorage
          localStorage.setItem("arrPost", JSON.stringify(localArrPostParse));
          // Đồng thời set lại obj = item thỏa điều kiện tài khoản giống nhau để render lại list post pc
          setObjPost(item);
          // Đặt flag để xem nếu không có tài khoản trên local arrPst xem có nên chạy tiếp làm dưới ko
          // trong trường hợp này là có thì ko chạy tiếp hàm dưới
          isRunning = false;
        }
      });
      // trườn hợp trên local có arrPost nhưng lại ko có tài khoản trùng vs local thì thực hiện running dưới
      if (isRunning) {
        let obj2 = {
          taiKhoan: JSON.parse(localStorage.getItem("loginUser")).taiKhoan,
          listPost: [
            {
              target: text,
              taiKhoan: JSON.parse(localStorage.getItem("loginUser")).taiKhoan,
              hoTen: JSON.parse(localStorage.getItem("loginUser")).hoTen,
              content: contenPost,
              imgSrc: imgSrc,
              videoSrc: videoSrc,
              date: `${timeObj.getDate()}/${timeObj.getMonth() +
                1}/${timeObj.getFullYear()} (${timeObj.getHours()}:${timeObj.getMinutes()})`,
              listLike: [],
              listComment: []
            }
          ]
        };
        // mảng arr là arrPush trên local
        // dùng để push vào thêm 1 object mới
        arr.push(obj2);
        // sau đó set lại obj để render lại
        setObjPost(obj2);
        // lưu lại local sau khi đã thêm user mới
        localStorage.setItem("arrPost", JSON.stringify(arr));
      }
    } else {
      // đây là nếu như ko có local thì thêm vào cái đầu tiên
      let arr = [];
      let timeObj = new Date();
      let obj = {
        taiKhoan: JSON.parse(localStorage.getItem("loginUser")).taiKhoan,
        listPost: [
          {
            target: text,
            taiKhoan: JSON.parse(localStorage.getItem("loginUser")).taiKhoan,
            hoTen: JSON.parse(localStorage.getItem("loginUser")).hoTen,
            content: contenPost,
            imgSrc: imgSrc,
            videoSrc: videoSrc,
            date: `${timeObj.getDate()}/${timeObj.getMonth() +
              1}/${timeObj.getFullYear()} (${timeObj.getHours()}:${timeObj.getMinutes()})`,
            listLike: [],
            listComment: []
          }
        ]
      };
      arr.push(obj);
      // set để render lại
      setObjPost(obj);
      localStorage.setItem("arrPost", JSON.stringify(arr));
    }
  };

  // thả tim
  const ThaTim = data => {
    let arrPostLocal = JSON.parse(localStorage.getItem("arrPost"));
    let obj = {
      taiKhoan: JSON.parse(localStorage.getItem("loginUser")).taiKhoan,
      hoTen: JSON.parse(localStorage.getItem("loginUser")).hoTen
    };
    let viTri = data.listLike.findIndex(itemViTri => {
      return itemViTri.taiKhoan === obj.taiKhoan;
    });
    if (viTri === -1) {
      data.listLike.push(obj);
    } else {
      data.listLike.splice(viTri, 1);
    }
    arrPostLocal.map(item => {
      if (item.taiKhoan === match.params.id) {
        let index = item.listPost.findIndex(item => {
          return item.target === data.target;
        });
        item.listPost[index] = data;
        setObjPost(item);
      }
    });
    localStorage.setItem("arrPost", JSON.stringify(arrPostLocal));
  };
  const renderUserLike = data => {
    let isLike = false;
    data.map(item => {
      if (
        item.taiKhoan === JSON.parse(localStorage.getItem("loginUser")).taiKhoan
      ) {
        isLike = true;
      }
    });
    if (isLike) {
      if (data.length > 1) {
        return <p>{`Bạn và ${data.length - 1} người khác`}</p>;
      } else return <p>{`Bạn đã thích`}</p>;
    } else return `${data.length}`;
  };
  const renderClickTim = item => {
    let isClick = false;
    item.listLike.map(item => {
      if (
        item.taiKhoan === JSON.parse(localStorage.getItem("loginUser")).taiKhoan
      ) {
        isClick = true;
      }
    });
    if (isClick) {
      return <img src={HeartRed} />;
    }
    return <img src={HeartBlack} />;
  };
  const SendComment = data => {
    let timeObj = new Date();
    let arrPostLocal = JSON.parse(localStorage.getItem("arrPost"));
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    let obj = {
      taiKhoan: JSON.parse(localStorage.getItem("loginUser")).taiKhoan,
      hoTen: JSON.parse(localStorage.getItem("loginUser")).hoTen,
      date: `${timeObj.getDate()}/${timeObj.getMonth() +
        1}/${timeObj.getFullYear()} (${timeObj.getHours()}:${timeObj.getMinutes()})`,
      content: comment,
      target: text
    };
    data.listComment.unshift(obj);
    // obj là mảng cần push vào listComment
    // data là item lístPost
    // từ local quét mảng để xem item nào để đổi item listpost
    arrPostLocal.map(item => {
      if (item.taiKhoan === match.params.id) {
        let index = item.listPost.findIndex(item4 => {
          return item4.target === data.target;
        });
        item.listPost[index] = data;
        setObjPost(item);
      }
    });
    // sửa lại objPost để render lại
    localStorage.setItem("arrPost", JSON.stringify(arrPostLocal));
  };
  const XoaComment = (itemListComment, itemListPost, arrListPost) => {
    let index1 = itemListPost.listComment.findIndex(item => {
      return item.target === itemListComment.target;
    });
    itemListPost.listComment.splice(index1, 1);
    setObjPost({
      ...objPost,
      listPost: objPost.listPost.map(item2 =>
        item2.target === itemListPost.target ? { ...itemListPost } : item2
      )
    });
  };
  const renderListComment = (arrListPost, itemListPost) => {
    return itemListPost.listComment.map((itemListComment, index) => {
      return (
        <li key={index}>
          <div className="d-flex align-items-center">
            <img src="https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-male-3-512.png" />
            <div className="content">
              <Link
                style={{ color: "#19224d", fontWeight: "bold" }}
                onClick={() =>
                  setTimeout(() => {
                    window.location.reload();
                  }, 200)
                }
                to={`/profile/${itemListComment.taiKhoan}`}
              >
                {itemListComment.hoTen} :
              </Link>{" "}
              {itemListComment.content}{" "}
              {JSON.parse(localStorage.getItem("loginUser")).taiKhoan ===
                match.params.id ||
              itemListComment.taiKhoan ===
                JSON.parse(localStorage.getItem("loginUser")).taiKhoan ? (
                <div
                  className="btn-group dropup ml-2 dropdownUp"
                  style={{ cursor: "pointer" }}
                >
                  <p
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fas fa-ellipsis-h" />
                  </p>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <p
                      class="dropdown-item"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        XoaComment(itemListComment, itemListPost, arrListPost)
                      }
                    >
                      Xóa
                    </p>
                    <p
                      class="dropdown-item"
                      style={{ cursor: "pointer" }}
                      data-toggle="modal"
                      data-target="#modelId"
                      onClick={() => {
                        setContentEdit({
                          itemListComment,
                          itemListPost
                        });
                        setIsChinhSua("Comment");
                      }}
                    >
                      Chỉnh sửa
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <span className="mr-2"> </span>
        </li>
      );
    });
  };
  const XoaBaiViet = data => {
    setObjPost({
      ...objPost,
      listPost: objPost.listPost.filter(item => item.target !== data.target)
    });
  };
  const ChinhSuaBaiViet = data => {
    setObjPost({
      ...objPost,
      listPost: objPost.listPost.map(item =>
        item.target === data.target ? { ...data } : item
      )
    });
  };
  const ChinhSuaBinhLuan = data => {
    let index1 = data.itemListPost.listComment.findIndex(item => {
      return item.target === data.itemListComment.target;
    });
    if (index1 !== -1) {
      data.itemListPost.listComment[index1] = data.itemListComment;
    }
    setObjPost({
      ...objPost,
      listPost: objPost.listPost.map(item2 =>
        item2.target === data.itemListPost.target
          ? { ...data.itemListPost }
          : item2
      )
    });
  };
  //cái này dùng để khi xóa thì lưu lại vào local
  useEffect(() => {
    if (objPost !== undefined && localStorage.getItem("arrPost")) {
      let arr = JSON.parse(localStorage.getItem("arrPost"));
      let index = arr.findIndex(item => {
        return item.taiKhoan === objPost.taiKhoan;
      });
      if (index !== -1) {
        arr[index] = objPost;
        localStorage.setItem("arrPost", JSON.stringify(arr));
      }
    }
  }, [objPost]);
  const renderListLike = data => {
    return data.map(item => {
      return <li>{item.taiKhoan}</li>;
    });
  };
  const renderListPost = arrListPost => {
    return arrListPost.map((itemListPost, index) => {
      return (
        <div
          key={index}
          style={{
            border: "1px solid #19224d",
            padding: "10px",
            marginBottom: "30px"
          }}
        >
          <div className="headerFb">
            <div className="left w-50">
              <div className="avatar">
                <img src="https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-male-3-512.png" />
              </div>
              <div className="content">
                <p className="name ">{itemListPost.hoTen}</p>
                <p className="date">{itemListPost.date}</p>
              </div>
            </div>
            <div className="right">
              {JSON.parse(localStorage.getItem("loginUser")).taiKhoan ===
                match.params.id && (
                <div
                  className="btn-group dropleft"
                  style={{ cursor: "pointer" }}
                >
                  <p
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fas fa-ellipsis-h" />
                  </p>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <p
                      class="dropdown-item"
                      style={{ cursor: "pointer" }}
                      onClick={() => XoaBaiViet(itemListPost)}
                    >
                      Xóa
                    </p>
                    <p
                      class="dropdown-item"
                      style={{ cursor: "pointer" }}
                      data-toggle="modal"
                      data-target="#modelId"
                      onClick={() => {
                        setContentEdit(itemListPost);
                        setIsChinhSua("Bài viết");
                      }}
                    >
                      Chỉnh sửa
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="contentPost">
            <p>{itemListPost.content}</p>
            {itemListPost.imgSrc !== "" && (
              <img
                style={{ width: "100%", height: "100%", marginBottom: "10px" }}
                src={itemListPost.imgSrc}
                alt="Ảnh bị lỗi"
                onClick={() => {
                  setImgSrcClick(itemListPost.imgSrc);
                  setIsClickImage(!isClickImage);
                  // setTimeout(()=>{
                  // },1000)
                }}
              />
            )}
            {itemListPost.videoSrc !== "" && (
              <iframe
                width="560"
                height="315"
                src={itemListPost.videoSrc}
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            )}
            <div className="d-flex justify-content-between mb-1">
              <div
                style={{ cursor: "pointer" }}
                className="like d-flex align-items-center"
                onClick={() => setListLiked(!listLiked)}
              >
                {itemListPost.listLike.length !== 0 && <img src={Like} />}

                {itemListPost.listLike.length !== 0 && (
                  <div
                    onClick={() => {
                      if (targetLike === itemListPost.target) {
                        setTargetLike("");
                      } else setTargetLike(itemListPost.target);
                    }}
                    className="d-flex align-items-center listUserLike ml-2"
                  >
                    {renderUserLike(itemListPost.listLike)}
                    <div
                      className={
                        targetLike === itemListPost.target
                          ? "listLike"
                          : "d-none"
                      }
                    >
                      <ul>{renderListLike(itemListPost.listLike)}</ul>
                    </div>
                  </div>
                )}
              </div>
              <p
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (targetComment === itemListPost.target) {
                    setCommentTarget("");
                  } else setCommentTarget(itemListPost.target);
                }}
              >
                {itemListPost.listComment.length !== 0 &&
                  `${itemListPost.listComment.length} Bình luận`}
              </p>
            </div>
            <div className="likeComment">
              <div
                onClick={() => ThaTim(itemListPost)}
                className="method"
                style={{ borderRight: "1px solid gray" }}
              >
                {renderClickTim(itemListPost)}
                Thả tim
              </div>
              <div
                className="method"
                onClick={() => {
                  if (targetComment === itemListPost.target) {
                    setCommentTarget("");
                  } else setCommentTarget(itemListPost.target);
                }}
              >
                <img src={Comment} />
                Bình luận
              </div>
            </div>

            {/* Comment */}
            <div
              className={
                targetComment === itemListPost.target ? "comment" : "d-none"
              }
            >
              <div className="headerComment">
                <img src="https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-male-3-512.png" />
                <textarea
                  onChange={e => setComment(e.target.value)}
                  placeholder="Viết bình luận"
                ></textarea>
                <div
                  className="imgSend"
                  onClick={() => SendComment(itemListPost)}
                >
                  <img src={Send} />
                </div>
              </div>
              <div className="bodyComment">
                <ul className="list">
                  {renderListComment(arrListPost, itemListPost)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="profile-user">
      <Header match={match} />
      <div style={{ borderBottom: "2px solid #19224d" }}>
        <div className="banner">
          <div className="banner-content d-flex">
            <div className="avatar">
              <img src="https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-male-3-512.png" />
            </div>
            <div className="pl-3 user-mess">
              <div className="d-flex align-items-center">
                <p className="username mr-1">{detail.hoTen}</p>
                <div className="icon">
                  <p className="icon text-white">
                    {detail.maLoaiNguoiDung === "HV" ? "HV" : "GV"}
                  </p>
                </div>
              </div>
              {match.params.id !==
                JSON.parse(localStorage.getItem("loginUser")).taiKhoan && (
                <div className="d-flex">
                  <div style={{ position: "relative" }}>
                    <button
                      className="mess btn btn-danger"
                      onClick={() => setIsMessage(!isMessage)}
                    >
                      <i class="fas fa-envelope mr-2"></i>Nhắn tin
                    </button>
                    <div className={isMessage ? "tinNhan" : "d-none "}>
                      <p>
                        From :{" "}
                        {JSON.parse(localStorage.getItem("loginUser")).hoTen}
                      </p>
                      <p>To : {detail.hoTen}</p>
                      <textarea
                        onChange={event => setContent(event.target.value)}
                      >
                        {" "}
                      </textarea>
                      <button
                        className="btn w-100 text-white"
                        style={{ background: "#52BEAE" }}
                        onClick={() => SendMessage(detail)}
                      >
                        GỬI
                      </button>
                    </div>
                    <div className={isMessage ? "arrowMess" : "d-none "}></div>
                  </div>
                  <div style={{ position: "relative" }}>
                    {renderListButton(status)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: "80%", margin: "0 auto" }} className="tt">
        <div className="container-profile">
          <div className="left">
            <div className="d-flex  justify-content-end w-100 mb-3 settingDasboard">
              <div
                className="d-flex justify-content-between"
                style={{ width: "100%" }}
              >
                <p
                  className="w-50 text-white d-flex justify-content-center align-items-center"
                  data-toggle="modal"
                  data-target="#albumAnh"
                  style={{ background: "gray", padding: "15px 0" }}
                >
                  Album Ảnh
                </p>
                <p
                  className="text-white  w-50 d-flex justify-content-center align-items-center"
                  style={{
                    background: "#19224d",
                    padding: "15px 0",
                    zIndex: "2"
                  }}
                  onClick={() => {
                    setTab(!tab);
                  }}
                >
                  {tab ? "Dòng thời gian" : "Khóa học"}
                </p>
                <div className="arrow-tab"></div>
              </div>
            </div>
            <div style={{ border: "1px solid #19224d", padding: "10px" }}>
              <h5>Thông tin cá nhân :</h5>
              <ul>
                <li>Họ tên : {detail.hoTen}</li>
                <li>Email : {detail.email}</li>
                <li>Số điện thoại : {detail.soDT}</li>
              </ul>
            </div>

            <div
              style={{ border: "1px solid #19224d", padding: "10px" }}
              className="mt-3"
            >
              <h5 className="mb-2">
                Danh sách bạn bè{" "}
                {listFriend.listFriend && `(${listFriend.listFriend.length})`} :
              </h5>
              <ul>
                {listFriend.listFriend && listFriend.listFriend.length !== 0
                  ? renderListFriend(listFriend)
                  : "Chưa có bạn bè"}
              </ul>
            </div>

            <div
              style={{ border: "1px solid #19224d", padding: "10px" }}
              className="mt-3"
            >
              <h5 className="mb-2">Các danh hiệu :</h5>
              <ul>
                {arrDanhHieu.length !== 0
                  ? renderListDanhHieu(arrDanhHieu)
                  : "Chưa có danh hiệu"}
              </ul>
            </div>
          </div>
          <div className="right">
            {tab ? (
              <div style={{ border: "1px solid #19224d", padding: "10px" }}>
                {JSON.parse(localStorage.getItem("loginUser")).taiKhoan ===
                  match.params.id && (
                  <>
                    <h5>Tạo bài viết :</h5>
                    <textarea
                      placeholder="Bạn đang nghĩ gì ?"
                      style={{
                        color: "#19224d",
                        border: "1px solid #19224d",
                        marginBottom: "0"
                      }}
                      onChange={e => setContentPost(e.target.value)}
                    ></textarea>
                    <div
                      className="d-flex"
                      style={{ border: "1px solid gray", marginBottom: "30px" }}
                    >
                      <div
                        className="d-flex chonAnh align-items-center justify-content-center font-weight-bold"
                        style={{
                          cursor: "pointer",
                          borderRight: "1px solid gray",
                          width: "40%"
                        }}
                      >
                        <div onClick={() => setIsChonAnh(!isChonAnh)}>
                          <img
                            style={{ width: "40px", height: "40px" }}
                            src={Camera}
                          />
                          <label
                            style={{ color: "#4AC144" }}
                            for="file-upload"
                            className="custom-file-upload mb-0"
                          >
                            {imgSrc !== "" ? "Đã chọn ảnh" : "Chọn ảnh"}
                          </label>
                        </div>
                        <div className={isChonAnh ? "tinNhan" : "d-none"}>
                          <p>Chọn đường dẫn ảnh</p>
                          <textarea
                            onChange={event => setImgSrc(event.target.value)}
                          >
                            {" "}
                          </textarea>
                          <button
                            className="btn w-100 text-white"
                            style={{ background: "#52BEAE" }}
                            onClick={() => setIsChonAnh(!isChonAnh)}
                          >
                            CHẤP NHẬN
                          </button>
                        </div>
                        <div
                          className={isChonAnh ? "arrowMess" : "d-none"}
                        ></div>
                      </div>
                      <div
                        className="d-flex chonVideo align-items-center justify-content-center font-weight-bold"
                        style={{
                          cursor: "pointer",
                          width: "40%",
                          borderRight: "1px solid gray"
                        }}
                      >
                        <div onClick={() => setIsChonVideo(!isChonVideo)}>
                          <img
                            style={{ width: "30px", height: "30px" }}
                            src={Video}
                          />
                          <label
                            style={{ color: "#B61A2E" }}
                            for="file-upload"
                            className="mr-3 custom-file-upload mb-0 ml-1"
                          >
                            {videoSrc !== "" ? "Đã chọn video" : "Chọn video"}
                          </label>
                        </div>

                        <div className={isChonVideo ? "tinNhan" : "d-none"}>
                          <p>Chọn đường dẫn ảnh</p>
                          <textarea
                            onChange={event => setVideoSrc(event.target.value)}
                          >
                            {" "}
                          </textarea>
                          <button
                            className="btn w-100 text-white"
                            style={{ background: "#52BEAE" }}
                            onClick={() => setIsChonVideo(!isChonVideo)}
                          >
                            CHẤP NHẬN
                          </button>
                        </div>
                        <div
                          className={isChonVideo ? "arrowMess" : "d-none"}
                        ></div>
                      </div>

                      <div
                        className="d-flex align-items-center justify-content-center font-weight-bold"
                        style={{ cursor: "pointer", width: "20%" }}
                        onClick={() => SendPost()}
                      >
                        <img
                          style={{ width: "30px", height: "30px" }}
                          src={Send}
                        />
                        <label
                          style={{ color: "black" }}
                          for="file-upload"
                          className="mr-3 custom-file-upload mb-0"
                        >
                          Gửi
                        </label>
                      </div>
                    </div>
                  </>
                )}
                {/*  xét thử coi objPost có undifiend ko ? nếu có thì 'Chưa có bài viết */}
                {/* Nếu không bị undifined thì set thử coi obj có mảng listpost có rỗng ko để đảm bảo luồng đi */}
                {objPost ? (
                  objPost.listPost !== 0 ? (
                    renderListPost(objPost.listPost)
                  ) : (
                    <p style={{ textAlign: "center", padding: "50px 0" }}>
                      Chưa có bài viết
                    </p>
                  )
                ) : (
                  <p style={{ textAlign: "center", padding: "50px 0" }}>
                    Chưa có bài viết
                  </p>
                )}
              </div>
            ) : (
              <div style={{ border: "1px solid #19224d", padding: "10px" }}>
                <h5>Danh sách khóa học đang theo học :</h5>
                <ul className="mt-2">
                  {listCourse.length !== 0 ? (
                    renderListCourse(listCourse)
                  ) : (
                    <div className="d-flex justify-content-center">
                      <img src={loading} />
                    </div>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        {/* Modal */}
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
                <h5 className="modal-title">
                  {isChinhSua === "Bài viết"
                    ? "CHỈNH SỬA BÀI VIẾT"
                    : "CHỈNH SỬA BÌNH LUẬN"}
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
                {isChinhSua === "Comment" ? (
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      value={contentEdit.itemListComment.content}
                      onChange={e =>
                        setContentEdit({
                          ...contentEdit,
                          itemListComment: {
                            ...contentEdit.itemListComment,
                            content: e.target.value
                          }
                        })
                      }
                    />
                  </div>
                ) : (
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      value={contentEdit.content}
                      onChange={e =>
                        setContentEdit({
                          ...contentEdit,
                          content: e.target.value
                        })
                      }
                    />
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Thoát
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    if (isChinhSua === "Bài viết") {
                      return ChinhSuaBaiViet(contentEdit);
                    }
                    ChinhSuaBinhLuan(contentEdit);
                  }}
                  data-dismiss="modal"
                >
                  Chỉnh sửa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <FsLightbox
        toggler={isClickImage}
        sources={[
          // imgSrcClick
          // 'https://blog.algolia.com/wp-content/uploads/2015/11/React_illo_final_720x400.png?w=640'
          // 'https://i.imgur.com/fsyrScY.jpg'
          'https://vietpro.net.vn/wp-content/uploads/2019/06/angular-5-696x364.png',
          // "data:image/jpeg;base64,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"
        ]}
      />*/}

      <SweetAlert
        show={isNhanTin}
        title="Gửi tin nhắn thành công"
        text=""
        onConfirm={() => {
          setIsNhanTin(false);
        }}
      />
      <Album arrImgSrc={arrImgSrc} />
      <ModalGateway>
        {isClickImage ? (
          <Modal onClose={() => setIsClickImage(!isClickImage)}>
            <Carousel views={images} />
          </Modal>
        ) : (
          ""
        )}
      </ModalGateway>
    </div>
  );
};

export default ProfileScreen;

import React, { useEffect, useState } from "react";
import '../../Screens/animate.css' 
import WOW from 'wowjs'
const Header = ({ MaKhoaHoc, history }) => {
  let [isClick, setIsClick] = useState(false);
  let [isClick2, setIsClick2] = useState(false);
  let [arrNotification, setArrNotification] = useState([]);
  let [numberNotification, setNumberNotification] = useState([]);
  let [arrNotificationWatched, setArrNotificationWatched] = useState([]);
  let [arrExercise, setArrExercise] = useState([]);
  let [numberExercise, setNumberExercise] = useState([]);
  let [arrExerciseWatched, setArrExerciseWatched] = useState([]);
  
  useEffect(() => {
    if (
      localStorage.getItem("arrExerciseTwo") &&
      localStorage.getItem("exerciseWatched")
    ) {
      let arr = [];
      let exercise = JSON.parse(localStorage.getItem("arrExerciseTwo"));
      let watched = JSON.parse(localStorage.getItem("exerciseWatched"));
      let arr3 = exercise.filter(item => {
        return item.maKhoaHoc === MaKhoaHoc;
      });
      arr3.map(item1 => {
        let index = watched.findIndex(item2 => {
          return item2.target === item1.target;
        });
        
        index === -1 && arr.push(item1);
      });
      setArrExercise(arr);
      setNumberExercise(arr);
    } else if (localStorage.getItem("arrExerciseTwo")) {
      const localExercise = JSON.parse(localStorage.getItem("arrExerciseTwo"));
      let arr = localExercise.filter(item => {
        return item.maKhoaHoc === MaKhoaHoc;
      });
      setArrExercise(arr);
      setNumberExercise(arr);
    }

    if (
      localStorage.getItem("arrNotificationTwo") &&
      localStorage.getItem("notificationWatched")
    ) {
      let arr = [];
      let notification = JSON.parse(localStorage.getItem("arrNotificationTwo"));
      let watched = JSON.parse(localStorage.getItem("notificationWatched"));
      let arr3 = notification.filter(item => {
        return item.maKhoaHoc === MaKhoaHoc;
      });
      arr3.map(item1 => {
        let index = watched.findIndex(item2 => {
          return item2.target === item1.target;
        });
        index === -1 && arr.push(item1);
      });
      setArrNotification(arr);
      setNumberNotification(arr);
    } else if (localStorage.getItem("arrNotificationTwo")) {
      const localNotification = JSON.parse(
        localStorage.getItem("arrNotificationTwo")
      );
      let arr = localNotification.filter(item => {
        return item.maKhoaHoc === MaKhoaHoc;
      });
      setArrNotification(arr);
      setNumberNotification(arr);
    }
    
    new WOW.WOW().init();
  }, []);
  useEffect(() => {
    if (arrExercise.length != 0) {
      alert("BẠN CÓ BÀI TẬP MỚI CHƯA XEM");
    }
  }, [arrExercise]);
  useEffect(() => {
    if (arrNotification.length != 0) {
      alert("BẠN CÓ THÔNG BÁO MỚI CHƯA XEM");
    }
  }, [arrNotification]);
  const renderNotification = data => {
    return data.map((item, index) => {
      return (
        <p key={index}>
          {index + 1} . {item.notificationContent}
        </p>
      );
    });
  };
  const renderExercise = data => {
    return data.map((item, index) => {
      return (
        <p key={index}>
          {index + 1} . {item.tieuDe}
        </p>
      );
    });
  };
  const onGetArrayExercise = data => {
    if (localStorage.getItem("exerciseWatched")) {
      let arr = JSON.parse(localStorage.getItem("exerciseWatched"));
      data.map(item => {
        arr.push(item);
      });
      setArrExerciseWatched(arr);
      setNumberExercise([]);
      localStorage.setItem("exerciseWatched", JSON.stringify(arr));
      localStorage.removeItem("arrExerciseTwo");
    } else {
      let arr = arrExerciseWatched;
      data.map(item => {
        arr.push(item);
      });
      setNumberExercise([]);
      setArrExerciseWatched(arr);
      localStorage.setItem(
        "exerciseWatched",
        JSON.stringify(arrExerciseWatched)
      );
      localStorage.removeItem("arrExerciseTwo");
    }
  };
  const onGetArrayNotification = data => {
    if (localStorage.getItem("notificationWatched")) {
      let arr = JSON.parse(localStorage.getItem("notificationWatched"));
      data.map(item => {
        arr.push(item);
      });
      setArrNotificationWatched(arr);
      setNumberNotification([]);
      localStorage.setItem("notificationWatched", JSON.stringify(arr));
      localStorage.removeItem("arrNotificationTwo");
    } else {
      let arr = arrNotificationWatched;
      data.map(item => {
        arr.push(item);
      });
      setNumberNotification([]);
      setArrNotificationWatched(arr);
      localStorage.setItem(
        "notificationWatched",
        JSON.stringify(arrNotificationWatched)
      );
      localStorage.removeItem("arrNotificationTwo");
    }
  };
  return (
    <header className="header-thong-tin-khoa-hoc">
      <div className="container-header">
        <p
          style={{ cursor: "pointer" }}
          onClick={() => history.history.replace('/')}
        >
          PASSION.VN
        </p>
        <div className="avatar-thong-bao">
          <a
            style={{ cursor: "pointer" }}
            className="d-flex mt-2 wow swing infinite "
            onClick={() => {
              if (isClick === false) {
                setIsClick(true);
                setIsClick2(false);
              } else if (isClick === true) {
                setIsClick(false);
                setIsClick2(false);
              }
            }}
          >
            <i
              className={
                arrNotification.length !== 0 ? "far fa-bell wow swing" : "d-none"
              }
            />
            <span
              className={
                numberNotification.length !== 0 ? "thong-bao d-block" : "d-none"
              }
            >
              {numberNotification.length}
            </span>
          </a>
          <div className={isClick ? "content" : "d-none"}>
            <div className=" d-flex justify-content-between">
              <h5 className="font-weight-bold ">Thông báo mới</h5>
              <span
                style={{ cursor: "pointer", fontWeight: "bold" }}
                onClick={() => onGetArrayNotification(arrNotification)}
              >
                Xem tất cả
              </span>
            </div>

            <hr />
            {renderNotification(arrNotification)}
          </div>

          <a
            style={{ cursor: "pointer" }}
            className="d-flex  ml-3 mt-2 wow swing infinite"
            onClick={() => {
              if (isClick2 === false) {
                setIsClick(false);
                setIsClick2(true);
              } else if (isClick2 === true) {
                setIsClick(false);
                setIsClick2(false);
              }
            }}
          >
            <i
              className={
                arrExercise.length !== 0 ? "far fa-address-book" : "d-none"
              }
            />
            <span
              className={
                numberExercise.length !== 0
                  ? "ml-1 thong-bao d-block"
                  : "d-none"
              }
            >
              {numberExercise.length}
            </span>
          </a>
          <div className={isClick2 ? "content2" : "d-none"}>
            <div className=" d-flex justify-content-between">
              <h5 className="font-weight-bold ">Bài tập mới</h5>
              <span
                style={{ cursor: "pointer", fontWeight: "bold" }}
                onClick={() => onGetArrayExercise(arrExercise)}
              >
                Xem tất cả
              </span>
            </div>

            <hr />
            {renderExercise(arrExercise)}
          </div>

          <div className="avatar ml-3">
            <img
              src="https://cdn4.iconfinder.com/data/icons/avatars-21/512/avatar-circle-human-male-3-512.png"
              alt={123}
            />
          </div>
          <span className="ml-2 username font-weight-bold">
            {JSON.parse(localStorage.getItem("loginUser")).hoTen}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;

// useEffect(() => {
//   if (
//     localStorage.getItem("arrNotificationTwo") &&
//     localStorage.getItem("notificationWatched")
//   ) {
//     const notification = JSON.parse(localStorage.getItem("arrNotificationTwo"))
//     const watched = JSON.parse(localStorage.getItem("notificationWatched"))
//     for(let item of notification){
//       for(let watched of watched){
//         if(item.date === watched.date && item.notifi)
//       }
//     }

//     let arr = JSON.parse(localStorage.getItem("arrNotificationTwo")).filter(
//       item => {
//         return item.maKhoaHoc === MaKhoaHoc;
//       }
//     );
//     setArrNotification(arr);
//     setNumberNotification(arr);
//   }

// useEffect(() => {
//   if (localStorage.getItem("arrNotificationTwo")) {
//     const localNotification = JSON.parse(
//       localStorage.getItem("arrNotificationTwo")
//     );
//     let arr = localNotification.filter(item => {
//       return item.maKhoaHoc === MaKhoaHoc;
//     });
//     setArrNotification(arr);
//     setNumberNotification(arr);
//   }
// }, []);

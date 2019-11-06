import { restConnector } from "../Connectors/Axios";

class CourseService {
  fetchCourse = () => {
    return restConnector({
      url: `/QuanLyKhoaHoc/LayDanhSachKhoaHoc`,
      method: "GET"
    });
  };
  fetchCourseDetail = (courseID) => {
    return restConnector({
      url: `/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${courseID}`,
      method: "GET"
    });
  }
  fetchListUserCourse = (maKhoaHoc) => {
    return restConnector({
      url:`/QuanLyKhoaHoc/LayThongTinHocVienKhoaHoc?maKhoaHoc=${maKhoaHoc}`,
      method:"GET"
    })
  }
  deleteCourse = (MaKhoaHoc) => {
    return restConnector({
      url:`/QuanLyKhoaHoc/XoaKhoaHoc?maKhoaHoc=${MaKhoaHoc}`,
      method:'DELETE', 
    })
  }
  updateCourse = obj => {
    return restConnector({
      url:`/QuanLyKhoaHoc/CapNhatKhoaHoc`,
      method:'PUT',
      data:obj
    })
  }
  addCourse = obj => {
    return restConnector({
      url:`/QuanLyKhoaHoc/ThemKhoaHoc`,
      method:'POST',
      data:obj
    })
  }
  subscribeCourse = obj => {
    return restConnector({
      url:`/QuanLyKhoaHoc/GhiDanhKhoaHoc`,
      method:'POST',
      data:obj
    })
  }
  unsubscribeCourse = obj => {
    return restConnector({
      url:`/QuanLyKhoaHoc/HuyGhiDanh`,
      method:'POST',
      data:obj
    })
  }
  fetListUserNotSubscribeCourse = obj =>{
    return restConnector({
      url:`QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh`,
      method:'POST',
      data:obj
    })
  }
  fetchListUserNotApproval = obj => {
    return restConnector({
      url:`QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet`,
      method:'POST',
      data:obj
    })
  }
  fetListCourseUserSubscribe = obj => {
    return restConnector({
      url:`QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet`,
      method:'POST', 
      data:obj
    })
  }
  fetListCourseUserNotSubscribe = obj => {
    return restConnector({
      url:`QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh?TaiKhoan=${obj}`,
      method:'POST',  
    })
  }
  fetchListCourseNotApproval = obj => {
    return restConnector({
      url:`QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet`,
      method:'POST',  
      data:obj
    })
  }
  registerCourse = obj => {
    return restConnector({
      url:`QuanLyKhoaHoc/DangKyKhoaHoc`,
      method:'POST',  
      data:obj
    })
  }
}
 
export default new CourseService();

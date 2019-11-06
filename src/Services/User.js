import { restConnector } from '../Connectors/Axios'

class UserService {
    Login = (user) => {
        return restConnector({
            url:'/QuanLyNguoiDung/DangNhap',
            method:'POST',
            data:user
        });
    };
    Register = (user) => {
        return restConnector({
            url:'/QuanLyNguoiDung/DangKy',
            method:'POST',
            data:user
        })
    }
    fetchListUser = () => {
        return restConnector({
            url:'/QuanLyNguoiDung/LayDanhSachNguoiDung',
            method:'GET',
        })
    }
    deleteUser = (user) => {
        return restConnector({
            url:`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${user}`,
            method:'DELETE', 
        })
    } 
    fetchInformationUser = obj => {
        return restConnector({
            url:`QuanLyNguoiDung/ThongTinTaiKhoan`,
            method:'POST', 
            data:obj
        })
    }
    updateInformationUser = obj => {
        return restConnector({
            url:`QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
            method:'PUT', 
            data:obj
        })
    }
    addUser = obj => {
        return restConnector({
            url:`QuanLyNguoiDung/ThemNguoiDung`,
            method:'POST', 
            data:obj
        })
    }
    searchUser = tuKhoa => {
        return restConnector({
          url:`QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${tuKhoa}`,
          method:'GET', 
        })
      }
       
      fetListUserCourse = obj => {
        return restConnector({
          url:`QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc`,
          method:'POST',
          data:obj
        })
      }
}
export default new UserService()    
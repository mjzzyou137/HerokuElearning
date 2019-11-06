import React,{useEffect} from "react";
import { connect } from 'react-redux'

const tabArr = [
  {
    id: "#gioithieu",
    icon: "fas fa-university",
    name: "GIỚI THIỆU VỀ KHÓA HỌC",
    collapse:'gioithieu'
  },
  {
    id: "#muctieu",
    icon: "fas fa-tags",
    name: "MỤC TIÊU KHÓA HỌC",
    collapse:'muctieu'
  },
  {
    id: "#yeucau",
    icon: "fas fa-file-medical-alt",
    name: "NHỮNG YÊU CẦU TRƯỚC KHI HỌC ?",
    collapse:'yeucau'
  },
  {
    id: "#doituong",
    icon: "fas fa-users",
    name: " ĐỐI TƯỢNG NÊN HỌC KHÓA HỌC ?",
    collapse:'doituong'
  }
];
const GioiThieuKhoaHoc = ({courseDetail}) => {  
  const renderTongQuan = data => {
    return data.map((item, index) => {
      return (
        <>
          <div
            className=" my-3 py-3  item"
            data-toggle="collapse"
            data-target={item.id}
            key={index}
          >
            <div className="border-item">
              <i className={item.icon} />
            </div>
            {item.name}
          </div>
          <div
            id={item.collapse}
            className="collapse"
            style={{
              padding: 15,
              color: "#19224d",
              background: "white",
              border: "1px solid blue"
            }}
          >
            Vivamus magna justo, lacinia eget consectetur sed, convallis at
            tellus. Sed porttitor lectus nibh. Sed porttitor lectus nibh. Sed
            porttitor lectus nibh. Nulla porttitor accumsan tincidunt. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Cras ultricies
            ligula sed magna dictum porta. Donec rutrum congue leo eget
            malesuada. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar
            a. Vivamus magna justo, lacinia eget consectetur sed, convallis at
            tellus. Donec rutrum congue leo eget malesuada. Praesent sapien
            massa, convallis a pellentesque nec, egestas non nisi.
          </div>
        </>
      );
    });
  };
  return (
    <>
      {" "}
      <div className="row">
        <div className="col-md-8 ">
          <h3>TỔNG QUAN KHÓA HỌC</h3>
          {renderTongQuan(tabArr)}
        </div>
        <div className="col-md-4 bg-white text-dark">
          <div className="container1">
            <div className="hinh-anh-khoa-hoc">
              <img
                src={courseDetail.hinhAnh}
                alt
              />
            </div>
            <ul>
              <li>Tên khóa học : <span style={{textTransform:'uppercase'}}>{courseDetail.tenKhoaHoc}</span></li>
              <li>Ngày tạo : <span style={{textTransform:'uppercase'}}>{courseDetail.ngayTao}</span></li>
              {/* <li>Danh mục khóa học : <span style={{textTransform:'uppercase'}}></span></li> */}
              {/* <li>Người tạo : <span style={{textTransform:'uppercase'}}></span></li> */}
              <li>Lượt xem : <span style={{textTransform:'uppercase'}}>{courseDetail.luotXem}</span></li>
              <li>Mã nhóm : <span style={{textTransform:'uppercase'}}>{courseDetail.maNhom}</span></li>
              <li>Mô tả : <span style={{textTransform:'uppercase'}}>{courseDetail.moTa}</span></li>
              <li>Giảng viên : <span style={{textTransform:'uppercase'}}>{courseDetail.nguoiTao ? courseDetail.nguoiTao.hoTen:'' }</span></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = state => {
  return {
    courseDetail:state.course.courseDetail
  }
}
export default connect(mapStateToProps)(GioiThieuKhoaHoc);

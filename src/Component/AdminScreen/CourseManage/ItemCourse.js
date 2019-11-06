import React,{useState} from "react"; 
import SweetAlert from 'sweetalert-react';
import { makeStyles } from "@material-ui/core/styles"; 
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions"; 
import Avatar from "@material-ui/core/Avatar"; 
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors"; 
import CourseService from '../../../Services/Course'
import {Link} from 'react-router-dom'
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));
const ItemCourse = props => {
  let [deleteCourseErr,setDeleteCourseErr] = useState(false)
  let [deleteCourseRes,setDeleteCourseRes] = useState(false)
  let { maKhoaHoc, tenKhoaHoc, ngayTao, hinhAnh, luotXem, nguoiTao, moTa } = props.item;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
 
  const DeleteCourse = (maKhoaHoc) => {
    CourseService.deleteCourse(maKhoaHoc).then(res=>{
      setDeleteCourseRes(true)
    }).catch(err=>{
      setDeleteCourseErr(true)
    })
  };
  return (
    <>
    {/* Sweet Alert */}
    <div> 
    <SweetAlert 
        show={deleteCourseRes}
        title="XÓA THÀNH CÔNG"
        text="KHÓA HỌC ĐÃ ĐƯỢC XÓA"
        onConfirm={() => {
          setDeleteCourseRes(false)
          window.location.reload()
        }}
      />
      <SweetAlert 
        show={deleteCourseErr}
        title="XÓA THẤT BẠI"
        text="KHÓA HỌC ĐÃ GHI DANH HỌC VIÊN KHÔNG THỂ XÓA"
        onConfirm={() => setDeleteCourseErr(false)}
      />
    </div>
      <Card
        className={classes.card}
        className="cardAdmin"
        style={{ width: "31.3%", margin: "1% 1%", position: "relative" }}
      >
        <CardHeader
          style={{ textTransform: "uppercase" }}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              <p style={{ textTransform: "uppercase" }}>
                {nguoiTao.taiKhoan.slice(0, 1)}
              </p>
            </Avatar>
          }
          title={tenKhoaHoc}
          subheader={ngayTao}
        />
        <CardMedia
          className={classes.media}
          image={hinhAnh}
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {moTa}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          &nbsp;&nbsp;<i className="fas fa-eye"></i>&nbsp; {luotXem} Lượt xem
         
        </CardActions>
       
        <div className="hoverCardCourse"></div>
        <div className="divButton">
          <Link to={`/notification/${maKhoaHoc}`} className="btn btnCourse thongbao">THÔNG BÁO</Link>
          <Link to={`/lesson/${maKhoaHoc}`} className="btn btnCourse baiHoc">BÀI HỌC</Link>
          <Link to={`/exercise/${maKhoaHoc}`} className="btn btnCourse baiTap">BÀI TẬP</Link>
          <Link to={`/subscribe-user-course/${maKhoaHoc}`} className="btn btnCourse ghiDanhKhoaHoc">GHI DANH HỌC VIÊN</Link>
          <button className="btn btnCourse xoaKhoaHoc" onClick={()=>DeleteCourse(maKhoaHoc)}>XÓA KHÓA HỌC</button>
          <Link to={`/update-course/${maKhoaHoc}`} className="btn btnCourse chinhSuaKhoaHoc">CHỈNH SỬA KHÓA HỌC</Link>
          <Link to={`/list-user-course/${maKhoaHoc}`}className="btn btnCourse hocVienKhoaHoc">HỌC VIÊN KHÓA HỌC</Link>
          <Link to={`/list-user-wait-approval/${maKhoaHoc}`} className="btn btnCourse hocVienChoXetDuyet">HỌC VIÊN CHỜ XÉT DUYỆT</Link>
        </div>
      </Card>
    </>
  );
};

export default ItemCourse;

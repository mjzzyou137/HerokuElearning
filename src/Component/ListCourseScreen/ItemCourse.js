import React,{useEffect,useState} from 'react'; 
import { makeStyles } from "@material-ui/core/styles"; 
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia"; 
import CardActions from "@material-ui/core/CardActions"; 
import Avatar from "@material-ui/core/Avatar";  
import '../../Screens/animate.css' 
import WOW from 'wowjs'
import { Link } from 'react-router-dom'
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
      backgroundColor: '#19224d'
    }
  }));
const ItemCourse = (props) => {
  let [ price ,setPrice ] = useState()
  useEffect(()=>{
    new WOW.WOW().init();
    setPrice(props.item.luotXem*1 + 0.99)
  },[])
    const classes = useStyles();
    let { maKhoaHoc, tenKhoaHoc, ngayTao, hinhAnh, luotXem, nguoiTao, moTa } = props.item;

    return (
        <Card 
        className={classes.card}
        className="cardAdmin wow pulse"
        style={{   marginTop:'35px',fontWeight:'bold',color:'#19224d', border:'2px solid #19224d'}}
      >
        <CardHeader
          style={{ textTransform: "uppercase",fontSize:'20px' }}
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
          title={tenKhoaHoc}
        /> 
        <div style={{padding:'8px'}} className="d-flex justify-content-between align-items-center">
          <div className="star">
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
          </div>
          <h3 style={{fontSize:'23px',fontWeight:'bold'}}>${price}</h3>
        </div>
        <CardActions disableSpacing className="d-flex justify-content-between w-100"> 
         <Link className="w-100" to={`/detail-course-home/${maKhoaHoc}`}onClick={()=>{
           window.scroll({top:0})
         }}>
         <button className="btn btn-detail w-100">CHI TIẾT</button>
         </Link>
        </CardActions>
      </Card> 
    );
};

export default ItemCourse;
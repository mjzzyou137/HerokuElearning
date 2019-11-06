import React,{useEffect} from 'react'; 
import img1 from '../../assets/HomeScreen/2.jpg'
import "animate.css";
import WOW from 'wowjs'
const Contact = () => {
  
  useEffect(()=>{
    new WOW.WOW().init();
  },[])
    return (
       <section className="choose py-5" style={{backgroundImage:`url(${img1})`}}>
  <div className="container py-md-4 mt-md-3"> 
    <div className="row inner_w3l_agile_grids-1 ">
      <div className="col-lg-6 w3layouts_choose_left_grid1">
        <div className="choose_top wow lightSpeedIn">
          <h4 className="mb-3 mt-3 text-white">Chúng tôi tin vào tiềm năng của con người</h4>
          <p className="text-white">Bất kể ai cũng có thể là một lập trình, tham gia trong đội ngữ Tech, bất kể tuổi tác, nền tảng, giới tính hoặc tình trạng tài chính. Chúng tôi không bỏ qua những người mới bắt đầu hoặc chưa có kinh nghiệm theo đuổi đam mê lập trình. Thay vào đó, chúng tôi chào đón học viên của tất cả các cấp độ kinh nghiệm.</p>
          <a href="services.html" className="btn btn-primary mt-3">Đọc thêm</a>
        </div>
      </div>
      <div className="col-lg-6 w3layouts_choose_left_grid2 wow animated fadeInUp">
        <div className="row">
          <div className="col-md-6 w3l_choose_bottom1 mt-3 pt-md-4">
            <div className="choose_bottom_top wow slideInUp">
              <i className="fas fa-globe mb-2" />
              <h5 className="card-title text-uppercase my-3">FRONT END</h5>
              
            </div>
          </div>
          <div className="col-md-6 w3l_choose_bottom2 wow animated fadeInUp">
            <div className="choose_bottom_top wow slideInUp">
              <i className="fas fa-book mb-2" />
              <h5 className="card-title text-uppercase my-3">BACK END</h5>
              
            </div>
          </div>
          <div className="col-md-6 w3l_choose_bottom3 mt-3 pt-md-4 wow animated fadeInUp">
            <div className="choose_bottom_top wow slideInUp">
              <i className="fas fa-graduation-cap mb-2" />
              <h5 className="card-title text-uppercase my-3">JAVA</h5>
              
            </div>
          </div>
          <div className="col-md-6 w3l_choose_bottom4 wow animated fadeInUp">
            <div className="choose_bottom_top wow slideInUp">
              <i className="fas fa-globe mb-2" />
              <h5 className="card-title text-uppercase my-3">FULL STACK</h5>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>   
</section>

    );
};

export default Contact;
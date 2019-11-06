import React,{useEffect} from 'react'; 
import img1 from '../../assets/HomeScreen/4.jpg'
import img2 from '../../assets/HomeScreen/5.jpg' 
import '../../Screens/animate.css'
import WOW from 'wowjs'
const Advantages = () => {
   useEffect(()=>{
    new WOW.WOW().init();
  },[])
    return (
       <section className="banner-bottom py-lg-5 py-md-5 py-3">
  <div className="container">
    <div className="inner-sec py-lg-5 py-3">
      <h3 className="heading-agileinfo text-center  wow fadeInUp">Giới thiệu về <span>Passion</span></h3>
      <div className="row middle-grids mt-lg-5 pt-5">
        <div className="col-lg-6 advantage-grid-info1">
          <div className="advantage_left1 text-center  wow fadeInUp">
            <img src={img1} className="img-fluid" alt="img" />
          </div>
        </div> 
        <div className="col-lg-6 advantage-grid-info pt-md-5  wow fadeInUp">
          <div className="advantage_left">
            <h4 className="mb-2">Đào tạo chuyên gia lập trình</h4>
            <h3>SỨ MỆNH</h3>
            <p className="mt-2">Sử dụng các phương pháp đào tạo hiện đại để tạo ra đội ngũ nhân sự lập trình chất lượng cao.</p>
          </div>
        </div>
      </div>
      <div className="row middle-grids pt-lg-5">
        <div className="col-lg-6 advantage-grid-info pt-md-5 mt-md-5 ">
          <div className="advantage_left wow fadeInUp">
            <h4 className="mb-2">Đào tạo chuyên gia lập trình</h4>
            <h3>ĐỘI NGŨ GIẢNG VIÊN</h3>
            <p className="mt-2">Passion tuyển chọn các giảng viên đến từ các doanh nghiệp, có nhiều năm kinh nghiệm trong việc xây dựng các dự án lớn tại các tập đoàn trong và ngoài nước. Có kinh nghiệm trong việc chia sẻ kiến thức, phân tích dự án, tận tâm và hỗ trợ hết mình để học viên luôn học hỏi được các kinh nghiệm thực chiến, học tập kiến thức mới nhất từ thực tế, áp dụng ngay vào công việc ngay sau khóa học. Các giảng viên được tham gia khóa huấn luyện đào tạo tích hợp do đại học Arizona - ASU - Mỹ và tập đoàn Intel tài trợ để áp dụng các phương pháp giảng dạy hiện đại trong đào tạo nghề chất lượng cao.</p>
          </div>
        </div>
        <div className="col-lg-6 advantage-grid-info1">
          <div className="advantage_left2 text-center  wow fadeInUp">
            <img src={img2} className="img-fluid" alt="img" />
          </div>
        </div> 
      </div>
    </div>
  </div>
</section>

    );
};

export default Advantages;
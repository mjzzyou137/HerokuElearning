import React from 'react';

const Footer = ({listCourse}) => { 
    return (
       <div>
  <footer className="newsletter_right pymd-5 py-4" id="footer">
    <div className="container">
      <div className="inner-sec py-md-5 py-3">
        <div className="row mb-md-4 mb-md-3 text-white">
          <div className="col-lg-3 col-md-6 social-info text-left">
            <h3 className="tittle1 foot mb-md-5 mb-4 text-white">PASSION ACADEMY</h3>
            <p>Hệ thống đào tạo lập trình chuyên sâu theo dự án thực tế.</p>
            <p className="my-2"> 459 Sư Vạn Hạnh – Quận 10</p>
            <p className="phone">Phone: 096.105.1014</p>
            <p className="phone my-2">Fax: 098.407.5835</p>
            <p className="phone">Mail:
              <a> passion@gmail.com</a>
            </p>
          </div>
          <div className="col-lg-3 col-md-6 social-info text-left">
            <h3 className="tittle1 foot mb-md-5 mb-4 text-white">NHẬN TIN SỰ KIỆN & KHUYẾN MÃI</h3>
            <p>Passion sẽ gởi các khóa học trực tuyến & các chương trình PassionLive hoàn toàn MIỄN PHÍ và các chương trình KHUYẾN MÃI hấp dẫn đến các bạn.</p>
          </div>
          <div className="col-lg-6 col-md-12 n-right tex-left">
            <h3 className="tittle1 foot mb-md-5 mb-4 text-white">ĐĂNG KÍ TƯ VẤN</h3>
            <form action="#" method="post">
              <div className="form-group d-flex">
                <input className="form-control" type="email" name="Email" placeholder="Email liên hệ" required />
                <input className="form-control submit text-uppercase" type="submit" defaultValue="Subscribe" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </footer>
   
</div>

    );
};

export default Footer;
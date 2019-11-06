import React,{useEffect} from 'react'; 
import "../../Screens/animate.css"; 
import WOW from 'wowjs'
const WhatWeDo = () => {
  useEffect(()=>{
    new WOW.WOW().init();
  },[])
    return (
       <section className="banner-bottom-wthree py-lg-5 py-md-5 py-3">
  <div className="container">
    <div className="inner-sec-w3ls py-lg-5 py-3  " > 
      <h3 className="heading-agileinfo text-center wow fadeInUp" ><span>Chúng tôi</span> có gì ?</h3>
 
      <div className="row middle-grids mt-md-5 pt-4">
        <div className="col-lg-4 about-in-w3ls middle-grid-info text-center">
          <div className="card wow fadeInUp">
            <div className="card-body">
              <i className="fas fa-graduation-cap mb-2" />
              <h5 className="card-title text-uppercase my-3 ">
              Học theo lộ trình, có định hướng</h5>
              <p className="card-text">Phát triển năng lực và niềm đam mê cảm hứng lập trình của bạn.
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 about-in-w3ls middle-grid-info active text-center">
          <div className="card wow fadeInUp">
            <div className="card-body">
              <i className="fas fa-book mb-2" />
              <h5 className="card-title text-uppercase my-3">Nền tảng, tư duy, cốt lõi trong lập trình</h5>
              <p className="card-text">Bạn sẽ tự tin trước sự thay đổi của công nghệ và môi trường làm việc.
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 about-in-w3ls middle-grid-info text-center">
          <div className="card wow fadeInUp">
            <div className="card-body">
              <i className="fas fa-globe mb-2" />
              <h5 className="card-title text-uppercase my-3">Công nghệ mới, chuyên sâu, thực tế</h5>
              <p className="card-text">Bạn được học và trải nghiệm các công nghệ lập trình mới nhất.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    );
}; 

export default WhatWeDo;
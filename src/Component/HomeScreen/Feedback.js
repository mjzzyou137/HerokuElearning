import React from "react";
import img1 from "../../assets/HomeScreen/avatar_1.jpg";
import img2 from "../../assets/HomeScreen/avatar_2.jpg";
import img3 from "../../assets/HomeScreen/avatar_3.jpg";
import img4 from "../../assets/HomeScreen/avatar_4.jpg";
import img5 from "../../assets/HomeScreen/avatar_5.jpg";
import img6 from "../../assets/HomeScreen/avatar_6.jpg";
import img7 from "../../assets/HomeScreen/avatar_7.jpg";
import img8 from "../../assets/HomeScreen/avatar_8.jpg";
import img9 from "../../assets/HomeScreen/avatar_9.jpg"; 
import img10 from "../../assets/HomeScreen/1.jpg"; 
import Slider from "react-slick";

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3, 
  slidesToScroll: 1
};
const Feedback = () => {
  return (
    <section className="news" style={{background:`url(${img10}) no-repeat center fixed`,backgroundSize:'cover'}}>
      <div className="container py-xl-5 py-lg-3">
      <h3 className="heading-agileinfo text-white text-center">
          Cảm nhận của <span> học viên</span>
        </h3>
        <Slider  {...settings} className="mt-md-5 pt-4">
          <div className="item">
            <div className="feedback-info bg-white py-5 mx-2 px-4">
              <h4 className="mb-2">Lập trình Front-End chuyên sâu</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit sedc
                dnmo.
              </p>
              <div className="feedback-grids mt-4">
                <div className="feedback-img">
                  <img
                    src={img2}
                    className="img-fluid rounded-circle"
                    alt="img"
                  />
                </div>
                <div className="feedback-img-info">
                  <h5>Nguyễn Thế Mẫn</h5>
                </div>
                <div className="clearfix"> </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="feedback-info bg-white py-5 mx-2 px-4">
              <h4 className="mb-2">Lập trình Back-End chuyên sâu</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit sedc
                dnmo.
              </p>
              <div className="feedback-grids mt-4">
                <div className="feedback-img">
                  <img
                    src={img1}
                    className="img-fluid rounded-circle"
                    alt="img"
                  />
                </div>
                <div className="feedback-img-info">
                  <h5>Nguyễn Thiện Hảo</h5>
                </div>
                <div className="clearfix"> </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="feedback-info bg-white py-5 mx-2 px-4">
              <h4 className="mb-2">Tư duy lập trình - Hướng đối tượng</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit sedc
                dnmo.
              </p>
              <div className="feedback-grids mt-4">
                <div className="feedback-img">
                  <img
                    src={img3}
                    className="img-fluid rounded-circle"
                    alt="img"
                  />
                </div>
                <div className="feedback-img-info">
                  <h5>Nguyễn Trung Hiếu</h5>
                </div>
                <div className="clearfix"> </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="feedback-info bg-white py-5 mx-2 px-4">
              <h4 className="mb-2">Lập trình Front-End chuyên sâu</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit sedc
                dnmo.
              </p>
              <div className="feedback-grids mt-4">
                <div className="feedback-img">
                  <img
                    src={img5}
                    className="img-fluid rounded-circle"
                    alt="img"
                  />
                </div>
                <div className="feedback-img-info">
                  <h5>Hồ Nhất Hào</h5>
                </div>
                <div className="clearfix"> </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="feedback-info bg-white py-5 mx-2 px-4">
              <h4 className="mb-2">Lập trình Back-End chuyên sâu</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit sedc
                dnmo.
              </p>
              <div className="feedback-grids mt-4">
                <div className="feedback-img">
                  <img
                    src={img4}
                    className="img-fluid rounded-circle"
                    alt="img"
                  />
                </div>
                <div className="feedback-img-info">
                  <h5>Xiao Xiang</h5>
                </div>
                <div className="clearfix"> </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="feedback-info bg-white py-5 mx-2 px-4">
              <h4 className="mb-2">Tư duy lập trình - Hướng đối tượng</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit sedc
                dnmo.
              </p>
              <div className="feedback-grids mt-4">
                <div className="feedback-img">
                  <img
                    src={img7}
                    className="img-fluid rounded-circle"
                    alt="img"
                  />
                </div>
                <div className="feedback-img-info">
                  <h5>Đặng Trung Hiếu</h5>
                </div>
                <div className="clearfix"> </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="feedback-info bg-white py-5 mx-2 px-4">
              <h4 className="mb-2">Lập trình Front-End chuyên sâu</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit sedc
                dnmo.
              </p>
              <div className="feedback-grids mt-4">
                <div className="feedback-img">
                  <img
                    src={img6}
                    className="img-fluid rounded-circle"
                    alt="img"
                  />
                </div>
                <div className="feedback-img-info">
                  <h5>Dinh Phuc Nguyen</h5>
                </div>
                <div className="clearfix"> </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="feedback-info bg-white py-5 mx-2 px-4">
              <h4 className="mb-2">Lập trình Back-End chuyên sâu</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit sedc
                dnmo.
              </p>
              <div className="feedback-grids mt-4">
                <div className="feedback-img">
                  <img
                    src={img8}
                    className="img-fluid rounded-circle"
                    alt="img"
                  />
                </div>
                <div className="feedback-img-info">
                  <h5>Nguyễn Đức Dân</h5>
                </div>
                <div className="clearfix"> </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="feedback-info bg-white py-5 mx-2 px-4">
              <h4 className="mb-2">Tư duy lập trình - Hướng đối tượng</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit sedc
                dnmo.
              </p>
              <div className="feedback-grids mt-4">
                <div className="feedback-img">
                  <img
                    src={img9}
                    className="img-fluid rounded-circle"
                    alt="img"
                  />
                </div>
                <div className="feedback-img-info">
                  <h5>Nguyễn Tiến Minh Tuấn</h5>
                </div>
                <div className="clearfix"> </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </section> 
  );
};

export default Feedback;

import React, { useState, useEffect } from "react";
import Carousel, { Modal, ModalGateway } from 'react-images';
const Album = ({ arrImgSrc }) => {
  let [indexImage , setIndexImage] = useState();
  let [ arrImage ,setArrImage ] = useState([])
  let [isClick, setIsClick] = useState(false); 
  useEffect(()=>{
    let obj = {}
    let arr = arrImgSrc.map(item=>{
      return obj = {
        source:item.imgSrc
      }
    })
    console.log(arr)
    setArrImage(arr)
  },[arrImgSrc])
  const images = arrImage;
  const renderListAlbum = data => {
    return data.map((item, index) => {
      return (
        <div className="col-md-4 px-0 " key={index}>
          <div
            className="divItemImg"
            onClick={() => { 
              setIndexImage(index)
              setIsClick(!isClick);
            }}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                padding: "3.5px 3.5px 3.5px 3.5px"
              }}
              src={item.imgSrc}
            />
          </div>
        </div>
      );
    });
  };
  return (
    <div className="modalAlbum">
       <ModalGateway> 
         {isClick ? (
            <Modal onClose={()=>setIsClick(!isClick)}>
            <Carousel views={images} currentIndex={indexImage} />
          </Modal> 
         ):''}
      </ModalGateway>
      <div
        className="modal fade"
        id="albumAnh"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body p-1">
              <h3 className="text-center pt-3">Ảnh trên dòng thời gian</h3>
              <hr/>
              <div className="row w-100 m-0" style={{ padding: "0 2.5px" }}>
                {arrImgSrc.length !== 0 ?renderListAlbum(arrImgSrc):'Album ảnh trống'}
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default Album;

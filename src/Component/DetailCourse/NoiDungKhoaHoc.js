import React,{useState,useEffect} from 'react';
import ReactImageVideoLightbox from 'react-image-video-lightbox';
const NoiDungKhoaHoc = ({MaKhoaHoc}) => {
  let [ state , setState ] = useState(false)
  let [ number , setNumber ] = useState(0)
  let [ arrLesson , setArrLesson ] = useState([])
  let [ arrLinkVideo , setArrLinkVideo ] = useState([])
  useEffect(()=>{
    const LocalLesson = localStorage.getItem("arrLessonTwo")
    if(LocalLesson){
      let arr = JSON.parse(LocalLesson).filter(item=>{
        return item.maKhoaHoc === MaKhoaHoc
      }) 
      let obj = {}
      let arrVideo = arr.map(item=>{
        return  obj = {
          url: item.link, 
          type: 'video',
           altTag: 'placeholder video' 
        } 
      }) 
      setArrLinkVideo(arrVideo)
      setArrLesson(arr)
    }
  },[])
  const renderListLesson = data => {
    return data.map((item,index)=>{
      return (
        <li key={index} onClick={() => {
          setState(true);
          setNumber(index)
          window.scrollTo({ top: 0});
        }}>
          <div className="border-item">
            <i className="fas fa-play-circle" />
          </div>
          Bài {index+1} : {item.name}
        </li>
      )
    })
  }
    return (
      <>
        <div className="row">
        <div className="col-md-12 ">
          <h3>NỘI DUNG KHÓA HỌC</h3>
          <div className="row khoa-hoc noi-dung-khoa-hoc">
            <div className="col-md-12" >
            {arrLesson.length !== 0 ? <ul>{renderListLesson(arrLesson)}</ul>:<h1 className="mt-3" style={{color:"#19224D"}}>Chưa có bài học</h1>} 

            
            </div>
          </div>
        </div>
      </div>
      {
                  state && <ReactImageVideoLightbox
                  data={arrLinkVideo}
                  startIndex={number}
                  showResourceCount={true}
                  style={{zIndex:'20 !important'}}
                  onCloseCallback={() =>setState(false)} />
                }
      </>
    );
};

export default NoiDungKhoaHoc;
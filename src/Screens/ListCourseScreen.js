import React,{useEffect,useState} from "react";
import Header from "../Component/HomeScreen/Header";
import Banner from "../Component/HomeScreen/Banner";
import Footer from '../Component/HomeScreen/Footer';
import {VerticleButton as ScrollUpButton} from "react-scroll-up-button";

import ListCourse from "../Component/ListCourseScreen/ListCourse";
import './ListCourseScreen.scss'
const ListCourseScreen = (props) => {
  useEffect(()=>{
    console.log(props)
  })
  return (
    <div className="listCourse">
      <Header match={props.match}></Header>
      <Banner listCourse={props.match.path}></Banner>
      <ListCourse keyword={props.match.params.keyword}/>
      <Footer listCourse={props.match.path}/>
              <ScrollUpButton />
    </div>
  );
};

export default ListCourseScreen;

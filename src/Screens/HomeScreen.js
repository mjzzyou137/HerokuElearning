import React,{useEffect} from 'react';
import Header from '../Component/HomeScreen/Header'
import Banner from '../Component/HomeScreen/Banner'
import CourseSearch from '../Component/HomeScreen/CourseSearch'
import WhatWeDo from '../Component/HomeScreen/WhatWeDo'
import Contact from '../Component/HomeScreen/Contact'
import Advantages from '../Component/HomeScreen/Advantages'
import Feedback from '../Component/HomeScreen/Feedback'
import Achievements from '../Component/HomeScreen/Achievements'
import Footer from '../Component/HomeScreen/Footer'   
import './HomeScreen.scss'  
import { connect } from 'react-redux';
import {VerticleButton as ScrollUpButton} from "react-scroll-up-button";
 
const HomeScreen = (props) => { 
    return (
        <>
        <div className='banner'> 
            <Header match={props.match}/>
            <Banner/>
        </div>
            <CourseSearch/>
            <WhatWeDo/>
            <Contact/>
            <Advantages/>
            <Feedback/>
            <Achievements/>
            <Footer/>
            <ScrollUpButton />
        </>
    );
};
 
export default connect()(HomeScreen);
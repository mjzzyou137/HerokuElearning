import React from 'react';
import MyCourse from '../Component/UserScreen/MyCourse'
import './UserScreen.scss'
import { connect } from 'react-redux'
const UserScreen = (props) => { 
    return (
        <>
        <MyCourse {...props}/>
        </>
    );
};

export default connect()(UserScreen);
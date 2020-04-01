import React, {useState} from 'react'
import './Welcome.css'
import Login from "../Login/Login";
import HeaderWelcome from "../AppBar/HeaderW/HeaderWelcome";




class Welcome extends React.Component {


    render() {
        const logo = require('../assets/cookupz_logo.jpg');

        return(
            <div>
                <HeaderWelcome/>
                <div className={"wContainer"}>
                    <img className={"logo"} src={logo}/>
                    <Login></Login>
                </div>
            </div>
        )
    }
}

export default Welcome
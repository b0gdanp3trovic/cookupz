import React from 'react'
import './Header.css'
import {Link, withRouter} from "react-router-dom";



function Header (props) {
    const bell = require('../../assets/bell.png');


    function handleLogout(){
        localStorage.clear();
        props.history.push('/')
    }

    return (
        <div className={"headerDash"}>
            <div className={"innerHeader"}>
                <div className={"logoContainer"}>
                    <h1>Cook<span>upz</span></h1>
                </div>
                <ul className={"navigation"}>
                    <div className={"subNavWrapper"}>
                        <div className={"notification"}>
                            <img className={"bellImg"} src={bell}/>
                        </div>
                        <Link className={"logoutLink"} onClick={handleLogout}>Log out</Link>
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default withRouter(Header)

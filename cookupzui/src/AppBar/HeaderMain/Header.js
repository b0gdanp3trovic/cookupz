import React from 'react'
import './Header.css'
import {Link, withRouter} from "react-router-dom";



function Header (props) {

    function handleLogout(){
        localStorage.clear();
        props.history.push('/')
    }

    return (
        <div className={"header"}>
            <div className={"innerHeader"}>
                <div className={"logoContainer"}>
                    <h1>Cook<span>upz</span></h1>
                </div>
                <ul className={"navigation"}>
                    <Link className={"logoutLink"} onClick={handleLogout}>Log out</Link>
                </ul>
            </div>
        </div>
    )
}

export default withRouter(Header)

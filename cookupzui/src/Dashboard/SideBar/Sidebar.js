import React, {useContext, useState} from 'react'
import './Sidebar.css'
import {Link} from "react-router-dom";
import {AppContext} from "../../contexts/AppContext";

class Sidebar extends React.Component {
    static context = AppContext;
    componentDidMount() {
        this.setState({currentUsername: localStorage.getItem("currentUsername")});
    }


    render() {
        let profileLink = "/profile/";
        if(this.state) {
            profileLink += this.state.currentUsername;
        }

        return (
            <div className={"sidebar"}>
                <ul>
                    <li><Link to={profileLink} className={"sidebarLink"}>My profile</Link></li>
                    <li><Link to={"/dashboard"} className={"sidebarLink"}>Explore</Link></li>
                    <li><Link to={"/offer"} className={"sidebarLink"}>Offer</Link></li>
                </ul>
            </div>
        );
    }
}

export default Sidebar;
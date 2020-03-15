import React, {useContext, useState} from 'react'
import Sidebar from "./SideBar/Sidebar";
import {AppContext} from "../contexts/AppContext";
import axios from "axios";



export default function Dashboard (props) {

    return(

        <div>
            {props.header}
            <Sidebar/>
            <div className={"postsContent"}>

            </div>
        </div>
    )
}



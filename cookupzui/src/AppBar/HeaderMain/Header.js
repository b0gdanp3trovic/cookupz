import React from 'react'
import './Header.css'



export default function Header () {
    return (
        <div className={"header"}>
            <div className={"innerHeader"}>
                <div className={"logoContainer"}>
                    <h1>Cook<span>upz</span></h1>
                </div>
                <ul className={"navigation"}>
                    <a href={"#"}><li>Log out</li></a>
                </ul>
            </div>
        </div>
    )
}

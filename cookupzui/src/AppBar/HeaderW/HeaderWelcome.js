import React from 'react'
import './HeaderWelcome.css'



export default function HeaderWelcome () {
    return (
        <div className={"header"}>
            <div className={"innerHeader"}>
                <div className={"logoContainer"}>
                    <h1>Cook<span>upz</span></h1>
                </div>
                <ul className={"navigation"}>
                    <a href={"#"}><li>Login</li></a>
                </ul>
            </div>
        </div>
    )
}

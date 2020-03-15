import React, {useState} from 'react'
import './Welcome.css'
import Login from "../Login/Login";




class Welcome extends React.Component {


    render() {
        const logo = require('../assets/cookupz_logo.jpg');

        return(
            <div>
                {this.props.header}
                <div className={"wContainer"}>
                    <h2 className={"wHeader"}>Welcome to Cookupz!</h2>
                    <img className={"logo"} src={logo}/>
                    <Login></Login>
                </div>
            </div>
        )
    }
}

export default Welcome
import {Switch} from "react-router-dom";
import PropsRoute from "./PropsRoute";
import Welcome from "./Welcome/Welcome";
import Register from "./Register/Register";
import Dashboard from "./Dashboard/Dashboard";
import Profile from "./Dashboard/Profile/Profile";
import React, {useContext} from "react";
import HeaderWelcome from "./AppBar/HeaderW/HeaderWelcome";
import Header from "./AppBar/HeaderMain/Header";
import {AppContext} from "./contexts/AppContext";


export default function Routing(props){
    const {value, setValue} = useContext(AppContext);
    const welcomeHeader = () => {
        return(
            <HeaderWelcome/>
        )
    };

    const mainPageHeader = () => {
        return(
            <Header/>
        )
    };

    return(
        <div>
            <Switch>
                <PropsRoute exact path = '/' component={Welcome} header={welcomeHeader()}/>
                <PropsRoute exact path ='/register' component = {Register} header={welcomeHeader()}/>
                <PropsRoute exact path ='/dashboard' component = {Dashboard} header={mainPageHeader()}/>
                <PropsRoute exact path = '/profile/:id' context = {value} component = {Profile} header = {mainPageHeader()}/>
            </Switch>
        </div>
    )
}
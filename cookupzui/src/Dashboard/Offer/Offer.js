import React, {useState} from 'react'
import Sidebar from "../SideBar/Sidebar";


class Offer extends React.Component {
    render() {
        return(
            <div>
                {this.props.header}
                <Sidebar/>
            </div>
        )
    }
}

export default Offer
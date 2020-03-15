import React from "react";
import {Route} from "react-router-dom";


export default function propsRoute ({component, ...rest}) {
    const renderMergedProps = (component, ...props) => {
        const finalProps = Object.assign({}, ...props);
        return(
            React.createElement(component, finalProps)
        )
    };

    return(
        <Route
            {...rest}
            render = {routeProps => {
                return renderMergedProps(component, routeProps, rest)
            }}
        />
    )
};

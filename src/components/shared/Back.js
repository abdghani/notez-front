import React from 'react';
import {Browse, Route, withRouter, Switch } from "react-router-dom";


const BackButton = (props) => {

    return (
        <div className="container backbutton">
            <button className="button mg-l-5 is-small">
                <a onClick={props.history.goBack}>
                    Back
                </a>
            </button>
        </div>
    )

}

export default withRouter(BackButton);
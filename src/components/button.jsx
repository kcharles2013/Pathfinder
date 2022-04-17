import React from 'react';
import "./button.css";

function Button(props){
    return (
        <div
            className={props.className}
            id={props.id}
            onClick={props.externalButtonHandler}
        >
            {props.buttonText}
        </div>
    )
}

export default Button;
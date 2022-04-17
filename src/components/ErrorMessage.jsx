import React from "react";
import "./ErrorMessage.css";

function ErrorMessage(props){

    let message = `Error: ${props.errorMessage}`

    return(
        <div className="error-message-container">
            <p id="error-text" className="no-error">Error Text</p>
        </div>
    )
}

export default ErrorMessage;
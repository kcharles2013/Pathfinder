import React from 'react';
import './settings.css';

function SettingsOption(props){
    return(
        <div className='settings-option-container'>
            <div
                className='settings-option-indicator settings-option-indicator-false'
                onClick={props.handleOnClick}
                id={props.ID}
            />
            <div className='settings-option-text'>{props.text}</div>
        </div>
    )
}

export default SettingsOption;
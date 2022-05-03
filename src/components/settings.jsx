import React, {useState} from 'react';
import SettingsOption from "./settingsOption";
import "./settings.css";
import userVars from "./userVars";

function Settings(){

    const [pathSpeed, setPathSpeed] = useState(userVars.pathSpeed);
    let pathSpeedTitle = `Path Speed: ${pathSpeed}`

    function updateSpeed(){
        setPathSpeed(document.getElementById('speed-slider').value);
        pathSpeedTitle = `Path Speed: ${pathSpeed}`
    }

    return(
        <>
            <div
                className="settings-cover settings-cover-closed"
                id='settings-cover'
                onClick={function (){
                    settingsExitHandler();
                }}
            />
            <div
                className="settings-container settings-container-anim settings-container-closed"
                id='settings-container'
            >
                <div
                    className="settings-exit-button"
                    onClick={function (){
                        settingsExitHandler();
                    }}
                >
                    X
                </div>
                <div className='settings-wrapper'>
                    <div className='settings-title' id='settings-title'>
                        Settings
                    </div>
                    <div className="settings-options-container" id='settings-options-container'>
                        <SettingsOption
                            text='Lateral Movement'
                            handleOnClick={settingsOptionLateralMovementHandler}
                            ID='lateral-movement'
                        />
                        <SettingsOption
                            text={pathSpeedTitle}
                            handleOnClick={function (){
                                setPathSpeed(userVars.pathSpeed);
                                document.getElementById('speed-slider').value = userVars.pathSpeed;
                                settingsOptionPathSpeedHandler();
                            }}
                            ID='path-speed'
                        />
                        <div>
                            <input
                                className="path-speed-slider slider-disabled"
                                type="range"
                                min="1"
                                max="100"
                                defaultValue={userVars.pathSpeed}
                                id="speed-slider"
                                onChange={updateSpeed}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function init(){
    const settingsClosedAnim = document.getElementsByClassName('settings-container-closed');
    // settingsClosedAnim.addEventListener('animationend', (event) => {
    //     console.log("Event Listened");
    // })
    settingsClosedAnim.addEventListener('animationend', (ev) => {
        settingsClosedAnim.style.display = 'none';
    }, false);
}


function settingsOptionLateralMovementHandler(){
    let classes = document.getElementById('lateral-movement').classList;
    for (let i = 0; i < classes.length; i++){
        switch (classes[i]){
            case ('settings-option-indicator-true'):
                classes.replace('settings-option-indicator-true', 'settings-option-indicator-false');
                break;
            case ('settings-option-indicator-false'):
                classes.replace('settings-option-indicator-false', 'settings-option-indicator-true');
                break;
            default:
                break;
        }
    }
}

function settingsOptionPathSpeedHandler(){
    console.log("pathSpeed: " + userVars.pathSpeed);
    let speed = document.getElementById('speed-slider').value;
    console.log(`Speed: ${speed}`);
    let classes = document.getElementById('path-speed').classList;
    for (let i = 0; i < classes.length; i++){
        switch (classes[i]){
            case ('settings-option-indicator-true'):
                classes.replace('settings-option-indicator-true', 'settings-option-indicator-false');
                document.getElementById('speed-slider').classList.add('slider-disabled');
                break;
            case ('settings-option-indicator-false'):
                classes.replace('settings-option-indicator-false', 'settings-option-indicator-true');
                document.getElementById('speed-slider').classList.remove('slider-disabled');

                break;
            default:
                break;
        }
    }
}

function changeSettingsAnim(mediaQueryParameter){
    if (mediaQueryParameter.matches){
        console.log(`Matches`);
        console.log(`inputVar: ${mediaQueryParameter}`);
        return true;
    } else {
        console.log(`Does not match`);
        console.log(`inputVar: ${mediaQueryParameter}`);
        return false;
    }
}

function settingsExitHandler(){

    // document.getElementById('settings-container').classList.replace('settings-container-mobile-open', 'settings-container-closed');
    // document.getElementById('settings-container').classList.replace('settings-open', 'settings-closed');

    document.getElementById('settings-container').classList.replace('settings-container-open', 'settings-container-closed');
    // document.getElementById('settings-container').classList.replace('settings-open', 'settings-closed');

    document.getElementById('settings-cover').classList.replace('settings-cover-open', 'settings-cover-closed');
    // document.getElementById('settings-cover').classList.replace('settings-open', 'settings-closed');

}

export default Settings;
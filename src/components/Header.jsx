import React from "react";
import "./Header.css";
import userVars from "./userVars";
import { FiMenu } from 'react-icons/fi';


let aStarDelay = false;
let userSpeed = userVars.pathSpeed;

// CREATE PATH-SPEED ARRAY;
let speedArray = [];
for (let i = 101; i > 1; i--){
    let value = i - 1;
    speedArray.push(value);
}

function Header(){
    return (
        <div className="header-container" id="header-container">
                <div className="header-wrapper" >
                <div className="block-container" id="block-container-one">
                    <h1 className="title" id='title-text'>Pathfinder</h1>
                </div>
                <div className="block-container" id="block-container-two">
                    <div
                        className="button header-button"
                        id="a-star"
                        onClick={A_Star}
                    >A-Star Algo</div>
                    <div
                        className="button header-button"
                        id='clear-path'
                        onClick={clearPathHandler}
                    >Clear Pathway</div>
                </div>
                <div className="block-container" id="block-container-three">
                    <div
                        className="settings"
                        id="settings"
                        onClick={function (){
                            settingsHandler();
                        }}
                    >Settings</div>
                    <FiMenu
                        className="settings-icon"
                        id="settings-icon"
                        onClick={function (){
                            settingsHandler();
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

function A_Star(){
    // SETS VARIABLE BACK TO ITS ORIGINAL VALUE;
    userVars.pathSpeed = userSpeed;

    // CLEARS ANY PATHWAY THAT MIGHT BE IN USE;
    clearPathHandler();


    // HANDLES LATERAL MOVEMENT OPTION THAT IS LOCATED WITHIN SETTINGS;
    let lateralMovement;
    let lateralMovementClasses = document.getElementById('lateral-movement').classList;
    for (let i = 0; i < lateralMovementClasses.length; i++){
        switch (lateralMovementClasses[i]) {
            case ('settings-option-indicator-true'):
                lateralMovement = true;
                break;
            case ('settings-option-indicator-false'):
                lateralMovement = false;
                break;
            default:
                break;
        }
    }

    // GRABS IDs OF THE START AND END NODES;
    let startNode;
    let endNode

    try{
        // if (document.getElementsByClassName('start-node')[0].id === undefined) throw "Please select a start node";

        startNode = document.getElementsByClassName('start-node')[0].id;


    } catch(error) {
        alert("Please select a Start Block");
        return 0;
    }

    try{
        endNode = document.getElementsByClassName('end-node')[0].id;

        // if (document.getElementsByClassName('start-node')[0].id === undefined) throw "Please select an end node";

    } catch(error) {
        alert("Please select an End Block");
        return 0;
    }

    let startCoordinates = getCoordinates(startNode);
    let endCoordinates = getCoordinates(endNode);

    let foundEndPoint = false;
    let pathStack = [];
    pathStack.push({
        ID: startNode,
        coords: startCoordinates
    });

    while (foundEndPoint !== true){
        let top;
        let bottom;
        let left;
        let right;

        let possibleMoves = [];

        let index = pathStack.length - 1;

        let y = pathStack[index].coords[1]
        let x = pathStack[index].coords[0]

        top = 0;
        if (y > top){
            // CAN MOVE UP;
            let topWall = false;
            let newY = pathStack[index].coords[1] - 1;
            let classes = document.getElementById(`Node: ${pathStack[index].coords[0]}, ${newY}`).classList;
            for (let i = 0; i < classes.length; i++){
                if (classes[i] === 'wall-node' || classes[i] === 'start-node' || classes[i] === 'considering-node'){
                    topWall = true;
                }
                if (classes[i] === 'end-node') {
                    foundEndPoint = true;
                }
            }
            if (!topWall){
                let coordinates = [pathStack[index].coords[0], newY];
                let leftToTravel = calculateEndDistance(coordinates, endCoordinates);
                let movesMade = pathStack.length;
                let score = leftToTravel + movesMade;
                possibleMoves.push({
                    ID: `Node: ${pathStack[index].coords[0]}, ${newY}`,
                    coords: coordinates,
                    fromEnd: leftToTravel,
                    movesFromStart: movesMade,
                    starScore: score
                });
            }
        }
        bottom = userVars.yLength - 1;
        if (y < bottom){
            // CAN MOVE DOWN;
            let newY = pathStack[index].coords[1] + 1;
            let bottomWall = false;
            let classes = document.getElementById(`Node: ${pathStack[index].coords[0]}, ${newY}`).classList;
            for (let i = 0; i < classes.length; i++) {
                if (classes[i] === 'wall-node' || classes[i] === 'start-node' || classes[i] === 'considering-node') {
                    bottomWall = true;
                }
                if (classes[i] === 'end-node') {
                    foundEndPoint = true;
                }
            }
            if (!bottomWall){
                let coordinates = [pathStack[index].coords[0], newY];
                let leftToTravel = calculateEndDistance(coordinates, endCoordinates);
                let movesMade = pathStack.length;
                let score = leftToTravel + movesMade;
                possibleMoves.push({
                    ID: `Node: ${pathStack[index].coords[0]}, ${newY}`,
                    coords: coordinates,
                    fromEnd: leftToTravel,
                    movesFromStart: movesMade,
                    starScore: score
                });
            }
        }
        left = 0;
        if (x > left){
            // CAN MOVE LEFT;
            let newX = pathStack[index].coords[0] - 1;
            let leftWall = false;
            let classes = document.getElementById(`Node: ${newX}, ${pathStack[index].coords[1]}`).classList;
            for (let i = 0; i < classes.length; i++) {
                if (classes[i] === 'wall-node' || classes[i] === 'start-node' || classes[i] === 'considering-node') {
                    leftWall = true;
                }
                if (classes[i] === 'end-node') {
                    foundEndPoint = true;
                }
            }
            if(!leftWall){
                let coordinates = [newX, pathStack[index].coords[1]];
                let leftToTravel = calculateEndDistance(coordinates, endCoordinates);
                let movesMade = pathStack.length;
                let score = leftToTravel + movesMade;
                possibleMoves.push({
                    ID: `Node: ${newX}, ${pathStack[index].coords[1]}`,
                    coords: coordinates,
                    fromEnd: leftToTravel,
                    movesFromStart: movesMade,
                    starScore: score
                });
            }
        }
        right = userVars.xLength - 1;
        if (x < right){
            // CAN MOVE RIGHT;
            let newX = pathStack[index].coords[0] + 1;
            let rightWall = false;
            let classes = document.getElementById(`Node: ${newX}, ${pathStack[index].coords[1]}`).classList;
            for (let i = 0; i < classes.length; i++) {
                if (classes[i] === 'wall-node' || classes[i] === 'start-node' || classes[i] === 'considering-node') {
                    rightWall = true;
                }
                if (classes[i] === 'end-node') {
                    foundEndPoint = true;
                }
            }
            if (!rightWall){
                let coordinates = [newX, pathStack[index].coords[1]];
                let leftToTravel = calculateEndDistance(coordinates, endCoordinates);
                let movesMade = pathStack.length;
                let score = leftToTravel + movesMade;
                possibleMoves.push({
                    ID: `Node: ${newX}, ${pathStack[index].coords[1]}`,
                    coords: coordinates,
                    fromEnd: leftToTravel,
                    movesFromStart: movesMade,
                    starScore: score
                });
            }
        }
        // ALLOWS LATERAL MOVEMENT IF IT IS CHECKED WITHIN SETTINGS TAB;
        if (lateralMovement){
            if (y > top && x < right){
                // CAN MOVE UP/RIGHT;
                let newX = pathStack[index].coords[0] + 1;
                let newY = pathStack[index].coords[1] - 1;
                let topRightWall = false;
                let classes = document.getElementById(`Node: ${newX}, ${newY}`).classList;
                for (let i = 0; i < classes.length; i++) {
                    if (classes[i] === 'wall-node' || classes[i] === 'start-node' || classes[i] === 'considering-node') {
                        topRightWall = true;
                    }
                    if (classes[i] === 'end-node') {
                        foundEndPoint = true;
                    }
                }
                if (!topRightWall){
                    let coordinates = [newX, newY];
                    let leftToTravel = calculateEndDistance(coordinates, endCoordinates);
                    let movesMade = pathStack.length;
                    let score = leftToTravel + movesMade;
                    possibleMoves.push({
                        ID: `Node: ${newX}, ${newY}`,
                        coords: coordinates,
                        fromEnd: leftToTravel,
                        movesFromStart: movesMade,
                        starScore: score
                    });
                }
            }

            if (y > top && x > left){
                // CAN MOVE UP/LEFT;
                // right = true;
                let newX = pathStack[index].coords[0] - 1;
                let newY = pathStack[index].coords[1] - 1;
                let topLeftWall = false;
                let classes = document.getElementById(`Node: ${newX}, ${newY}`).classList;
                for (let i = 0; i < classes.length; i++) {
                    if (classes[i] === 'wall-node' || classes[i] === 'start-node' || classes[i] === 'considering-node') {
                        topLeftWall = true;
                    }
                    if (classes[i] === 'end-node') {
                        // count = 100;
                        // console.log("End Node Found");
                        foundEndPoint = true;
                    }
                }
                if (!topLeftWall){
                    let coordinates = [newX, newY];
                    let leftToTravel = calculateEndDistance(coordinates, endCoordinates);
                    let movesMade = pathStack.length;
                    let score = leftToTravel + movesMade;
                    possibleMoves.push({
                        ID: `Node: ${newX}, ${newY}`,
                        coords: coordinates,
                        fromEnd: leftToTravel,
                        movesFromStart: movesMade,
                        starScore: score
                    });
                }
            }

            if (y < bottom && x < right){
                // CAN MOVE DOWN/RIGHT;
                // right = true;
                let newX = pathStack[index].coords[0] + 1;
                let newY = pathStack[index].coords[1] + 1;
                let bottomRightWall = false;
                let classes = document.getElementById(`Node: ${newX}, ${newY}`).classList;
                for (let i = 0; i < classes.length; i++) {
                    if (classes[i] === 'wall-node' || classes[i] === 'start-node' || classes[i] === 'considering-node') {
                        bottomRightWall = true;
                    }
                    if (classes[i] === 'end-node') {
                        // count = 100;
                        // console.log("End Node Found");
                        foundEndPoint = true;
                    }
                }
                if (!bottomRightWall){
                    let coordinates = [newX, newY];
                    let leftToTravel = calculateEndDistance(coordinates, endCoordinates);
                    let movesMade = pathStack.length;
                    let score = leftToTravel + movesMade;
                    possibleMoves.push({
                        ID: `Node: ${newX}, ${newY}`,
                        coords: coordinates,
                        fromEnd: leftToTravel,
                        movesFromStart: movesMade,
                        starScore: score
                    });
                }
            }

            if (y < bottom && x > left){
                // CAN MOVE DOWN/LEFT;
                // right = true;
                let newX = pathStack[index].coords[0] - 1;
                let newY = pathStack[index].coords[1] + 1;
                let bottomLeftWall = false;
                let classes = document.getElementById(`Node: ${newX}, ${newY}`).classList;
                for (let i = 0; i < classes.length; i++) {
                    if (classes[i] === 'wall-node' || classes[i] === 'start-node' || classes[i] === 'considering-node') {
                        bottomLeftWall = true;
                    }
                    if (classes[i] === 'end-node') {
                        // count = 100;
                        // console.log("End Node Found");
                        foundEndPoint = true;
                    }
                }
                if (!bottomLeftWall){
                    let coordinates = [newX, newY];
                    let leftToTravel = calculateEndDistance(coordinates, endCoordinates);
                    let movesMade = pathStack.length;
                    let score = leftToTravel + movesMade;
                    possibleMoves.push({
                        ID: `Node: ${newX}, ${newY}`,
                        coords: coordinates,
                        fromEnd: leftToTravel,
                        movesFromStart: movesMade,
                        starScore: score
                    });
                }
            }
        }



        if(possibleMoves.length > 0 && foundEndPoint !== true){
            sortPaths(possibleMoves);
            // console.log(possibleMoves);

            // NEXT NODE WILL BE THE LOWEST A-STAR SCORE;
            // RUN LOOP FOR NEXT ONE;
            pathStack.push(possibleMoves[0]);
            document.getElementById(possibleMoves[0].ID).classList.add('considering-node');
        } else {
            if(foundEndPoint === true){
                console.log("End Point Found");
            } else {
                pathStack.pop();
            }
        }
    }
    // HANDLE DELAYED PATHWAY ANIMATION;
    delayPathAnim(1, pathStack);
}

function settingsHandler(){
    // let param = window.matchMedia('(max-width: 767px)');
    // let isMobile = changeSettingsAnim(param);
    // console.log(`isMobile: ${isMobile}`);

    // document.getElementById('settings-container').classList.replace('settings-container-closed', 'settings-container-mobile-open');
    // document.getElementById('settings-container').classList.replace('settings-closed', 'settings-open');

    document.getElementById('settings-container').classList.replace('settings-container-closed', 'settings-container-open');
    // document.getElementById('settings-container').classList.replace('settings-closed', 'settings-open');

    // document.getElementById('settings-cover').classList.replace('settings-closed', 'settings-open');
    document.getElementById('settings-cover').classList.replace('settings-cover-closed', 'settings-cover-open');}

function delayPathAnim(index, pathArray){
    // DEACTIVATES A-STAR ALGORITHM TO PREVENT USER FROM SPAMMING IT;
    document.getElementById('a-star').classList.add('a-star-disabled');
    aStarDelay = true;

    // HANDLES QUICKEST PATH ANIMATION VIA RECURSION;
    anim(index, pathArray);
}

function anim(_index, _pathArray){
    // BY ESTABLISHING THE SPEED FOR EACH ANIMATION, THE USER CAN TOGGLE THE SPEED AS IT ANIMATES;
    // ALLOWS FOR SLOWING AND SPEEDING OF THE ANIMATION IN REAL TIME;
    let pathSpeed = document.getElementById('speed-slider').value - 1;
    setTimeout(function (){
        // console.log("index: " + _index);
        if (_index === _pathArray.length){
            console.log("Done");
        } else {
            // CHANGES CURRENT NODE ID IN 'pathArray' FROM 'considering-node' TO 'path-node';
            document.getElementById(_pathArray[_index].ID).classList.replace('considering-node', 'path-node');

            // RECURSION CALL, INCREMENTING THE INDEX;
            _index++;
            anim(_index, _pathArray);
        }
        // PATH SPEED IS IN 'userVars';
        // THE LOWER THE VAR, THE FASTER THE ANIMATION WILL CHAIN;
        // THE HIGHER THE VAR, THE LONGER IT WILL TAKE FOR THE NEXT ANIMATION TO BE QUEUED;
    }, speedArray[pathSpeed]);

    // CHECKS TO VERIFY ALL NODES WITHIN PATH HAVE BEEN ANIMATED, AND THE 'aStarDelay' IS STILL TRUE;
    // ALLOWS USER TO ONCE AGAIN TRIGGER THE A-STAR ANIMATION;
    if (_pathArray.length === _index && aStarDelay === true){
        document.getElementById('a-star').classList.remove('a-star-disabled');
        aStarDelay = false;
    }
}

function calculateEndDistance(nodeCoor, endCoor){
    // console.log(nodeCoor[0]);
    // console.log(endCoor[0]);
    let xDist = Math.abs(nodeCoor[0] - endCoor[0]);
    let yDist = Math.abs(nodeCoor[1] - endCoor[1]);

    return xDist + yDist;
}

function sortPaths(_paths){
    _paths.sort(function (a, b) {
       if (a.starScore < b.starScore) {
           return -1;
       }
       if (a.starScore > b.starScore) {
           return 1;
       }
       return 0;
    });
}

function getCoordinates(_ID){
    let splitID = _ID.split(',');
    // console.log(splitID);

    let nextX = parseInt(splitID[0].replace(/\D/g,''));
    let nextY = parseInt(splitID[1].replace(/\D/g,''));

    return [nextX, nextY];
}

function clearPathHandler(){
    // CLEARS OUT THE CURRENT PATHWAY FROM START NODE TO END NODE;
    for (let x = 0; x <= userVars.xLength - 1; x++){
        for (let y = 0; y <= userVars.yLength - 1; y++){
            let thisID = `Node: ${x}, ${y}`
            let classes = document.getElementById(thisID).classList;
            for (let i = 0; i < classes.length; i++){
                if (classes[i] === 'path-node'){
                    document.getElementById(thisID).classList.remove('path-node');
                }
                if (classes[i] === 'considering-node'){
                    document.getElementById(thisID).classList.remove('considering-node');
                }
            }
        }
    }
}

export default Header;

import React from "react";
import "./Footer.css";
import UserVars from "./userVars";
import userVars from "./userVars";
import Button from "./button";

// let count = 0;
// let recursion = 0;

function Footer(){
    return(
        <div className="footer-container" id='footer-container'>
            <div className='button-divider' id='button-divider'>
                <Button
                    className='button footer-button'
                    externalButtonHandler={clearBoardHandler}
                    buttonText="Clear Board"
                    id="cleared-board: false"
                />

                <Button
                    className='button footer-button'
                    id={`SelectStartNode: false`}
                    externalButtonHandler={selectStartNodeHandler}
                    buttonText="Start Block"
                />
            </div>
            <div className='button-divider' id='button-divider'>
                <Button
                    className='button footer-button'
                    id={`SelectEndNode: false`}
                    externalButtonHandler={selectEndNodeHandler}
                    buttonText="End Block"
                />

                <Button
                    className='button footer-button'
                    id={`SelectWallNode: false`}
                    externalButtonHandler={selectWallNodeHandler}
                    buttonText="Wall Block"
                />
            </div>
            <div className='button-divider' id='button-divider'>
                <Button
                    className='button footer-button'
                    id={`clearNode: false`}
                    externalButtonHandler={clearNodeHandler}
                    buttonText="Delete Block"
                />
                <Button
                    className='button footer-button'
                    id={`clearNode: false`}
                    externalButtonHandler={createLabyrinthHandler}
                    buttonText="Build Labyrinth"
                />
            </div>
        </div>
    )
}

export default Footer;

function randomNumber(_min, _max){
    let min = Math.ceil(_min);
    let max = Math.floor(_max);

    return Math.floor(Math.random() * (max - min) + min);
}

function createLabyrinthHandler(){
    // ENSURES BOARD IS CLEARED;
    clearBoardHandler();
    // console.log("1 is " + isOdd(1));
    // console.log("4 is " + isOdd(4));
    for (let x = 0; x <= userVars.xLength - 1; x++){
        for (let y = 0; y <= userVars.yLength - 1; y++){
            let thisID = `Node: ${x}, ${y}`;

            let classes = document.getElementById(thisID).classList;

            for (let i = 0; i < classes.length; i++){
                // console.log("classes: " + classes);
                if (classes[i] === 'start-node'){
                    document.getElementById(thisID).classList.remove("start-node");
                } else if(classes[i] === 'end-node'){
                    document.getElementById(thisID).classList.remove("end-node");
                }
            }


            if (isOdd(y) === 1){
                // IF Y IS ODD, MAKE THE NODE A 'wall-node';
                document.getElementById(thisID).classList.add("wall-node");
            } else if (isOdd(x) === 1){
                // IF Y IS EVEN AND X IS ODD, MAKE THE NODE A 'wall-node';
                document.getElementById(thisID).classList.add("wall-node");
            } else {
                // IF NOT A 'wall-node', MARK AS UNVISITED NODE (FOR THE LABYRINTH
                // CARVER TO USE AS A NOW WALL NODE;
                // WILL BE CHANGED TO ONLY 'node' CLASS AFTER IT'S WALLS HAVE BEEN
                // 'CARVED';
                document.getElementById(thisID).classList.add("unvisited-node");
                document.getElementById(thisID).classList.remove("node");
            }
        }
    }

    let unvisitedNodes = [];
    for (let x = 0; x <= userVars.xLength - 1; x++){
        for (let y = 0; y <= userVars.yLength - 1; y++){
            let thisID = `Node: ${x}, ${y}`;

            let classes = document.getElementById(thisID).classList;

            // GRABS ALL 'unvisited-nodes' IN THE GRID;
            for (let i = 0; i < classes.length; i++){
                if (classes[i] === 'unvisited-node'){
                    unvisitedNodes.push(thisID);
                }
            }
        }
    }

    // ESTABLISHES THE STARTING POINT OF THE MAZE;
    let startNum = randomNumber(0, unvisitedNodes.length);
    let startNodeID = unvisitedNodes[startNum];
    // console.log("startNodeID: " + startNodeID);
    // console.log("startNodeID: " + startNodeID);

    // SEPARATE THE X AND Y FROM THE NODE'S ID;
    let startNodeID_Array = startNodeID.split(",");
    // console.log(unvisitedNodes);
    // console.log(startNodeID);
    // console.log(startNodeID_Array);


    // for (let i = 0; i < startNodeID_Array.length; i++){
    //     console.log(`ID[${i}]: ${startNodeID_Array[i]}`);
    // }

    // REPLACE ALL CHARACTERS THAT ARE NOT NUMERICAL WITH NOTHING;
    // ASSIGN X AND Y THE VALUES TO FIND THE STARTING NODE;
    let x = startNodeID_Array[0].replace(/\D/g,'');
    let y = startNodeID_Array[1].replace(/\D/g,'');

    // console.log(x + ", " + y);
    // console.log(x);
    // console.log(y);

    // console.log("startNumID: " + startNodeID);

    document.getElementById(unvisitedNodes[startNum]).classList.add('node');
    document.getElementById(unvisitedNodes[startNum]).classList.remove('unvisited-node');
    document.getElementById(unvisitedNodes[startNum]).classList.add('start-node');

    // REMOVES NEW 'start-node' FROM unvisitedNodes;
    // console.log("unvisitedNodesLength: " + unvisitedNodes.length);
    unvisitedNodes.splice(startNum, 1);
    // console.log("unvisitedNodesLength: " + unvisitedNodes.length);

    //--------------------------------------------------------------------------------------//
    // NEED TO START CARVING OUT THE LABYRINTH FROM THE POINT OUT (START-NODE):
    let startingID = `Node: ${x}, ${y}`

    // STACK TO BE USED TO KEEP UP WITH THE CURRENT NODE BEING CARVED;

    let nodeStack = [];
    let startingCoord = getCoordinates(startingID);
    nodeStack.push({
        ID: startingID,
        coordinates: startingCoord
    });

    let carvableNodes = [];
    for (let i = 0; i < userVars.xLength; i++){
        for (let j = 0; j < userVars.yLength; j++){
            let classes = document.getElementById(`Node: ${i}, ${j}`).classList;
            for (let k = 0; k < classes.length; k++){
                if (classes[k] === 'unvisited-node'){
                    let nodeCoordinates = getCoordinates(`Node: ${i}, ${j}`);
                    carvableNodes.push({
                        ID: `Node: ${i}, ${j}`,
                        coordinates: nodeCoordinates
                    });
                }
            }
        }
    }
    // console.log(carvableNodes);

    // START CARVING AT THE STARTING NODE;
    // THIS WILL BE > 0 AT THE END, BUT WILL START OUT WITH ONLY ONE CARVING INITIALLY;
    let count = carvableNodes.length;
    while (count > 0){
        // console.log("count: " + count);
        // console.log(nodeStack);
        // ASSIGNS INDEX TO LATEST ITEM ADDED TO THE STACK;
        let index = nodeStack.length - 1;
        // console.log("index: " + index);
        // console.log(nodeStack[index].ID);
        // CARVES IN A RANDOM DIRECTION, THEN RETURNS THE ID TO THE NODE IT ENDED ON;
        // console.log(nodeStack);
        let nextID = carve(nodeStack[index].ID, nodeStack[index].coordinates[0], nodeStack[index].coordinates[1]);

        // console.log("ID added to stack: " + nextID);

        if (nextID !== undefined){
            let nextCoor = getCoordinates(nextID);

            nodeStack.push({
                ID: nextID,
                coordinates: nextCoor
            });
            count -= 1;
            // carvableNodes = getCarvableNodes();
        } else {
            // console.log("Path ended");
            // count -= 1;
            nodeStack.pop();
            // carvableNodes = getCarvableNodes();
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////LEAVING OFF HERE////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////
    // CARVE IS WORKING NOW
    // THERE ARE SEVERAL BUGS THAT NEED TO BE WORKED OUT OF IT
    // ALONG WITH GIVING IT GUIDELINES TO NODE CLEAR THE STARTING NODE.
    // ONE OF THE BUGS IS OUTPUTTING A (10, 6) AND (8, 6) FOR THE NEXT NODE TO BE CARVED.
    // NO IDEA WHY IT'S SO STUCK ON THOSE TWO NODES. NEED TO PEEL THROUGH THE CODE.


    // RANDOMLY SELECT A SURROUNDING WALL NODE (UP, LEFT, DOWN, OR RIGHT) TO BEGIN;
    // CONTINUE THIS UNTIL THERE ARE NO LONGER AND POSSIBLE WALL NODES;
    // BACKTRACK UNTIL THERE ARE POSSIBLE WALL-NODES;
    // WILL NEED TO USE RECURSION FOR THIS TO WORK CORRECTLY;
    randomEndNode();
}

function getCarvableNodes(){
    let _carvableNodes
    for (let i = 0; i < userVars.xLength; i++){
        for (let j = 0; j < userVars.yLength; j++){
            let classes = document.getElementById(`Node: ${i}, ${j}`).classList;
            for (let k = 0; k < classes.length; k++){
                if (classes[k] === 'unvisited-node'){
                    let nodeCoordinates = getCoordinates(`Node: ${i}, ${j}`);
                    _carvableNodes.push({
                        ID: `Node: ${i}, ${j}`,
                        coordinates: nodeCoordinates
                    });
                }
            }
        }
    }
    return _carvableNodes
}

function carve(_startingID, _x, _y){
    document.getElementById(_startingID);
    let top = false;
    let bottom = false;
    let left = false;
    let right = false;

    let walls = [];

    // X & Y ARE BEING SENT THROUGH AS STRINGS;
    let x = parseInt(_x);
    let y = parseInt(_y);

    let newX;
    let newY;

    let topID;
    let bottomID;
    let leftID;
    let rightID;

    let topWall;
    let bottomWall;
    let leftWall;
    let rightWall;

    // console.log("x: " + _x);
    // console.log("y: " + _y);
    if (y > 1){
        newY = y - 2;
        topID = `Node: ${_x}, ${newY}`;
        topWall = `Node: ${_x}, ${newY + 1}`
        // console.log("top: " + topID);
        // console.log(`topID: ${topID}`)
        let wasVisited = true;
        for (let i = 0; i < document.getElementById(topID).classList.length; i++) {
            if (document.getElementById(topID).classList[i] === 'unvisited-node') {
                wasVisited = false;
                top = true;
            }
        }
        if (!wasVisited){
            walls.push(0);
        }
    }
    if (y < UserVars.yLength - 2) {
        newY = y + 2;
        // console.log(`y: ${y}, newY: ${newY}`);
        bottomID = `Node: ${_x}, ${newY}`;
        bottomWall = `Node: ${_x}, ${newY - 1}`
        // console.log("bottom: " + bottomID);
        // console.log(`bottomID: ${bottomID}`)
        let wasVisited = true;
        for (let i = 0; i < document.getElementById(bottomID).classList.length; i++) {
            if (document.getElementById(bottomID).classList[i] === 'unvisited-node') {
                wasVisited = false;
                bottom = true;
            }
        }
        if (!wasVisited){
            walls.push(1);
        }
    }

    if (x > 1){
        newX = x - 2;
        leftID = `Node: ${newX}, ${_y}`;
        leftWall = `Node: ${newX + 1}, ${_y}`;
        // console.log("left: " + leftID);
        // console.log(`leftID: ${leftID}`);
        let wasVisited = true;
        for (let i = 0; i < document.getElementById(leftID).classList.length; i++) {
            if (document.getElementById(leftID).classList[i] === 'unvisited-node') {
                wasVisited = false;
                left = true;
            }
        }
        if (!wasVisited){
            walls.push(2);
        }
    }
    if (x < UserVars.yLength - 2) {
        newX = x + 2;
        // console.log(`x: ${x}, newX: ${newX}`);
        rightID = `Node: ${newX}, ${_y}`;
        rightWall = `Node: ${newX - 1}, ${_y}`;
        // console.log("right: " + rightID);
        // console.log(`rightID: ${rightID}`);
        let wasVisited = true;
        for (let i = 0; i < document.getElementById(rightID).classList.length; i++){
            if (document.getElementById(rightID).classList[i] === 'unvisited-node'){
                wasVisited = false;
                right = true;
            }
        }
        if (!wasVisited){
            walls.push(3);
        }

    }


        let coordinates = undefined;
        // console.log("wallsLength: " + walls.length);
        let chosenWall = randomNumber(0, walls.length - 1);
        // console.log("chosenWall: " + walls[chosenWall]);

        let chosenWallID;
        let nextID;

        if (walls[chosenWall] === 0 && top === true){
            // console.log("Top: " + top);
            chosenWallID = topWall;
            coordinates = getCoordinates(chosenWallID);
            // nextID = `Node: ${coordinates[0]}, ${coordinates[1] - 1}`;
            nextID = topID;
            // console.log(`nextID: ${nextID}`);
            if ((coordinates[0] - 2) <= 0){
                // console.log("y < 0");
            }
        }
        if (walls[chosenWall] === 1 && bottom === true){
            // console.log("Bottom: " + bottom);
            chosenWallID = bottomWall;
            coordinates = getCoordinates(chosenWallID);
            // nextID = `Node: ${coordinates[0]}, ${coordinates[1] + 1}`;
            nextID = bottomID;
            // console.log(`nextID: ${nextID}`);
        }
        if (walls[chosenWall] === 2 && left === true){
            // console.log("Left: " + left);
            chosenWallID = leftWall;
            coordinates = getCoordinates(chosenWallID);
            // nextID = `Node: ${coordinates[0] - 1}, ${coordinates[1]}`;
            nextID = leftID;
            // console.log(`nextID: ${nextID}`);
            if ((coordinates[0] - 2) <= 0){
                // console.log("x < 0");
            }
        }
        if (walls[chosenWall] === 3 && right === true){
            // console.log("Right: " + right);
            chosenWallID = rightWall;
            coordinates = getCoordinates(chosenWallID);
            // nextID = `Node: ${coordinates[0] + 1}, ${coordinates[1]}`;
            nextID = rightID;
            // console.log(`nextID: ${nextID}`);
        }

        if (coordinates !== undefined){
            // console.log(coordinates);
            // console.log("StartingID: " + _startingID);
            let startingWallID = `Node: ${coordinates[0]}, ${coordinates[1]}`;

            // console.log(`Wall to be remove: ${startingWallID}`);
            document.getElementById(startingWallID).classList.remove('wall-node');
            // document.getElementById(startingWallID).classList.add('unvisited-node');
            // document.getElementById(startingWallID).classList.remove('node');

            // MAKE THE NEXT START NODE A REG NODE/REMOVE 'unvisited-node';
            document.getElementById(nextID).classList.add('node');
            document.getElementById(nextID).classList.remove('unvisited-node');
            // let nextCoor = getCoordinates(nextID);

            // console.log(`Being sent to params: ${nextID}, ${nextCoor[0]}, ${nextCoor[1]}`);
            return nextID;
        }
}

function randomEndNode(){
    let possibleEnds = [];
    for (let i = 0; i < userVars.xLength; i++){
        for (let j = 0; j < userVars.yLength; j++){
            let classes = document.getElementById(`Node: ${i}, ${j}`).classList;
            let classesNum = classes.length;
            let count = 0;
            for (let k = 0; k < classes.length; k++){
                if (classes[k] !== 'start-node' && classes[k] !== 'wall-node'){
                    count += 1;
                }

                if (count === classesNum){
                    possibleEnds.push(`Node: ${i}, ${j}`);
                }
            }
        }
    }

    let randomEnd = randomNumber(0, possibleEnds.length);
    // console.log("EndNode: " + possibleEnds[randomEnd]);

    document.getElementById(possibleEnds[randomEnd]).classList.add('end-node');
}

// RETURNS ARRAY OF X AND Y;
function getCoordinates(_ID){
    let splitID = _ID.split(',');
    // console.log(splitID);

    let nextX = parseInt(splitID[0].replace(/\D/g,''));
    let nextY = parseInt(splitID[1].replace(/\D/g,''));

    return [nextX, nextY];
}

function isOdd(_num){
    return _num & 1;
}

function clearNodeHandler(){
    // DISABLES START, END, WALL NODES TO PREVENT DUAL CLASS ASSIGNMENT;
    if (document.getElementById('SelectStartNode: true') != null){
        document.getElementById('SelectStartNode: true').id = 'SelectStartNode: false';
    }
    if (document.getElementById('SelectEndNode: true') != null){
        document.getElementById('SelectEndNode: true').id = 'SelectEndNode: false';
    }
    if (document.getElementById('SelectWallNode: true') != null){
        document.getElementById('SelectWallNode: true').id = 'SelectWallNode: false';
    }

    // ALLOWS FOR A WALL NODE TO BE SELECTED VIA CLICKING ON A NODE;
    if (document.getElementById(`clearNode: false`) != null) {
        document.getElementById(`clearNode: false`).id = `clearNode: true`;
    }
}

function selectWallNodeHandler(){
    // DISABLES START, END, CLEAR NODES TO PREVENT DUAL CLASS ASSIGNMENT;
    if (document.getElementById('SelectStartNode: true') != null){
        document.getElementById('SelectStartNode: true').id = 'SelectStartNode: false';
    }
    if (document.getElementById('SelectEndNode: true') != null){
        document.getElementById('SelectEndNode: true').id = 'SelectEndNode: false';
    }
    if (document.getElementById(`clearNode: true`) != null){
        document.getElementById(`clearNode: true`).id = `clearNode: false`;
    }

    // ALLOWS FOR A WALL NODE TO BE SELECTED VIA CLICKING ON A NODE;
    if (document.getElementById(`SelectWallNode: false`) != null) {
        document.getElementById(`SelectWallNode: false`).id = `SelectWallNode: true`;
    }
}

function selectStartNodeHandler(){
    // DISABLES WALL/CLEAR NODES TO PREVENT DUAL CLASS ASSIGNMENT;
    if (document.getElementById('SelectWallNode: true') != null){
        document.getElementById('SelectWallNode: true').id = 'SelectWallNode: false';
    }
    if (document.getElementById(`clearNode: true`) != null){
        document.getElementById(`clearNode: true`).id = `clearNode: false`;
    }

    // CLEARS ANY PATH FOUND FROM START TO END NODE;
    clearPathHandler();

    for (let x = 0; x <= userVars.xLength - 1; x++){
        // CLEARS ANY OTHER POSSIBLE START NODES;
        for (let y = 0; y <= userVars.yLength - 1; y++){
            // GRABS THE INDEX FOR THIS CURRENT NODE BEING ASSESSED;
            let id = `Node: ${x}, ${y}`

            // GRABS THE CLASS NAMES BEING HELD BY THE NODE IN QUESTION;
            let className = document.getElementById(id).classList;

            // ITERATES THROUGH THE CLASSNAMES TO VERIFY NONE ARE START-NODES;
            for (let i = 0; i < className.length; i++){
                if (className[i] === "start-node"){
                    // REMOVES ANY START-NODE CLASSES;
                    document.getElementById(id).classList.remove(className[i]);
                }
            }
        }
    }

    // ALLOWS FOR A START NODE TO BE SELECTED VIA CLICKING ON A NODE;
    // console.log(document.getElementsByClassName("grid-row"));
    if (document.getElementById(`SelectStartNode: false`) != null) {
        document.getElementById(`SelectStartNode: false`).id = `SelectStartNode: true`;
    }
}

function selectEndNodeHandler(){
    // DISABLES WALL/CLEAR NODES TO PREVENT DUAL CLASS ASSIGNMENT;
    if (document.getElementById('SelectWallNode: true') != null){
        document.getElementById('SelectWallNode: true').id = 'SelectWallNode: false';
    }
    if (document.getElementById(`clearNode: true`) != null){
        document.getElementById(`clearNode: true`).id = `clearNode: false`;
    }

    // CLEARS OUT ANY PATH THAT HAS BEEN FOUND FROM START TO END NODE;
    clearPathHandler();

    for (let x = 0; x <= userVars.xLength - 1; x++){
        // CLEARS ANY OTHER POSSIBLE END-NODES;
        for (let y = 0; y <= userVars.yLength - 1; y++){
            // GRABS THE INDEX FOR THIS CURRENT NODE BEING ASSESSED;
            let id = `Node: ${x}, ${y}`

            // GRABS THE CLASS NAMES BEING HELD BY THE NODE IN QUESTION;
            let className = document.getElementById(id).classList;

            // ITERATES THROUGH THE CLASSNAMES TO VERIFY NONE ARE END-NODES;
            for (let i = 0; i < className.length; i++){
                if (className[i] === "end-node"){
                    // REMOVES ANY START-NODE CLASSES;
                    document.getElementById(id).classList.remove(className[i]);
                }
            }
        }
    }

    // console.log(document.getElementsByClassName("grid-row"));
    if (document.getElementById(`SelectEndNode: false`) != null){
        document.getElementById(`SelectEndNode: false`).id = `SelectEndNode: true`;
    }
}

function clearPathHandler(){
    for (let x = 0; x <= userVars.xLength - 1; x++){
        for (let y = 0; y <= userVars.yLength - 1; y++){
            let thisID = `Node: ${x}, ${y}`
            let classes = document.getElementById(thisID).classList;
            for (let i = 0; i < classes.length; i++){
                switch(classes[i]){
                    case('path-node'):
                        document.getElementById(thisID).classList.remove('path-node');
                        break;
                    case('considering-node'):
                        document.getElementById(thisID).classList.remove('considering-node');
                        break;
                    default:
                        break;
                }
                // if (classes[i] === 'path-node'){
                //     document.getElementById(thisID).classList.remove('path-node');
                // }
                // if (classes[i] === 'considering-node'){
                //     document.getElementById(thisID).classList.remove('considering-node');
                // }
            }
        }
    }
}

function clearBoardHandler(){

    if (document.getElementById("cleared-board: false") !== null){
        document.getElementById('cleared-board: false').id = 'cleared-board: true';
    }
    for (let x = 0; x <= userVars.xLength - 1; x++){
        for (let y = 0; y <= userVars.yLength - 1; y++){
            let thisID = `Node: ${x}, ${y}`
            let classes = document.getElementById(thisID).classList;
            for (let i = 0; i < classes.length; i++){

                switch (classes[i]) {
                    case('start-node'):
                        document.getElementById(thisID).classList.remove('start-node');
                        break;
                    case('end-node'):
                        document.getElementById(thisID).classList.remove('end-node');
                        break;
                    case('wall-node'):
                        document.getElementById(thisID).classList.remove('wall-node');
                        break;
                    case('unvisited-node'):
                        document.getElementById(thisID).classList.add('node');
                        document.getElementById(thisID).classList.remove('unvisited-node');
                        break;
                    case('considering-node'):
                        document.getElementById(thisID).classList.remove('considering-node');
                        break;
                    case('path-node'):
                        document.getElementById(thisID).classList.remove('path-node');
                        break;
                    default:
                        break;
                }
            }
        }
    }

    // A DOUBLE CHECK ON THE NODES DUE TO A BUG CAUSED BY SPAMMING THE A-STAR ALGO;
    // THIS IS JUST A QUICK FIX;
    // WILL NEED TO CREATE SAFETY PARAMETERS SURROUNDING THE USE OF THE PATHFINDING BUTTON;

    for (let x = 0; x <= userVars.xLength - 1; x++){
        for (let y = 0; y <= userVars.yLength - 1; y++){
            let thisID = `Node: ${x}, ${y}`
            let classes = document.getElementById(thisID).classList;
            for (let i = 0; i < classes.length; i++){

                switch (classes[i]) {
                    case('start-node'):
                        document.getElementById(thisID).classList.remove('start-node');
                        break;
                    case('end-node'):
                        document.getElementById(thisID).classList.remove('end-node');
                        break;
                    case('wall-node'):
                        document.getElementById(thisID).classList.remove('wall-node');
                        break;
                    case('unvisited-node'):
                        document.getElementById(thisID).classList.add('node');
                        document.getElementById(thisID).classList.remove('unvisited-node');
                        break;
                    case('considering-node'):
                        document.getElementById(thisID).classList.remove('considering-node');
                        break;
                    case('path-node'):
                        document.getElementById(thisID).classList.remove('path-node');
                        break;
                    default:
                        break;
                }
            }
        }
    }

    if (document.getElementById("cleared-board: true") !== null){
        document.getElementById('cleared-board: true').id = 'cleared-board: false';
    }
}
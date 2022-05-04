import React from "react";
import "./Grid.css";
import "./Node.css";
import userVars from "./userVars";

// NEED TO CHANGE THIS TO A CLASS COMPONENT IN ORDER TO USE THIS AS I WANT TO.
// USING A FUNCTION WILL NOT WORK IN THIS CASE.
// OR IS JUST TOO DIFFICULT FOR ME AT THIS POINT WITH MY LIMITED EXPERIENCE;

function GridRow(props){
       let row = createRow();

       function output(_index){
           console.log(String(_index));
       }

       return(
           <div className="grid-row">
               {row.map((item, index) => {
                   return (
                     <div
                         className="node"
                         id={`Node: ${index}, ${props.columnNum}`}
                         key={`Node: ${index}, ${props.columnNum}`}
                         onClick={() => {
                             let key = `Node: ${index}, ${props.columnNum}`
                             let classes = document.getElementById(key).classList
                             output(key);
                             console.log(document.getElementById(key));

                             // IF SELECTSTARTNODE IS DESCRIBED AS TRUE, THEN NEXT CLICK WILL ADD START-NODE CLASS;
                             // SAME APPLIES FOR ALL THE OTHER NODE TYPES;
                             selectStartNodeHandler(index, props.columnNum, classes);

                             selectEndNodeHandler(index, props.columnNum, classes);

                             selectWallNodeHandler(index, props.columnNum, classes);

                             clearNodeHandler(index, props.columnNum, classes);
                             // console.log("Node Classes: " + classes);

                         }}
                     />
                   );
               })}
           </div>
       )
}

export default GridRow;


function createRow(){
    let _row = [];
    for(let i = 0; i < userVars.xLength; i++){
        _row.push(i);
    }

    return _row;
}

function selectStartNodeHandler(_x, _y, _classes){
    if (document.getElementById(`SelectStartNode: true`) != null){
        // SETS THE SELECTSTARTNODE CLASS BACK TO FALSE;
        document.getElementById(`SelectStartNode: true`).id = `SelectStartNode: false`;

        // REMOVES UNVISITED NODE CLASS IF IT IS PRESENT;
        removeUnvisitedAddNode(`Node: ${_x}, ${_y}`, _classes);

        if (_classes.length <= 1){
            document.getElementById(`Node: ${_x}, ${_y}`).classList.add("start-node");
        } else {
            document.getElementById(`SelectStartNode: false`).id = `SelectStartNode: true`;

        }
    }
}

function selectEndNodeHandler(_x, _y, _classes){
    if (document.getElementById(`SelectEndNode: true`) != null){
        // SETS THE SELECTENDNODE CLASS BACK TO FALSE;
        document.getElementById(`SelectEndNode: true`).id = `SelectEndNode: false`;

        // REMOVES UNVISITED NODE CLASS IF IT IS PRESENT;
        removeUnvisitedAddNode(`Node: ${_x}, ${_y}`, _classes);

        // ADDS THE END-NODE CLASS TO THE SPECIFIED NODE;
        if (_classes.length <= 1){
            document.getElementById(`Node: ${_x}, ${_y}`).classList.add("end-node");
        } else {
            document.getElementById(`SelectEndNode: false`).id = `SelectEndNode: true`;
        }
    }
}

function selectWallNodeHandler(_x, _y, _classes){
    // ASSIGNS THE WALL CLASS TO A NODE, IF IT DOES NOT ALREADY HAVE A SECONDARY CLASS;
    if (document.getElementById('SelectWallNode: true') != null){
        if (_classes.length <= 1){
            document.getElementById(`Node: ${_x}, ${_y}`).classList.add("wall-node");
        }
    }
}

function clearNodeHandler(_x, _y, _classes){
    // CLEARS A SINGLE NODE OF ANY EXTRA CLASSES;
    if (document.getElementById('clearNode: true') != null){
        if (_classes.length > 1){
            for (let i = 0; i < _classes.length; i++){
                if (_classes[i] !== 'node'){
                    _classes.remove(_classes[i]);
                }
            }
        }
    }
}

function removeUnvisitedAddNode(_thisID, _classes){
    // REMOVES UNVISITED NODE CLASS;
    for (let i = 0; i < _classes.length; i++){
        if (document.getElementById(_thisID).classList[i] === 'unvisited-node'){
            document.getElementById(_thisID).classList.add('node');
            document.getElementById(_thisID).classList.remove('unvisited-node');
        }
    }
}

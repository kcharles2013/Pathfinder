import React, {useState} from "react";
import GridRow from "./gridRow";
import LegendMobile from "./legend-mobile";
import userVars from "./userVars";
import Legend from "./legend";

function Grid(){
    let currentGrid = createGrid();
    const [grid, setGrid] = useState(currentGrid);

    let selectStartNode = false;
    let selectEndNode = false;

    return(
        <div className="grid-container" id='grid-container'>
            <div className='grid-item left-legend' id='left-legend'>
                <Legend />
            </div>
            <div className='grid-item center-grid' id='center-grid'>
                <div className="grid" id='grid'>
                    {grid.map((item, index) => {
                        let thisID = `grid-row-${index}`
                        return(
                            <GridRow
                                className="grid-row"
                                id={thisID}
                                columnNum={index}
                                selectStartNode={selectStartNode}
                                selectEndNode={selectEndNode}
                                key={`Row: ${index}`}
                            />
                        )
                    })}
                </div>
            </div>
            <div className='grid-item right-legend' id='right-legend'>
                <LegendMobile />
            </div>
        </div>
    )
}

function createGrid(){
    // CREATES AN ARRAY THAT DICTATES HOW MANY ROWS WILL BE MADE IN THE GRID;
    // GRID.MAP HANDLES HOW MANY COLUMNS WILL BE CREATED AFTER THE ROWS HAVE BEEN
    // ESTABLISHED;
    let _grid = [];

    for (let i = 0; i < userVars.yLength; i++){
        _grid.push(i);
    }
    return _grid;
}

export default Grid;
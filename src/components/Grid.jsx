import React, {useState} from "react";
import createGridArray from "./GridArray";
// import Node from "./Node";
import GridRow from "./gridRow";
import ErrorMessage from "./ErrorMessage";
import LegendMobile from "./legend-mobile";
import userVars from "./userVars";
import Legend from "./legend";

function Grid(){
    let tempGrid = createGrid();
    const [grid, setGrid] = useState(tempGrid);

    // const clearGrid = () => {
    //     tempGrid = createGrid();
    //     setGrid(tempGrid);
    // }

    let selectStartNode = false;
    let selectEndNode = false;

    let testText = "TestText";

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
            <ErrorMessage
                errorMessage={testText}
            />
        </div>
    )
}

function createGrid(){
    let _grid = [];

    for (let i = 0; i < userVars.yLength; i++){
        _grid.push(i);
    }

    return _grid;
}

export default Grid;
let grid = [];

function createGridArray(){
    // ADDS THE ROWS TO THE GRID;
    for (let i = 0; i < 25; i++){
        let row = [];
        for (let j = 0; j < 25; j++){
            // ADDS THE NODE TO EACH ROW;
            row.push({
                columnNum: j,
                rowNum: i,
                startNode: false,
                endNode: false,
                wallNode: false
            });
        }
        grid.push(row);
    }
    console.log(grid);
    return grid;
}

export default createGridArray;

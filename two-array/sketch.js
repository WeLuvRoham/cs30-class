// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// let theGrid = [[1,0,1,0],
//                [0,0,1,1],
//                [1,1,0,1],
//                [0,1,0,0]];
// const SQUARE_DIMENSIONS = theGrid.length;

let theGrid;
const SQUARE_DIMENSIONS = 4;
makeGrid()

let cellSize;


function setup() {
  createCanvas(windowWidth, windowHeight);
  if (width<height){
    cellSize = width/SQUARE_DIMENSIONS;
  }
  else{
    cellSize = height/SQUARE_DIMENSIONS;
  }
theGrid = newGrid(SQUARE_DIMENSIONS, SQUARE_DIMENSIONS)
}

function draw() {
  background(220);
  showGrid()
}

function showGrid(){
  for (let y=0; y<SQUARE_DIMENSIONS; y++){
    for (let x=0; x<SQUARE_DIMENSIONS; x++){
      if (theGrid[y][x]===1){
        square(x*cellSize,y*cellSize, cellSize);
        fill("black")
      }
      else{
        square(x*cellSize,y*cellSize, cellSize);
        fill("white")
      }
    }
  }
}

function mousePressed(){
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);



  toggleCell(x,y)
}

function toggleCell(x,y){
  if (theGrid[y][x] === 1){
    theGrid[y][x] = 0;
  }
  else if (theGrid[y][x] === 0){
    theGrid[y][x] = 1;
  }
}

function makeGrid(cols, rows){
  let newGrid = [];
  for (let y = 0; y<SQUARE_DIMENSIONS; y++){
    newGrid.push([]);
    for (let x = 0; x<SQUARE_DIMENSIONS; x++){
      newGrid.push(random(0,1))
    }
  }
  return newGrid
}
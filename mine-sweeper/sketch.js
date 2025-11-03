// Mine Sweeper
// Roham Arab
// 10/28/2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const CELL_SIZE = 50;
let grid;
let rows;
let cols;
let gameStatus = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = Math.floor(width/CELL_SIZE);
  rows = Math.floor(height/CELL_SIZE);
  grid = generateRandomGrid(cols, rows);
}

function draw() {
  background(220);
  displayGrid();
}

function mousePressed(){

}

function mousePressed(){
  
}

function toggleCell(x,y){
  if (x>=0 && x<cols && y>= 0 && y< rows){
    if (grid[y][x] === 0){
      grid[y][x] = 1;

    }
    else if (grid[y][x] === 1){
      grid[y][x] = 0;

    }
}
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(cols, rows);
  }
  else if (key === "e"){
    grid = generateEmptyGrid(cols, rows);

  }
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 0) {
        fill("grey");
      }
      else if (grid[y][x] === 1) {
        fill("grey");
      }
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    }
    // check around the 0 set blocks for a 1, if there is a one make it fit into a set of variables.
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      //pick 0 or 1 randomly
      if (random(100) < 90) {
        newGrid[y].push(0);
      }
      else {
        newGrid[y].push(1);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
        newGrid[y].push(0);
      }
    }
  return newGrid;
}
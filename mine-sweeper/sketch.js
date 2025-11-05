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


//preload images
function preload() {
  bomb = loadImage("bomb.png")
  gameOver = loadImage("gameOver.png")
  empty = loadImage("emptyBlock.png")
  one = loadImage("oneBlock.png");
  tow = loadImage("twoBlock.png");
  three = loadImage("threeBlock.png");
  four = loadImage("fourBlock.png");
  five = loadImage("fiveBlock.png");
  six = loadImage("sixBlock.png");
  seven = loadImage("sevenBlock.png")
}


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

function mousePressed() {
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  //self
  toggleCell(x ,y);
}

function toggleCell(x,y){
  if (x>=0 && x<cols && y>= 0 && y< rows){
    if (grid[y][x] === 0){
      grid[y][x] = 1;
      gameStatus = false;
      fill("red")
      endGame()
    }
    else if (grid[y][x] === 1){
      grid[y][x] = 0;
      checkBlock(y, x)
    }
}
}

function checkBlock(y, x){
  //check around block for data
  total =  grid[x-1,y] + grid[x,y-1] + grid[x-1,y-1] + grid[x+1,y] + grid[x,y+1] + grid[x+1,y+1]
  if (total === 0 ){
    image(empty, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    knockOtherEmptyBlocks()
  }
  if (total === 1){
    image(one, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
  }
  if (total === 2){
    image(tow, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
  }
  if (total === 3){
    image(three, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
  }
  if (total === 4){
    image(four, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
  }
  if (total === 5){
    image(five, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
  }
  if (total === 6){
    image(six, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
  }
  if (total === 7){
    image(seven, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
  }
  
}

function endGame(){
  if (gameStatus === false){
    image(gameOver, x*width, y*height, grid)
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
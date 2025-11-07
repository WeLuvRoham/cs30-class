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
let bomb, gameOver, empty, one, two, three, four, five, six, seven;
let revealed;
let deathScreen;

//preload images
function preload() {
  bomb = loadImage("bomb.png");
  gameOver = loadImage("gameOver.png");
  empty = loadImage("emptyBlock.png");
  one = loadImage("oneBlock.png");
  two = loadImage("twoBlock.png");
  three = loadImage("threeBlock.png");
  four = loadImage("fourBlock.png");
  five = loadImage("fiveBlock.png");
  six = loadImage("sixBlock.png");
  seven = loadImage("sevenBlock.png");
  flagImage = loadImage("flag.png")
  deathScreen = createImg('gameOver.png', "Game Over Screen");
  deathScreen.hide();
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = Math.floor(width/CELL_SIZE);
  rows = Math.floor(height/CELL_SIZE);
  grid = generateRandomGrid(cols, rows);
  // create a revealed grid (0 = covered, 1 = revealed)
  revealed = generateEmptyGrid(cols, rows);

  deathScreen.position(CENTER, CENTER);
}

function draw() {
  background(220);
  displayGrid();
}

function mousePressed() {
  if (mouseButton===LEFT){
    let x = Math.floor(mouseX / CELL_SIZE);
    let y = Math.floor(mouseY / CELL_SIZE);
    toggleCell(x, y);
  }
  if (mouseButton===RIGHT){
    let x = Math.floor(mouseX / CELL_SIZE);
    let y = Math.floor(mouseY / CELL_SIZE);
    flag(x,y)
  }
}

function toggleCell(x,y){
  if (x>=0 && x<cols && y>= 0 && y< rows){
    // if it's a bomb -> end game
    if (grid[y][x] === 1){
      revealed[y][x] = 1;
      

      gameStatus = false;
      endGame();
    }
    // reveal this cell
    revealed[y][x] = 1;
    // optional: if no adjacent bombs, reveal neighbors (simple flood-fill)
    if (countNeighbors(x, y) === 0) {
      revealNeighbors(x, y);
    }
}
}

function flag(x,y) {
  grid[y][x] = image(flagImage,x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE )

}

// return number of bombs around block
function countNeighbors(x, y) {
  let total = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      let nx = x + dx;
      let ny = y + dy;
      if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
        if (grid[ny][nx] === 1) total++;
      }
    }
  }
  return total;
}

function revealNeighbors(x, y) {
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      let nx = x + dx;
      let ny = y + dy;
      if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
        if (!revealed[ny][nx]) {
          revealed[ny][nx] = 1;
          if (countNeighbors(nx, ny) === 0 && grid[ny][nx] === 0) {
            revealNeighbors(nx, ny);
          }
        }
      }
    }
  }
}

function endGame(){
  if (gameStatus === false){
    deathScreen.show();
    grid = generateEmptyGrid(cols, rows)
  }
  }



function keyPressed() {
  if (key === " " && gameStatus===false) {
    gameStatus = true;
    setup()
    draw()
  }
  else if (key === "e"){
    grid = generateEmptyGrid(cols, rows);
    
  }
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      // covered cell
      if (!revealed[y][x]) {
        fill("grey");
        square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
      } else {
        // revealed
        if (grid[y][x] === 1) {
          image(bomb, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        } else {
          let total = countNeighbors(x, y);
          if (total === 0) {
            image(empty, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
          } else if (total === 1) {
            image(one, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
          } else if (total === 2) {
            image(two, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
          } else if (total === 3) {
            image(three, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
          } else if (total === 4) {
            image(four, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
          } else if (total === 5) {
            image(five, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
          } else if (total === 6) {
            image(six, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
          } else if (total >= 7) {
            image(seven, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
          }
        }
      }
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
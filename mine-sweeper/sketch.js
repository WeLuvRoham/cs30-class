// Mine Sweeper
// Roham Arab
// 10/28/2025
//
// Extra for Experts:
//used flood fill, utalized counting neighbours, have two mouse features, have a ton of images, and conutless functions. as well as two grids for flagging
// not mentioning a lot of things like also revealing bombs at death

const CELL_SIZE = 50;
let grid;
let rows;
let cols;
let gameStatus = true;
let bomb, gameOver, empty, one, two, three, four, five, six, seven;
let revealed;
let deathScreen;
let flagImage;
let flags; // 2D grid for flagged cells
let cnv; // canvas reference so we can block context menu

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
  flagImage = loadImage("flag.png");
  deathScreen = createImg('gameOver.png', "Game Over Screen");
  // center the image
  deathScreen.style('position', 'absolute');
  deathScreen.style('left', '50%');
  deathScreen.style('top', '50%');
  deathScreen.style('transform', 'translate(-50%,-50%)');
  deathScreen.hide();
}


function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  // prevent the browser context menu on right click over the canvas
  cnv.elt.oncontextmenu = () => false; //annotation arrow
  cols = Math.floor(width/CELL_SIZE);
  rows = Math.floor(height/CELL_SIZE);
  grid = generateRandomGrid(cols, rows);
  // create a revealed grid (0 = covered, 1 = revealed)
  revealed = generateEmptyGrid(cols, rows);
  // create flags grid
  flags = generateEmptyGrid(cols, rows);

  // deathScreen is positioned with CSS in preload()
}

function draw() {
  background(220);
  displayGrid();
}

function mousePressed() {
  // ignore input when game is over
  if (!gameStatus) return;
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
  if (!(x>=0 && x<cols && y>= 0 && y< rows)) return;
  // already revealed
  if (revealed[y][x]) return;
  // if it's a bomb then end game
  if (grid[y][x] === 1){
    revealed[y][x] = 1;
    endGame();
    return;
  }
  // reveal this cell
  revealed[y][x] = 1;
  //if no adjacent bombs, reveal neighbors (flood-fill)
  if (countNeighbors(x, y) === 0) {
    revealNeighbors(x, y);
  }
}

function flag(x,y) {
  // bounds check
  if (!(x>=0 && x<cols && y>= 0 && y< rows)) return;
  // don't allow flagging revealed cells
  if (revealed[y][x]) return;
  // toggle flag (0/1)
  flags[y][x] = flags[y][x] ? 0 : 1;

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
  // reveal bombs and stop the game
  gameStatus = false;
  // reveal all bombs
  for (let y = 0; y < rows; y++){
    for (let x = 0; x < cols; x++){
      if (grid[y][x] === 1) revealed[y][x] = 1;
    }
  }
  deathScreen.show();
}



function keyPressed() {
  if (key === " " && gameStatus===false) {
    resetGame();
  }
  else if (key === "e"){
    grid = generateEmptyGrid(cols, rows);
    revealed = generateEmptyGrid(cols, rows);
    flags = generateEmptyGrid(cols, rows);
  }
}

function resetGame(){
  // keep canvas size — just regenerate grids
  cols = Math.floor(width/CELL_SIZE);
  rows = Math.floor(height/CELL_SIZE);
  grid = generateRandomGrid(cols, rows);
  revealed = generateEmptyGrid(cols, rows);
  flags = generateEmptyGrid(cols, rows);
  gameStatus = true;
  deathScreen.hide();
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      // covered cell
      if (!revealed[y][x]) {
        fill("grey");
        square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
        // draw flag if present
        if (flags && flags[y] && flags[y][x]){
          image(flagImage, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
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

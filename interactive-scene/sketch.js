// Project Ghost
// Roham Arab
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// declare variables
let ghosts = [];
let mood = "hunt"; // we will have an option to have a 'flee' mood
let isNight = false;
let audio = new Audio('wompWomp.mp3');

//------------- KEY INPUTS -----------------
function keyPressed() {
  if (key === 'm' || key === 'M') {
    mood = (mood === "bold") ? "shy" : "bold";
  } else if (key === 'l' || key === 'L') {
    isNight = !isNight;
  } else if (key === 'g' || key === 'G') {
    ghosts.push(new Ghost(random(width), random(height)));
  } else if (key === 'h' || key === 'H') {
    if (ghosts.length > 1) ghosts.pop();
  }
}

function setup() {
  createCanvas(900, 600);
  let cols = 6;
  let rows = 3;
  let spacingX = width / (cols + 1);
  let spacingY = height / (rows + 2);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let x = spacingX * (c + 1) + random(-30, 30);
      let y = spacingY * (r + 1) + random(-20, 20);
      ghosts.push(new Ghost(x, y));// giving each ghost a unique x, y position assigned
    }
  }
}

function draw() {
    updateAndDisplayGhosts();
    drawMenu();
}

function drawMenu() {
    if (gameState === "start"){
        background(100); 
        textAlign(CENTER, CENTER);
        textSize(32);
        fill(255);
        text("Start Game", width / 2, height / 2 - 20); 
        fill (0,255,0);
        rect(width / 2 - 100, height / 2, 50, 100);
        fill(0);
        textSize(20);
    
    }
    if (gameState === "dead"){
        background(100); 
        textAlign(CENTER, CENTER);
        textSize(32);
        fill(255);
        text("Try Again", width / 2, height / 2 - 20); 
        fill (0,255,0);
        rect(width / 2 - 100, height / 2, 50, 100);
        fill(0);
        textSize(20);
        audio.play();
    }
    if (gameState === "alive"){
        //enter HUD info
    }
    }

// --------------- Background --------------
function changeBackground(){
    createCanvas(width, height);
    if (isNight === false){
        image = loadImage('dayTimeHauntedCrib.png', () => {});
    }
    if (isNight !== false){
        image = loadImage('nightTimeHauntedCrib.png', () => {});
    }
}

function updateAndDisplayGhosts(){
    if (gameState !== "alive"){
        return;
    }
    
}

// ------------- Ghost class --------------
class Ghost {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.baseSize = random(25, 50);
    this.speed = random(0.5, 1.5);
    this.offset = random(1000);
    this.bobAmp = random(4, 12);
    this.noiseSeed = random(1000);
    this.color = color(255, 255, 255, isNight ? 230 : 200);
  }
}

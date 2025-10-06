// Moody Ghosts
// Roham Arab
// 10/3/2025

// --------- Extra for Experts ---------
// I have implemented a scroll wheel system which was one of the extras but I
// went above and beyond that, I added a feature which moves ghosts away
// I have two backgrounds and a start and death menu
// I have multiple button inputs and independent(random) ghosts speeds
// If I could go back I would make a more logical game but I wanted to hit
// all of the requirements for extra for experts and go above and beyond with features
// I also made the ghosts so they would be different sizes at random
// for this project I only used AI to LEARN certain features you havent taught
// an exmaple would be 'audio', time passed, mouseWheel, and making multiple ghosts
// with independent speeds and positions
// again these are things I LEARNED from asking not copy and pasting




let ghosts = [];
let mood = "hunt"; 
let isNight = false;
let audio = new Audio('sounds/wompWomp.mp3');
let gameState = "start";
let bgDay, bgNight;

// background def
function preload(){
  bgDay = loadImage('images/dayTimeHauntedCrib.png');
  bgNight = loadImage('images/nightTimeHauntedCrib.png');
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
      ghosts.push(new Ghost(x, y));
    }
  }
}
// game setup
function draw() {
  if (gameState === "alive") {
    let score = ghosts.length*
    changeBackground();
    updateAndDisplayGhosts();
    drawHUD();
    
  } else {
    drawMenu();
    
  }
}
// key pressing features
function keyPressed() {
  if (key === 'm' || key === 'M') {
    mood = (mood === "bold") ? "shy" : "bold";
  } else if (key === 'l' || key === 'L') {
    isNight = !isNight;
  } else if (key === 'g' || key === 'G') {
    ghosts.push(new Ghost(random(width), random(height)));
  } else if (key === 'h' || key === 'H') {
    if (ghosts.length > 1) ghosts.pop();
  } else if (key === ' ') {
    if (gameState === "start" || gameState === "dead") {
      gameState = "alive";
    }
  }
}

// add ghosts with scroll wheel
function mouseWheel(event) {
  if (gameState === "alive") {
    if (event.delta < 0) { // scrolling up to add
      ghosts.push(new Ghost(random(width), random(height)));
    } else if (event.delta > 0 && ghosts.length > 1) { // scrolling down to remove
      ghosts.pop();
    }
  }
  return false; // prevent default page scroll
}

// menu and game states
function drawMenu() {
  background(80);
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(32);

  if (gameState === "start") {
    text("Press SPACE to Start", width/2, height/2);
  }

  if (gameState === "dead") {
    text("You Died! Press SPACE to Retry", width/2, height/2);
    ghosts = [];
    audio.play();
  }
}
// instructions for gameplay
function drawHUD() {
  fill(255);
  textAlign(LEFT, TOP);
  textSize(16);
  text("M - toggle mood", 10, 10);
  text("L - toggle day/night", 10, 30);
  text("G - add ghost", 10, 50);
  text("H - remove ghost", 10, 70);
  text("Scroll - add/remove ghost", 10, 90);
  text("Mood: " + mood, 10, 120);
  text("Ghosts: " + ghosts.length, 10, 140);
  
}
// change background based off isNight var
function changeBackground() {
  if (!isNight) {
    image(bgDay, 0, 0, width, height);
  } else {
    image(bgNight, 0, 0, width, height);
  }
}


function updateAndDisplayGhosts() {
  for (let g of ghosts) {
    g.update();
    g.display();
  }
}

class Ghost {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.baseSize = random(25, 50);
    this.speed = random(0.5, 1.5);
  }


//--------------------- ghosts direction and check if 'dead' -------------------
  update() {
    let dir = createVector(mouseX - this.x, mouseY - this.y);
    let d = dir.mag();
    if (d > 0.1) dir.normalize();

    if (mood === "bold") {
      this.x += dir.x * this.speed;
      this.y += dir.y * this.speed;
    } else {
      this.x -= dir.x * this.speed;
      this.y -= dir.y * this.speed;
    }

    if (dist(mouseX, mouseY, this.x, this.y) < this.baseSize / 2) {
      gameState = "dead";
    }
  }

  display() {
    noStroke();
    fill(255, 200);
    ellipse(this.x, this.y, this.baseSize, this.baseSize * 0.9);
    fill(0);
    ellipse(this.x - this.baseSize*0.2, this.y - 5, this.baseSize*0.2);
    ellipse(this.x + this.baseSize*0.2, this.y - 5, this.baseSize*0.2);
  }
}

// Project Title
// Your Name
// Date
//
// Pearlin Bubbles Demo
// Noise, Arrays, and Object Notation

let theBubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnBubble();

  //add a new bubble every half a second
  window.setInterval(spawnBubble, 1000);
}

function draw() {
  background(220);

  for ( let bubble of theBubbles){
    //move
    bubble.x = noise(bubble.time) * width;
    bubble.y = noise(bubble.time + bubble.buffer) * height;
    bubble.time += 0.01;
    //display
    circle(bubble.x, bubble.y, bubble.diameter);
    fill(bubble.r, bubble.g, bubble.b);
  }
}

function spawnBubble(){
  let _time = random(1000);
  let _buffer = random(1000);

  let theBubble = {
    time: _time,
    buffer: _buffer,
    x: noise(_time) * width,
    y: noise(_time + _buffer) * height,
    diameter: random(20, 50),
    deltaTime : 0.01,
    r : random(255),
    g : random(255),
    b : random(255),
  };
  theBubbles.push(theBubble);
}
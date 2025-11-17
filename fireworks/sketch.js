// Fireworks Oop Demo

class Particle {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.radius = 3;
    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.opacity = 255;
  }
  display(){
    noStroke();
    fill(this.r, this.g, this.b, this.opacity);
    circle(this.x, this.y, this.radius*2);

  }
  update(){
    this.x += this.dx;
    this.y += this.dy;

    this.opacity--;
  }
  isDead(){
    return this.opacity <=0;

  }
}

let theFireworks = []

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("black");
  for (let aFirework of theFireworks){
    if (aFirework.isDead()){
      let index = theFireworks.indexOf(aFirework);
      theFireworks.splice(index, 1);
    }
    aFirework.update();
    aFirework.display();
  }
}

function mousePressed(){
  for (let i=0; i <200; i++){
    let someFirework = new Particle(mouseX, mouseY);
    theFireworks.push(someFirework);
  }
}
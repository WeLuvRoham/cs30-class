// Nodes Oop Demo

let nodes=[]

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  for (let node of nodes){
    node.update();
    node.connectTo(nodes)
    
  }
  //draw circles after
  for (let node of nodes){
    node.display();
  }
}

function mousePressed(){
  let somePoint = new MovingPoint(mouseX,mouseY);
  nodes.push(somePoint);
}

class MovingPoint{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.xTime = random(1000);
    this.yTime = random(1000);
    this.deltaTime = 0.05;
    this.radius = random(10, 20);
    this.speed = 5;
    this.color = color(random(255), random(255), random(255));
    this.reach = 100;
  }
  display(){
    fill(this.color);
    circle(this.x, this.y, this.radius*2)
    
  }

  update(){
    this.move()
    this.wrapAroundScreen()
    this.adjustByMouse()
  }
  adjustByMouse(){
    let mouseDistance = dist(this.x, this.x, mouseX, mouseY);
    if (mouseDistance < this.reach){
      this.radius += this.reach-mouseDistance;
      this.radius = Math.min(this.radius, 50);
    }
    else{
      this.radius -= this.reach-mouseDistance;
    }
  }

  connectTo(nodesArray){
    for (let otherNode of nodesArray){
      let distanceAway = dist(this.x, this.y, otherNode.x, otherNode.y);
      if (distanceAway < this.reach){
        line(this.x, this.y, otherNode.x, otherNode.y);
      }
    }
  }

  move(){
    let dx = noise(this.xTime)
    let dy = noise(this.yTime)

    // scale from 0-1 movement speed
    dx = map(dx, 0, 1, -this.speed, this.speed);
    dy = map(dy, 0, 1, -this.speed, this.speed);

    //move
    this.x += dx;
    this.y += dy;
    //move on time axis
    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;
  }
  wrapAroundScreen(){
    if (this.x<0-this.radius){
      this.x+= width;
    }
    if (this.x > width+this.radius){
      this.x -= width;
    }
    if (this.y  < 0-this.radius){
      this.y += height;
    }
    if (this.y>height+this.radius){
      this.y -= height;
    }
  }
}


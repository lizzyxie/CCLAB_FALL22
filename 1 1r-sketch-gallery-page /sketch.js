let NUM_OF_PARTICLES = 1000;
let particles = [];
let p;

function setup() {
  let canvas = createCanvas(1250, 700);
  canvas.parent("canvasContainer");
  p = createGraphics(width, height);
  let rothkoDarkblue = (18, 7, 55);
  let rothkoDarkred = (225, 114, 59);
  background(220);
}

function draw() {
  background(32, 16, 85);

  drawRothko();

  //moving lines: how can i get them to have a trail when they move?
  let freq1 = frameCount * 0.02;
  let lineX = map(sin(freq1), -1, 1, 900, 500);
  let lineY = map(sin(freq1), -1, 1, 500, 1000);
  p.stroke(65, 70, 139, 10);
  p.line(650, 200, lineX, 500);
  p.stroke(50, 60, 189, 10);
  p.line(700, 200, lineY, 600);
  p.stroke(0);
  p.line(650, 200, 500, 500);
  p.line(650, 200, 900, 500);
  p.line(700, 200, 500, 600);
  p.line(700, 200, 1000, 600);
  image(p, 0, 0);

  drawCreature(width / 2, height / 2);

  push();
  //red
  stroke(0);
  strokeWeight(5);
  fill(213, 34, 52);
  rect(1120, 15, 100, 200);

  //yellow
  fill(223, 223, 73);
  rect(1040, 215, 180, 70);

  //blue
  fill(42, 42, 155);
  rect(1040, 15, 80, 80);

  //white
  fill(240);
  rect(1040, 65, 80, 150);

  rect(977, 75, 60, 130);

  fill(223, 223, 73);
  rect(935, 85, 40, 110);

  fill(42, 42, 155);
  rect(915, 95, 20, 90);

  fill(240);
  strokeWeight(2);
  rect(800, 220, 50, 100);

  pop();

  push();
  //squares and rectangles next to mondrian
  fill(213, 34, 52);
  stroke(0);
  strokeWeight(4);
  rect(750, 150, 200, 100);

  strokeWeight(3);
  fill(42, 42, 155);
  rect(700, 100, 100, 100);

  strokeWeight(2);
  fill(223, 223, 73);
  rect(760, 70, 60, 60);

  strokeWeight(2);
  fill(213, 34, 52);
  rect(640, 120, 100, 50);

  strokeWeight(3);
  fill(240);
  rect(900, 240, 100, 200);

  strokeWeight(3);
  fill(42, 42, 155);
  rect(860, 350, 300, 50);

  strokeWeight(3);
  fill(240);
  rect(950, 390, 50, 180);

  strokeWeight(3);
  fill(213, 34, 52);
  rect(1090, 390, 50, 200);

  pop();

  push();
  fill(18, 7, 55);
  stroke(0);
  circle(450, 110, 200);
  fill(33, 98, 122);
  stroke(0);
  circle(400, 100, 160);

  line(400, 50, 200, 400);
  line(420, 50, 220, 400);
  line(440, 50, 240, 400);
  line(460, 50, 260, 400);
  line(480, 60, 280, 420);

  line(390, 50, 600, 300);
  line(370, 50, 580, 300);
  line(350, 50, 560, 300);
  line(330, 50, 540, 300);
  line(310, 50, 520, 300);

  noFill();
  strokeWeight(2);
  rect(100, 150, 100, 100);
  rect(90, 60, 100, 250);
  rect(50, 100, 150, 100);

  triangle(100, 300, 150, 200, 200, 300);
  triangle(200, 260, 160, 400, 400, 260);

  pop();

  push();

  pop();

  noFill();
  stroke(0);
  circle(400, 670, 500);
  circle(400, 670, 400);
  circle(400, 670, 300);
  circle(400, 670, 200);

  let freq = frameCount * 0.02;
  let sinVal = sin(freq);
  let dia = map(sinVal, -1, 1, 200, 500);
  let g = map(sinVal, -1, 1, 0, 70);
  let dia2 = map(sinVal, -1, 1, 100, 300);
  let g2 = map(sinVal, -1, 1, 10, 100);

  noStroke();
  fill(100, g, 100);
  circle(400, 670, dia);

  noStroke();
  fill(50, g2, 200);
  circle(200, 200, dia2);

  if (mouseIsPressed) {
    let distance = dist(pmouseX, pmouseY, mouseX, mouseY); // ***
    particles.push(new Particle(mouseX, mouseY, distance));
  }

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.move();
    p.slowDown();
    p.display();
  }

  while (particles.length > NUM_OF_PARTICLES) {
    particles.splice(0, 1);
  }

  text(particles.length, 10, 20);
}

class Particle {
  constructor(x, y, accel) {
    this.x = x;
    this.y = y;
    this.xSpd = random(-1, 1) * accel;
    this.ySpd = random(-1, 1) * accel;

    let max = map(accel, 0, 100, 10, 2, true); // ***
    this.dia = random(1, max);
    if (random(1) < 0.5) {
      this.bri = 240;
    } else {
      this.bri = 0;
    }
  }
  move() {
    this.x += this.xSpd;
    this.y += this.ySpd;
  }
  slowDown() {
    this.xSpd = this.xSpd * 0.75; // -25%
    this.ySpd = this.ySpd * 0.75; // -25% // ***
  }
  display() {
    p.push();
    p.translate(this.x, this.y);

    p.fill(this.bri, 100); // ***
    p.noStroke();
    p.circle(0, 0, this.dia);

    p.pop();
  }
}

function drawCreature(x, y) {
  drawHead(width / 2, height / 2);
  drawBody(width / 2, height / 2);
  drawHeadspikes(width / 2, height / 2);
  drawBacktailspikes(width / 2, height / 2);
  drawArmslegs(width / 2, height / 2);
  drawClaws(width / 2, height / 2);
  drawBelly(width / 2, height / 2);
}

function drawHead(x, y) {
  push();
  fill(0, 102, 0);
  strokeWeight(1);
  stroke(0);
  translate(x, y);
  rotate(0.4);
  triangle(-100, 10, 40, -90, 90, 10);
  fill(255);
  circle(20, -30, 25);
  fill(0);
  circle(20, -30, 10);

  pop();
}

function drawBody(x, y) {
  push();
  translate(x, y);
  fill(0, 102, 0);
  strokeWeight(1);
  stroke(0);
  rect(10, 45, 80, 170);

  //eyebrow
  fill(0);
  rect(25, -45, 15, 5);

  pop();
}

function drawHeadspikes(x, y) {
  push();
  translate(x, y);

  fill(250, 160, 42);
  strokeWeight(1);
  stroke(0);
  rotate(-0.2);
  triangle(30, -51, 40, -70, 50, -51);
  triangle(50, -51, 60, -70, 70, -51);

  pop();
}

function drawBacktailspikes(x, y) {
  push();
  translate(x, y);

  fill(0, 102, 0);
  strokeWeight(1);
  stroke(0);
  triangle(90, 170, 90, 200, 200, 150);

  fill(250, 160, 42);
  strokeWeight(1);
  stroke(0);
  triangle(90, 150, 90, 170, 110, 160);
  triangle(90, 130, 90, 150, 110, 140);
  triangle(90, 110, 90, 130, 110, 120);
  triangle(90, 90, 90, 110, 110, 100);
  triangle(90, 70, 90, 90, 110, 80);
  triangle(90, 50, 90, 70, 110, 60);
  pop();
}

function drawArmslegs(x, y) {
  push();
  translate(x, y);

  fill(0, 102, 0);
  strokeWeight(1);
  stroke(0);

  rect(50, 100, 20, 40);

  rect(20, 215, 20, 40);
  rect(50, 215, 20, 40);

  pop();
}

function drawClaws(x, y) {
  push();
  translate(x, y);

  strokeWeight(1);
  stroke(0);

  fill(250, 160, 42);
  triangle(50, 140, 55, 140, 52.5, 150);
  triangle(55, 140, 60, 140, 57.5, 150);
  triangle(60, 140, 65, 140, 62.5, 150);
  triangle(65, 140, 70, 140, 67.5, 150);

  triangle(20, 255, 22.5, 262, 25, 255);
  triangle(25, 255, 27.5, 262, 30, 255);
  triangle(30, 255, 32.5, 262, 35, 255);
  triangle(35, 255, 37.5, 262, 40, 255);

  triangle(50, 255, 52.5, 262, 55, 255);
  triangle(55, 255, 57.5, 262, 60, 255);
  triangle(60, 255, 62.5, 262, 65, 255);
  triangle(65, 255, 67.5, 262, 70, 255);

  pop();
}

function drawBelly(x, y) {
  push();
  translate(x, y);
  fill(245, 221, 191);
  strokeWeight(1);
  stroke(0);
  rect(10, 45, 35, 110);
  pop();
}

function drawRothko() {
  push();
  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = -5;
  drawingContext.shadowBlur = 50;
  drawingContext.shadowColor = "rgb(48, 34, 95)";
  fill(38, 34, 51);
  noStroke();
  rect(25, 325, 1200, 350, 5);

  drawingContext.shadowOffsetX = 5;
  drawingContext.shadowOffsetY = -5;
  drawingContext.shadowBlur = 50;
  drawingContext.shadowColor = "rgb(51, 13, 17)";
  fill(51, 13, 17);
  noStroke();
  rect(25, 25, 1200, 270, 5);

  pop();
}

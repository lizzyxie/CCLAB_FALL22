let colors = [];
let brush = { x: 0, y: 0, px: 0, py: 0 };
let seed;
let colorR = 255;
let colorG = 255;
let colorB = 255;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas-container");
  background(229, 233, 203);
  noStroke();
  seed = random(1000);
  colors = [color(0)];
  let base = floor(random(colors.length));
  colors.splice(base, 1);
}

function draw() {
  brush.x += (mouseX - brush.x) / 12;
  brush.y += (mouseY - brush.y) / 12;

  stroke(colorR, colorG, colorB);
  fill(colorR, colorG, colorB);
  if (frameCount > 40) {
    drizzle();
  }
  brush.px = brush.x;
  brush.py = brush.y;
}

function keyPressed() {
  if (key === "b") {
    colorR = 0;
    colorG = 0;
    colorB = 0;
  } else if (key === "w") {
    colorR = 249;
    colorG = 249;
    colorB = 249;
  }
  else if (key === "g") {
    colorR = 223;
    colorG = 223;
    colorB = 201;
  }
}

function clearBg() {
  background(229, 233, 203);
}

function mouseMoved() {
  if (frameCount % 7 == 0) {
    stipple(mouseX, mouseY, 0);
  }
}

function drizzle() {
  let s = 1 + 30 / dist(brush.px, brush.py, brush.x, brush.y);
  s = min(50, s);
  strokeWeight(s);
  //stroke(10);
  line(brush.px, brush.py, brush.x, brush.y);
  //stroke();
  //line(width-brush.px, height-brush.py, width-brush.x, height-brush.y);
}
function splatter(bx, by) {
  let c = 255;
  bx += random(-15, 15);
  by += random(-15, 15);
  let mx = 10 * movedX;
  let my = 10 * movedY;
  for (let i = 0; i < 80; i++) {
    seed += 0.01;
    let x = bx + mx * (0.5 - noise(seed + i));
    let y = by + my * (0.5 - noise(seed + 2 * i));
    let s = 150 / dist(bx, by, x, y);
    if (s > 20) s = 20;
    let a = 255 - s * 5;
    noStroke();
    //c.setAlpha(a);
    //fill(c);
    ellipse(x, y, s);
    seed += 0.01;
  }
}

function stipple(bx, by, c) {
  noStroke();
  //fill(c);
  let radius = random(3, 10);
  ellipse(bx + random(-30, 30), by + random(30, -30), radius);
  radius = random(3, 12);
  ellipse(bx + random(-30, 30), by + random(30, -30), radius);
}

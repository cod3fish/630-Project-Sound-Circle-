let colors = [];
let stars = [];
let planets = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  for (let i = 0; i < 100; i++) {
    stars.push(new Star());
  }

//   for (let i = 0; i < 5; i++) {
//     planets.push(new Planet());
//   }
  console.log("jsahdbashjkb", stars, planets);
}

function draw() {
  background(0);

  for (let star of stars) {
    star.show();
  }

  for (let planet of planets) {
    planet.show();
  }
}

class Star {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(1, 3);
    // this.color = color(random(colors));
    this.color = 255;
  }

  show() {
    console.log("blablaaa");
    // fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}

class Planet {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(10, 30);
    this.color = color(random(colors));
  }

  show() {
    // fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}

// Update the displayColorScheme function to set the colors array
function displayColorScheme(newColors) {
  const colorContainer = document.getElementById("color-container");
  colorContainer.innerHTML = "";
  colors = newColors;

  for (let i = 0; i < stars.length; i++) {
    stars[i].color = color(random(colors));
  }

  for (let i = 0; i < planets.length; i++) {
    planets[i].color = color(random(colors));
  }

  newColors.forEach(color => {
    const colorBox = document.createElement("div");
    colorBox.style.backgroundColor = color;
    colorBox.style.width = "100px";
    colorBox.style.height = "100px";
    colorBox.style.margin = "5px";
    colorContainer.appendChild(colorBox);
  });
}

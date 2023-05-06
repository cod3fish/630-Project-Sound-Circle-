let colors = [];
async function generateColorScheme() {
    const userInput = document.getElementById("color-input").value.slice(1);
    const apiUrl = `https://www.thecolorapi.com/scheme?hex=${userInput}&mode=analogic&count=5`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const result = await response.json();
    colors = result.colors.map(color => color.hex.value);
    displayColorScheme(colors);
  }

  function displayColorScheme(colors) {
    const colorContainer = document.getElementById("color-container");
    colorContainer.innerHTML = "";

    colors.forEach(color => {
      const colorBox = document.createElement("div");
      colorBox.style.backgroundColor = color;
      colorBox.style.width = "100px";
      colorBox.style.height = "100px";
      colorBox.style.margin = "5px";
      colorContainer.appendChild(colorBox);
    });
  }

//   let colors = [];
let stars = [];
let planets = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  fill(23, 200, 90);
  ellipse(800,1200);
  console.log("canvas created");

  for (let i = 0; i < 100; i++) {
    stars.push(new Star());
  }

  for (let i = 0; i < 9; i++) {
    planets.push(new Planet());
  }
  
}

function draw() {
  background(0);

  for (let star of stars) {
    star.show();
  }

  for (let planet of planets) {
    planet.show();
  }
  

  beginShape();
  let waveLength = 100;
  let amplitude = 50;
  for (let x = 0; x < width; x += 5) {
    let y = height / 2 + amplitude * sin((x + frameCount) * TWO_PI / waveLength);
    vertex(x, y);
  }
  endShape();

  
}

class Star {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(1, 3);
    this.color = color(random(1,255));
    // this.color = 255;
  }

  show() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}

class Planet {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(50, 200);
    this.color = color(random(1,255));
  }

  show() {
    fill(this.color);
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

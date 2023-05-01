// Replace with your own API key
// const apiKey = 'YOUR_API_KEY';

// let planets = [];

// function setup() {
//   createCanvas(windowWidth, windowHeight);

//   // Create planets
//   for (let i = 0; i < 10; i++) {
//     planets.push({
//       x: random(width),
//       y: random(height),
//       size: random(20, 100),
//       color: color(random(255), random(255), random(255))
//     });
//   }

  // Add event listener to the submit button
//   const submitButton = document.getElementById('submit-color');
//   submitButton.addEventListener('click', () => {
//     const colorInput = document.getElementById('color-input').value;
//     updateColorScheme(colorInput);
//   });
// }

// function draw() {
//   background(0);

//   // Draw planets
//   for (let planet of planets) {
//     fill(planet.color);
//     ellipse(planet.x, planet.y, planet.size);
//   }
// }

// async function updateColorScheme(baseColor) {
//   const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&count=10&mode=analogic&apiKey=${apiKey}`);
//   const data = await response.json();

  // Update planet colors
//   for (let i = 0; i < planets.length; i++) {
//     planets[i].color = color(data.colors[i].rgb.r, data.colors[i].rgb.g, data.colors[i].rgb.b);
//   }
// }


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

  for (let i = 0; i < 100; i++) {
    stars.push(new Star());
  }

  for (let i = 0; i < 5; i++) {
    planets.push(new Planet());
  }
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
    this.color = color(random(colors));
    // this.color = 255;
  }

  show() {
    console.log("blablaaa");
    fill(this.color);
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

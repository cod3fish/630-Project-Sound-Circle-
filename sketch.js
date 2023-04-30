// Replace with your own API key
// const apiKey = 'YOUR_API_KEY';

let planets = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create planets
  for (let i = 0; i < 10; i++) {
    planets.push({
      x: random(width),
      y: random(height),
      size: random(20, 100),
      color: color(random(255), random(255), random(255))
    });
  }

  // Add event listener to the submit button
  const submitButton = document.getElementById('submit-color');
  submitButton.addEventListener('click', () => {
    const colorInput = document.getElementById('color-input').value;
    updateColorScheme(colorInput);
  });
}

function draw() {
  background(0);

  // Draw planets
  for (let planet of planets) {
    fill(planet.color);
    ellipse(planet.x, planet.y, planet.size);
  }
}

async function updateColorScheme(baseColor) {
  const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&count=10&mode=analogic&apiKey=${apiKey}`);
  const data = await response.json();

  // Update planet colors
  for (let i = 0; i < planets.length; i++) {
    planets[i].color = color(data.colors[i].rgb.r, data.colors[i].rgb.g, data.colors[i].rgb.b);
  }
}

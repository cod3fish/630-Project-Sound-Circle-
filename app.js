let song;
let fft;
let particles = [];

function preload() {
    song = loadSound('Wetwork.mp3'); 
}

function setup() {
    createCanvas(windowWidth, windowHeight);  // sets up the canvas
    angleMode(DEGREES); 
    fft = new p5.FFT(); 

}

function draw() {
    clear();
    // background(0);
    stroke(255);
    noFill();
    strokeWeight(2);

    translate(width / 2, height / 2);  

    fft.analyze();   // mapping the particle motion to the music
   
    amp = fft.getEnergy(20, 200);

    let wave = fft.waveform();

    for (let t= -1; t <= 1; t +=2) {
    beginShape();
    for (let i = 0; i <= 180; i+=0.5) {
        let index = floor(map(i, 0, 180, 0, wave.length - 1));

        let r = map(wave[index], -1, 1, 150, 350);

        let x = r * sin(i) * t;
        let y = r * cos(i);

        // let x = i;
        // let y = wave[index] * 300 + height / 2;
        vertex(x, y);
    }
    endShape(); 
    }

    var p = new Particle();  // creating and passing particles to the particles class
    particles.push(p);

    for (let i= particles.length - 1; i >= 0; i--) {    // showing the particles on the screen
        if (!particles[i].removeParticles()) {
            particles[i].update(amp > 230);
            particles[i].show();
        } else {
            particles.splice(i, 1);             // removing particles from the screen 
        }
        
    }

}

function mouseClicked() {
    if (song.isPlaying()) {
        song.pause();
    } else {
        song.play();
    }
}

class Particle {   // creating particles around the circular equalizer
    constructor() {
        this.pos = p5.Vector.random2D().mult(250);
        this.vel = createVector(0, 0);
        this.acc = this.pos.copy().mult(random(0.0001, 0.00001));

        this.w = random(3, 5);
    }

    update(cond) {
        this.vel.add(this.acc);   // adding the acceleration to the velocity
        this.pos.add(this.vel);   // adding the velocity to the position

        if (cond) {
            this.pos.add(this.vel);
            this.pos.add(this.vel);
            this.pos.add(this.vel); 
        }

    }

    removeParticles() {
        if (this.pos.x < -width / 2 || this.pos.x > width / 2 || this.pos.y < -height / 2 || this.pos.y > height / 2) {
            return true;
        } else {
            return false;
        }
    }


    show() {
        noStroke();
        fill(255);
        ellipse(this.pos.x, this.pos.y, 4);
    }

}
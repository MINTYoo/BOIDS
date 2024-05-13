// Global variables
//let sprites = [];
let player;
let penguins;
let bkImage;
let boids = [];
let numBoids = 10;

// Preload function
function preload() {
    // Load JSON file
    penguins = loadJSON("spriteImages/Penguins/animationData.json");
    bkImage = loadImage("imgs/BK.jpg");
    
}

// Setup function
function setup() {
    createCanvas(windowWidth, windowHeight);

    alignSlider = createSlider(0, 2, 0, 0.1);
    cohesionSlider = createSlider(0, 2, 0, 0.1);
    separationSlider = createSlider(0, 2, 0, 0.1);
    perceptionSlider = createSlider(0, 500, 5, 10);
    //maxSpeedSlider = createSlider(2, 14, 4, 2);
    

    //Create Boids
    for(let i = 0; i < numBoids; i++) {
        boids.push(new Boid());
    }

    player = new Player(100, 100, "idle", penguins);
    player.load(); // Preload animation frames
}

// Draw function
function draw() {
    background(bkImage);

    // Update and display sprites
    for (let i = boids.length - 1; i >= 0; i--) {
        let boid = boids[i];
        let sprite = boids[i].sprite;
        if (checkCollision(player, sprite)) {
            console.log("Collision detected between player and sprite");
            //we can remove from the array
            //sprites.splice(i, 1);
            boids.splice(i, 1);
        } else {
          // sprite.updatePosition();
          // sprite.display();
            //Assign each boid to the boids flock and update/display position
            boid.flock(boids);
            boid.update();
            boid.checkEdges(); // Check for boundary collisions
            //boid.limitSpeed(); // Limit speed
            boid.show();
        }
    }

    // Update and display player
    player.display();
    player.keyInput()
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}



function checkCollision(obj1, obj2) {
    // Check if animation frames are loaded
    if (obj1.animationFrames.length === 0 || obj2.loadedImgs[obj1.animation] === undefined) {
        return false; 
    }


    let obj1Frame = obj1.getImageData()
    let obj2Frame = obj2.getImageData();

    //need to be defined to not get hight/width error
    if (!obj1Frame || !obj2Frame) {
        return false; 
    }

    //get player paramters 
    let obj1Left = obj1.x;
    let obj1Right = obj1.x + obj1Frame.width;
    let obj1Top = obj1.y;
    let obj1Bottom = obj1.y + obj1Frame.height;

    //get sprite parameters
    let obj2Left = obj2.x;
    let obj2Right = obj2.x + obj2Frame.width;
    let obj2Top = obj2.y;
    let obj2Bottom = obj2.y + obj2Frame.height;

    //if collision
    if (obj1Right > obj2Left && obj1Left < obj2Right && obj1Bottom > obj2Top && obj1Top < obj2Bottom) {
        return true; 
    }
    //no collision
    return false; 
}



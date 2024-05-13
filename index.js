// Global variables
let sprites = [];
let player;
let penguins;
let bkImage;
let boids = [];
let numBoids = 5;
let score = 0;
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
        let sprite = new Sprite(penguins, 3);
        sprites.push(sprite);
        sprite.preloadAnimations(); // Preload animations for each sprite
    }

    player = new Player( penguins);
    player.preloadAnimations(); // Preload animation frames

}

// Draw function
function draw() {
    background(bkImage);

    // Update and display sprites
    player.checkEdges()
    player.display();
    player.keyInput();
    for (let i = sprites.length - 1; i >= 0; i--) {
        let sprite = sprites[i];
        if (checkCollision(player, sprite)) {
            console.log("Collision detected between player and sprite");
            // Remove sprite from array
            sprites.splice(i, 1);
            collisionDetected = true;
            score++;
        } else {
            sprite.updatePosition();
            sprite.display();
            //boid.flock(boids);
            //boid.update();
            //boid.checkEdges(); // Check for boundary collisions
            //boid.limitSpeed(); // Limit speed
            //boid.show();
        }
    }

    // Update and display player
    fill(255);
    textSize(24);
    text("Score: " + score, 20, 40);
}

/*
function removeOneSprite() {
    // Find the index of the first sprite that collided with the player
    let index = -1;
    for (let i = 0; i < sprites.length; i++) {
        if (checkCollision(player, sprites[i])) {
            index = i;
            break;
        }
    }
    // Remove the sprite at the found index
    if (index !== -1) {
        sprites.splice(index, 1);
    }
}
*/
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}



function checkCollision(obj1, obj2) {


    // Get the dimensions of the animation frames for obj1 and obj2
    let obj1Frame = obj1.getImageData();
    let obj2Frame = obj2.getImageData();

    // Check if frames are loaded
    if (!obj1Frame || !obj2Frame) {
        return false;
    }

    // Calculate bounding boxes for obj1
    let obj1Left = obj1.x;
    let obj1Right = obj1.x + obj1Frame.width;
    let obj1Top = obj1.y;
    let obj1Bottom = obj1.y + obj1Frame.height;

    // Calculate bounding boxes for obj2
    let obj2Left = obj2.x;
    let obj2Right = obj2.x + obj2Frame.width;
    let obj2Top = obj2.y;
    let obj2Bottom = obj2.y + obj2Frame.height;

    // Check for collision
    if (obj1Right > obj2Left && obj1Left < obj2Right && obj1Bottom > obj2Top && obj1Top < obj2Bottom) {
        return true;
    }

    // No collision
    return false;
}




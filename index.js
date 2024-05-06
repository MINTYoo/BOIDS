

// Preload function
function preload() {
    // Load JSON file
    penguins = loadJSON("spriteImages/Penguins/animationData.json");
}

// Global variables
let mySprite;

// Setup function
function setup() {
    createCanvas(windowWidth, windowHeight);
    mySprite = new Sprite(penguins, 10); // Example: 10 penguins
    mySprite.preloadAnimations(); // Preload all animations
}

// Draw function
function draw() {
    background(255);
    mySprite.updatePosition();
    mySprite.display();
}

function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        mySprite.changeAnimation('walk_E');
        mySprite.x_velocity = 5; 
        mySprite.y_velocity = 0; 
    } else if (keyCode === LEFT_ARROW) {
        mySprite.changeAnimation('walk_W');
        mySprite.x_velocity = -5; 
        mySprite.y_velocity = 0; 
    } else if (keyCode === UP_ARROW) {
        mySprite.changeAnimation('walk_N');
        mySprite.x_velocity = 0; 
        mySprite.y_velocity = -5; 
    } else if (keyCode === DOWN_ARROW) {
        mySprite.changeAnimation('walk_S');
        mySprite.x_velocity = 0; 
        mySprite.y_velocity = 5; 
    }
    mySprite.x += mySprite.x_velocity 
    mySprite.y += mySprite.y_velocity 
}


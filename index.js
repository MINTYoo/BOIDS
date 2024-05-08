// Global variables
let sprites = [];
let penguins; 

// Preload function
function preload() {
    // Load JSON file
    penguins = loadJSON("spriteImages/Penguins/animationData.json");
    bkImage = loadImage("imgs/BK.jpg")
}

// Setup function
function setup() {
    createCanvas(windowWidth, windowHeight);

  
    for (let i = 0; i < 10; i++) { 
        let sprite = new Sprite(penguins, 1); 
        sprite.preloadAnimations(); 
        sprites.push(sprite); 
    }
}

// Draw function
function draw() {
    background(bkImage);

    // Update and display 
    for (let sprite of sprites) {
        sprite.updatePosition();
        sprite.display();
    }
}

// Handle key press events
function keyPressed() {
    for (let sprite of sprites) {
        if (keyCode === RIGHT_ARROW) {
            sprite.changeAnimation('walk_E');
            sprite.x_velocity = 5;
            sprite.y_velocity = 0;
        } else if (keyCode === LEFT_ARROW) {
            sprite.changeAnimation('walk_W');
            sprite.x_velocity = -5;
            sprite.y_velocity = 0;
        } else if (keyCode === UP_ARROW) {
            sprite.changeAnimation('walk_N');
            sprite.x_velocity = 0;
            sprite.y_velocity = -5;
        } else if (keyCode === DOWN_ARROW) {
            sprite.changeAnimation('walk_S');
            sprite.x_velocity = 0;
            sprite.y_velocity = 5;
        }
        sprite.x += sprite.x_velocity;
        sprite.y += sprite.y_velocity;
    }
}

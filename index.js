// Global variables
let sprites = [];
let player;
let penguins;
let bkImage;

// Preload function
function preload() {
    // Load JSON file
    penguins = loadJSON("spriteImages/Penguins/animationData.json");
    bkImage = loadImage("imgs/BK.jpg");
}

// Setup function
function setup() {
    createCanvas(windowWidth, windowHeight);

    // Create sprites
    for (let i = 0; i < 5; i++) { 
        let sprite = new Sprite(penguins, 1); 
        sprite.preloadAnimations(); 
        sprites.push(sprite); 
    }

    // Create player
    player = new Player(100, 100, "idle", penguins);
    player.load();
}

// Draw function
function draw() {
    background(bkImage);

    // Update and display sprites
    for (let sprite of sprites) {
        sprite.updatePosition();
        sprite.display();
    }

    // Update and display player
    player.display();
}

// Handle key press events for controlling the player


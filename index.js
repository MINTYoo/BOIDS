// Global variables
//let sprites = [];
let player;
let penguins;
let bkImage;
let boids = [];

let score = 0;

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

    /*
    alignSlider = createSlider(0, 2, 0, 0.1);
    cohesionSlider = createSlider(0, 2, 0, 0.1);
    separationSlider = createSlider(0, 2, 0, 0.1);
    perceptionSlider = createSlider(0, 500, 5, 10);
    //maxSpeedSlider = createSlider(2, 14, 4, 2);
*/
    //Create Boids
    for(let i = 0; i < numBoids; i++) {
        boids.push(new Boid());
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

    for (let i = boids.length - 1; i >= 0; i--) {
        let boid = boids[i];
        let sprite = boids[i].sprite;
        if (checkCollision(player, sprite)) {
            console.log("Collision detected between player and sprite");
            //we can remove from the array
            boids.splice(i, 1);
            collisionDetected = true;
            score++;
        } else {
            //Assign each boid to the boids flock and update/display position
            boid.flock(boids);
            boid.update();
            boid.checkEdges(); // Check for boundary collisions
            //boid.limitSpeed(); // Limit speed
        }

    }
    //If all boids were destroyed, create new wave with randomized physics
    if ( boids.length === 0) {
        var slider = document.getElementById("allignSlider");
        slider.value = Math.random();

        slider = document.getElementById("cohesionSlider");
        slider.value = Math.random();

        slider = document.getElementById("separationSlider");
        slider.value = Math.random();

        slider = document.getElementById("perceptionSlider");
        slider.value = Math.floor(Math.random() * 500);

        numBoids = Math.floor(Math.random() * 50);

        spawnSprites();
    }

    // Update and display player
    fill(255);
    textSize(24);
    text("Score: " + score, 20, 40);
}

function spawnSprites() {
    for (let i = 0; i < numBoids; i++) {
        let sprite = new Sprite(penguins, 3);
        boids.push(new Boid());
    }

}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

/*

function checkCollision(obj1, obj2) {
    // Check if animation frames are loaded
    if (obj1.animationFrames.length === 0 || obj2.loadedImgs[obj1.animation] === undefined) {
        return false; 
    }
}

*/
function checkCollision(obj1, obj2) {


    // Get the dimensions of the animation frames for obj1 and obj2
    let obj1Frame = obj1.getImageData();
    let obj2Frame = obj2.getImageData();

    //need to be defined to not get hight/width error
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

        var audio = new Audio('sounds/battlefeild-1-kill-sound-effect-made-with-Voicemod.mp3');
        audio.play();

        return true;
    }

    // No collision
    return false;
}

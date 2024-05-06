// Sprite class with flocking behavior
class Sprite {
    constructor(data, numBoids) {
        this.data = data;
        this.boids = [];
        for (let i = 0; i < numBoids; i++) {
            this.boids.push(new Boid());
        }
        this.x = width / 2;
        this.y = height / 2;
        this.currentAnimation = 'idleWave'; // Initial animation state
        this.loadedImgs = {}; // Object to store loaded images for each animation
        this.currentFrame = 0; // Current frame number
    }

    preloadAnimations() {
        // Preload images for each animation
        for (let animation in this.data.TenderBud) {
            let frames = this.data.TenderBud[animation].length;
            this.loadedImgs[animation] = [];
            for (let i = 0; i < frames; i++) {
                let animationPath = `spriteImages/Penguins/TenderBud/${animation}/${i}.png`;
                this.loadedImgs[animation].push(loadImage(animationPath));
            }
        }
    }
    

    updatePosition() {
        for (let boid of this.boids) {
            boid.flock(this.boids);
            boid.update();
            //boid.limitSpeed(); // Limit speed
            boid.checkEdges(); // Check for boundary collisions
        }

        this.x = this.boids[0].position.x; // Example for x position
        this.y = this.boids[0].position.y; // Example for y position
    }

    display() {
        // Get the frames for the current animation
        let frames = this.loadedImgs[this.currentAnimation];
        // Calculate the current frame number based on the number of frames
        this.currentFrame = (this.currentFrame + 1) % frames.length;
        // Draw the current frame
        image(frames[this.currentFrame], this.x, this.y);
    }

    // Change animation state
    changeAnimation(animation) {
        this.currentAnimation = animation;
        // Reset the current frame when animation changes
        this.currentFrame = 0;
    }
}
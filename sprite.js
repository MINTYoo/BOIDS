
// Sprite class with flocking behavior

const idle_state = ["idle", "idleBackAndForth", "idleBreathing", "idleFall", "idleLayDown", "idleLookAround", "idleLookDown", "idleLookLeft", "idleLookRight", "idleLookUp", "idleSit", "idleSpin", "idleWave"];
class Sprite {

    constructor(data, numBoids) {
        this.data = data;
        // boid array
        this.boids = [];
        
        //push new instances of boids into the array
        for (let i = 0; i < numBoids; i++) {
            this.boids.push(new Boid());
        }
        this.x = width / 2;
        this.y = height / 2;
        this.currentAnimation = 'idle'; // Initial animation state
        this.loadedImgs = {}; 
        this.currentFrame = 0; // Current frame number
    }

    preloadAnimations() {
        // Preload images for each animation
        if(this.data.TenderBud && frames){
            return;
        }
        this.loadedImgs = []
        for (let i = 0; i < frames; i++) {
            let animationPath = `spriteImages/Penguins/TenderBud/${animation}/${i}.png`;
            this.loadedImgs[this.currentAnimation].push(loadImage(animationPath));
        }
        
    }
    

    updatePosition() {
        for (let boid of this.boids) {
            boid.flock(this.boids);
            boid.update();
            //boid.limitSpeed(); // Limit speed
            boid.checkEdges(); // Check for boundary collisions
            this.x = boid.position.x; 
            this.y = boid.position.y; 
        }

    
    }

    display() {
        // Get the frames for the current animation
 
        let frames = this.loadedImgs[this.currentAnimation];
        // Calculate the current frame number based on the number of frames
        this.currentFrame = (this.currentFrame + 1) % frames.length;
        // Draw the current frame
        image(frames[this.currentFrame], this.x, this.y);
    }


    changeAnimation(animation) {
        this.currentAnimation = animation;
        // Reset the current frame when animation changes
        this.currentFrame = 0;
    }
    getImageData(){
        return this.loadedImgs[this.currentAnimation][this.currentFrame]
    }
    
}

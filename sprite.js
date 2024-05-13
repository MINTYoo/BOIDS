
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
        this.numFrames;
    }

    preloadAnimations() {
        // Preload images for each animation
        this.loadedImgs[this.currentAnimation] = [];
        this.numFrames = this.data.TenderBud[this.currentAnimation].length; // Use assignment instead of comparison
        
        // Load each frame of the current animation
        for (let index = 0; index < this.data.TenderBud[this.currentAnimation].length; index++) {
            const animationPath = `spriteImages/Penguins/TenderBud/${this.currentAnimation}/${index}.png`;
            loadImage(animationPath, (img) => {
                // Push the loaded image to the array
                this.loadedImgs[this.currentAnimation].push(img);
    
               
    
                if (this.loadedImgs[this.currentAnimation].length === this.numFrames) {
                    console.log('All frames loaded for animation:', this.currentAnimation);
                }
            });
        }
    }
    

    updatePosition() {
        for (let boid of this.boids) {
            boid.flock(this.boids);
            boid.update();
            //boid.limitSpeed(); // Limit speed
            boid.checkEdges(); // Check for boundary collisions

            //boid.show();

            this.x = boid.position.x; 
            this.y = boid.position.y; 
        }

    
    }
    display() {
        // Get the frames for the current animation
        let frames = this.loadedImgs[this.currentAnimation];
        
        // Check if frames are loaded 
        if (!frames || frames.length === 0) {
            return; 
        }
    
       //can't exceed the size
        this.currentFrame = (this.currentFrame + 1) % frames.length;
        
        // Draw t
        image(frames[this.currentFrame], this.x, this.y); 
    }


    changeAnimation(animation) {
        this.currentAnimation = animation;
        // Reset the current frame when animation changes
        this.currentFrame = 0;
    }
    getImageData() {
        return this.loadedImgs[this.currentAnimation][this.currentFrame];
       
    }
    
   
    
    
}

// Sprite class with flocking behavior
class Sprite {

    constructor(data, numBoids) {
        this.data = data;
        // boid array
        this.boids = [];
        //push new instances of boids into the array
        //for (let i = 0; i < numBoids; i++) {
            this.boids.push(new Boid());
        //}
        this.x = width / 2;
        this.y = height / 2;
        this.currentAnimation = 'idle'; // Initial animation state
        this.loadedImgs = {}; 
        this.currentFrame = 0; // Current frame number
    }

    preloadAnimations() {
      
    
        const animations = this.data.TenderBud;
        const animationKeys = Object.keys(animations);
        let currentAnimationIndex = 0;
        
        const loadNextAnimation = () => {
            const animation = animationKeys[currentAnimationIndex];
            const frames = animations[animation];
            if (!frames || !Array.isArray(frames)) {
                console.error(`Invalid frames for animation '${animation}'.`);
                return;
            }
    
            this.loadedImgs[animation] = [];
            for (let index = 0; index < frames.length; index++) {
                const animationPath = `spriteImages/Penguins/TenderBud/${animation}/${index}.png`;
                this.loadedImgs[animation].push(loadImage(animationPath));
            }

    
            currentAnimationIndex++;
            if (currentAnimationIndex < animationKeys.length) {
                setTimeout(loadNextAnimation, 100); // Load next animation after a delay
            }
        };
    
        loadNextAnimation(); // Start loading animations
    }
    
    

    updatePosition() {
        for (let boid of this.boids) {
            boid.flock(this.boids);
            boid.update();

            boid.checkEdges(); 
            this.x = boid.position.x; 
            this.y = boid.position.y; 
        }

    
    }

    display() {

        const frames = this.loadedImgs[this.currentAnimation];
        this.currentFrame = (this.currentFrame + 1) % frames.length;
        image(frames[this.currentFrame], this.x, this.y);
    }


    changeAnimation(animation) {
        this.currentAnimation = animation;
        this.currentFrame = 0;
    }

   
}

class Player{
    constructor(data) {
        this.data = data;
        // boid array
   
        
  
        this.x = width / 2;
        this.y = height / 2;
        this.currentAnimation = 'idle'; // Initial animation state
        this.loadedImgs = {}; 
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
   

        this.x += this.x_velocity;
        this.y += this.y_velocity; 
        


    }

    display() {
        // Get the frames for the current animation
        let frames = this.loadedImgs[this.currentAnimation];
        this.currentFrame = (this.currentFrame + 1) % frames.length;
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

    

    keyInput() {
        // Reset player velocity before checking for key presses
        this.x_velocity = 0;
        this.y_velocity = 0;
    
        // Check for arrow key presses and update player velocity accordingly
        if (keyIsDown(RIGHT_ARROW)) {
            this.currentAnimation = "walk_E";
            this.x_velocity = 20;
        } else if (keyIsDown(LEFT_ARROW)) {
            this.currentAnimation = "walk_W";
            this.x_velocity = -20;
        } else if (keyIsDown(UP_ARROW)) {
            this.currentAnimation = "walk_N";
            this.y_velocity = -20;
        } else if (keyIsDown(DOWN_ARROW)) {
            this.currentAnimation = "walk_S";
            this.y_velocity = 20;
        }
    
        // Update player position
        this.updatePosition();
    
        // Reset current frame to start from the beginning of the new animation
        this.currentFrame = 0;
    }
    
        

        getImageData() {
            return this.loadedImgs[this.currentAnimation][this.currentFrame];
         
        }
        checkEdges() {
            if (this.x > width) {
                this.x = width;
                this.x_velocity *= -1;
                this.x -= 100;
            } else if (this.x < 0) {
                this.x = 0;
                this.x_velocity *= -1;
                this.x += 100;
            }
        
            if (this.y > height) {
                this.y = height;
                this.y_velocity *= -1;
            } else if (this.y < 0) {
                this.y = 0;
                this.y_velocity *= -1;
            }
        }
        
}

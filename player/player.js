class Player {
    constructor(x, y, animation, data) {
        this.x = x;
        this.y = y;
        this.x_velocity = 0;
        this.y_velocity = 0;
        this.animation = animation;
        this.frame = 0;
        this.currentFrame = 0;
        this.data = data;
        this.animationFrames = [];
    }

    load() {
        let animationLength = this.data.TenderBud[this.animation].length;
        for (let i = 0; i < animationLength; i++) {
            let imagePath = `spriteImages/Penguins/TenderBud/${this.animation}/${i}.png`;
            let img = loadImage(imagePath);
           // console.log(imagePath)
            this.animationFrames.push(img);
        }
    }

    display() {
        image(this.animationFrames[this.currentFrame], this.x, this.y);
        this.currentFrame = (this.currentFrame + 1) % this.animationFrames.length;
    }

    updatePosition() {
        this.x += this.x_velocity;
        this.y += this.y_velocity;
    }



    keyInput() {
        // Reset player velocity before checking for key presses
        this.x_velocity = 0;
        this.y_velocity = 0;
    
        // Check for arrow key presses and update player velocity accordingly
        if (keyIsDown(RIGHT_ARROW)) {
            this.animation = "walk_E";
            this.x_velocity = 20;
        } else if (keyIsDown(LEFT_ARROW)) {
            this.animation = "walk_W";
            this.x_velocity = -20;
        } else if (keyIsDown(UP_ARROW)) {
            this.animation = "walk_N";
            this.y_velocity = -20;
        } else if (keyIsDown(DOWN_ARROW)) {
            this.animation = "walk_S";
            this.y_velocity = 20;
        }
    
        // Update player position
        this.updatePosition();
    
        // Reset current frame to start from the beginning of the new animation
        this.currentFrame = 0;
    }

    getImageData(){
        return this.animationFrames[this.currentFrame]
    }
    
    

}




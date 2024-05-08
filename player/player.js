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

    updateAnimation(animation){
        this.animation = animation
        this.currentFrame = 0;
    }

    keyInput() {
        if (keyCode === RIGHT_ARROW) {
            this.updateAnimation("walk_E");
            this.x_velocity = 20;
            this.y_velocity = 0;
        } else if (keyCode === LEFT_ARROW) {
            this.updateAnimation("walk_W");
            this.x_velocity = -20;
            player.y_velocity = 0;
        } else if (keyCode === UP_ARROW) {
            this.updateAnimation("walk_N");
            this.x_velocity = 0;
            this.y_velocity = -20;
        } else if (keyCode === DOWN_ARROW) {
            this.updateAnimation("walk_S");
            this.x_velocity = 0;
            this.y_velocity = 20;
        }
        this.updatePosition();
    }

}

function keyPressed(){
    player.keyInput()
}




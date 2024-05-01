



class flock {
    constructor(){
        this.flock = []
    }

    
}



class Boid {
    constructor() {
        this.position = createVector(canvas.width / 2, canvas.height / 2);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.maxForce = 0.1;
        this.maxSpeed = 2;
    }

    move() {
       
        this.velocity.add(this.acceleration);
       
        this.velocity.limit(this.maxSpeed);
      
        this.position.add(this.velocity);
     
        this.acceleration.mult(0);
    }

     setup(){
        this.position = createVector(canvas.width / 2, canvas.height / 2);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.maxForce = 0.1;
        this.maxSpeed = 2;
     }
    applyForce(force) {
      
        this.acceleration.add(force);
    }
}






//Parent Sprit Classa
class Sprite extends Boid{
    constructor(sprite_json, x, y, start_state){
        super()
        this.sprite_json = sprite_json;
        this.x = x;
        this.y = y;
        this.state = start_state;
        this.root_e = "TenderBud";

        this.cur_frame = 0;

        this.cur_bk_data = null;

        this.x_v = 20;
        this.y_v = 0;
        this.up_arrow = 38
        this.down_arrow = 40;
        this.left_arrow = 37;
        this.right_arrow = 39;
        this.f_Key = 70;
        
    }   

    createFlock(){
        
    }

    getPosition(){

    }

    getVelocity(){
        
    }


    draw() {
        var ctx = canvas.getContext('2d');
        
        if (this.sprite_json[this.root_e][this.state][this.cur_frame]['img'] == null) {
            console.log('Loading image...');
            this.sprite_json[this.root_e][this.state][this.cur_frame]['img'] = new Image();
            this.sprite_json[this.root_e][this.state][this.cur_frame]['img'].src = 'spriteImages/Penguins/' + this.root_e + '/' + this.state + '/' + this.cur_frame + '.png';
        }
        /*
        if (this.cur_bk_data != null) {
            ctx.putImageData(this.cur_bk_data, (this.x - this.x_v), (this.y - this.y_v));
        }
        this.cur_bk_data = ctx.getImageData(this.x, this.y,
            this.sprite_json[this.root_e][this.state][this.cur_frame]['w'],
            this.sprite_json[this.root_e][this.state][this.cur_frame]['h']);
        */      
        ctx.drawImage(this.sprite_json[this.root_e][this.state][this.cur_frame]['img'], this.x, this.y);
        
        this.cur_frame = this.cur_frame + 1;
        if (this.cur_frame >= this.sprite_json[this.root_e][this.state].length) {
            console.log('Resetting frame count');
            this.cur_frame = 0;
        }
        if (this.x >= (window.innerWidth - this.sprite_json[this.root_e][this.state][this.cur_frame]['w'])) {
            this.bound_hit(this.state);
        } else if (this.x <= 0) {
          
            this.bound_hit(this.state);
        } else if (this.y >= (window.innerHeight - this.sprite_json[this.root_e][this.state][this.cur_frame]['h'])) {
         
            this.bound_hit(this.state);
        } else if (this.y <= 0) {
           
            this.bound_hit(this.state);
        } else {
            this.x = this.x + this.x_v;
            this.y = this.y + this.y_v;
        }
        
    }
    

    handle_direction_change(keycode) {
    
        const velocity = 20; 
        console.log('Key code pressed:', keycode);
        if (keycode == this.up_arrow) {
        
            this.y_v = -velocity; //  upward movement
            this.x_v = 0; // Reset x velocity
            this.y -= 20; // Update sprite position
            this.state = "walk_N";
        } else if (keycode == this.down_arrow) {
         
            this.y_v = velocity; //  downward movement
            this.x_v = 0; // Reset x velocity
            this.y += 20; // Update sprite position
            this.state = "walk_S";
        } else if (keycode == this.left_arrow) {
           
            this.x_v = -velocity; //  leftward movement
            this.y_v = 0; // Reset y velocity
            this.x -= 20; // Update sprite position
            this.state = "walk_W";
        } else if (keycode == this.right_arrow) {
          
            this.x_v = velocity; // rightward movement
            this.y_v = 0; // Reset y velocity
            this.x += 20; // Update sprite position
            this.state = "walk_E";
        } else if(keycode == this.f_Key ){
            this.handleRandomIdle(this.state)
        }else {
            //reflect new positions
            this.x = this.x + this.x_v;
            this.y = this.y + this.y_v;
        }
        //reset current frame to get beggining of sprite movement
        this.cur_frame = 0;
        this.draw()
    }
    
    
    bound_action(side){
        
        if(side == "walk_E"){
            this.state = "walk_W";
            this.x_v = -20; // walking to the left
            this.y_v = 0;  // Reset y velocity
            this.x -=20 //move x by at least 1 position to not hit the bounds case again
        } else if(side == "walk_W"){
            this.state = "walk_E";
            this.x_v = 20; //  walking to the right
            this.y_v = 0;  // Reset y velocity
            this.x +=20      //move x by at least 1 position to not hit the bounds case again
        } else if(side == "walk_N"){
            this.state = "walk_S";
            this.x_v = 0;  // Reset x velocity
            this.y_v = 20; // Adjust velocity for walking downward
            this.y +=20      //move y by at least 1 position to not hit the bounds case again
        } else if(side == "walk_S"){
            this.state = "walk_N";
            this.x_v = 0;  // Reset x velocity
            this.y_v = -20; // Adjust velocity for walking upward
            this.y -=20      //move y by at least 1 position to not hit the bounds case again
        }

        this.cur_frame = 0;

    }
    
    //intialize state with a random idle
    handleRandomIdle(){
        const idle_state = ["idle", "idleBackAndForth", "idleBreathing", "idleFall", "idleLayDown", "idleLookAround", "idleLookDown", "idleLookLeft", "idleLookRight", "idleLookUp", "idleSit", "idleSpin", "idleWave"];
        const randomIdle = idle_state[Math.floor(Math.random() * idle_state.length)];
        this.x_v = 0;
        this.y_v = 0;
        this.state = randomIdle
        this.bound_action(this.state);
    
    }

   
    bound_hit(state) {
        
    this.bound_action(state);
     
    }
    
    
    


}


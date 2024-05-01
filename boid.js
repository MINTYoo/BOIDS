

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

    applyForce(force) {
      
        this.acceleration.add(force);
    }
}



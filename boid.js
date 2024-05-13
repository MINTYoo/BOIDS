class Boid {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D().mult(random(2, 5)); // Random initial velocity
        this.acceleration = createVector();
        this.maxForce = 1; // Maximum steering force
        this.maxSpeed = 5; // Maximum speed
        this.perceptionRadius = 100; // Perception radius for flocking behaviors

        //Sprite that will follow the boid's position
        this.sprite = new Sprite(penguins, 0); 
        this.sprite.preloadAnimations(); 
    }

  
    flock(boids) {
        let alignment = createVector();
        let cohesion = createVector();
        let separation = createVector();
        let total = 0;

        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other !== this && d < this.perceptionRadius) {
                alignment.add(other.velocity);
                cohesion.add(other.position);
                let diff = p5.Vector.sub(this.position, other.position);
                diff.div(d * d); // Weight by distance
                separation.add(diff);
                total++;
            }
        }

        if (total > 0) {
            alignment.div(total);
            alignment.setMag(this.maxSpeed);
            alignment.sub(this.velocity);
            alignment.limit(this.maxForce);

            cohesion.div(total);
            cohesion.sub(this.position);
            cohesion.setMag(this.maxSpeed);
            cohesion.sub(this.velocity);
            cohesion.limit(this.maxForce);

            separation.div(total);
            separation.setMag(this.maxSpeed);
            separation.sub(this.velocity);
            separation.limit(this.maxForce);
        }

        //Assign Force Values based on sliders
        alignment.mult(alignSlider.value());
        cohesion.mult(cohesionSlider.value());
        separation.mult(separationSlider.value());
        this.perceptionRadius = perceptionSlider.value();
        //this.maxSpeed = maxSpeedSlider.value();

        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
    }

    checkEdges() {
        if (this.position.x > width || this.position.x < 0) {
            this.position.x = constrain(this.position.x, 0, width); // Keep boid within canvas boundaries
            this.velocity.x *= -1; // Reverse horizontal velocity
        }
        if (this.position.y > height || this.position.y < 0) {
            this.position.y = constrain(this.position.y, 0, height); // Keep boid within canvas boundaries
            this.velocity.y *= -1; // Reverse vertical velocity
        }
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.mult(0); // Reset acceleration

        this.sprite.x = this.position.x;
        this.sprite.y = this.position.y;
        this.sprite.display();
    }

    /*
=======


    show() {
        strokeWeight(6);
        stroke(255);
        point(this.position.x, this.position.y);
      }

*/



    
}

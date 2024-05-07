


class Boid {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D().mult(10);
        this.acceleration = createVector();
        this.maxForce = 0.05;
        this.maxSpeed = 30;
        this.state = "idle";
        
    }


    flock(boids) {
        let alignment = createVector();
        let cohesion = createVector();
        let separation = createVector();
        let perceptionRadius = 50;

        let total = 0;

        for (let other of boids) {
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if (other !== this && d < perceptionRadius) {
                alignment.add(other.velocity);
                cohesion.add(other.position);
                let diff = p5.Vector.sub(this.position, other.position);
                diff.div(d);
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

        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
    }
    checkEdges() {
        if (this.position.x > width || this.position.x < 0) {
            this.velocity.x *= -1; // Reverse horizontal velocity
        }
        if (this.position.y > height || this.position.y < 0) {
            this.velocity.y *= -1; // Reverse vertical velocity
        }
    }
    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.mult(0);
    }

   
}

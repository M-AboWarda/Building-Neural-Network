class Player { 
    constructor(x, y, key = " ") {
        this.x = x;
        this.y = y;
        this.width = playerWidth;
        this.height = 35;
        this.vSpeed = 0;
        this.vAcceleration = 0.33;
        this.isMidAir = false;
        this.controller = new Controller(key);
        this.isAlive = true;
        this.sensor = new Sensor(this);

        this.brain = new NeuralNetwork([new Array(1), new Array(2), new Array(3), new Array(1)]);
    }

    update() {
        this.#move();
        if (this.controller.isKeyPressed && !this.isMidAir && this.isAlive) {
            this.#jump();
        }
        this.sensor.update();
        let brainSignal = this.brain.feedForward([1-this.sensor.value]);
        if(brainSignal > 0.3){
            this.controller.isKeyPressed = true;

        }else{//this may cause a problem
            this.controller.isKeyPressed = false;
        }
    }

    #move() {
        if (this.isAlive) {
            this.x += gameSpeed;
            this.y += this.vSpeed;
            if (this.isMidAir) {
                this.vSpeed += this.vAcceleration;
            }
        }
    }

    collision(box) {
        if (this.y + this.height > canvas.height) { // canvas height
            this.isMidAir = false;
            this.vSpeed = 0;
            this.y = canvas.height - this.height;
        }
        if (((this.x + this.width > box.x && this.x < box.x) || (box.x + box.width > this.x && box.x < this.x)) && (this.y + this.height > box.y)) { // not working proberly
            return true;
        }
        return false;
    }

    die() {
        this.isAlive = false;
    }

    #jump() {
        this.vSpeed = -8;
        this.isMidAir = true;
    }

    draw(ctx) {
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = "#f00";
        (bestPlayer == this) ? ctx.translate(-this.x + playerOffset, 0) : 0;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.globalAlpha = 1;
        if(bestPlayer == this){
            this.sensor.draw(ctx);
        }
    }
}

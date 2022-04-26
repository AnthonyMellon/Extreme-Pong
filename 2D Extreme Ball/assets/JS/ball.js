class ball {

    #targetPlayer;
    #targetPosition;

    constructor(position, size, coreColor, outlineColor, movementSpeed) {
        this.position = position;
        this.size = size;
        this.coreColor = coreColor;
        this.outlineColor = outlineColor;
        this.movementSpeed = movementSpeed
    }

    //Used to get a new target
    getNewTarget(players) {
        this.#targetPlayer = players[getRandomInt(0, players.length)];
    }

    //Used to get the position of the current target
    getTargetPosition() {
        this.#targetPosition = this.#targetPlayer.position;
    }

    //Used to move towards the position of the current target
    moveBall() {
        //Move along X axis
        if(this.position.X > this.#targetPosition.X) {
            this.position.X -= this.movementSpeed;
        }
        else if (this.position.X < this.#targetPosition.X) {
            this.position.X += this.movementSpeed;
        }

        //Move along Y axis        
        if(this.position.Y > this.#targetPosition.Y) {
            this.position.Y -= this.movementSpeed;
        }
        else if(this.position.Y < this.#targetPosition.Y) {
            this.position.Y += this.movementSpeed;
        }
    }

    //Used to draw the ball to the canvas
    drawBall(ctx) {
        //Draw the ball outline
        ctx.fillStyle = this.outlineColor;
        ctx.beginPath();
        ctx.arc(this.position.X, this.position.Y, this.size+2, degToRad(0), degToRad(360), false);
        ctx.fill();

        //Draw the ball core
        ctx.fillStyle = this.coreColor;
        ctx.beginPath();
        ctx.arc(this.position.X, this.position.Y, this.size, degToRad(0), degToRad(360), false);
        ctx.fill();
    }
}
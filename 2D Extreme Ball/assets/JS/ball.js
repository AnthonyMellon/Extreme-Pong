class ball {

    #targetPlayer;
    #targetPosition;
    #direction = 0;

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

    //Used to get the balls speed along the x/y axis
    getVelocity() {
        //Get the X distance to the target
        const distX = this.#targetPosition.X - this.position.X;

        //Get the y distance to the target
        const distY = this.#targetPosition.Y - this.position.Y;

        //Convert xy distance to polar vector
        let distPol = recToPol(distX, distY);

        //convert polar vector back to x/y and return
        return(polToRect(this.movementSpeed, distPol.theta));
    }

    //Used to move towards the position of the current target
    moveBall() {
        const velocity = this.getVelocity();
        this.position.X += velocity.x;
        this.position.Y += velocity.y;
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
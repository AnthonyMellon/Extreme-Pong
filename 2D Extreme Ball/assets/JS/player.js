class player { 
    
    #timeOfLastDeflection = 0;
    #deflectionActive = false;
    #rotation = 0;
    
    constructor(position, size, coreColor, outlineColor, deflectionColor, movementSpeed, controlScheme, deflectionCooldown, deflectionDuration, rotationSpeed) {                    
        this.position = position;
        this.size = size;
        this.coreColor = coreColor;
        this.outlineColor = outlineColor;
        this.deflectionColor = deflectionColor;
        this.movementSpeed = movementSpeed;
        this.controlScheme = controlScheme;
        this.deflectionCooldown = deflectionCooldown;
        this.deflectionDuration = deflectionDuration;
        this.rotationSpeed = rotationSpeed;
    }

    //Used to rotate the player
    rotatePlayer(currentKeys) {
        currentKeys.forEach(key => {
            switch (key) {
                case this.controlScheme[1]: //Left rotation
                this.#rotation -= this.rotationSpeed;
                this.#rotation = this.#rotation%360;
                break;
                case this.controlScheme[3]: //Right rotation
                this.#rotation += this.rotationSpeed;
                this.#rotation = this.#rotation%360;
                break;
            }            
        })
    }

    //Used to move the player
    movePlayer(currentKeys) {
        //Check if the player should move foward or backwards
        let step = 0;
        currentKeys.forEach(key => {
            switch (key) {
                case this.controlScheme[0]: //Foward movement
                    step = this.movementSpeed;
                    break;
                case this.controlScheme[2]: //Back movement
                    step = this.movementSpeed*-1
                    break;
            }
        })

        //Convert step & rotation to rectangular vector
        const velocity = polToRect(step, this.#rotation);

        //Move according to rectangular vector
        this.position.X += velocity.x;
        this.position.Y += velocity.y;

    }

    //Check if the players deflection should be activated / deactivated
    manageDeflection(currentKeys) {
        //console.log(this.#deflectionActive)
        currentKeys.forEach(key => {
            switch(key) {
                case this.controlScheme[4]: //Deflection
                    this.activateDeflection();                  
            }
        });
        
        //Check if the players deflection is no longer active
        if(this.#deflectionActive && new Date() - this.#timeOfLastDeflection > this.deflectionDuration) {
            this.#deflectionActive = false;
        }
    }

    //Activate the deflection
    activateDeflection() {
        if(new Date() - this.#timeOfLastDeflection > this.deflectionCooldown) { //Check if the deflection is off cooldown
            this.#timeOfLastDeflection = new Date();
            this.#deflectionActive = true;
        }
    }

    //Used to draw the player to the canvas
    drawPlayer(ctx) {
        //Draw player outline
        ctx.fillStyle = this.outlineColor;
        ctx.beginPath();
        ctx.arc(this.position.X, this.position.Y, this.size+2, degToRad(0), degToRad(360), false);
        ctx.fill();

        //Draw player core
        ctx.fillStyle = this.coreColor;
        ctx.beginPath();
        ctx.arc(this.position.X, this.position.Y, this.size, degToRad(this.#rotation+30), degToRad(this.#rotation-30), false);
        ctx.lineTo(this.position.X, this.position.Y);
        ctx.fill();

        //Draw deflection if its active
        if(this.#deflectionActive) {
            
            ctx.strokeStyle = this.deflectionColor;
            ctx.lineWidth = 5;
        
            ctx.beginPath();
            ctx.arc(this.position.X, this.position.Y, this.size + 10, degToRad(0), degToRad(360), false);
            ctx.stroke();
        }   
    }
}
let width;
let height;
let ctx;
let players;

let canvasOffset = 10;

let setupCanvas = () => {
    const canvas = document.getElementById('game');

    width = window.innerWidth;
    canvas.width = width;

    height = window.innerHeight;
    canvas.height = height;

    ctx = canvas.getContext('2d');
}

//Ensure the canvas is the same size as the window
let validateCanvasSize = () => {
    let needsUpdate = false;

    if(width != window.innerWidth) {
        width = window.innerWidth;
        needsUpdate = true;
    }
    if(height != window.innerHeight) {
        height = window.innerHeight;
        needsUpdate = true;
    }

    if(needsUpdate) setupCanvas();
}

let setupPlayers = () => {
    
    let playerColors = [
        'rgba(255, 0, 0, 1)',
        'rgba(0, 255, 0, 1)',
        'rgba(0, 0, 255, 1)',
        'rgba(255, 0, 255, 1)'
    ]
    
    players = [];
    const numPlayers = 2;

    const controlSchemes = [
        ['w', 'a', 's', 'd', 'e'],
        ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'Insert'],    
    ]

    for(let i = 0; i < numPlayers; i++) {
        players.push({
            position: {X: 50 + 50*i, Y: 50 + 50*i},
            size: 20,
            coreColor: playerColors[i], 
            outlineColor: 'rgba(0, 0, 0, 1)',
            deflectionColor: 'rgba(0, 255, 255, 0.9)',

            movementSpeed: 10,
            controScheme: controlSchemes[i],

            deflectionCooldown: 2000,
            deflectionDuration: 200,
            timeOfLastDeflection: 0,
            deflectionActive: false                       
        })
    } 
}

let draw = () => {

    //Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0, width, height);

    //Draw players
    players.forEach(player => {

        //Player outline
        ctx.fillStyle = player.outlineColor;
        ctx.beginPath();
        ctx.arc(player.position.X, player.position.Y, player.size+2, degToRad(0), degToRad(360), false);
        ctx.fill();

        //Player core
        ctx.fillStyle = player.coreColor;
        ctx.beginPath();
        ctx.arc(player.position.X, player.position.Y, player.size, degToRad(0), degToRad(360), false);
        ctx.fill();

        if(player.deflectionActive) playerDrawDeflection(player);        
    });

    //Draw canvas outline
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(width, 0);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.lineTo(0, 0);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    ctx.stroke();

}

let managePlayers = () => {
    players.forEach(player => {
        currentKeys.forEach(key => {
            switch (key) {
                case player.controScheme[0]: //Up movement
                    player.position.Y -= player.movementSpeed;
                    break;
                case player.controScheme[1]: //Left movement
                    player.position.X -= player.movementSpeed;
                    break;
                case player.controScheme[2]: //Down movement
                    player.position.Y += player.movementSpeed;
                    break;
                case player.controScheme[3]: //Right movement
                    player.position.X += player.movementSpeed;
                    break;
                case player.controScheme[4]: //Deflection
                    playerDeflection(player);
                    break;
            }
             
        });   
        
         //Check if players deflection is no longer active
        if(new Date() - player.timeOfLastDeflection > player.deflectionDuration)
        {
            console.log('deflection off');
            player.deflectionActive = false;
        }
    })
}

let playerDeflection = (player) => {
    
    if(new Date() - player.timeOfLastDeflection > player.deflectionCooldown) //Check if deflection is off cooldown
    {
        player.timeOfLastDeflection = new Date();
        player.deflectionActive = true;
    }
    
}

let playerDrawDeflection = (player) => {

    ctx.strokeStyle = player.deflectionColor;
    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.arc(player.position.X, player.position.Y, player.size + 10, degToRad(0), degToRad(360), false);
    ctx.stroke();
}


let setup = () => {

    setupCanvas();
    setupPlayers();

    gameLoop();
}

//Game loop
let gameLoop = () => {

    //console.log(currentKeys);

    validateCanvasSize();
    managePlayers();
    draw();
    requestAnimationFrame(gameLoop);
}


setup();




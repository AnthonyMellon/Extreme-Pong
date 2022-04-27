let width;
let height;
let ctx;
let players;
let myBall;

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
        players.push(
            new player(
                {X: 50 + 50*i, Y: 50 + 50*i}, //Position
                20, //Size
                playerColors[i], //core color
                'rgba(0, 0, 0, 1)', //outline color
                'rgba(0, 255, 255, 0.9)', //deflection color
                10, //movement speed
                controlSchemes[i], //control scheme
                2000, //deflection cooldown
                200, //deflection duration
                5 //rotation speed
            )
        )
    } 
}

let setupBall = () => {
    myBall = new ball(
        {X: 100, Y: 50}, //Position
        15, //Size
        'rgba(255, 255, 0, 1)', //Core color
        'rgba(0, 0, 0 , 1', //Outline color
        7.5 //movement speed
    )
    myBall.getNewTarget(players);
}

let draw = () => {

    //Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0, width, height);

    //Draw players
    players.forEach(player => {
        player.drawPlayer(ctx);     
    });

    //Draw the ball
    myBall.drawBall(ctx);

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
        player.rotatePlayer(currentKeys);
        player.movePlayer(currentKeys);
        player.manageDeflection(currentKeys);
    })
}

let manageBall = () => {
    myBall.getTargetPosition();
    myBall.moveBall();
}

let setup = () => {

    setupCanvas();
    setupPlayers();
    setupBall();

    gameLoop();
}

//Game loop
let gameLoop = () => {

    //console.log(currentKeys);

    validateCanvasSize();
    managePlayers();
    manageBall();
    draw();
    requestAnimationFrame(gameLoop);
}


setup();




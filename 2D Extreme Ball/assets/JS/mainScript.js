let width;
let height;
let ctx;
let players;

let setupCanvas = () => {
    const canvas = document.getElementById('game');

    width = window.innerWidth;
    canvas.width = width;

    height = window.innerHeight;
    canvas.height = height;

    ctx = canvas.getContext('2d');
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
        ['w', 'a', 's', 'd'],
        ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],    
    ]

    for(let i = 0; i < numPlayers; i++) {
        players.push({
            position: {X: 50 + 50*i, Y: 50 + 50*i},
            size: 20,
            coreColor: playerColors[i], 
            outlineColor: 'rgba(0, 0, 0, 1)',
            movementSpeed: 10,
            controScheme: controlSchemes[i] 
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
    });
}

let movePlayers = () => {
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
            }
             
        });
    })
}


let setup = () => {

    setupCanvas();
    setupPlayers();

    gameLoop();
}

//Game loop
let gameLoop = () => {

    movePlayers();
    draw();
    requestAnimationFrame(gameLoop);
}


setup();




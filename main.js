let bestPlayer;
let players = [];

for(let i = 0; i < 50; i++){
    players.push(new Player(100, canvas.height - playerWidth, String.fromCharCode(Math.round(Math.random() *25) + 97)));
}
//97 122

players[0] = new Player(100, canvas.height - playerWidth);
bestPlayer = players[0];
//let player = new Player(100, canvas.height - playerWidth);
//let player1 = new Player(100, canvas.height - playerWidth, "a");

let enemys = [];
for (let i = 0; i < 13; i++) {
    enemys[i] = new Enemy((enemys[i - 1]) ? enemys[i - 1].x + enemys[i - 1].width : window.innerWidth);
}

const update = () => {

    bestPlayer = (bestPlayer.isAlive)? bestPlayer : players.find(p => p.isAlive);
    if(!bestPlayer) {
        alert("gameOver!");
        return;
    }
    canvas.width = window.innerWidth;

    players.forEach(p => {
        if(p.isAlive){
            p.update();
            p.draw(ctx);
        }
    });
    //player.update();
    //player.draw(ctx);
    //player1.update();
    //player1.draw(ctx);

    for (let i = 0; i < enemys.length; i++) {
        enemys[i].update();
        players.forEach(p => {
            (p.collision(enemys[i])) ? p.die() : 0;
        });
        enemys[i].draw(ctx);
    }

    players.forEach(p => {
        p.sensor.calculateValue(enemys);
    });
    bestPlayer.brain.draw(nctx);
    window.requestAnimationFrame(update);
}
update();

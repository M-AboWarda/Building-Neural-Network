class Enemy {
    constructor(prevXOffset){
        this.height = 45;
        this.width = Math.round((Math.random() * 3) + 1) *24;
        this.y = canvas.height - this.height;
        this.x = prevXOffset + distenceBetweenEnemys - this.width + Math.random()*100;
    }
    update(){
//        this.x -= gameSpeed;
        let lastEnemyPosPlusWidth = Math.max(...enemys.map(e => e.x + e.width));
        if(this.x + this.width < bestPlayer.x - playerOffset){
            this.x = lastEnemyPosPlusWidth + distenceBetweenEnemys - this.width + Math.random()*100;
        }
    }
    draw(ctx){
        ctx.fillStyle = "#000";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
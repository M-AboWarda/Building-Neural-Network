class Sensor {
    constructor(player){
        this.player = player;
        this.value = 1; 
        this.vision = 250;
        this.angle = 0;
        this.pos;
    }
    update(){
        this.pos = {start:{x: this.player.x + (this.player.width * 0.5), y: this.player.y + (this.player.height * 0.5)}, end:{x: this.player.x + (this.player.width * 0.5) + this.vision * Math.cos(this.angle), y: this.player.y + (this.player.height * 0.5) + this.vision * Math.sin(this.angle)}};
    }
    calculateValue(enemys){
        let distances = enemys.map(e => e.x +e.width - this.player.x);
        for(let i = distances.length -1; i >= 0; i--){
            distances[i] < 0 ? distances.splice(i,1): 0;
        }
        let closest = distances.find(d => d == Math.min(...distances));
        let closestEnemy = enemys.find(e => e.x +e.width - this.player.x == closest);
        this.value = (closestEnemy.x - this.pos.start.x) / this.vision;
        if(this.value > 1) this.value = 1; 
        if(this.value < 0) this.value = 0;
        return this.value;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = "#ff0";
        ctx.moveTo(this.pos.start.x, this.pos.start.y);
        ctx.lineTo(this.pos.end.x  , this.pos.end.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = "#fff";
        ctx.moveTo(this.pos.start.x, this.pos.start.y);
        ctx.lineTo(this.pos.start.x + this.value *this.vision, this.pos.start.y);
        ctx.stroke();
    }
}
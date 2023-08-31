/*class NeuralNetwork {
    consturctor(levelCount) {
        this.network = new Array(levelCount.length);
        for(let i = 0; i < this.network.length; i++){
            this.network[i] = new Level(levelCount[i]);//levelCount[i] is an integer
        }

        // create connectionLayers/ connect neural nodes
        this.conectionLayers = new Array(this.network.length -1);
        for(let n = 0; n < this.conectionLayers.length; n++){
        for(let j = 0; j < this.network[n]; j++) {
            
        }
        }
        //assign weights to the connections
        this.weights = new Array();
    }
    feedForward(input) {// input should be an array
        let result = this.network[0].feedForward(input);
        for(let i = 1; i < this.network.length; i ++){
            result = this.network[i].feedForward(result); // level.feedFroward(array);:w
            
        }
        return result;
    }
}
class Level {
    constructor(nodeCount) {
        this.nodes = new Array(nodeCount);
        for(let i = 0; i < this.nodes.length; i++){
            this.nodes[i] = 0;
        }
    }
}
*/
class NeuralNetwork {
    constructor(brainStructue){
        this.layers = new Array(brainStructue.length -1);
        for(let i = 0; i < this.layers.length; i++){
            this.layers[i] = new Level(brainStructue[i], brainStructue[i+1]);
        }
    }
    feedForward(inputs){
        this.layers[0].inputs = inputs;
        let outputs = this.layers[0].feedForward(inputs);
        this.layers[1].inputs = outputs;
        for(let i = 1; i < this.layers.length; i++){
            outputs = this.layers[i].feedForward(outputs);
            (this.layers[i+1])? this.layers[i +1].inputs = outputs:0;
        }
        return outputs;
    }

    draw(nctx){
        networkCanvas.width = window.innerWidth;
        nctx.strokeStyle = "#fff";
        
        drawNode(nctx, {x: 50, y: networkCanvas.height/2, text:`${this.layers[0].inputs[0].toFixed(2)}`})

        drawNode(nctx, {x: 300, y: networkCanvas.height/2 -70, text:`${this.layers[0].outputs[0].toFixed(2)}`})
        drawNode(nctx, {x: 300, y: networkCanvas.height/2 +70, text:`${this.layers[0].outputs[1].toFixed(2)}`})

        drawNode(nctx, {x: 550, y: networkCanvas.height/2 -150, text:`${this.layers[1].outputs[0].toFixed(2)}`})
        drawNode(nctx, {x: 550, y: networkCanvas.height/2     , text:`${this.layers[1].outputs[1].toFixed(2)}`})
        drawNode(nctx, {x: 550, y: networkCanvas.height/2 +150, text:`${this.layers[1].outputs[2].toFixed(2)}`})

        drawNode(nctx, {x: 800, y: networkCanvas.height/2 , text:`${(this.layers[2].outputs[0].toFixed(2) > 0.2)? 1:0}`})
    }
}
function drawNode(nctx, data){
    nctx.beginPath();
    nctx.strokeStyle = "#fff";
    nctx.lineWidth = 3;
    nctx.fillStyle = "#0f0";
    nctx.arc(data.x, data.y , 20, 0, 2* Math.PI);
    nctx.globalAlpha = parseFloat(data.text);
    nctx.fill();
    nctx.globalAlpha = 1;
    if(parseFloat(data.text) < 0){nctx.strokeStyle = "#f00"}
    nctx.stroke();
    nctx.fillStyle = "#fff";
    nctx.font = "20px Arial";
    nctx.textBaseline = "Bottom";
    nctx.fillText(data.text, data.x, data.y);

    
}
class Level {
    constructor(inputs, outputs){
        this.inputs = inputs;
        this.outputs = new Array(outputs.length);
        
        //empty weights structure
        this.weights = new Array(this.outputs.length);
        for(let i = 0; i < this.weights.length; i++){
            this.weights[i] = new Array(this.inputs.length);
        }

        //randomized brain weights between -1 and 1
        for(let j = 0; j < this.outputs.length; j++){
            for(let i = 0;i < inputs.length; i++){
                this.weights[j][i] = Math.random() *2 -1;
            }
        }
    }
    feedForward(inputs){
        for(let j = 0; j < this.outputs.length; j++){
            let sum = 0;
            for(let i = 0; i < this.inputs.length; i++){
                sum += this.inputs[i] * this.weights[j][i];
            }
            
            this.outputs[j] = sum;
            
        }
        return this.outputs;
    }
}
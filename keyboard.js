class Controller{
    constructor(key){
        this.isKeyPressed = false; 
        window.addEventListener("keydown", e => {
            if(e.key == key){
                this.isKeyPressed = true;
            }
        });
       window.addEventListener("keyup", e => {
           if(e.key == key){
               this.isKeyPressed = false;
           }
       }) 
    }
}
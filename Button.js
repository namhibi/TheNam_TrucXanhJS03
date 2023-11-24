import { Node } from './Node.js'
import { Sprite } from './Sprite.js'
import { Label } from './Label.js';
export class Button extends Node{
    constructor() {
       super()
       this.sprite=new Sprite();
       this.label=new Label();
       this.elm.appendChild(this.sprite.elm);
       this.elm.appendChild(this.label.elm);
    }
    set x(value) {
        this._x = value;
        this.elm.style.left = this._x+ "px";
        this.resetPosition()
    }
    set y(value) {
        this._y = value;
        this.elm.style.top = this._y+ "px";
        this.resetPosition()
    }
    _createElement() {
        let elm = document.createElement("div");   
        return elm;
    }
    resetPosition(){
        this.label.x=this._x+this.sprite.width/6;
        this.label.y=this._y+this.sprite.height/4;
        this.sprite.x=this._x;
        this.sprite.y=this._y;
    }
}

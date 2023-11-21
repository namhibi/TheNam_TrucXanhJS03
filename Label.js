import {Node} from './Node.js'
export class Label extends Node{
   constructor() {
    super();
    this._text='';
    this._fonSize=12+"px";
    this._color="black";
   }
  _createElement() {
    let elm = document.createElement("div");
    elm.style.fontSize=this._fonSize;
    elm.style.color=this._color;
    elm.style.position = "absolute";
    return elm;
}
get text() { return this._text; }
set text(value) {
    this._text = value;
    this.elm.innerHTML = this._text;
}
get color() { return this._color; }
set color(value) {
    this._color = value;
    this.elm.style.color=this._color;
}
get fontSize() { return this._fonSize; }
set fontSize(value) {
    this._fonSize = value;
    this.elm.style.fontSize=this._fonSize+"px";
}
}
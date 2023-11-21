import { Node } from './Node.js'
import { Sprite } from './Sprite.js'
export class Card {
    constructor(imageSrc, x, y) {
        this._isFlipped=false;
        this._imageSrc = imageSrc;
        this._coverSrc = "./Image/coverImage.png";  
        this.node = new Node();
        this.image = new Sprite();
        this.node.elm.appendChild(this.image.elm);
        document.body.appendChild(this.node.elm);
        Card.WIDTH = 160;
        Card.HEIGHT = 220;
        Card.x = x;
        Card.y = y;
    }
    get imageSrc() { return this._imageSrc; }
    get coverSrc() { return this._coverSrc; }
   // set imageDisplay(value){ this.image.imageSrc = value;}
    get isFlipped() { return this._isFlipped; }
      set Flipped(value) {
          this._isFlipped = value;
          this.image.imageSrc=this._isFlipped?this._imageSrc:this._coverSrc;
      }
    creatCard() {
        this.image.width = Card.WIDTH;
        this.image.height = Card.HEIGHT;
        this.image.x = Card.x;
        this.image.y = Card.y;
        this.image.imageSrc = this._coverSrc;
        this.image.show(true);
    }
}

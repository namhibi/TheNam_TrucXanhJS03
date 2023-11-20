class Label extends Node {
    constructor(x, y, width, height, scaleX, scaleY, active, text) {
      super(x, y, width, height, scaleX, scaleY, active);
      this.text = text;
    }
  }
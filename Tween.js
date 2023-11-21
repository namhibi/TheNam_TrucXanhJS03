export class Tween {
    constructor(){
         this._hasAnimation=false;
         this.animation = [];
    }
    flipObject(object){
        const duration = 0.5;
        console.log(object.isFliped)
        gsap.to(object.image, {
            scaleX: 0, duration,
            onComplete: () => {
                object.Flipped=!object.isFlipped;
                gsap.to(object.image, { scaleX: 1, duration, delay: duration })
            }
        })
    }
    flipOffObject(object1,object2){
        const duration = 1;
        gsap.to(object1.image, {
            scaleX: 0, duration, delay: duration,
            onComplete: () => {
                object1.Flipped=!object1.isFlipped;
                gsap.to(object1.image, { scaleX: 1, duration, delay: duration })
            }
        })
        gsap.to(object2.image, {
            scaleX: 0, duration, delay: duration,
            onComplete: () => {
                object2.Flipped=!object2.isFlipped;
                gsap.to(object2.image, { scaleX: 1, duration, delay: duration })
            }
        })
    }
    zoomOut(object1,object2){
        const duration = 1;
        object1.node.elm.style.zIndex = '999';
        object2.node.elm.style.zIndex = '999';
        gsap.to(object1.image.elm, {
            scale: 1.5,opacity:0, duration, delay: duration,
            onComplete: () => {
                object1.node.show(false);
            }
        })
        gsap.to(object2.image.elm, {
            scale: 1.5,opacity:0, duration, delay: duration,
            onComplete: () => {
                object2.node.show(false);
            }
        })
    }
    distributeCards(object,posX,posY,delay){
        const duration = 1;
        gsap.to(object.image, {
            x: posX,y:posY, duration, delay: delay,
        })
        gsap.to(object.image.elm, {
            rotation: 360, duration, delay: delay,
        })
    }
}
export class Tween {
    constructor(){
         this._hasAnimation=false;
         this.animation = [];
    }
    flipObject(object){
        const duration = 0.5;
        gsap.to(object.image, {
            scaleX: 0, duration,
            onComplete: () => {
                object.Flipped=!object.isFlipped;
                gsap.to(object.image, { scaleX: 1, duration })
            }
        })
    }
    flipOffObject(object1,object2){
        const duration = 1;
        gsap.to(object1.image, {
            scaleX: 0, duration,
            onComplete: () => {
                object1.Flipped=!object1.isFlipped;
                gsap.to(object1.image, { scaleX: 1, duration})
            }
        })
        gsap.to(object2.image, {
            scaleX: 0, duration,
            onComplete: () => {
                object2.Flipped=!object2.isFlipped;
                gsap.to(object2.image, { scaleX: 1, duration})
            }
        })
    }
    zoomOut(object1,object2){
        const duration = 1;
        object1.node.elm.style.zIndex = '999';
        object2.node.elm.style.zIndex = '999';
        gsap.to(object1.image.elm, {
            scale: 1.5,opacity:0, duration,
            onComplete: () => {
                object1.node.show(false);
            }
        })
        gsap.to(object2.image.elm, {
            scale: 1.5,opacity:0, duration,
            onComplete: () => {
                object2.node.show(false);
            }
        })
    }
    distributeCards(object,posX,posY,delay){
        const duration = 1;
        gsap.to(object.image, {
            x: posX,y:posY, ease: Elastic.easeOut, duration, delay: delay,
        })
    }
    resetGame(object,posY){
        const duration = 1;
        let delay=0.5;
        const childElements = Array.from(object.children); 
        console.log(childElements);
        childElements.forEach((element) => {
            gsap.to(element, {
                y:posY, duration, delay: delay, onComplete: () => {
                   object.removeChild(element);
                }
            })
            delay+=0.25;
        });
    }
}
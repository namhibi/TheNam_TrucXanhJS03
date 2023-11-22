import { Card } from './Card.js'
import { Sprite } from './Sprite.js';
import { Label } from './Label.js';
import { Tween } from './Tween.js';
export class GameManager{
    constructor(){
        this.tweenController = new Tween();
        this.isStarGame = false;
        this.SCEERNWIDTH = window.innerWidth;
        this.SCEERNHEIGHT = window.innerHeight;
        this.backgroundImage = new Sprite();
        this.scoreText = new Label();
        this.IMAGESOURCES=[];
        this.CARDS = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.score = 10000;
    }
    start(){
        this.creatBackground();
        this.creatScoreText();
        this.creatCards();
    }
    creatBackground(){
        this.backgroundImage.width = this.SCEERNWIDTH;
        this.backgroundImage.height = this.SCEERNHEIGHT;
        this.backgroundImage.imageSrc = "./Image/background.jpeg";
        document.body.appendChild(this.backgroundImage.elm);
    }
    creatScoreText(){
        this.scoreText.text = "Score:" + 10000;
        this.scoreText.color = "white";
        this.scoreText.fontSize = 50;
        this.scoreText.x = 20;
        this.scoreText.y = 20;
        this.scoreText.elm.style.fontFamily = 'Arial, Helvetica, sans-serif';
        document.body.appendChild(this.scoreText.elm);
    }
    creatCards(){
    this.IMAGESOURCES = ["Image/image1.png", "Image/image2.jpeg", "Image/image3.jpeg", "Image/image4.jpeg",
        "Image/image5.jpeg", "Image/image6.jpeg", "Image/image7.jpeg", "Image/image8.jpeg", "Image/image9.png", "Image/image10.png"];
    const CARDSSOURCE = [...this.IMAGESOURCES, ...this.IMAGESOURCES];
    let marginTop = (this.SCEERNHEIGHT - 900) / 2;
    let marginLeft = (this.SCEERNWIDTH - 830) / 2;
    let column = 0;
    let row = 0;
    let delay = 0.5;
    CARDSSOURCE.forEach((src) => {
        let x = (155 + 10) * (column) + marginLeft;
        let y = (205 + 20) * row + marginTop;
        let card = new Card("./" + src, (this.SCEERNWIDTH - 155) / 2, (this.SCEERNHEIGHT - 205) / 2);
        card.creatCard();
        this.tweenController.distributeCards(card, x, y, delay);
        card.node.elm.addEventListener('click', (event) => this.flipCard(event));
        this.CARDS.push(card);
        column++;
        delay += 0.25;
        if (column == 5) {
            row++;
            column = 0;
        }
        setTimeout(() => {
         this.isStarGame=true;
        }, 500+250*19+1000);
    });
    
    }
flipCard(event) {
    let currentCard = this.CARDS.find((card) => card.node.elm === event.currentTarget);
    if (this.isStarGame) {
        if (this.flippedCards.length < 2 && !currentCard.isFlipped) {
            if (currentCard != this.flippedCards[0]) {
                this.tweenController.flipObject(currentCard);
                this.flippedCards.push(currentCard);
                if (this.flippedCards.length === 2) {
                    setTimeout(this.checkMatch.bind(this), 1000);
                }
            }
        }
    }
}
checkMatch() {
    const [card1, card2] = this.flippedCards;
    if (card1.imageSrc === card2.imageSrc) {
        this.tweenController.zoomOut(card1, card2);
        this.score = this.updateScore(1000);
        this.updateScoreText();
        this.matchedPairs++;
        if (this.matchedPairs === this.IMAGESOURCES.length) {
            setTimeout(() => {
                alert('Congratulations! You matched all pairs.');
                location.reload(true);
            }, 2000);
        }
    } else {
        this.tweenController.flipOffObject(card1, card2);
        this.score = this.updateScore(-500);
        if (this.score < 0) {
            setTimeout(() => {
                alert('You lose, Good luck next time!');
                location.reload(true);
            }, 2000);
        } else {
            this.updateScoreText();
        }
    }
    setTimeout(() => {
        this.flippedCards = [];
    }, 1500);
}
updateScore(newUpdateScore) {
    return this.score + newUpdateScore;
} 
updateScoreText() {
    this.scoreText.text = "Score:" + this.score;
}
}
let game=new GameManager();
game.start();
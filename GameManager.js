import { Card } from './Card.js'
import { Sprite } from './Sprite.js';
import { Label } from './Label.js';
import { Tween } from './Tween.js';
import { Button } from './Button.js';
export class GameManager {
    constructor() {
        this.tweenController = new Tween();
        this.isStartGame = false;
        this.SCEERNWIDTH = window.innerWidth;
        this.SCEERNHEIGHT = window.innerHeight;
        this.backgroundImage = new Sprite();
        this.scoreText = new Label();
        this.resetButton=new Label();
        this.messageText=new Label();
        this.IMAGESOURCES = [];
        this.CARDS = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.score = 10000;
        this.boardGame=this.creatBoardGameElement();
    }
    start() {
        this.creatBackground();
        this.creatScoreText();
        this.creatResetButton();
        this.creatMessageText();
        document.body.appendChild(this.boardGame);
        this.loadImageSource();
        this.creatCards();
    }
    resetGame(event){
        if(this.isStartGame){
            this.isStartGame = false;
            this.CARDS = [];
            this.flippedCards = [];
            this.matchedPairs = 0;
            this.score = 10000;
            this.tweenController.resetGame(this.boardGame,this.SCEERNHEIGHT+10);
            setTimeout(() => {
                this.boardGame.innerHTML='';
                this.creatCards();
                this.updateScoreText();
                this.messageText.text="";
            },  500 + 250 * 19 + 1000);
        }
    }
    creatBoardGameElement(){
        let elm = document.createElement("div");
        return elm;
    }
    creatBackground() {
        this.backgroundImage.width = this.SCEERNWIDTH;
        this.backgroundImage.height = this.SCEERNHEIGHT;
        this.backgroundImage.imageSrc = "./Image/background.jpeg";
        document.body.appendChild(this.backgroundImage.elm);
    }
    creatScoreText() {
        this.scoreText.text = "Score:" + 10000;
        this.scoreText.color = "white";
        this.scoreText.fontSize = 50;
        this.scoreText.x = 20;
        this.scoreText.y = 20;
        this.scoreText.elm.style.fontFamily = 'Arial, Helvetica, sans-serif';
        document.body.appendChild(this.scoreText.elm);
    }
    creatResetButton() {
       this.resetButton.text = "ResetGame";
        this.resetButton.color = "white";
        this.resetButton.fontSize = 35;
        this.resetButton.x = 20;
        this.resetButton.y =80;
        this.resetButton.elm.style.fontFamily = 'Arial, Helvetica, sans-serif';
       // this.resetButton.elm.
        this.resetButton.elm.style.cursor="pointer";
       this.resetButton.elm.addEventListener('click', (event) => this.resetGame(event));
       document.body.appendChild(this.resetButton.elm);
    }
    creatMessageText() {
        this.messageText.text = "";
         this.messageText.color = "white";
         this.messageText.fontSize = 35;
         this.messageText.x = 20;
         this.messageText.y =130;
         this.messageText.elm.style.fontFamily = 'Arial, Helvetica, sans-serif';
        document.body.appendChild(this.messageText.elm);
     }
    loadImageSource() {
        this.IMAGESOURCES = ["Image/image1.png", "Image/image2.jpeg", "Image/image3.jpeg", "Image/image4.jpeg",
            "Image/image5.jpeg", "Image/image6.jpeg", "Image/image7.jpeg", "Image/image8.jpeg", "Image/image9.png", "Image/image10.png"];
        const images = [];
        for (let i = 0; i < this.IMAGESOURCES.length; i++) {
            const img = new Image();
            img.src = "./" + this.IMAGESOURCES[i];
            images.push(img);
        }
        return images;
    }
    creatCards() {
        const CARDSSOURCE = [...this.IMAGESOURCES, ...this.IMAGESOURCES];
        let marginTop = (this.SCEERNHEIGHT - 820) / 2;
        let marginLeft = (this.SCEERNWIDTH - 830) / 2;
        let column = 0;
        let row = 0;
        let delay = 0.5;
        CARDSSOURCE.forEach((src) => {
            let x = (155 + 10) * (column) + marginLeft;
            let y = (185 + 20) * row + marginTop;
            let card = new Card("./" + src, (this.SCEERNWIDTH - 155) / 2, (this.SCEERNHEIGHT - 185) / 2);
            card.creatCard();
            this.boardGame.appendChild(card.node.elm);
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
                this.isStartGame = true;
            }, 500 + 250 * 19 + 1000);
        });

    }
    flipCard(event) {
        let currentCard = this.CARDS.find((card) => card.node.elm === event.currentTarget);
        if (this.isStartGame) {
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
            setTimeout(()=>{
                this.boardGame.removeChild(card1.node.elm);
                this.boardGame.removeChild(card2.node.elm);
            },1500);
            if (this.matchedPairs === this.IMAGESOURCES.length) {
                this.messageText.text = "You win!!! your score is "+this.score;
                this.messageText.color = "yellow";
                setTimeout(() => {
                    this.resetGame();
                }, 2000);
            }
        } else {
            this.tweenController.flipOffObject(card1, card2);
            this.score = this.updateScore(-500);
            if (this.score <= 0) {
                setTimeout(() => {
                    this.messageText.text = "You lose!! Good luck next time";
                    this.messageText.color = "red";
                    this.resetGame();
                }, 2000);
            } else {
                this.updateScoreText();
            }
        }
        setTimeout(() => {
            this.flippedCards = [];
        }, 2000);
    }
    updateScore(newUpdateScore) {
        return this.score + newUpdateScore;
    }
    updateScoreText() {
        this.scoreText.text = "Score:" + this.score;
    }
}
let game = new GameManager();
game.start();
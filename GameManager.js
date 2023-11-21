import { Card } from './Card.js'
import { Sprite } from './Sprite.js';
import { Label } from './Label.js';
import { Tween } from './Tween.js';
let tweenController=new Tween();
const SCEERNWIDTH = window.innerWidth;
const SCEERNHEIGHT = window.innerHeight;
let backgroundImage=new Sprite();
backgroundImage.width=SCEERNWIDTH;
backgroundImage.height=SCEERNHEIGHT;
backgroundImage.imageSrc="./Image/background.jpeg";
document.body.appendChild(backgroundImage.elm);
let scoreText=new Label();
scoreText.text="Score:"+10000;
scoreText.color="white";
scoreText.fontSize=50;
scoreText.x=20;
scoreText.y=20;
document.body.appendChild(scoreText.elm);
const IMAGESOURCES = ["Image/image1.png", "Image/image2.jpeg", "Image/image3.jpeg", "Image/image4.jpeg",
    "Image/image5.jpeg", "Image/image6.jpeg", "Image/image7.jpeg", "Image/image8.jpeg", "Image/image9.png", "Image/image10.png"];
const CARDSSOURCE = [...IMAGESOURCES, ...IMAGESOURCES];
let flippedCards = [];
const CARDS = [];
let matchedPairs = 0;
let marginTop=(SCEERNHEIGHT-900)/2;
let marginLeft=(SCEERNWIDTH-830)/2;
let score = 10000;
let column = 0;
let row = 0;
let delay=0.5;
CARDSSOURCE.forEach((src) => {
    let x = (155 + 10) * (column)+marginLeft;
    let y = (205 + 20) * row+marginTop;
    let card = new Card("./" + src, (SCEERNWIDTH - 155) / 2,(SCEERNHEIGHT - 205) / 2);
    card.creatCard();
    tweenController.distributeCards(card,x,y,delay);
    card.node.elm.addEventListener('click', flipCard)
    CARDS.push(card);
    column++;
    delay+=0.25;
    if (column == 5) {
        row++;
        column = 0;
    }
});

function flipCard() {
    let currentCard = CARDS.find((card) => card.node.elm == this);
    if (flippedCards.length < 2 && !currentCard.isFlipped) {
        tweenController.flipObject(currentCard);
        flippedCards.push(currentCard);
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.imageSrc === card2.imageSrc) {
        tweenController.zoomOut(card1,card2);
        score = updateScore(1000);
        updateScoreText();
        matchedPairs++;
        if (matchedPairs === IMAGESOURCES.length) {
            setTimeout(() => {
                alert('Congratulations! You matched all pairs.');
                location.reload(true);
            }, 2000);
        }
    } else {
        tweenController.flipOffObject(card1,card2);
        score = updateScore(-500);
        if (score < 0) {
            setTimeout(() => {
                alert('You lose, Good luck next time!');
                location.reload(true);
            }, 2000);
        } else {
            updateScoreText();
        }
    }

    flippedCards = [];
}
function updateScore(newUpdateScore) {
    return score + newUpdateScore;
} function updateScoreText() {
    scoreText.text="Score:"+score;
}
function changeAttributeAfterFlip(card){
    console.log(card.isFlipped)
card.Flipped=!card.isFlipped;
console.log(card.isFlipped)
}
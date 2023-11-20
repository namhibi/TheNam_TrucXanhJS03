import { Node } from './Node.js'
import { Sprite } from './Sprite.js'
class Card {
    constructor(imageSrc, x, y) {

        this._imageSrc = imageSrc;
        this.node = new Node();
        this.cover = new Sprite();
        this.image = new Sprite();
        this.node.elm.appendChild(this.cover.elm);
        this.node.elm.appendChild(this.image.elm);
        document.body.appendChild(this.node.elm);
        Card.WIDTH = 160;
        Card.HEIGHT = 220;
        Card.x = x;
        Card.y = y;
    }
    get imageSrc() { return this._imageSrc; }
    creatCard() {
        this.image.width = Card.WIDTH;
        this.image.height = Card.HEIGHT;
        this.image.x = Card.x;
        this.image.y = Card.y;
        this.image.imageSrc = this._imageSrc;
        this.image.show(false);

        this.cover.width = Card.WIDTH;
        this.cover.height = Card.HEIGHT;
        this.cover.x = Card.x;
        this.cover.y = Card.y;
        this.cover.imageSrc = "./Image/cover.jpeg";
        this.cover.show(true);
    }
}
const IMAGESOURCES = ["Image/image1.png", "Image/image2.jpeg", "Image/image3.jpeg", "Image/image4.jpeg",
    "Image/image5.jpeg", "Image/image6.jpeg", "Image/image7.jpeg", "Image/image8.jpeg", "Image/image9.png", "Image/image10.png"];
const CARDSSOURCE = [...IMAGESOURCES, ...IMAGESOURCES];
let flippedCards = [];
const CARDS = [];
let matchedPairs = 0;
let score=10000;
let count = 0;
let row = -1;
CARDSSOURCE.forEach((src) => {
    if (count == 0) row++;
    let x = 155 * (count + 1) + 10;
    let y = 205 * row + 10;
    let card = new Card("./" + src, x, y);
    card.creatCard();
    card.node.elm.addEventListener('click', flipCard)
    CARDS.push(card);
    count++;
    if (count == 5) count = 0;
});

function flipCard() {
    const selectedCard = this;
    let currentCard = CARDS.find((card) => card.node.elm == selectedCard);
    if (flippedCards.length < 2 &&currentCard.cover.active) {
        currentCard.image.show(true);
        currentCard.cover.show(false);
         flippedCards.push(currentCard);
         if (flippedCards.length === 2) {
             setTimeout(checkMatch, 1000);
         }
     }
}
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.imageSrc === card2.imageSrc) {
        score = updateScore(1000);
        updateScoreText();
        matchedPairs++;
        if (matchedPairs === IMAGESOURCES.length) {
            alert('Congratulations! You matched all pairs.');
            setTimeout(() => {
                location.reload(true);
            }, 2000);
        }
    } else {
        card1.image.show(false);
        card1.cover.show(true);
        card2.image.show(false);
        card2.cover.show(true);
        score = updateScore(-500);
        if (score < 0) {
            alert('You lose, Good luck next time!');
            setTimeout(() => {
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
   //scoreText.innerHTML ="Coin:"+score;
}
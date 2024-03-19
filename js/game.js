const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');


const characters = [
    'bulbasaur',
    'charmander',
    'chikorita',
    'chimchar',
    'cyndaquil',
    'mudkip',
    'piplup',
    'squirtle',
    'torchic',
    'totodile',
    'treecko',
    'turtwig',
    'Oshawott',
    'snivy',
    'tepig',
];

const createElement = ( tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard ='';
let secondCard ='';

const checkEndGame =() => {
    const disabledCards= document.querySelectorAll('.disabled-card');

    if (disabledCards.length == 30) {
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML} ! Seu tempo foi: ${timer.innerHTML}`);

    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter == secondCharacter) {
        firstCard.classList.add('disabled-card');
        secondCard.classList.add('disabled-card');
    
        firstCard = '';
        secondCard = '';
    
        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
    
            firstCard = '';
            secondCard = '';
        }, 500);
    }
}  
const revealCard = ({target}) => {
    // Verifica se a carta clicada já foi revelada
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    // Verifica se já há duas cartas reveladas
    if (firstCard !== '' && secondCard !== '') {
        return;
    }

    // Processa a carta clicada
    target.parentNode.classList.add('reveal-card');
    if (firstCard === '') {
        firstCard = target.parentNode;
    } else {
        secondCard = target.parentNode;
        checkCards();
    }
}




const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div','face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/${character}.jpg')`;
    
    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character',character)

    return card;

}

const loadGame = () => {

    const duplicateCharacters = [ ...characters,...characters  ];

    const shuffledArray = duplicateCharacters.sort( () => Math.random() - 0.5);

    

    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);

    });

}

const startTimer = () => {
   this.loop = setInterval(() => {

        const currentTime = Number(timer.innerHTML);
        timer.innerHTML = currentTime + 1;

    },1000);

}

window.onload = () => {

    spanPlayer.innerHTML = localStorage.getItem('player');;
    startTimer();
    loadGame();
}

console.log(this);

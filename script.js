const word_e1 = document.getElementById('word');
const popup = document.getElementById('popup-container');
const message_e1 = document.getElementById('success-message');
const wrongLetters_e1 = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById("message");
const PlayAgainBtn = document.getElementById('play-again');

const correctLetters = [];
const wrongLetters = [];
let selectedWord = getRandomWord();

function getRandomWord() {
    const words = ["javascript", "java", "python"];

    return words[Math.floor(Math.random() * words.length)];
}


function displayWord() {
    word_e1.innerHTML = `
        ${selectedWord.split("").map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
            </div>
            `).join('')}
    `;

    const w = word_e1.innerText.replace(/\n/g, '');
    if (w === selectedWord) {
        popup.style.display = 'flex';
        message_e1.innerText = 'Tebrikler kazandınız.';
    }
}

function updateWrongLetters() {
    wrongLetters_e1.innerHTML = `
        ${wrongLetters.length > 0 ? '<h3>Hatalı harfler</h3>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
            
    `;

    items.forEach((item, index) => {
        const errorCount = wrongLetters.length;

        if (index < errorCount) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });

    if (wrongLetters.length === items.length) {
        popup.style.display = 'flex';
        message_e1.innerText = 'Maalesef kaybettiniz.';
    }

}

function displayMessage() {
    message.classList.add("show");
    setTimeout(function () {
        message.classList.remove("show");
    }, 2000);
}

PlayAgainBtn.addEventListener('click', function () {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = getRandomWord();
    displayWord();
    updateWrongLetters();
    popup.style.display = 'none';
});

window.addEventListener('keydown', function (e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                // bu harfi zaten eklediniz.
                displayMessage();

            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            } else {

                displayMessage();
            }
        }
    }
});

displayWord();



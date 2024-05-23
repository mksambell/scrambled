
let wordList = ['seventy'];
let currentWord = wordList[0];

function newGame() {

    // calls random word API when new game button is pressed
    // wordList = getWords();

    // replaces description and logo on landing page with gameplay section
    let gameplaySection = document.getElementById("gameplay-container");
    gameplaySection.innerHTML = `
    <div class="row">
            <div id="user-input-column" class="col-sm-5 col-10 mx-auto">
                <div class="row">
                    <div id="guess-box" class="col-12 text-center">
                        <label for="guess">Guess:</label>
                        <input id="guess" type="text" name="guess">
                    </div>
                </div>
                <div class="row">
                    <div id="lives" class="col-12 text-center">
                        <i class="fa-solid fa-heart life"></i>
                        <i class="fa-solid fa-heart life"></i>
                        <i class="fa-solid fa-heart life"></i>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 text-center">
                        <button id="shuffle">shuffle</button>
                        <button id="reveal">reveal</button>
                    </div>
                </div>
            </div>
            <div id="feedback-column" class="col-sm-5 col-10 mx-auto">
                Click 'start game' to display the first anagram
            </div>
        </div>
    `;

    //changes button name and id from 'new game' to 'start game'
    let buttonDiv = document.getElementById('game-button-div');
    buttonDiv.innerHTML = `
    <button id="start-game-button">
                    start game
                </button>
    `;

    //adds event listener to 'start game' button
    let startGameButton = document.getElementById('start-game-button');
    startGameButton.addEventListener('click', startGame);

    // displays GOOD LUCK in anagram display
    let anagram = document.getElementById('anagram');
    anagram.innerHTML = 'good luck';
}

function startGame() {

    //changes button name and id from 'start game' to 'end game'
    let buttonDiv = document.getElementById('game-button-div');
    buttonDiv.innerHTML = `
    <button id="end-game-button">
                    end game
                </button>
    `;

    // adds event listener to 'end game' button
    let endGameButton = document.getElementById('end-game-button');
    endGameButton.addEventListener('click', endGame);

    // adds event listener to 'shuffle' button
    let shuffleButton = document.getElementById('shuffle');
    shuffleButton.addEventListener('click', shuffleBtn);

    shuffle(currentWord);
}

function shuffleBtn() {
    shuffle(currentWord);
    console.log(currentWord);
}

function displayWord(anagram) {

    // displays the anagram in the anagram display
    document.getElementById('anagram').innerHTML = anagram;
}

function getWords() {

    let wordList = fetch('https://random-word-api.herokuapp.com/word?lang=en&length=7&number=10');

    wordList.then((response) => {
        const jsonPromise = response.json();
        jsonPromise.then((data) => {
            console.log(data);
        });
    });


    // sets a random number between 5-9 to add to the API request for different length words
    // let length = Math.floor(Math.random() * (10 - 5) + 5);

    // let URL = `https://random-word-api.herokuapp.com/word?lang=en&length=7&number=10`;

    // let xhr = new XMLHttpRequest();
    // xhr.open('GET', URL);
    // xhr.send();

    // xhr.onreadystatechange = function() {
    //     if(this.readyState == 4 && this.status == 200) {
    //         cb(this.responseText.slice(2, length + 2));
    //     }
    // else {
    //     document.getElementById('feedback-column').innerHTML = `
    //     Sorry, the random word generator doesn't seem to be working. Please try again later.`
    // }
    // };
}

function shuffle(word) {
    // returns shuffled version of word passed in from getWord()
    // code for random sort function from https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
    displayWord(word.split("").sort((a, b) => 0.5 - Math.random()).join(""));
}

function endGame() {
    // checks if user wants to end game

    // displays GAME OVER in anagram display
    let anagram = document.getElementById('anagram');
    anagram.innerHTML = 'game over';

    // changes innerHTML of feedback column and/or user input section to show game summary

    // changes name and id of 'end game' button to 'new game'
    let buttonDiv = document.getElementById('game-button-div');
    buttonDiv.innerHTML = `
    <button id="new-game-button">
                    new game
                </button>
    `;

    // adds event listener to 'new game' button
    let newGameButton = document.getElementById('new-game-button');
    newGameButton.addEventListener('click', newGame);

}

// adds event listener to 'new game' button on landing page
let newGameButton = document.getElementById('new-game-button');
newGameButton.addEventListener('click', newGame);
function newGame(event) {

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
                        <button>shuffle</button>
                        <button>reveal</button>
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

    displayWord();
}

function displayWord() {
    // displays the word in the anagram display

    let anagram = getWord();
    document.getElementById('anagram').innerHTML = anagram;
}

function getWord() {
    let length = Math.floor(Math.random() * (10 - 5) + 5);
    let URL = `https://random-word-api.herokuapp.com/word?length=${length}`;

    let xhr = new XMLHttpRequest();
    xhr.open('GET', URL)
    xhr.send()

    xhr.onreadystatechange = () {
        if(this.readyState == 4 && this.status == 200) {
            word = this.responseText.slice(2, length + 2);
        }
        // else handle if the API doesn't return anything
    }

    return word;
}

function shuffle(word) {
    // returns shuffled version of word passed in from getWord()
    return word; 
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

let newGameButton = document.getElementById("new-game-button");
newGameButton.addEventListener('click', newGame);


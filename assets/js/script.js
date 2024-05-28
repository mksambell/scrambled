let currentWord;
let unsolvedList = [];
let unscrambledList = [];

function newGame() {

    // replaces description and logo on landing page with gameplay section
    let gameplaySection = document.getElementById("gameplay-container");
    gameplaySection.innerHTML = `
    <div class="row">
            <div id="user-input-column" class="col-sm-5 col-10 mx-auto">
                <div class="row">
                    <div id="guess-box" class="col-12 text-center">
                        <label for="guess">Guess:</label>
                        <input id="guess" type="text" name="guess" maxlength="7" minlength="7">
                        <button id="enter">Enter</button>
                    </div>
                </div>
                <div class="row">
                    <div id="shuffle-container" class="col-6 text-center">
                        <button id="shuffle">shuffle</button>
                    </div>
                    <div id="reveal-container" class="col-6 text-center">
                        <button id="reveal">reveal</button>
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
                    <div id="score-container" class="col-12 text-center">
                        <p id="score">Score: 0</p>
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

    newWord();

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
    shuffleButton.addEventListener('click', shuffleHandler);

    // adds event listener to 'reveal' button
    let revealButton = document.getElementById('reveal');
    revealButton.addEventListener('click', revealHandler);

    // adds event listener to 'enter' button
    document.getElementById('enter').addEventListener('click', enterHandler);

    // // adds event listener for Enter key
    // let form = document.getElementsByTag('form');
    // form.addEventListener('keypress', function(event) {
    //     if (event.keyCode === 13) {
    //         event.preventDefault();
    //         form.submit();
    //       }
    // });

    document.getElementById('feedback-column').innerHTML = `
        <p>Generating anagram...</p>`
}

async function newWord() {
    currentWord = await getWord();
    displayWord(shuffle(currentWord));
    document.getElementById('feedback-column').innerHTML = `
        <p>Guess away!</p>`
}

function revealHandler() {
    // gets user to confirm that proceeding loses a life
    if (confirm('Revealing the word will lose a life. \nDo you wish to proceed?')) {
        // decrease life


        //displays answer
        displayWord(currentWord);

        // adds word to list of unsolved words
        unsolvedList.push(currentWord);

        //changes button name and id from 'reveal' to 'next word'
        let revealBtn = document.getElementById('reveal');
        revealBtn.innerHTML = `next word`;

        // prevents user clicking reveal twice
        revealBtn.removeEventListener('click', revealHandler);

        // prevents further shuffle clicks
        document.getElementById('shuffle').removeEventListener('click', shuffleHandler);

        // listens for user to move to next word
        revealBtn.addEventListener('click', nextWordHandler);

        // prevents user entering word once revealed
        document.getElementById('enter').removeEventListener('click', enterHandler);

    } else {
        return;
    }
}

function nextWordHandler() {
    newWord();

    document.getElementById('feedback-column').innerHTML = `
        <p>Generating anagram...</p>`

    //changes button name and id from 'next word' to 'reveal'
    let revealBtn = document.getElementById('reveal');
    revealBtn.innerHTML = `reveal`;

    revealBtn.removeEventListener('click', nextWordHandler);
    revealBtn.addEventListener('click', revealHandler);

    // reinstates shuffle event listener
    document.getElementById('shuffle').addEventListener('click', shuffleHandler);

    // reinstates enter event listener
    document.getElementById('enter').addEventListener('click', enterHandler);
}

function enterHandler() {
    guess = document.getElementById('guess').value;
    checkGuessValid(guess);
}

function shuffleHandler() {
    //handles shuffle button click
    displayWord(shuffle(currentWord));
}

function displayWord(anagram) {
    // displays the anagram in the anagram display
    document.getElementById('anagram').innerHTML = anagram;
}

// syntax for API developed from code by youtuber ByteGrad
async function getWord() {

    try {
        const response = await fetch('https://random-word-api.herokuapp.com/word?lang=en&length=7');
        let word = await response.json();

        if (!response.ok) {
            console.log(response.description);
            return;
        };

        return word[0];

    } catch (error) {
        document.getElementById('feedback-column').innerHTML = `<p>
                Sorry, the random word generator is not working at the moment. Please try again later</p>`;
    }
}

function shuffle(word) {
    // shuffles word received from API
    // code for random sort algorithm from https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
    let anagram = word.split("").sort((a, b) => 0.5 - Math.random()).join("");

    // ensures that shuffle does not return answer
    if (anagram === word) {
        shuffle(word);
    } else {
        return anagram;
    };
}

function checkGuess(guess) {

    // clears input field
    document.getElementById('guess').value = "";

    // if guess passes first tests, but is not correct
    document.getElementById('feedback-column').innerHTML = `
        <p>Your guess: ${guess.toUpperCase()}</p>`
}

function checkGuessValid(guess) {
    let feedback = document.getElementById('feedback-column');

    // checks if guess is of correct length, type, correct letters before calling checkGuess()
    if (guess.length > 7) {
        console.log("too short");
        feedback.innerHTML = `
        <p>Your guess is too short. Try again!</p>`;
    };
}

function endGame() {
    // checks if user wants to end game
    // Modal?

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
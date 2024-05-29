let currentWord;
let unsolvedList = [];
let unscrambledList = [];
let lives = 3;
let score = 0;

//store DOM element ids in variables for later use

function newGame() {

    //resets all global variables
    currentWord = "";
    unsolvedList = [];
    unscrambledList = [];
    lives = 3;
    score = 0;

    // replaces description and logo on landing page with gameplay section
    document.getElementById("gameplay-container").innerHTML = `
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
                    <div class="col-md-6 col-sm-8 col-xs-10 mx-auto">
                        <div class="row">
                            <div id="shuffle-container" class="col-6 text-center">
                                <button id="shuffle">shuffle</button>
                            </div>
                            <div id="reveal-container" class="col-6 text-center">
                                <button id="reveal">reveal</button>
                            </div>
                        </div>
                    </div> 
                </div>
                <div id="spacer"></div>
                <div class="row">
                    <div id="lives" class="col-md col-sm-12 text-center">
                        <i id="life1" class="fa-solid fa-heart life"></i>
                        <i id="life2" class="fa-solid fa-heart life"></i>
                        <i id="life3" class="fa-solid fa-heart life"></i>
                    </div>
                    <div id="score-container" class="col-md col-sm-12 text-center">
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
    endGameButton.addEventListener('click', endGameHandler);

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

    let message;
    if (lives > 1) {
        message = 'Revealing the word will lose a life. \nDo you wish to proceed?'
    } else {
        message = 'Revealing the word will lose your last life and end the game. \nDo you wish to proceed?'
    };

    if (confirm(`${message}`)) {
        // decrease a life
        dockLife();

        // clears input field
        document.getElementById('guess').value = "";

        // adds word to list of unsolved words
        unsolvedList.push(currentWord);

        if (lives >= 1) {
            //displays answer
            displayWord(currentWord);

            // displays answer in feedback section
            document.getElementById('feedback-column').innerHTML = `
            <p>The word was ${currentWord.toUpperCase()}.</p>`;

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
            gameOver();

        }
    } else {
        return;
    }
}

function dockLife() {
    lives -= 1;
    console.log(lives);
    showLives();
}

function showLives() {
    if (lives < 3) {
        document.getElementById('life3').classList.remove('fa-solid');
        document.getElementById('life3').classList.add('fa-regular');
    };
    if (lives < 2) {
        document.getElementById('life2').classList.remove('fa-solid');
        document.getElementById('life2').classList.add('fa-regular');
    };
    if (lives < 1) {
        document.getElementById('life1').classList.remove('fa-solid');
        document.getElementById('life1').classList.add('fa-regular');
    };
}

function nextWordHandler() {
    newWord();

    // clears input field
    document.getElementById('guess').value = "";

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
    checkGuess(guess);
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
    // checks guess against currentWord

    let feedback = document.getElementById('feedback-column');

    // if correct
    if (guess === currentWord) {

        // clears input field
        document.getElementById('guess').value = "";

        feedback.innerHTML = `
        <p>${guess.toUpperCase()} is correct!</p>`;

        unscrambledList.push(currentWord);
        console.log(unscrambledList);

        //increment score and display score
        incrementScore();

        //changes button name and id from 'reveal' to 'next word'
        document.getElementById('reveal').innerHTML = `next word`;

        // deactivates shuffle button
        document.getElementById('shuffle').removeEventListener('click', shuffleHandler);

        //removes reveal handler listener and adds next word handler listener
        document.getElementById('reveal').removeEventListener('click', revealHandler);
        document.getElementById('reveal').addEventListener('click', nextWordHandler);

    } else if (guess === "") {
        feedback.innerHTML = `
        <p>You didn't enter a guess. Try again!</p>`;
    } else if (guess.length < 7) {
        feedback.innerHTML = `
        <p>Your guess is too short. Try again!</p>`;
    } else if (guess.split("").sort().join("") !== currentWord.split("").sort().join("")) {
        feedback.innerHTML = `
        <p>Your guess doesn't contain the letters of the anagram. Try again!</p>`;
        // } else if (guess has nonalphetical characters) {
        //     feedback.innerHTML = `
        //     <p>Your guess should only contain letters. Try again!</p>`;
    } else {
        document.getElementById('feedback-column').innerHTML = `
        <p>${guess.toUpperCase()} is not correct. Try again! </p>`

        // check number of lives
        // if above 1, decrease
        dockLife();
        // else game over
    }
}

function incrementScore() {
    score += 1;
    document.getElementById('score').innerHTML = `Score: ${score}`;
}

function endGameHandler() {
    if (confirm('This will end the current game. \nAre you sure?')) {
        gameOver();
    } else {
        return;
    }
}

function gameOver() {
    lives = 0;
    showLives();

    // displays answer in feedback section and message about no lives
    document.getElementById('feedback-column').innerHTML = `
    <p>The word was ${currentWord.toUpperCase()}.</p>
    <br>
    <p>You're out of lives!</p>
    <br>
    <p>Click below for a game summary</p>`;

    // displays GAME OVER in anagram display
    let anagram = document.getElementById('anagram');
    anagram.innerHTML = 'game over';

    // disables input section, shuffle and reveal buttons
    document.getElementById('guess').setAttribute('disabled', "");
    document.getElementById('enter').removeEventListener('click', enterHandler);
    document.getElementById('shuffle').removeEventListener('click', shuffleHandler);
    document.getElementById('reveal').removeEventListener('click', revealHandler);

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
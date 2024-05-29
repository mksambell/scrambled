let currentWord;
let unsolvedList = [];
let unscrambledList = [];
let lives = 3;
let score = 0;
let crtWordInfo;

//stores DOM element in variables for later use

let shufBtn;
let revBtn;
let entBtn;
let fdbk;
let guess;
let scr;
let anagram = document.getElementById('anagram');
let mainBtn = document.getElementById('mainBtn');

mainBtn.addEventListener('click', newGame);

function newGame() {

    //resets gameplay variables
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
                        <button id="enter">enter</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-10 mx-auto">
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
                <p>Click 'start game' to display the first anagram</p>
            </div>
        </div>
    `;

    // assign DOM elements to variables for later use
    shufBtn = document.getElementById('shuffle');
    revBtn = document.getElementById('reveal');
    entBtn = document.getElementById('enter');
    fdbk = document.getElementById('feedback-column');
    guess = document.getElementById('guess');
    scr = document.getElementById('score');

    //changes main button name, and adds event listener
    mainBtn.innerHTML = `start game`;
    mainBtn.removeEventListener('click', newGame);
    mainBtn.addEventListener('click', startGame);

    // displays GOOD LUCK in anagram display
    anagram.innerHTML = 'good luck';
}

function startGame() {

    newWord();

    //changes main button name and changes event listener
    mainBtn.innerHTML = `end game`;
    mainBtn.removeEventListener('click', startGame);

    fdbk.innerHTML = `
        <p>Generating anagram...</p>`
}

async function newWord() {

    currentWord = await getWord();
    displayWord(shuffle(currentWord));
    fdbk.innerHTML = `<p>Guess away!</p>`;

    // add event listeners to gameplay buttons
    shufBtn.addEventListener('click', shuffleHandler);
    revBtn.addEventListener('click', revealHandler);
    entBtn.addEventListener('click', enterHandler);
    mainBtn.addEventListener('click', endGameHandler);

    // call getWordInfo function and store in variable
    crtWordInfo = await getWordInfo();
    console.log(crtWordInfo);
}

async function getWordInfo() {

    let URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${currentWord}`;

    try {
        const response = await fetch(URL);
        let data = await response.json();

        if (!response.ok) {
            console.log(response.description);
            return;
        };

        return data;

    } catch (error) {
        fdbk.innerHTML = `
            <p>Sorry, the dictionary is not working at the moment.</p>`;
    }

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
        guess.value = "";

        // adds word to list of unsolved words
        unsolvedList.push(currentWord);

        if (lives >= 1) {
            //displays answer
            displayWord(currentWord);

            // displays answer in feedback section
            fdbk.innerHTML = `
            <p>The word was ${currentWord.toUpperCase()}.</p>`;

            //changes reveal button and event listeners
            revBtn.innerHTML = `next word`;
            revBtn.removeEventListener('click', revealHandler);
            revBtn.addEventListener('click', nextWordHandler);
            
            // prevents further shuffle clicks
            shufBtn.removeEventListener('click', shuffleHandler);

            // prevents user entering word once revealed
            entBtn.removeEventListener('click', enterHandler);

        } else {
            gameOver();
        }
    } else {
        return;
    }
}

function dockLife() {
    lives -= 1;
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
    guess.value = "";

    fdbk.innerHTML = `<p>Generating anagram...</p>`;

    //changes reveal button name and event listeners
    revBtn.innerHTML = `reveal`;
    revBtn.removeEventListener('click', nextWordHandler);
}

function enterHandler() {
    let g = guess.value;
    checkGuess(g);
}

function shuffleHandler() {
    //handles shuffle button click
    displayWord(shuffle(currentWord));
}

function displayWord(anag) {
    // displays the anagram in the anagram display
    anagram.innerHTML = anag;
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
        fdbk.innerHTML = `
            <p>Sorry, the random word generator is not working at the moment. Please try again later</p>`;
    }
}

function shuffle(word) {
    // shuffles word received from API
    // code for random sort algorithm from https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
    let anag = word.split("").sort((a, b) => 0.5 - Math.random()).join("");

    // ensures that shuffle does not return answer
    if (anagram === word) {
        shuffle(word);
    } else {
        return anag;
    };
}

function checkGuess(g) {
    // checks guess against currentWord

    // if correct
    if (g === currentWord) {

        // clears input field
        guess.value = "";

        fdbk.innerHTML = `
            <p>${g.toUpperCase()} is correct!</p>`;

        unscrambledList.push(currentWord);

        //increment score and display score
        incrementScore();

        //changes reveal button and event listeners
        revBtn.innerHTML = `next word`;
        revBtn.removeEventListener('click', revealHandler);
        revBtn.addEventListener('click', nextWordHandler);

        // deactivates shuffle button
        shufBtn.removeEventListener('click', shuffleHandler);

    } else if (g === "") {
        fdbk.innerHTML = `
            <p>You didn't enter a guess. Try again!</p>`;
    } else if (g.length < 7) {
        fdbk.innerHTML = `
            <p>Your guess is too short. Try again!</p>`;
    } else if (g.split("").sort().join("") !== currentWord.split("").sort().join("")) {
        fdbk.innerHTML = `
            <p>Your guess doesn't contain the letters of the anagram. Try again!</p>`;
    } else {
        if (lives > 1) {
            fdbk.innerHTML = `
                <p>${g.toUpperCase()} is not correct. Try again! </p>`;
            dockLife();
        } else {
            gameOver();
        }
    }
}

function incrementScore() {
    score += 1;
    scr.innerHTML = `Score: ${score}`;
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
    fdbk.innerHTML = `
        <p>The word was ${currentWord.toUpperCase()}.</p>
        <br>
        <p>You're out of lives!</p>
        <br>
        <p>Click below for a game summary</p>`;

    // displays GAME OVER in anagram display
    anagram.innerHTML = 'game over';

    // disables input section, shuffle and reveal buttons
    guess.setAttribute('disabled', "");
    entBtn.removeEventListener('click', enterHandler);
    shufBtn.removeEventListener('click', shuffleHandler);
    revBtn.removeEventListener('click', revealHandler);

    // changes main button and event listeners
    mainBtn.innerHTML = `game summary`;
    mainBtn.removeEventListener('click', endGameHandler);
    mainBtn.addEventListener('click', gameSum);
    
}

function gameSum() {

    // changes main button and event listeners
    mainBtn.innerHTML = `new game`;
    mainBtn.removeEventListener('click', gameSum);
    mainBtn.addEventListener('click', newGame);
    
    // displays score and list of unscrambled words
    let userCol = document.getElementById('user-input-column');

    if (unscrambledList.length === 1) {
        userCol.innerHTML = `<p>You unscrambled 1 word.<p>
        <br>
        <p>UNSCRAMBLED: ${unscrambledList.toString()}</p>
        `;
    } else if (score === 0) {
        userCol.innerHTML = `<p>You unscrambled 0 words.</p>`;
    } else {
        userCol.innerHTML = `<p>You unscrambled ${score} words.</p>
        <br>
        <p>UNSCRAMBLED: ${unscrambledList.toString()}</p>`;
    }

    // displays unsolved words in feedback column
    if (unsolvedList.length === 0) {
        fdbk.innerHTML = `
            <p>There were no unsolved words!</p>`;
    } else {
        fdbk.innerHTML = `
            <p>There were ${unsolvedList.length} unsolved words.</p>
            <br>
            <p>UNSOLVED: ${unsolvedList.toString()}</p>`;
    }
}

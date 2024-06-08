// variables used throughout gameplay

let currentWord;
let unsolvedList = [];
let unscrambledList = [];
let lives = 3;
let score = 0;
let wordInfo;
let worLen;
let guessList = [];
let defMsg;

//DOM elements stored in variables for later use (most assigned in newGame())

let shufBtn;
let revBtn;
let entBtn;
let fdbk;
let guess;
let scr;
let anagram = document.getElementById('anagram');
let mainBtn = document.getElementById('mainBtn');

// adds listener to new game button and add focus
mainBtn.addEventListener('click', newGame);
mainBtn.focus();

// adds listener to title-logo anchor
document.getElementById('title-link').addEventListener('click', checkLeave);

/**
 * called when user clicks 'new game' button
 * changes html to display gameplay screen
 * initialises/clears main game variables
 * prepares event listeners
 * stores DOM elements in variables for later use
 */
function newGame() {

    //resets gameplay variables
    currentWord = "";
    unsolvedList = [];
    unscrambledList = [];
    lives = 3;
    score = 0;
    guessList = [];

    // displays SCRAMBLED in anagram display
    anagram.innerHTML = 'scrambled';

    // checks what word length user has selected
    if (document.getElementById('btn5').checked) {
        worLen = 5;
    } else if (document.getElementById('btn6').checked) {
        worLen = 6;
    } else if (document.getElementById('btn7').checked) {
        worLen = 7;
    };

    // hides options for word length
    document.getElementById('btn-group').classList.add("d-none");

    // replaces description and logo on landing page with gameplay section
    document.getElementById("gameplay-container").innerHTML = `
        <div class="row">
            <div id="user-input-column" class="col-sm-5 col-10 mx-auto text-center">
                <div class="row mx-auto">
                    <div id="guess-box" class="col-12 text-center">
                        <label for="guess">Guess:</label>
                        <input id="guess" type="text" name="guess" autocomplete="off">
                    </div>
                </div>
                <div class="row mx-auto">
                    <div class="col-xs-10">
                        <div class="row">
                            <div id="shuffle-container" class="col-4 text-center">
                                <button id="shuffle">shuffle</button>
                            </div>
                            <div id="reveal-container" class="col-4 text-center">
                                <button id="reveal">reveal</button>
                            </div>
                            <div id="enter-container" class="col-4 text-center">
                                <button id="enter">enter</button>
                            </div>
                        </div>
                    </div> 
                </div>
                <div class="row mx-auto">
                    <div class="col-xs-10">
                        <div class="row">
                            <div id="lives" class="col-6">
                                <i id="life1" class="fa-solid fa-heart life"></i>
                                <i id="life2" class="fa-solid fa-heart life"></i>
                                <i id="life3" class="fa-solid fa-heart life"></i>
                            </div>
                            <div id="score-container" class="col-6">
                                <p id="score">Score: 0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="feedback-column" class="col-sm-5 col-10 mx-auto text-center">
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
}

/**
 * called when user clicks 'start game' button
 * calls newWord function
 * prepares listener for 'end game' button
 */
function startGame() {

    newWord();

    //changes main button name and changes event listener
    mainBtn.innerHTML = `end game`;
    mainBtn.removeEventListener('click', startGame);
}

/**
 * calls getWord function and stores result in currentWord var
 * prepares listeners for gameplay buttons and input box
 * async function awaits result of getWord API call
 */
async function newWord() {

    fdbk.innerHTML = `<p>Generating anagram...</p>
                        <img id="loading-gif" class="img-fluid" src="assets/images/loading-loader.gif">`;

    // shifts focus to input box
    guess.focus();

    // resets guessList for new word
    guessList = [];

    currentWord = await getWord();

    // call getWordInfo function and store in variable
    wordInfo = await getWordInfo();

    defMsg = getDef(wordInfo);

    displayWord(shuffle(currentWord));

    fdbk.innerHTML = `<p>Guess away!</p>`;

    // add event listeners to gameplay buttons
    shufBtn.addEventListener('click', shuffleHandler);
    revBtn.addEventListener('click', revealHandler);
    entBtn.addEventListener('click', enterHandler);
    guess.addEventListener('keypress', entBtnHandler);
    mainBtn.addEventListener('click', endGameHandler);
}

/**
 * called when user clicks start game or next
 * calls Random Word API to request single random word of between 5-7 letters long
 * @returns {string} word to be used for anagram
 */
// syntax for API developed from code by youtuber ByteGrad
async function getWord() {

    try {
        // aborts API call after 8 seconds
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(`https://random-word-api.herokuapp.com/word?lang=en&length=${worLen}`, { signal: controller.signal });
        let word = await response.json();
        clearTimeout(timeoutId);

        return word[0];

    } catch (error) {
        return backUp();
        // fdbk.innerHTML = `
        //     <p>Sorry, the random word generator is not working at the moment. Please try again later</p>`;
    };
}

/**
 * if API not working, randomly selects word from locally stored wordlists.js
 * returns word
 */
function backUp() {
    if (worLen === 5) {
        // fiveLtrWds list contains 3094 words
        let n = Math.floor(Math.random() * 3095);
        return fiveLtrWds[n];
    } else if (worLen === 6) {
        // sixLtrWds contains 5128 words
        let n = Math.floor(Math.random() * 5129);
        return sixLtrWds[n].toLowerCase();
    } else if (worLen === 7) {
        // sevenLtrWds contains 1371 words
        let n = Math.floor(Math.random() * 1372);
        return sevenLtrWds[n].toLowerCase();
    };
}

/**
* calls Dictionary API for info on currentWord 
* @returns {object} data on currentWord
*/
async function getWordInfo() {

    const apiKey = 'b2c8534a-1102-45e8-959f-edb134380e59';
    let URL = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${currentWord}?key=${apiKey}`;

    try {
        // aborts API call after 8 seconds
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const response = await fetch(URL, { signal: controller.signal });
        let data = await response.json();
        clearTimeout(timeoutId);

        return data;

    } catch (error) {
        return 'Sorry, the dictionary is not working at the moment. Try looking up the word in the <a id="dict-link" href="https://www.merriam-webster.com/" target="_blank">Merriam-Webster</a> dictionary.';
    };
}

function getDef(info) {
    //first checks if getWord has returned error message, and returns that
    if (typeof info === 'string') {
        return info;
    } else if (!info[0].shortdef) {
        if (info[1].shortdef) {
            return info[1].shortdef;
        } else {
            return `The dictionary does not have a short definition for this word. 
                Try looking it up in the <a id="dict-link" href="https://www.merriam-webster.com/" target="_blank">
                Merriam-Webster</a> dictionary.`;
        };
    } else {
        return info[0].shortdef;
    }
}

/**
 * called when user clicks 'reveal' button
 * checks if user wants to proceed
 * if true, docks a life
 * and prepares for next word to be clicked
 * if lives = 0, then calls gameOver function
 * @returns void if confirm message is false
 */
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

        if (lives >= 1) {
            //displays answer
            displayWord(currentWord);

            // displays answer in feedback section
            fdbk.innerHTML = `
            <p class="def">The word is ${currentWord.toUpperCase()}.
            <br>Definition: ${defMsg}</p>`;

            // adds word to list of unsolved words
            unsolvedList.push(currentWord);

            //changes reveal button and event listeners
            revBtn.innerHTML = `next`;
            revBtn.removeEventListener('click', revealHandler);
            revBtn.addEventListener('click', nextWordHandler);

            // prevents further shuffle clicks
            shufBtn.removeEventListener('click', shuffleHandler);

            // prevents user entering word once revealed
            entBtn.removeEventListener('click', enterHandler);
            guess.removeEventListener('keypress', entBtnHandler);

            // allows user to proceed to next word with enter button
            guess.addEventListener('keypress', nexBtnHandler);

        } else {
            gameOver();
        }
    } else {
        return;
    }
}

/**
 * called if user hits enter key to trigger next word
 * @param {*} event - keypress
 */
function nexBtnHandler(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        nextWordHandler();
    };
}

/**
 * listens for Enter keypress and calls enterHandler
 * @param {*} event - keypress 
 */
function entBtnHandler(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        enterHandler();
    };
}

/**
 * decreases lives variable by one
 * calls showLives function to display remaining lives
 */
function dockLife() {
    lives -= 1;
    showLives();
}

/**
 * displays remaining lives in user-input-column
 */
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

/**
 * called when user clicks next word or hits enter to trigger next word
 * calls newWord function
 * prepares listeners for gameplay buttons
 */
function nextWordHandler() {
    newWord();

    // clears input field
    guess.value = "";

    //changes reveal button name and event listeners
    revBtn.innerHTML = `reveal`;
    revBtn.removeEventListener('click', nextWordHandler);

    // changes nextWord listener on enter button to enter listener
    guess.removeEventListener('keypress', nexBtnHandler);
    guess.addEventListener('keypress', entBtnHandler);
}

/**
 * called when user hits or clicks enter
 * assigns user input to local var
 * calls checkGuess with guess as parameter
 */
function enterHandler() {
    let g = guess.value.toLowerCase();
    checkGuess(g);

    // clears input field
    guess.value = "";
}

/**
 * called when user clicks shuffle button
 * calls shuffle function and passes result to displayWord function
 */
function shuffleHandler() {
    //handles shuffle button click
    let a = shuffle(currentWord);
    displayWord(a);
}

/**
 * displays anagram on screen
 * @param {string} anag - anagram to be displayed
 */
function displayWord(anag) {
    // displays the anagram in the anagram display
    anagram.innerHTML = anag;
}

/**
 * called when start game, next or shuffle is clicked
 * 
 * @param {string} word - currentWord
 * @returns {string} anagram
 */
function shuffle(word) {
    // code for random sort algorithm from https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
    let anag = word.split("").sort((a, b) => 0.5 - Math.random()).join("");

    // ensures that anagram is not same as currentWord or previous anagram
    if (anag === word || anag === anagram.innerHTML) {
        anag = shuffle(anag);
    }

    return anag;
}

/**
 * checks if user guess is correct
 * if true, calls increment score
 * and prepares listeners
 * if not correct, checks if length and letter content is correct
 * and if user has already guessed this word
 * displays feedback to user
 * @param {string} g - user guess
 * @returns void if guess is incorrect
 */
function checkGuess(g) {
    // checks guess against currentWord

    // if correct
    if (g === currentWord) {

        //displays answer
        displayWord(currentWord);

        fdbk.innerHTML = `
            <p class="def">${g.toUpperCase()} is correct!<br>
            Definition: ${defMsg}</p>`;

        unscrambledList.push(currentWord);

        //increment score and display score
        incrementScore();

        // deactivates shuffle and enter button
        shufBtn.removeEventListener('click', shuffleHandler);
        entBtn.removeEventListener('click', enterHandler);
        guess.removeEventListener('keypress', entBtnHandler);

        //changes reveal button and event listeners
        revBtn.innerHTML = `next`;
        revBtn.removeEventListener('click', revealHandler);
        revBtn.addEventListener('click', nextWordHandler);
        guess.addEventListener('keypress', nexBtnHandler);

    } else if (g === "") {
        fdbk.innerHTML = `
            <p>You didn't enter a guess. Try again!</p>`;
    } else if (g.length < worLen) {
        fdbk.innerHTML = `
            <p>Your guess is too short. Try again!</p>`;
    } else if (g.length > worLen) {
        fdbk.innerHTML = `
                <p>Your guess is too long. Try again!</p>`;
    } else if (g.split("").sort().join("") !== currentWord.split("").sort().join("")) {
        fdbk.innerHTML = `
            <p>Your guess doesn't contain the letters of the anagram. Try again!</p>`;
    } else if (guessList.includes(g)) {
        fdbk.innerHTML = `
            <p>You've already guessed this. Try again!</p>`;
        return;
    } else {
        if (lives > 1) {
            fdbk.innerHTML = `
                <p>${g.toUpperCase()} is not correct. Try again! </p>`;
            dockLife();
            guessList.push(g);
        } else {
            // adds word to list of unsolved words
            unsolvedList.push(currentWord);

            gameOver();
        }
    };
}

/**
 * increases score by 1
 * displays score in user-input-column
 */
function incrementScore() {
    score += 1;
    scr.innerHTML = `Score: ${score}`;
}

/**
 * called if user clicks end game button
 * calls gameOver function if user confirms
 */
function endGameHandler() {
    if (confirm('This will end the current game. \nAre you sure?')) {
        gameOver();
    } else {
        return;
    }
}

/**
 * called if user ends game or if lives run out on guesses or reveal
 * displays 0 lives
 * displays feedback to user
 * prepares listeners for game summary
 */
function gameOver() {
    // shows no lives even if user ended game with lives remaining
    lives = 0;
    showLives();

    // checks if user has already revealed word
    if (!unsolvedList.includes(currentWord)) {
        unsolvedList.push(currentWord);
    };

    // displays answer in feedback section and message about no lives
    fdbk.innerHTML = `
        <p class="def">The word was ${currentWord.toUpperCase()}.<br>
        Definition: ${defMsg}</p>`;

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

/**
 * called when user clicks on game summary
 * displays feedback on number of words solved and unsolved
 * displays list of solved and unsolved words
 */
function gameSum() {

    // changes main button and event listeners
    mainBtn.innerHTML = `new game`;
    mainBtn.removeEventListener('click', gameSum);
    mainBtn.addEventListener('click', newGame);

    // displays options for word length for new game
    document.getElementById('btn-group').classList.remove("d-none");

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
    } else if (unsolvedList.length === 1) {
        fdbk.innerHTML = `
            <p>There was 1 unsolved word.</p>
            <br>
            <p>UNSOLVED: ${unsolvedList.toString()}</p>`;
    } else {
        fdbk.innerHTML = `
            <p>There were ${unsolvedList.length} unsolved words.</p >
            <br>
            <p>UNSOLVED: ${unsolvedList.toString()}</p>`;
    };
}

/**
 * called if user clicks on title-logo anchor link
 * returns to landing page if user confirms
 * @param {*} event 
 * @returns 
 */
function checkLeave(event) {
    if (confirm('This will take you back to the home page.\n\nIt will end the current game and lose game data.\n\nAre you sure you want to proceed?')) {
        return;
    } else {
        event.preventDefault();
    }
}
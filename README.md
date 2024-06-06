# **scrambled**

**scrambled** is an anagram word game in which the player attempts to solve as many anagrams as they can. The player can choose a 5-, 6-, or 7-letter word game. The player has three lives; they lose a life if they make an incorrect guess or opt to reveal the word. A correct guess allows them to proceed to the next word. The game ends when the three lives are up or when the player decides. The player is then given a summary of the game and an invitation to start a new game.

Have a go! [**scrambled**](https://mksambell.github.io/scrambled/)

![Responsive Screenshot](/assets/readme-images/resp-screenshots.png)

## Contents
1. [**User Experience UX**](#1-user-experience-ux)
    - [Strategy](#strategy)
	- [User Stories](#user-stories)
    - [Site Structure](#site-structure)
    - [Wireframes](#wireframes)
    - [Surface](#surface)
2. [**Features**](#2-features)
	- [Existing Features](#existing-features)
		- [Home](#existing-features)
	- [Future Features](#future-features)
3. [**Technology used**](#3-technology-used)
4. [**Testing**](#4-testing)
5. [**Deployment**](#5-deployment)
6. [**Credits**](#6-credits)
7. [**Acknowledgements**](#7-acknowledgements)

# 1. User Experience UX

## Strategy

The aim is to provide a fun game in the style of Countdown's Conundrum round, in which players attempt to solve an anagram. The game is intended to be light-hearted and user-friendly, but also be informative and present a degree of challenge. Players will be able to play a casual game, and dedicated wordgame enthusiasts will be able to play multiple times to hone their anagram-solving skills. 

In the conundrum round, players are given 30-seconds to solve a 9-letter anagram; the aim is for the player to guess the anagram before their opponent. In **scrambled** the aim is for the user to solve as many anagrams as they can, so the timer element is replaced with a system of lives. This allows the user more thinking time and makes the game more open-ended: players could potentially play indefinitely, as long as they keep correctly guessing the anagrams. The limited number of lives keeps a degree of challenge - players must be careful with their guesses.

The conundrum round exclusively features 9-letter anagrams. To make **scrambled** accessible to a wide range of users, the user will be able to select the length of anagram they want to solve, either 5-, 6-, or 7-letter words. There will also be the option to shuffle the order of the letters to provide a fresh perspective on the anagram. The player can to do this as many times as they like.

In Countdown, the 'Dictionary Corner' feature gives information about discovered words. **scrambled** will also feature a short definition of words, once they have been unscrambled or revealed. This adds an informative/educational aspect to the game; users can develop their vocabulary while playing the game.

[Back to contents](#contents)

## User stories

As a player of the game, I want:
1. To find out how to play the game
2. To navigate easily around the game
3. To have clear feedback on my guesses
4. To clearly see how many lives I have remaining
5. To be able to shuffle the letters of the anagram
6. To be able to end the game at any stage
7. To have helpful feedback on my guesses
8. To be protected from accidentally ending the game by clicking on links or the end game button
9. To receive a summary of each game
10. To have a running total of the words I have solved
11. To know more about each unscrambled word


[Back to contents](#contents)


## Site Structure

The site is structured in one page with three iterations:

[*Home*](index.html)
- The landing page contains the title, a brief description, links to instructions and information about the game, and a button to start a new game.

[*Gameplay*](gameplay.html)
- The main gameplay page
- displays when users click on 'new game' button on home page
- Displays the anagram
- user interaction panel - guess input, buttons for shuffle, reveal/next word and end game
- feedback panel - displays messages to user, including information about unscrambled words

[*Game over*](game-over.html)
- Displays a summary of the game just played
- navigated to once user confirms end game, or the last life is lost
- contains the new game button which navigates back to the gameplay page


[Back to contents](#contents)

## Wireframes

The following wireframes were created in [Balsamiq](https://balsamiq.com/) and include responsive design ideas for Laptop, Tablet and Mobile devices. 

**Home page**

![Home](assets/readme-images/home.png "Opens Home page wireframe as png")  

**Gameplay page**

![Gameplay](assets/readme-images/gameplay.png "Opens Gameplay page wireframe as png")

**Game over page**

![Game over](assets/readme-images/game-over.png "Opens Game over page wireframe as png")


[Back to contents](#contents)


## Design choices

**Typography**

Gabarito font, from Google Fonts, is used throughout. It's a fun, bold font which gives a lighthearted feel, and it also scales well to display the main anagram in capitals. The font defaults to sans serif.

**Icons**

Heart icons from [FontAwesome](https://fontawesome.com/) are used to show the number of lives remaining (solid and outlines).

[Back to contents](#contents)

**Colours**

The colour scheme was chosen to give a high contrast and clean effect with splashes of colour for icons and buttons.

![Colour palette](/assets/readme-images/palette.png)

**Styling**

- The aim is to make the page as intuitive to use as possible, and to keep the main gameplay buttons and features clearly organised. On tablet and laptop viewports, user input features will be kept on the left of the screen and feedback will be on the right. On mobile devices, the user input and buttons will be just below the displayed word, and feedback below.


[Back to contents](#contents)


## 2. Features

The site is intended to be easy to navigate around and intuitive to use. Common layout, terminology and icons are used to help the user find their way around easily, and high contrast between font and background has been used to make the text immediately clear.

## Existing Features

### Title and gameplay instructions

[Back to contents](#contents)

### Landing page

[Back to contents](#contents)

### Gameplay page

### User input section

### Feedback section

### Game over page

[Back to contents](#contents)

## Future features

- Hint function
- User selects difficulty setting
- Option for timed game
- Limit the number of words
- Resolve situation where anagrams have more than one solution

[Back to contents](#contents)

## 3. Technology used

- The wireframes were created using [Balsamiq](https://balsamiq.com/)
- The structure of the site was written in [HTML5](https://html.spec.whatwg.org/)
- The site was styled using [CSS](https://www.w3.org/Style/CSS/Overview.en.html)
- JavaScript
- The site was developed in [Gitpod](https://www.gitpod.io/) using a Github template from [Code Institute](https://github.com/Code-Institute-Org/ci-full-template)
- [Github](https://github.com/) was used for version control and for hosting
- [Google Chrome Developer Tools](https://developer.chrome.com/docs/devtools) were used throughout development and for testing
- Logo was edited using [Adobe Express](https://www.adobe.com/express/feature/image/remove-background)
- Responsive screenshots created with [Am I Responsive](https://ui.dev/amiresponsive)

[Back to contents](#contents)

## 4. Testing

For full testing details, including code validation, bugs, user story tests and developer tools tests, please see the separate [Testing](/TESTING.md) document.


## 5. Deployment

### To deploy the project on Github Pages

  1. In the GitHub repository, go to Settings.
  2. In Settings, navigate to the Pages tab on the left hand side.
  3. Under Source, select the branch to master, then click save.
  4. Once the master branch has been selected, the page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment.

  ![Github deploy](/assets/readme-images/github-deploy.jpg)

  The live link to the repository can be found [here](...)


  ### To fork the repository on Github

A copy of the GitHub Repository can be made by forking the GitHub account. This copy can be viewed and changes can be made to the copy without affecting the original repository. Take the following steps to fork the repository:

1. Log in to GitHub and locate the repository.
2. On the right hand side of the page inline with the repository name is a button called 'Fork'. Click on the button to create a copy of the original repository in your GitHub Account.

![Github fork](/assets/readme-images/github-fork.jpg)

### To clone the project

1. Under the repository’s name, click on the code tab.
2. In the 'Clone with HTTPS' section, click on the clipboard icon to copy the given URL.
3. In your IDE, open Git Bash.
4. Change the current working directory to the location where you want the cloned directory to be made.
5. Type 'git clone', and then paste the URL copied from GitHub.
6. Press enter and the local clone will be created.

![Github clone](/assets/readme-images/github-clone.jpg)

[Back to contents](#contents)

## 6. Credits

### Code

- Code for random sort function from James Bubb on [Dev Community](https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj)
- Code for modals developed from [Bootstrap] documentation
- Code for inserting Abort Controllers to API from ianstormtaylor on [Github](https://github.com/whatwg/fetch/issues/951)

### Content

- Fonts from [Google Fonts](https://fonts.google.com/)
- Icons from [FontAwesome](https://fontawesome.com/)
- Colour palette created with [Coolors](https://coolors.co/)
- Logo image created by <a href="https://www.vecteezy.com/free-vector/tangle">Tangle Vectors by Vecteezy</a> Svitlana Panteley

### Media

- Loading gif from [Tenor](https://tenor.com/view/loading-loader-animation-transparent-gif-22551485)

[Back to contents](#contents)

## 7. Acknowledgements

This game was developed as my second Milestone Project for the Full Stack Software Developer Diploma at Code Institute. I would like to thank my mentor, [Precious Ijege](https://www.linkedin.com/in/precious-ijege-908a00168/), and all at Code Institute for their help and support.

Mark Sambell 2024

[Back to contents](#contents)
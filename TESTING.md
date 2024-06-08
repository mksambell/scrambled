# Testing

# Contents

- [Code validation](#code-validation)
- [Navigation links](#navigation-links)
- [Responsive test](#responsive-test)
- [Browser compatibility](#browser-compatibility)
- [Testing user stories](#testing-user-stories)
- [Bugs](#bugs)
    - [Resolved](#resolved)
    - [Unresolved](#unresolved)
- [Additional tests](#additional-tests)
    - [Lighthouse](#lighthouse)

## Code validation

**scrambled** has been thoroughly tested. 

The HTML code has been validated by the W3C [W3C HTML Validator](https://validator.w3.org/). Some minor errors were identified and have been fixed and retested (see [Bugs: Resolved](#resolved)). All pages now display the following message:

![html ok](/assets/testing-images/html-ok.png)

The CSS has been validated with [W3C CSS Validator](https://jigsaw.w3.org/css-validator/) and no errors or warnings were found. The validator displays the following message:

![css ok](/assets/testing-images/css-ok.png)

The JavaScript has been validated by [JSHint]

[Back to top](#contents)

## Navigation

All links and modals have been manually tested by the developer. All work as intended, including confirmation popups to prevent user accidentally ending game or revealing word. Links to the API developer sites and to the Merriam-Webster dictionary open in new tabs.

## Responsive test

The responsiveness of the site was tested using [Google Chrome DevTools](https://developer.chrome.com/docs/devtools).

| iPhone SE  | Galaxy TabS4 | iPhone 14 Pro | iPad Air | iPad Pro | Display <1200px | Display >1200px |
|------------|--------------|---------------|----------|----------|-----------------|-----------------|
| pass       | pass         | pass          | pass     | pass     | pass            | pass            |


Pages displayed as expected at the breakpoints indicated in the CSS stylesheet.


[Back to top](#contents)

## Browser compatibility

The site was tested manually in the following broswers:
- Google Chrome
- Microsoft Edge
- Safari
- Mozilla Firefox

The site functioned as expected on all browsers, in a range of device sizes; functionality, responsiveness and appearance worked as expected. 


[Back to top](#contents)

## Testing user stories

1. To find out how to play the game
    - The 'how to play' link is always located at the top of the viewport (on the right on larger screens, and centrally underneath the title on mobile devices).
    - The link opens a modal with clear and concise gameplay instructions

2. To navigate easily around the game
    - All content is contained on one page
    - Buttons that move the user through the game - new, start, end game and game summary - are styled prominently and located in the same place throughout
    - Interactions that interrupt the game require confirmation by the user
    - External links open in new tabs

3. To have clear feedback on my guesses
    - The feedback section always gives a response to a user guess:
        - If correct, the user is given a short definition of the word
        - If incorrect, the user is encouraged to try again (they are prevented from entering the same incorrect answer twice)
        - If invalid, no lives are lost, and the user is invited to try again

4. To clearly see how many lives I have remaining
    - Lives are clearly displayed in the user input section
    - Remaining lives are shown with a solid heart icon; lost lives are shown with a heart outline

5. To be able to shuffle the letters of the anagram
    - The shuffle button is located in the user input section.
    - It can be used as many times as the user likes.
    - The shuffle button will not accidentally display the actual word

6. To be able to end the game at any stage
    - Once the game has been started, the end game button is displayed below the gameplay panels
    - Users are asked for confirmation if they click on the button, to prevent accidentally leaving the game early.
    - The title-logo at the top also provides a link back to the landing page. Again, this requires confirmation to proceed.

7. To have helpful feedback if I make an input error
    - The feedback section displays appropriate feedback if a user enters an invalid guess:
        - If the guess is too short or too long
        - If it has already been guessed
        - If it does not contain the letters of the anagram
        - If there is no guess present
    - If the user inputs an invalid guess, no lives are lost

8. To be protected from accidentally ending the game
    - Confirmation is required in a popup if the user clicks on the end game button or on the title-logo link

9. To receive a summary of each game
    - Once the game is over, a game summary is presented with a list of solved and unsolved words

10. To have a running total of the words I have solved
    - The score of successfully unscrambled words is displayed in the user input section

11. To know more about each unscrambled word
    - Once a word is unscrambled, a short definition, from the Merriam-Webster dictionary, is displayed in the feedback section
    - If the dictionary does not contain a short defintion of the word, a link to the dictionary is displayed and a message encouraging the user to look up the word manually.

[Back to top](#contents)

## Bugs

### Resolved

During validation, two minor errors were identified:

1. Footer - copyright character in footer not closed with semicolon

![Bug 1](/assets/readme-images/bug1.jpg)

2. Footer - duplicate ID - an oversight in development - footer-media-link now declared as a class and relevant CSS amended

![Bug 2](/assets/readme-images/bug2.jpg)

### Unresolved

- The contact form, though acting as expected, does not yet post anywhere. This is something that would need to be addressed before going live.
- The embedded Youtube videos in the Media section significantly effect the load time of the Music page. A potential fix is to use a custom element that loads first, and allows the video to be called when requested. See [Future improvements](#future-improvements) below for a link to an example.

[Back to top](#contents)

## Additional tests

### Lighthouse

The site was tested with [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview), one of Google Chrome's developer tools.

The initial test of the home page for mobile device, gave the following result:

![Lighthouse Test 1](/assets/readme-images/lighthhouse-test1.jpg)

Performance was slow, and well outside of the desired load time for good user experience (about 2.5 seconds).

To address this:
- Images were resized and compressed
- Custom CSS stylesheet was checked and refined to remove any unnecessary or unused code
- Call to Google Fonts CDN was refined to ensure that only the fonts used were requested
- Font Awesome script tag was moved from the head to the end of the body
- A local version of the Bootstrap CSS, with irrelevant style rules removed, was saved to the assets folder

After these changes, performance was significantly improved:

![Lighthouse Test 2](/assets/readme-images/lighthhouse-test2.jpg)

As suggested by Lighthouse, the following further changes were made:

- Converting background image from jpeg to webp format, reducing file size by a further 75%
- Adding meta descriptions to improve SEO

After these changes, performance and SEO were much improved.

![Lighthouse Test 3](/assets/readme-images/lighthhouse-test3.jpg)

Following these successful changes, all images across the site have been converted to webp format using [Pixelied](https://pixelied.com/convert/jpg-converter/jpg-to-webp) and meta descriptions have been added to all pages.

#### Future Improvements

As suggested by the Lighthouse tests, further site improvements could include:
- Minifying CSS and JS
- Compressing CSS
- Eliminating elements that block the initial render
- Use of a custom element to improve the load time of the Youtube videos, for example [Lite Youtube Embed](https://github.com/paulirish/lite-youtube-embed/blob/master/readme.md)

[Back to top](#contents)

Return to [Readme](/README.md#4-testing)
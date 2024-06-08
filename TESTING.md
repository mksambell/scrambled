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

![html ok](/assets/readme-images/html-ok.jpg)

The CSS has been validated with [W3C CSS Validator](https://jigsaw.w3.org/css-validator/validator) and no errors or warnings were found. The validator displays the following message:

![css ok](/assets/readme-images/css-ok.jpg)

The JavaScript has been validated by [JSHint]

[Back to top](#contents)

## Navigation

All links and modals have been manually tested by the developer. All work as intended, including confirmation popups to prevent user accidentally ending game or revealing word. Links to the API developer sites and to the Merriam-Webster dictionary open in new tabs.

## Responsive test

The responsiveness of the site was tested using [Google Chrome DevTools](https://developer.chrome.com/docs/devtools).

| iPhone XR  | Galaxy TabS4 | iPhone 14 Pro | iPad Air | iPad Pro | Display <1200px | Display >1200px |
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

1. To find out basic information about the band
    - On the About page there is a brief description of the band, including an invitation and link to the band's facebook page.
    - Links to facebook and youtube are located on navbar, footer and in the About and Music pages.
    - Invitations and links to contact details and form are located in the footer and on Home, About and Music pages.

2. To hear/watch examples of the band's performances
    - Links to Youtube clips are included on the Music page.
    - Links to facebook and youtube are located on navbar, footer and in the About and Music pages. Users are invited to explore these sites for more examples on the About and Music pages.

3. To find out about the range of musical services they offer
    - The About text describes the types of event the band play for.
    - The Repertoire section on the Music page describes the songs and styles of music the band performs.

4. To read testimonials about the band's performances from other clients
    - The Testimonials page contains a selection of brief client reviews.
    - The About and Music pages also contain a brief testimonial as a sidebar

5. To be able to get in touch easily to make an enquiry
    - Contact information is displayed prominently on the landing page, including a link to the enquiry form on the contact page
    - The footer contains the same contact details
    - An additional inline link to the contact page is included on the Repertoire section

6. To see images of the band's appearance
    - The gallery page contains a range of pictures of the band in performance at various venues and events
    - The background images used on Home and Testimonials page are also shots of the band in action
    - There are additional pictures shown on the About and Music pages as sidebars

7. To know that the band will be friendly and easy to deal with
    - The tone used throughout is intended to be friendly and welcoming.
    - The FAQ section aims to anticipate user questions and invites further contact for a friendly chat
    - The images used show the band smiling and enjoying performing
    - The straightforward structure and functionality of the site emphasises ease of use/access for the user

8. To find out about the band's repertoire and the styles of music they perform
    - The Repertoire section details the songs and styles the band commonly performs
    - The videos used are compilations of previous performances and show a range of songs and styles.

9. To find my way easily around the site
    - The navigation menu is fixed at the top of the screen
    - Active pages are highlighted in bold in the navigation menu
    - Links change to red when hovered over
    - Site structure is uncomplicated - all pages are accessible directly from the Home page
    - Social media links open in new tabs, retaining the user's presence on the Hot Gin Swing site

10. To know how to connect with the band on social media
    - Social media links are located in the Navigation menu at laptop screen size and above, and in the footer at all sizes
    - The About page has a link to the band's facebook page
    - The Music page has a link to the band's Youtube channel

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
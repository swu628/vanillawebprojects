# Breakout game


## Introduction

I have chosen to fork bradtraversy's 'vanillawebprojects' repository on GitHub, a compilation showcasing a variety of mini-projects written in JavaScript, HTML, and CSS. Within this assortment of 20 mini-projects, my attention was drawn to the breakout game. A game where the players can control a paddle using arrow keys to launch a ball upwards, aiming to break the bricks. Initially, upon visiting the website, the game commences automatically, and should the ball touch the ground, it restarts without user intervention. After evaluating its original features, I pinpointed and executed several targeted, minor yet impactful enhancements.


## Documentations for users and future developers
### User documentation: Steps to Clone and Run:
1. Clone the Repository: Clone the repository to your local machine using Git.
```bash
git clone https://github.com/autodistill/autodistill.git
```
2. Open `index.html`: Navigate to the cloned repository's directory and open the `index.html` file in a web browser.

### Developer documentation: New Features

<strong>Start/restart the game</strong>

The start/restart feature has been refined to enhance player control over the game's initiation and replayability. This update ensures that the game does not automatically start or restart, allowing players to prepare and choose when to begin or try again. This improvement is crucial for creating a more user-friendly and engaging gaming experience.
- The `isGameActive` variable notes the active state of the game to prevent auto-playing.
- The `showEndGameModal` function is called when the game ends, either because the player has won or lost. It displays a modal with a corresponding message and plays a sound effect to reflect the game's outcome. Additionally, it makes the difficulty selection visible for the next game.
- The `resetGame` function is responsible for resetting the game's state, including the score, ball position, and bricks. It also hides the difficulty selection UI element and starts the game loop.


<strong>Shortcut</strong>

The addition of a keyboard shortcut feature enhances the game's accessibility and user experience by allowing players to start or restart the game using the keyboard, eliminating the need for mouse interaction for this action. This feature is particularly beneficial for users who prefer or require keyboard navigation, adhering to accessibility best practices.
- The `keyDown` function listens for keydown events and performs actions based on the key pressed. I have modified the function so that it provides functionality to start the game by pressing the 'Enter' key if the game is not currently active.
- The `toggleGameStartRestart` function is responsible for starting the game if it's not already active or restarting it if it has ended. It is invoked when the 'Enter' key is pressed, provided the game is not in an active state.


<strong>UI enhancements</strong>

The user interface of the game has undergone significant enhancements to elevate the visual appeal and user experience. The changes brlow aim to create a more immersive and engaging environment for players. These changes implemented through modifications to the `style.css` and `index.html` files.
- Color Scheme and Font Family: The original UI featured a sky-blue background paired with a classic font family, contributing to a clean but simplistic aesthetic. The updated UI introduces another color palette and a gaming-oriented font family (Press Start 2P) imported from [Google Fonts](https://fonts.google.com/). 
- Enlargement: To improve readability and interaction, the sizes of text elements and buttons have been increased. This adjustment not only enhances the visual impact of the UI but also makes navigation and gameplay more accessible.
- Transitions: UI elements, including buttons and tooltips, now feature transitions to provide visual feedback and a sense of interactivity.

<strong>Sound Effects</strong>

The game has been enhanced with various sound effects to improve player immersion and feedback. These effects include sounds for ball collisions with bricks, the paddle, and game events such as game over and winning the game.
- Sound effects are implemented using HTML `<audio>` elements and controlled via JavaScript.
- Each sound effect has its corresponding `<audio>` element with a unique `id` for easy reference in the script.
- The `playBrickHitSound` function is designed to handle the playback of the brick hit sound effect every time a collision between the ball and a brick is detected. It ensures that the sound can be played repeatedly in quick succession, even if the sound is still playing from a previous hit. This is useful for scenarios where multiple bricks are hit in rapid succession.

To add new sound effects:
1. Place the sound file in the appropriate directory (`/sounds`).
2. Add an `<audio>` element to the HTML with a unique `id` and the path to the sound file.
3. Use the unqiue `id` to retrieves the audio element by its ID to play the sound at the desired moment.


<strong>Difficulty Levels</strong>

The game now includes three difficulty levels: Easy, Medium, and Hard. These levels adjust the number of brick rows to 2, 5, and 7, respectively (with 5 being the default), making the game more challenging as the difficulty increases.
- The difficulty setting affects the `brickRowCount` variable, which in turn determines how many rows of bricks are generated.
- The `setDifficulty` function handles the change in difficulty from the user's input.


<strong>Tooltips</strong>

Tooltips enhance user experience by offering contextual information, making web applications more intuitive. 
- The tooltip's appearance and position are controlled via CSS. The `.tooltiptext` class is initially hidden and is made visible on hover of the `.tooltip` container.

## Time sheet
| Date | Task Description | Hours Spent | Notes |
|:---:|:---:|:---:|:---:|
| 03/14 | Researching open-source projects | 1.5hrs | Explored GitHub for a suitable project to work with. | 
| 03/15 | Identifying potential improvements for the breakout game | 30mins | Listed possible enhancements for the breakout game. | 
| 03/15 | Designing UI improvements | 1hr | Drafted new layout concepts, including color schemes and font styles. | 
| 03/16 | Fork and clone the breakout game repository | 5mins | Setup local development environment. |  
| 03/16 | Implementing start/restart the game feature | 20mins | Modified the game to prevent automatic start/restart, enhancing player readiness. | 
| 03/16 | Implementing shortcut feature | 20mins | Enabled game start/restart using the 'Enter' key. Fixed the issue of 'Enter' key is pressed but the button is still visible. | 
| 03/16 | Resolving early reset of bricks and score | 20mins | Adjusted game logic to reset only upon player's decision to restart, improving game flow. | 
| 03/16 | UI implementation | 1hr | Refined UI layout, color scheme, and font style, including but not limited to enlarging text and buttons for better visibility. | 
| 03/16 | Add sound effects for the ball hitting the paddle, bricks, as well as sounds to signify winning or losing | 1hr | Searched for suitable free sound effectsonline to enhance gaming experience for players. Used [pixabay](https://pixabay.com/); initially considered [Artlist](https://artlist.io/sfx?utm_source=google&utm_medium=cpc&utm_campaign=13681196598&utm_content=133504767513&utm_term=free%20sound%20effects&keyword=free%20sound%20effects&ad=573775600507&matchtype=e&device=c&gad_source=1&gclid=EAIaIQobChMIr7Xv1KX7hAMV4-0WBR0LgAKcEAAYASAAEgL6HvD_BwE) but some sound effects are only available to their subscribers. | 
| 03/16 | Fixing multiple bricks hit sound effect issue | 20mins | Modified sound logic to allow immediate replay for consecutive brick hits. | 
| 03/17 | Implementing difficulty level selector | 1hr | Fixed brick count not updating with difficulty level change. | 
| 03/17 | Implementing tooltips | 40mins | Added tooltips with fade-in effects for enhanced UI clarity, ensuring text fits within the tooltip box. | 
| 03/17 | Fixed visibility of selector during the game | 30mins | Adjusted game logic to hide the difficulty selector during gameplay, this is aim to remove unnecessary distractions. | 
| 03/17 | Enhancing game canvas appearance | 10mins | Made the game canvas initially invisible to improve the initial user interface. | 
| 03/17-18 | Writing README.md file | 3hrs | Created user and developer documentations. Documented the time Sheet. Wrote the critical assessment of breakout game project. | 

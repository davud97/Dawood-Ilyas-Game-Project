# Shoot The Bird
### https://huntbird.surge.sh/
## Wireframe
![Home Page of the game](/images/home_page.png)

![Game Page](/images/Game%20Page.png)
Create a game that will test your skills with DOM manipulation, event listeners and applying conditional game logic.
## Initial phase
First of all
I i have written very basic HTML for my main page and game page. secondly i created very basic CSS so that i could made my js script working fine.
### HTML
* The timer starts at 20 seconds when the game begins.
* Use your target cursor to aim and hit the bird.
* Each successful hit gives you +10 points.
* When time runs out, your best score is saved (if it’s higher than before).
* You can replay the game to try and beat your best score.

### CSS
The CSS file (style.css) defines the layout and appearance of all game elements. It controls the visuals of the background, scoreboard, bird, and custom target. The .target class uses the property pointer-events: none; to ensure that the player can click the bird even when the target image overlaps it. The CSS also applies smooth transitions and animations to make the game more engaging.
### JS
The JavaScript file (script.js) contains all the game logic. It moves the target image based on mouse movement, randomly repositions the bird at set intervals, and detects hits when the player clicks on the bird. When a hit occurs, a blood effect appears briefly, and the score increases by 10 points. The game includes a timer of 20 seconds per round, after which the level automatically increases. Each new level reduces the bird’s movement interval, making it faster and more challenging. The player’s best score is tracked within each level, and the game resets when all levels are completed.


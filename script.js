const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;
let isGameActive = false; // Stop the game from auto playing
let brickRowCount;

const brickColumnCount = 9;
const delay = 500; //delay to reset the game

// Create ball props
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
  visible: true
};

// Create paddle props
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
  visible: true
};

// Create brick props
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true
};

// Create bricks
function initializeBricks() {
  bricks = [];
  for (let i = 0; i < brickColumnCount; i++) {
    bricks[i] = [];
    for (let j = 0; j < brickRowCount; j++) {
      const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
      const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
      bricks[i][j] = { x, y, ...brickInfo };
    }
  }
}

// Draw ball on canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = ball.visible ? '#0095dd' : 'transparent';
  ctx.fill();
  ctx.closePath();
}

// Draw paddle on canvas
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = paddle.visible ? '#0095dd' : 'transparent';
  ctx.fill();
  ctx.closePath();
}

// Draw score on canvas
function drawScore() {
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

// Draw bricks on canvas
function drawBricks() {
  bricks.forEach(column => {
    column.forEach(brick => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
      ctx.fill();
      ctx.closePath();
    });
  });
}

// Move paddle on canvas
function movePaddle() {
  paddle.x += paddle.dx;

  // Wall detection
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
    }
}

// Move ball on canvas
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Wall collision (right/left)
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1; // ball.dx = ball.dx * -1
  }

  // Wall collision (top/bottom)
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  // console.log(ball.x, ball.y);

  // Paddle collision
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
    
    // Play the paddle hit sound
    document.getElementById('paddleHitSound').play();
  }

  // Brick collision
  bricks.forEach(column => {
    column.forEach(brick => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x && // left brick side check
          ball.x + ball.size < brick.x + brick.w && // right brick side check
          ball.y + ball.size > brick.y && // top brick side check
          ball.y - ball.size < brick.y + brick.h // bottom brick side check
        ) {
          ball.dy *= -1;
          brick.visible = false;

          // Play the brick hit sound
          playBrickHitSound();

          // Increase the score when a brick is hitted
          increaseScore();
        }
      }
    });
  });

  // Hit bottom wall - Lose
  if (ball.y + ball.size > canvas.height) {
    isGameActive = false; // Stop the game loop
    showEndGameModal(false); // Show game over message
  }
}

// Plays a sound effect when the ball hits the brick
function playBrickHitSound() {
  var sound = document.getElementById('brickHitSound');
  if (sound.paused) {
      sound.play();
  } else {
     // Reset playback position to the start so that when multiple bricks hitted the sound effect will play multiple times
      sound.currentTime = 0;
  }
}

// Increase score
function increaseScore() {
  score++;

  if (score % (brickColumnCount * brickRowCount) === 0) {
    isGameActive = false; // Stop the game loop
    showEndGameModal(true); // Show win message
  }
}

// Draw everything
function draw() {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

// Update canvas drawing and animation
function update() {
  if (!isGameActive) {
    return; // Stop the game loop if the game is not active
  }

  movePaddle();
  moveBall();

  // Draw everything
  draw();

  requestAnimationFrame(update);
}

// Keydown event
function keyDown(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.dx = paddle.speed;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed;
  } else if (e.key === 'Enter' && isGameActive == false) { // Press enter to play the game
    toggleGameStartRestart();
  }
}

// Keyup event
function keyUp(e) {
  if (
    e.key === 'Right' ||
    e.key === 'ArrowRight' ||
    e.key === 'Left' ||
    e.key === 'ArrowLeft'
  ) {
    paddle.dx = 0;
  }
}

// Show result to the user
function showEndGameModal(win) {
  const gameEndModal = document.getElementById('gameEndModal');
  const gameEndMessage = document.getElementById('gameEndMessage');
  // Play winning/losing message and sound effect
  if (win) {
    gameEndMessage.textContent = "Congratulations! You won!";
    document.getElementById('successSound').play();
  } else {
    gameEndMessage.textContent = "Game Over! Try again?";
    document.getElementById('loseSound').play();
  }
  showDifficultySelection();
  gameEndModal.style.display = "block";
}

// Toggle game start/restart
function toggleGameStartRestart() {
  if (!isGameActive) {
    // If the game is not active, start the game
    isGameActive = true;

    document.getElementById('canvas').style.display = 'block'; // Make the canvas visible

    const selectedDifficulty = document.querySelector('input[name="difficulty"]:checked').value;
    setDifficulty(selectedDifficulty);

    // Hide the start button if visible
    document.getElementById('startGameBtn').style.display = 'none';
      
    // Hide the game end modal if it's visible
    const gameEndModal = document.getElementById('gameEndModal');
    if (gameEndModal) {
      gameEndModal.style.display = 'none';
    }
    resetGame(); // Start or restart the game loop
  }
}

function resetGame() {
  // Show gaming cavas and reset game state (score, ball position and bricks)
  document.getElementById('canvas').style.display = 'block'; 
  score = 0;
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = 4;
  ball.dy = -4;
  paddle.x = canvas.width / 2 - 40;
  paddle.y = canvas.height - 20;
  initializeBricks();
  hideDifficultySelection();
  isGameActive = true;
  update(); // Start the game loop again
}

// Set the difficulty level
function setDifficulty(difficulty) {
  switch (difficulty) {
    case 'easy':
      brickRowCount = 3;
      break;
    case 'medium':
      brickRowCount = 5;
      break;
    case 'hard':
      brickRowCount = 7;
      break;
    default:
      brickRowCount = 5; // Fallback to medium
  }
}

// This function hides the selector
function hideDifficultySelection() {
  const difficultySelector = document.getElementById('difficulty');
  difficultySelector.classList.add('hidden'); 
  difficultySelector.classList.remove('tooltip'); 
}

// This function make the selector visible
function showDifficultySelection() {
  const difficultySelector = document.getElementById('difficulty');
  difficultySelector.classList.remove('hidden');
  difficultySelector.classList.add('tooltip');
}

// Keyboard event handlers
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

// Start the game
document.getElementById('startGameBtn').addEventListener('click', function() {
  // Determine selected difficulty
  const selectedDifficulty = document.querySelector('input[name="difficulty"]:checked').value;
  setDifficulty(selectedDifficulty);
  this.style.display = 'none'; // Hide the start button
  resetGame();
});

// Restart the game 
document.getElementById('playAgainBtn').addEventListener('click', function() {
  const gameEndModal = document.getElementById('gameEndModal');
  const selectedDifficulty = document.querySelector('input[name="difficulty"]:checked').value;
  setDifficulty(selectedDifficulty);
  gameEndModal.style.display = "none"; // Hide the play again button
  resetGame(); // Reset the game to its initial state
});

// Rules and close event handlers
rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));

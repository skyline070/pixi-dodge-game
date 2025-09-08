import { hitTestRectangle } from "./utils.js";

// Main game loop function
export function startGameLoop(
  app, player, gameArea, trailLayer, redBlocks,
  scoreText, gameOverText, spawnInterval, restartCallback,
  restartText
) {
  const GAME_WIDTH = 700;
  const moveSpeed = 7; // Player movement speed
  const keys = {};
  let gameOverFlag = false;

  // ===== Key Press Handlers =====
  window.addEventListener("keydown", (e) => {
    keys[e.code] = true;

    // If game over and Enter is pressed, restart
    if (gameOverFlag && e.code === "Enter") {
      gameOverFlag = false;
      restartText.visible = false; // Hide restart instruction
      restartCallback();           // Restart game
    }
  });

  window.addEventListener("keyup", (e) => (keys[e.code] = false));

  // ===== Game Over Function =====
  function gameOver() {
    clearInterval(spawnInterval);   // Stop red block spawning
    gameOverText.visible = true;    // Show Game Over text
    restartText.visible = true;     // Show Restart instruction
    gameOverFlag = true;            // Stop game loop logic
  }

  // ===== Ticker Function =====
  const tickerFunc = () => {
    if (gameOverFlag) return; // Pause updates on game over

    // Move player
    if (keys["ArrowLeft"]) player.x -= moveSpeed;
    if (keys["ArrowRight"]) player.x += moveSpeed;

    // Clamp player inside game area
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > GAME_WIDTH) player.x = GAME_WIDTH - player.width;

    // Clear previous trails
    trailLayer.clear();

    // Update red blocks
    for (let i = redBlocks.length - 1; i >= 0; i--) {
      const block = redBlocks[i];

      // Draw block trail
      block.trail.forEach((pos, index) => {
        const alpha = (index + 1) / block.trail.length;
        trailLayer.beginFill(block.fillColor, alpha * 0.5);
        trailLayer.drawRect(pos.x, pos.y, 20, 20);
        trailLayer.endFill();
      });

      // Move block down
      block.y += block.speed;

      // Store position for trail
      block.trail.push({ x: block.x, y: block.y });
      if (block.trail.length > block.maxTrail) block.trail.shift();

      // Stop block at player y
      if (block.y > player.y) block.y = player.y;

      // Collision detection
      if (hitTestRectangle(player, block)) gameOver();

      // Remove block if reached bottom safely
      if (block.y === player.y) {
        gameArea.removeChild(block);
        redBlocks.splice(i, 1);
        let score = parseInt(scoreText.text.split(": ")[1]) + 1;
        scoreText.text = `Score: ${score}`;
      }
    }
  };

  // Add ticker to PixiJS app
  app.ticker.add(tickerFunc);

  // Return ticker function reference for later removal on restart
  return tickerFunc;
}

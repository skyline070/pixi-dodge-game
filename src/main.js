import { Application, Text } from "pixi.js";
import { createGameArea } from "./gameArea.js";
import { createPlayer } from "./player.js";
import { startBlockSpawner } from "./redBlocks.js";
import { startGameLoop } from "./gameLoop.js";

(async () => {
  // ===== Initialize PixiJS app =====
  const app = new Application();
  await app.init({ background: 0xffffff, resizeTo: window });
  document.getElementById("pixi-container").appendChild(app.view);

  const GAME_WIDTH = 700;
  const GAME_HEIGHT = 500;

  // ===== Instructions Text =====
  const instructions = new Text("Use Left / Right arrow keys to move", {
    fontFamily: "Arial",
    fontSize: 20,
    fill: 0x000000,
  });
  instructions.x = (app.screen.width - instructions.width) / 2;
  instructions.y = 20;
  app.stage.addChild(instructions);

  // ===== Create Game Area =====
  const { gameArea, trailLayer } = createGameArea(app, GAME_WIDTH, GAME_HEIGHT);

  // ===== Player Block =====
  const player = createPlayer(gameArea, 110, 25);

  // ===== Score Text =====
  const scoreText = new Text("Score: 0", { fontFamily: "Arial", fontSize: 24, fill: 0x000000 });
  scoreText.x = gameArea.x - 140;
  scoreText.y = gameArea.y + 10;
  app.stage.addChild(scoreText);

  // ===== Game Over Text =====
  const gameOverText = new Text("GAME OVER", { fontFamily: "cursive", fontSize: 40, fill: 0xffffff });
  gameOverText.anchor.set(0.5);
  gameOverText.x = GAME_WIDTH / 2;
  gameOverText.y = GAME_HEIGHT / 2;
  gameOverText.visible = false;
  gameArea.addChild(gameOverText);

  // ===== Restart Instruction Text =====
  const restartText = new Text("Press Enter to Restart", { fontFamily: "Arial", fontSize: 24, fill: 0xff0000 });
  restartText.anchor.set(0.5);
  restartText.x = GAME_WIDTH / 2;
  restartText.y = GAME_HEIGHT / 2 + 60;
  restartText.visible = false;
  gameArea.addChild(restartText);

  let redBlocks = [];
  let spawnInterval;
  let appTicker; // Reference to current ticker

  function startGame() {
    // Reset player position
    player.x = GAME_WIDTH / 2 - 45;
    player.y = GAME_HEIGHT - 40;

    // Remove existing blocks
    redBlocks.forEach((b) => gameArea.removeChild(b));
    redBlocks = [];

    // Reset score
    scoreText.text = "Score: 0";

    // Hide Game Over & Restart text
    gameOverText.visible = false;
    restartText.visible = false;

    // Start spawning blocks
    spawnInterval = startBlockSpawner(gameArea, GAME_WIDTH, redBlocks);

    // Stop previous ticker if exists
    if (appTicker) app.ticker.remove(appTicker);

    // Start game loop and store ticker reference
    appTicker = startGameLoop(app, player, gameArea, trailLayer, redBlocks, scoreText, gameOverText, spawnInterval, startGame, restartText);
  }

  // Start the game on page load
  startGame();

})();

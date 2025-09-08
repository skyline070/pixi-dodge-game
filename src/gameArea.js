import { Container, Graphics } from "pixi.js";

export function createGameArea(app, GAME_WIDTH, GAME_HEIGHT) {
  const gameArea = new Container();

  const background = new Graphics();
  background.beginFill(0x000000);
  background.drawRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  background.endFill();
  gameArea.addChild(background);

  // Center the game area
  gameArea.x = (app.screen.width - GAME_WIDTH) / 2;
  gameArea.y = (app.screen.height - GAME_HEIGHT) / 2 + 40;

  const trailLayer = new Graphics();
  gameArea.addChild(trailLayer);
  app.stage.addChild(gameArea);

  // Store width/height for player/block reference
  gameArea.width = GAME_WIDTH;
  gameArea.height = GAME_HEIGHT;

  return { gameArea, trailLayer };
}

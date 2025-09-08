import { Graphics } from "pixi.js";

// Create player block
export function createPlayer(gameArea, width, height) { // bigger block
  const player = new Graphics();
  player.beginFill(0x00ff00);
  player.drawRect(0, 0, width, height);
  player.endFill();

  player.x = gameArea.width / 2 - width / 2;
  player.y = gameArea.height - 50; // slightly above bottom

  gameArea.addChild(player);
  return player;
}

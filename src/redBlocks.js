import { Graphics } from "pixi.js";

// Spawn red blocks fully within game area
export function startBlockSpawner(gameArea, GAME_WIDTH, redBlocks) {
  return setInterval(() => {
    const block = new Graphics();
    const speed = Math.random() * 3 + 2;

    // Color by speed
    let fillColor;
    if (speed > 4) fillColor = 0xff0000;
    else if (speed > 3) fillColor = 0xffa500;
    else fillColor = 0x0000ff;

    block.beginFill(fillColor);
    block.drawRect(0, 0, 25, 25);
    block.endFill();

    // Spawn fully inside game area
    block.x = Math.random() * (GAME_WIDTH - 20); // ensures block doesn't spawn outside
    block.y = -20; // start just above the game area

    block.speed = speed;
    block.fillColor = fillColor;
    block.trail = [];
    block.maxTrail = 5;

    redBlocks.push(block);
    gameArea.addChild(block);
  }, 1000);
}

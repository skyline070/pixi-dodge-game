# PixiJS Falling Blocks Game

A simple 2D falling blocks game built with **PixiJS v8** and **Vite**, where you control a green block to avoid falling red blocks. Features include score tracking, trail effects, and restart functionality.

---    
🌐 Live Demo
View Live on Vercel

https://pixi-dodge-game.vercel.app/

<img width="1326" height="828" alt="SS" src="https://github.com/user-attachments/assets/fa9ecea7-d66a-40f5-af99-ab532d1fdce1" />


## 🎮 Features

- **Player control:** Move the green block using **Left/Right arrow keys**  
- **Falling blocks:** Red, orange, and blue blocks fall at different speeds  
- **Score tracking:** Displays the current score on the left side  
- **Game Over:** Triggered when a red block hits the player  
- **Restart:** Press **Enter** to restart the game  
- **Trail effects:** Red blocks leave a fading trail  
- **Responsive game area:** 800×600, centered on the screen  

---

## 📂 Project Structure

pixi-game/
│ index.html
│ package.json
│ vite.config.js
│ style.css
│
├─ public/
│ └─ assets/
│ └─ bunny.png
│
└─ src/
├─ main.js
├─ gameLoop.js
├─ gameArea.js
├─ player.js
├─ redBlocks.js
└─ utils.js

yaml
Copy code

---

## ⚡ Technologies Used

- **[PixiJS v8](https://pixijs.com/)** – 2D WebGL rendering  
- **Vite** – Dev server and build tool  
- **JavaScript (ES6 Modules)** – Modular code organization  

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm

### Install Dependencies

```bash
npm install
Run Locally
bash
Copy code
npm run dev
Open your browser at http://localhost:5173.

Build for Production
bash
Copy code
npm run build
The production-ready files will be in the dist/ folder.

📝 Usage
Use Left / Right arrow keys to move the green block

Avoid falling red blocks

Score points for every block successfully avoided

If a block hits the player, GAME OVER appears

Press Enter to restart the game

📌 Notes
All static assets (e.g., images) should be placed in the public/assets/ folder

Adjust player size in main.js:

js
Copy code
const player = createPlayer(gameArea, 150, 30); // width, height
Adjust game area size in main.js:

js
Copy code
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

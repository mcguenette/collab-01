'use strict';

let playerState = 'idle';
const dropdown = selectById('animations');
onEvent('change', dropdown, function (e) {
  playerState = e.target.value;
});

// Utility functions
function onEvent(event, selector, callback) {
  return selector.addEventListener(event, callback);
}
function select(selector, parent = document) {
  return parent.querySelector(selector);
}
function selectById(selector, parent = document) {
  return parent.getElementById(selector);
}
function selectAll(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}
function create(element, parent = document) {
  return parent.createElement(element);
}
function print(...args) {
  console.log(args.join(', '));
}

// Main code
const canvas = selectById('canvas1');
const ctx = canvas.getContext('2d');
const spriteWidth = 32;
const spriteHeight = 32;
let gameFrame = 0;
const staggerFrames = 5; // animation speed
const spriteAnimations = [];
const animationStates = [
  {
    name: 'idle',
    frames: 4,
  },
];
animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations[state.name] = frames;
});
console.log(spriteAnimations);
// Fix distortion
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);
// Bring image
const ghostImage = new Image(); // Image constructor
ghostImage.src = './img/ghost-Sheet.png';

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let position =
    Math.floor(gameFrame / staggerFrames) %
    spriteAnimations[playerState].loc.length;
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;
  // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
  ctx.drawImage(
    ghostImage,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    CANVAS_WIDTH,
    CANVAS_HEIGHT
  );
  // if (gameFrame % staggerFrames === 0){
  // 	if (frameX < 3) {
  // 		frameX++;
  // 	} else {
  // 		frameX = 0;
  // 	}
  // }
  gameFrame++;
  requestAnimationFrame(animate);
}

animate();

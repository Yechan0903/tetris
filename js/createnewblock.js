const gameBox = document.querySelector("#game-box");
function updateLocalBlocks() {
  localStorage.setItem("blocks", JSON.stringify(blocks));
}
function updateNextLocalBlocks() {
  localStorage.setItem("nextBlocks", JSON.stringify(nextBlocks));
}
function shape(s, x, y) {
  const shapes = [
    [
      [x, y],
      [x, y - 1],
      [x, y + 1],
      [x, y + 2],
    ],
    [
      [x, y],
      [x, y - 1],
      [x + 1, y - 1],
      [x, y + 1],
    ],
    [
      [x, y],
      [x, y - 1],
      [x - 1, y - 1],
      [x, y + 1],
    ],
    [
      [x, y],
      [x + 1, y],
      [x + 1, y - 1],
      [x, y + 1],
    ],
    [
      [x, y],
      [x, y - 1],
      [x + 1, y],
      [x + 1, y + 1],
    ],
    [
      [x, y],
      [x + 1, y],
      [x + 1, y - 1],
      [x, y - 1],
    ],
    [
      [x, y],
      [x, y - 1],
      [x + 1, y],
      [x - 1, y],
    ],
  ];
  return shapes[s];
}
function setPosition(position) {
  let xx = position[0];
  let yy = position[1];
  xx = xx * 36;
  yy = yy * 36;
  return [xx, yy];
}
function setNextPosition(position) {
  let x = position[0];
  let y = position[1];
  x = x * 30 - 70;
  y = y * 30 + 20;
  return [x, y];
}
function paintBlock({ id, shapeNum, shape, x, y }) {
  for (let index = 0; index < shape.length; index++) {
    const div = document.createElement("div");
    div.classList.add("block");
    div.classList.add(`shape${shapeNum}`);
    div.id = `${id}-${index}`;
    xy = setPosition(shape[index]);
    div.style.top = `${xy[1]}px`;
    div.style.left = `${xy[0]}px`;
    gameBox.appendChild(div);
  }
}
function paintNextBlock({ id, shapeNum, shape }, num) {
  for (let index = 0; index < shape.length; index++) {
    const div = document.createElement("div");
    div.classList.add("nblock");
    div.classList.add(`shape${shapeNum}`);
    div.id = `${id}-${index}`;
    xy = setNextPosition(shape[index]);
    div.style.top = `${xy[1]}px`;
    div.style.left = `${xy[0]}px`;
    document.querySelector(`#next-block${num}`).appendChild(div);
  }
}
function createNewBlock() {
  const shapeNum = Math.floor(Math.random() * 7);
  const newShape = shape(shapeNum, 4, 1);
  const newBlock = {
    id: blocks.length + nextBlocks.length,
    shapeNum: shapeNum + 1,
    shape: newShape,
    x: 4,
    y: 1,
  };
  if (nextBlocks.length === 4) {
    for (let index = 0; index < 4; index++) {
      for (let i = 0; i < 4; i++) {
        document
          .querySelector(`#next-block${index + 1}`)
          .removeChild(document.querySelectorAll(`.nblock`)[0]);
      }
    }
    blocks.push(nextBlocks[0]);
    paintBlock(nextBlocks[0]);
    updateLocalBlocks();
    nextBlocks = [nextBlocks[1], nextBlocks[2], nextBlocks[3], newBlock];
    for (let index = 0; index < 4; index++) {
      paintNextBlock(nextBlocks[index], index + 1);
    }
    updateNextLocalBlocks();
  } else {
    nextBlocks.push(newBlock);
    paintNextBlock(newBlock, nextBlocks.length);
    updateNextLocalBlocks();
  }
  score = score + 4;

  updateScore();
}
let blocks = [];
let localState = localStorage.getItem("blocks");
if (localState) {
  blocks = JSON.parse(localState);
  let ho = [];
  let holdL = localStorage.getItem("holdedBlock");
  for (let index = 0; index < blocks.length; index++) {
    if (holdL) {
      ho = JSON.parse(holdL);
      if (blocks[index].id === ho[0].id) {
      } else {
        paintBlock(blocks[index]);
      }
    } else {
      paintBlock(blocks[index]);
    }
  }
}
let nextBlocks = [];
let nextLocalState = localStorage.getItem("nextBlocks");
if (nextLocalState) {
  nextBlocks = JSON.parse(nextLocalState);
  for (let index = 0; index < nextBlocks.length; index++) {
    paintNextBlock(nextBlocks[index], index + 1);
  }
} else {
  createNewBlock();
  createNewBlock();
  createNewBlock();
  createNewBlock();
  createNewBlock();
  score = 0;
  updateScore();
}

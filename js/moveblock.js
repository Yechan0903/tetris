function updateStopLocalBlocks() {
  localStorage.setItem("stopBlocks", JSON.stringify(stopBlocks));
}
function checkBlock() {
  let count = 0;
  let targetBlock = blocks[blocks.length - 1];
  for (let index = 0; index < 4; index++) {
    let newX = -(targetBlock.shape[index][1] - targetBlock.y) + targetBlock.x;
    let newY = targetBlock.shape[index][0] - targetBlock.x + targetBlock.y;
    if (stopBlocks.find((i) => i[0] === newX && i[1] === newY)) {
      count = count + 1;
    }
    if (newX === -1 || newX === 10 || newY === 20) {
      count = count + 1;
    }
  }
  return count;
}
function turn() {
  let targetBlock = blocks[blocks.length - 1];
  if (checkBlock() !== 0) {
    return;
  } else {
    for (let index = 0; index < 4; index++) {
      let newX = -(targetBlock.shape[index][1] - targetBlock.y) + targetBlock.x;
      let newY = targetBlock.shape[index][0] - targetBlock.x + targetBlock.y;
      targetBlock.shape[index][0] = newX;
      targetBlock.shape[index][1] = newY;
      let id = `${targetBlock.id}-${index}`;
      let X = document.getElementById(`${id}`).style.left;
      X = newX * 36;
      document.getElementById(`${id}`).style.left = `${X}px`;
      let Y = document.getElementById(`${id}`).style.top;
      Y = newY * 36;
      document.getElementById(`${id}`).style.top = `${Y}px`;
    }
  }
}
function checkBlockX({ id, shapeNum, shape, x, y }, n) {
  let count = 0;
  for (let index = 0; index < 4; index++) {
    if (
      stopBlocks.find(
        (i) => i[1] === shape[index][1] && i[0] === shape[index][0] + n
      )
    ) {
      count = count + 1;
    }
  }
  for (let index = 0; index < 4; index++) {
    if (n === -1) {
      if (shape[index][0] === 0) {
        count = count + 1;
      }
    }
    if (n === 1) {
      if (shape[index][0] === 9) {
        count = count + 1;
      }
    }
  }
  return count;
}
function moveX(n) {
  let targetBlock = blocks[blocks.length - 1];
  if (checkBlockX(targetBlock, n) !== 0) {
    return;
  } else {
    targetBlock.x = targetBlock.x + n;
    for (let index = 0; index < 4; index++) {
      targetBlock.shape[index][0] = targetBlock.shape[index][0] + n;
    }

    for (let index = 0; index < 4; index++) {
      let id = `${targetBlock.id}-${index}`;
      let X = document.getElementById(`${id}`).style.left;
      X = X.slice(0, -2);
      X = Number(X) + n * 36;
      document.getElementById(`${id}`).style.left = `${X}px`;
    }
  }
}
function checkBlockY({ id, shapeNum, shape, x, y }) {
  let count = 0;
  for (let index = 0; index < 4; index++) {
    if (
      stopBlocks.find(
        (i) => i[0] === shape[index][0] && i[1] === shape[index][1] + 1
      )
    ) {
      count = count + 1;
    }
  }
  for (let index = 0; index < 4; index++) {
    if (shape[index][1] === 19) {
      count = count + 1;
    }
  }
  return count;
}
function moveY(idd) {
  for (let index = 0; index < 4; index++) {
    let id = `${idd}-${index}`;
    let Y = document.getElementById(`${id}`).style.top;
    Y = Y.slice(0, -2);
    Y = Number(Y) + 36;
    document.getElementById(`${id}`).style.top = `${Y}px`;
  }
}
function deleteBlock() {
  let scoreCount = 0;
  for (let index = 19; index > -1; index--) {
    let tenBlock = stopBlocks.filter((i) => i[1] === index);
    if (tenBlock.length === 10) {
      scoreCount = scoreCount + 1;
      let newStopBlocks = [];
      let DB = stopBlocks.filter((i) => i[1] > index);
      let UP = stopBlocks
        .filter((i) => i[1] < index)
        .map((i) => (i = [i[0], i[1] + 1]));
      if (DB.length !== 0) {
        for (let i = 0; i < DB.length; i++) {
          newStopBlocks.push(DB[i]);
        }
      }
      if (UP.length !== 0) {
        for (let i = 0; i < UP.length; i++) {
          newStopBlocks.push(UP[i]);
        }
      }
      stopBlocks = newStopBlocks;
      for (let i = 0; i < blocks.length; i++) {
        let TB = blocks[i];
        if (holdedBlock.length === 1) {
          if (holdedBlock[0].id === TB.id) {
          } else {
            let TBS = TB.shape;
            for (let s = 0; s < TBS.length; s++) {
              if (TBS[s][1] === index) {
                TBS[s] = [-2, 20];
                gameBox.removeChild(document.getElementById(`${TB.id}-${s}`));
              }
              if (TBS[s][1] < index) {
                TBS[s] = [TBS[s][0], TBS[s][1] + 1];
                let id = `${TB.id}-${s}`;
                let Y = document.getElementById(`${id}`).style.top;
                Y = Y.slice(0, -2);
                Y = Number(Y) + 36;
                document.getElementById(`${id}`).style.top = `${Y}px`;
              }
            }
          }
        } else {
          let TBS = TB.shape;
          for (let s = 0; s < TBS.length; s++) {
            if (TBS[s][1] === index) {
              TBS[s] = [-2, 20];
              gameBox.removeChild(document.getElementById(`${TB.id}-${s}`));
            }
            if (TBS[s][1] < index) {
              TBS[s] = [TBS[s][0], TBS[s][1] + 1];
              let id = `${TB.id}-${s}`;
              console.log(id);
              let Y = document.getElementById(`${id}`).style.top;
              Y = Y.slice(0, -2);
              Y = Number(Y) + 36;
              document.getElementById(`${id}`).style.top = `${Y}px`;
            }
          }
        }
      }
      index = index + 1;
    }
  }
  updateStopLocalBlocks();
  updateLocalBlocks();
  score = score + scoreCount ** 2 * 40;
  updateScore();
}
function moveBlock() {
  let targetBlock = blocks[blocks.length - 1];
  if (!start) {
    return;
  }
  if (checkBlockY(targetBlock) !== 0) {
    for (let index = 0; index < 4; index++) {
      stopBlocks.push(targetBlock.shape[index]);
    }
    updateStopLocalBlocks();
    deleteBlock();
    if (stopBlocks.find((i) => i[1] === 0)) {
      alert("game over");
      blocks = [];
      nextBlocks = [];
      stopBlocks = [];
      holdedBlock = [];

      localStorage.removeItem("blocks");
      localStorage.removeItem("nextBlocks");
      localStorage.removeItem("stopBlocks");
      localStorage.removeItem("holdedBlock");
      start = false;
      return;
    }
    createNewBlock();
  } else {
    targetBlock.y = targetBlock.y + 1;
    for (let index = 0; index < 4; index++) {
      targetBlock.shape[index][1] = targetBlock.shape[index][1] + 1;
    }
    moveY(targetBlock.id);
    updateLocalBlocks();
  }
}
let stopBlocks = [];
let stopLocalState = localStorage.getItem("stopBlocks");
if (stopLocalState) {
  stopBlocks = JSON.parse(stopLocalState);
}
function fullDown() {
  let targetBlock = blocks[blocks.length - 1];
  if (checkBlockY(targetBlock) === 0) {
    for (let i = 0; i < 1; i) {
      targetBlock.y = targetBlock.y + 1;
      for (let index = 0; index < 4; index++) {
        targetBlock.shape[index][1] = targetBlock.shape[index][1] + 1;
      }
      moveY(targetBlock.id);
      updateLocalBlocks();
      if (checkBlockY(targetBlock) !== 0) {
        i = 1;
      }
    }
  }
}
let start = true;
let downKey = false;
function keydown(e) {
  if (e.key === " ") {
    fullDown();
  }
  if (e.key === "ArrowRight") {
    moveX(1);
  }
  if (e.key === "ArrowDown") {
    downKey = true;
  }
  if (e.key === "ArrowLeft") {
    moveX(-1);
  }
  if (e.key === "ArrowUp") {
    turn();
  }
  if (e.key === "h") {
    holdBlock();
  }
}
function keyup(e) {
  if (e.key === "ArrowDown") {
    downKey = false;
  }
}
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);
function Speed() {
  let speed = 1000;
  if (!downKey) {
    if (blocks.length !== 0) {
      speed = 100 + (1 / (50 + blocks.length)) * 50 * 900;
    } else {
    }
  } else {
    speed = (100 + (1 / (50 + blocks.length)) * 50 * 900) / 2;
  }
  return speed;
}
function Start() {
  moveBlock();
  setTimeout(Start, Speed());
}
setTimeout(Start, 1000);

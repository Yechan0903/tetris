function setHoldPosition(position) {
  let x = position[0];
  let y = position[1];
  x = x * 30 - 70;
  y = y * 30 + 20;
  return [x, y];
}
function paintHoldBlock({ id, shapeNum, shape }) {
  for (let index = 0; index < shape.length; index++) {
    const div = document.createElement("div");
    div.classList.add("hblock");
    div.classList.add(`shape${shapeNum}`);
    div.id = `${id}-${index}`;
    xy = setHoldPosition(shape[index]);
    div.style.top = `${xy[1]}px`;
    div.style.left = `${xy[0]}px`;
    document.querySelector(`#hold-block`).appendChild(div);
  }
}
function holdBlock() {
  let targetBlock = blocks[blocks.length - 1];
  if (targetBlock.id === blocks.length - 1) {
    if (holdedBlock.length === 0) {
      for (let i = 0; i < 4; i++) {
        gameBox.removeChild(document.getElementById(`${targetBlock.id}-${i}`));
      }
      targetBlock.shape = shape(targetBlock.shapeNum - 1, 4, 1);
      paintHoldBlock(targetBlock);
      holdedBlock.push(targetBlock);
      createNewBlock();
    } else {
      for (let i = 0; i < 4; i++) {
        gameBox.removeChild(document.getElementById(`${targetBlock.id}-${i}`));
      }
      for (let i = 0; i < 4; i++) {
        document
          .querySelector(`#hold-block`)
          .removeChild(document.querySelectorAll(`.hblock`)[0]);
      }
      targetBlock.shape = shape(targetBlock.shapeNum - 1, 4, 1);
      paintHoldBlock(targetBlock);
      holdedBlock[0].shape = shape(holdedBlock[0].shapeNum - 1, 4, 1);
      holdedBlock[0].x = 4;
      holdedBlock[0].y = 1;
      paintBlock(holdedBlock[0]);
      blocks = blocks.filter((i) => i.id !== holdedBlock[0].id);
      blocks.push(holdedBlock[0]);
      holdedBlock = [targetBlock];
    }
    localStorage.setItem("holdedBlock", JSON.stringify(holdedBlock));
  }
}
let holdedBlock = [];
let holdLocalState = localStorage.getItem("holdedBlock");
if (holdLocalState) {
  holdedBlock = JSON.parse(holdLocalState);
  paintHoldBlock(holdedBlock[0]);
}

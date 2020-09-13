const canvas = document.querySelector(".jsCanvas");
const ctx = canvas.getContext("2d");

const colors = document.querySelectorAll(".jsColor");
const range = document.querySelector(".jsRange");
const drawBtn = document.querySelector(".jsDraw");
const fillBtn = document.querySelector(".jsFill");
const newBtn = document.querySelector(".jsNew");
const saveBtn = document.querySelector(".jsSave");

const INITIALCOLOR = "#050505";
const MINT = "#b3dac5";
const CORAL = "#f0b796";
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas, canvas.height);
ctx.strokeStyle = INITIALCOLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

//canvas drawing
if (canvas) {
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mouseup", finishDrawing);
  canvas.addEventListener("mouseleave", finishDrawing);
  canvas.addEventListener("click", handleFillCanvas);
}
function startDrawing() {
  painting = true;
}
function finishDrawing() {
  painting = false;
}
function draw(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

//Btn controls
//weight
range.addEventListener("input", handleRangeChange);
function handleRangeChange(event) {
  const line = event.target.value;
  ctx.lineWidth = line;
}
//select Color
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
}
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);
//draw
if (drawBtn) {
  drawBtn.addEventListener("click", (event) => {
    filling = false;

    drawBtn.style.backgroundColor = CORAL;

    fillBtn.style.backgroundColor = MINT;
  });
}

// fill
function handleFillCanvas() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

if (fillBtn) {
  fillBtn.addEventListener("click", (event) => {
    filling = true;
    fillBtn.style.backgroundColor = CORAL;
    drawBtn.style.backgroundColor = MINT;
  });
}

//save
if (saveBtn) {
  saveBtn.addEventListener("click", save);
}

function save(event) {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "this is what I drawn";
  console.log(link);
  link.click();
}
//NEW
newBtn.addEventListener("click", (event) => {
  location.reload();
});

//toggle
const toggleBtn = document.querySelector(".fas");
const toggle_controls = document.querySelector(".controls");

toggleBtn.addEventListener("click", () => {
  toggle_controls.classList.toggle("active");
});

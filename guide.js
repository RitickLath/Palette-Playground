const canva = document.querySelector("#myCanva");
const c = canva.getContext("2d");

let color = "white";
// variable hardcoded

const black = document.querySelector(".black");
const red = document.querySelector(".red");
const yellow = document.querySelector(".yellow");
const purple = document.querySelector(".purple");
const blue = document.querySelector(".blue");
const green = document.querySelector(".green");
const white = document.querySelector(".white");
const orchid = document.querySelector(".orchid");
const line = document.querySelector(".line");
const pen = document.querySelector(".pen");
const rectangle = document.querySelector(".rectangle");
// Get the device pixel ratio and adjust canvas size
const pixelRatio = window.devicePixelRatio || 1;
canva.width = canva.clientWidth * pixelRatio;
canva.height = canva.clientHeight * pixelRatio;

// Scale the context to match the device pixel ratio
c.scale(pixelRatio, pixelRatio);

let x1;
let x2;
let x3;
let x4;

let isDrawing = false;
let ispen = true;
let isrectangle = false;
let isline = false;

// adding functionalities for rectangle
rectangle.addEventListener("click", function () {
  isrectangle = true;
  ispen = false;
  isline = false;
});

// adding functionalities for pen
pen.addEventListener("click", function () {
  ispen = true;
  isrectangle = false;
  isline = false;
  isDrawing = false;
});

line.addEventListener("click", function () {
  isline = true;
  ispen = false;
  isrectangle = false;
});

// when mouse is remain clicked
canva.addEventListener("mousedown", function (e) {
  if (ispen) {
    isDrawing = true;

    c.beginPath();
    c.moveTo(
      e.clientX - canva.getBoundingClientRect().left,
      e.clientY - canva.getBoundingClientRect().top
    );
    c.strokeStyle = color;
  } else if (isrectangle) {
    isDrawing = true;
    x1 = e.clientX;
    y1 = e.clientY;
    y1 = y1 - 90;
  } else if (isline) {
    isDrawing = true;
    c.beginPath();
    c.strokeStyle = color;
    c.moveTo(e.clientX, e.clientY - 90);
  }
});

// when mouse moves
canva.addEventListener("mousemove", function (e) {
  if (ispen) {
    if (!isDrawing) {
      return;
    }

    c.lineTo(
      e.clientX - canva.getBoundingClientRect().left,
      e.clientY - canva.getBoundingClientRect().top
    );

    c.stroke();
  } else if (isrectangle) {
    if (!isDrawing) {
      return;
    } else if (isline) {
      if (!isDrawing) {
        return;
      }
    }
  }
});

// when mouse is released
canva.addEventListener("mouseup", function (e) {
  if (ispen || isrectangle) {
    isDrawing = false;
  }
  if (isrectangle) {
    x2 = e.clientX;
    y2 = e.clientY;
    y2 = y2 - 90;
    c.strokeStyle = color;
    c.clientWidth = 4;
    c.strokeRect(x1, y1, x2 - x1, y2 - y1);
  } else if (isline) {
    isDrawing = true;

    c.lineTo(e.clientX, e.clientY - 90);
    c.stroke();
    c.closePath();
  }
});

// when mouse leaves the screen
canva.addEventListener("mouseleave", function () {
  if (ispen) {
    isDrawing = false;
  }
});

// colorchange

black.addEventListener("click", function () {
  color = "gray";
});

red.addEventListener("click", function () {
  color = "red";
});

yellow.addEventListener("click", function () {
  color = "yellow";
});

purple.addEventListener("click", function () {
  color = "purple";
});

blue.addEventListener("click", function () {
  color = "blue";
});

green.addEventListener("click", function () {
  color = "green";
});

orchid.addEventListener("click", function () {
  color = "orchid";
});

white.addEventListener("click", function () {
  color = "white";
});

document.querySelector(".clear").addEventListener("click", function () {
  c.clearRect(0, 0, innerWidth, innerHeight);
});

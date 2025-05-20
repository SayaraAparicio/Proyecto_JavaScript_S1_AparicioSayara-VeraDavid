let angle = 0;
const carousel = document.getElementById("carousel");
const totalItems = 4;
const step = 360 / totalItems;

document.querySelector(".prev").addEventListener("click", () => {
  angle += step;
  carousel.style.transform = `rotateY(${angle}deg)`;
});

document.querySelector(".next").addEventListener("click", () => {
  angle -= step;
  carousel.style.transform = `rotateY(${angle}deg)`;
});
const hamburger = document.querySelector(".hamburger");
const hamburgerTop = document.querySelector(".hamburger-top");
const hamburgerMiddle = document.querySelector(".hamburger-middle");
const hamburgerBottom = document.querySelector(".hamburger-bottom");

hamburger.addEventListener("click", (e) => {
  hamburgerTop.classList.add("rt-c");
  hamburgerMiddle.classList.add("sh-c");
  hamburgerBottom.classList.add("rb-c");
});

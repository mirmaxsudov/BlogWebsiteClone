const hamburger = document.querySelector(".hamburger");
const hamburgerTop = document.querySelector(".hamburger-top");
const hamburgerMiddle = document.querySelector(".hamburger-middle");
const hamburgerBottom = document.querySelector(".hamburger-bottom");
const shortNav = document.querySelector("#short-nav");

hamburger.addEventListener("click", () => {
  const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", !isExpanded);

  hamburgerTop.classList.toggle("rt-c");
  hamburgerMiddle.classList.toggle("sh-c");
  hamburgerBottom.classList.toggle("rb-c");
  shortNav.classList.toggle("d-none-c");
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 550) {
    hamburger.setAttribute("aria-expanded", "false");
    hamburgerTop.classList.remove("rt-c");
    hamburgerMiddle.classList.remove("sh-c");
    hamburgerBottom.classList.remove("rb-c");
    shortNav.classList.add("d-none-c");
  }
});
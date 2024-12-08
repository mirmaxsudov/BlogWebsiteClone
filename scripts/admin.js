// toolkit
const arrowRight = document.querySelector("#arrow__right");
const arrowLeft = document.querySelector("#arrow__left");
const same = document.querySelector("#same");

// body
const devBody = document.querySelector(".dev__body-wrapper");
const resultBody = document.querySelector(".result__body-wrapper");

// Add title
const addTitleBtn = document.querySelector(".add-title-btn");
const addTitleModalBtn = document.querySelector(".add-title-modal__btn");

// additional
const layout = document.querySelector("#layout");
const addTitleModal = document.querySelector(".add-title-modal");

addTitleBtn.addEventListener("click", () => {});

const newBlogObj = {
  id: "",
  createdAt: "02 December, 2022",
  base: "",
  currentTitles: [],
  subtitles: [],
  texts: [],
  images: [],
  links: [],
  lists: [],
  quotes: [],
};

arrowLeft.addEventListener("click", () => {
  makeSame();

  devBody.parentElement.classList.remove("col-6");
  devBody.parentElement.classList.add("col-12");
  resultBody.parentElement.classList.add("d-none");
});

arrowRight.addEventListener("click", () => {
  makeSame();

  resultBody.parentElement.classList.remove("col-6");
  resultBody.parentElement.classList.add("col-12");
  devBody.parentElement.classList.add("d-none");
});

same.addEventListener("click", makeSame);

function makeSame() {
  devBody.parentElement.classList.add("col-6");
  devBody.parentElement.classList.remove("col-12");

  resultBody.parentElement.classList.add("col-6");
  resultBody.parentElement.classList.remove("col-12");

  devBody.parentElement.classList.remove("d-none");
  resultBody.parentElement.classList.remove("d-none");

  resultBody.parentElement.classList.add("col-6");
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Escape") {
    closeAddTitleModalAndLayout();
    return;
  }
});

function closeAddTitleModalAndLayout() {
  layout.classList.add("d-none");
  addTitleModal.classList.add("d-none");
}

layout.addEventListener("click", closeAddTitleModalAndLayout);

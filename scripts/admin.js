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
const titleInput = document.querySelector(".title__input");

// dev
const devTitleWrapper = document.querySelector(".dev-title-wrapper");

// additional
const layout = document.querySelector("#layout");
const addTitleModal = document.querySelector(".add-title-modal");
const addTitleModalCloseBtn = document.querySelector(".close-title-modal__btn");

// result
const resultBodyContent = document.querySelector(".result__body-content");

addTitleModalCloseBtn.addEventListener("click", closeAddTitleModalAndLayout);
addTitleBtn.addEventListener("click", openAddTitleModalAndLayout);

addTitleModalBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();

  if (!title) {
    return;
  }

  closeAddTitleModalAndLayout();

  const titleItem = {
    value: title,
    style: "",
  };

  newBlogObj.currentTitles.push(titleItem);
  refresh();

  const titles = newBlogObj.currentTitles;

  generateDevTitles(titles);
});

function generateDevTitles(titles) {
  devTitleWrapper.innerHTML = "";

  for (const title of titles) {
    const div = document.createElement("span");

    const uuid = crypto.randomUUID();

    div.setAttribute("data-id", uuid);

    const span = document.createElement("span");
    span.innerText = title.value;

    div.className = "mx-2"

    div.appendChild(span);

    span.className = "position-relative dev-title";

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.onclick = () => {};
    editBtn.className = "title-edit-btn btn btn-primary";

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    deleteBtn.onclick = () => {};
    deleteBtn.className = "title-delete-btn btn btn-danger px-3";

    span.appendChild(editBtn);
    span.appendChild(deleteBtn);

    devTitleWrapper.appendChild(div);
  }
}

window.onload = () => {
  refresh();
};

function refresh() {
  const {
    base,
    currentTitles,
    subtitles,
    texts,
    images,
    links,
    lists,
    quotes,
  } = newBlogObj;

  console.log("====================================");
  console.log(newBlogObj);
  console.log("====================================");

  if (currentTitles.length != 0) {
    resultBodyContent.innerHTML = generateTitles(currentTitles);
  } else {
    resultBodyContent.innerHTML = `<h3 style="color: red;">No title</h3>`;
  }

  resultBodyContent.innerHTML += generateCreatedAt();
  resultBodyContent.innerHTML += `<hr>`;
}

function generateCreatedAt() {
  const now = new Date();

  const day = now.getDay();
  const month = now.getMonth();
  const year = now.getFullYear();

  return day > 9 ? day : "0" + day + "-" + month + "-" + year;
}

function generateTitles(titles) {
  console.log("====================================");
  console.log(titles);
  console.log("====================================");
  return `<h3 style="text-align: left;">${titles.map((title) =>
    generateSpansFprTitle(title)
  )}</h3>`;
}

function getMonth(n) {
  // if (n == 0)
}

function generateSpansFprTitle(title) {
  console.log("====================================");
  console.log(title);
  console.log("====================================");
  return `<span>${title.value}</span>`;
}

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

function openAddTitleModalAndLayout() {
  layout.classList.remove("d-none");
  addTitleModal.classList.remove("d-none");
}

layout.addEventListener("click", closeAddTitleModalAndLayout);

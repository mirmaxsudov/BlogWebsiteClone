const editor = document.getElementById("editor");
const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalInputText = document.getElementById("modalInputText");
const modalImgSrc = document.getElementById("modalImgSrc");
const modalImgAlt = document.getElementById("modalImgAlt");
const modalLinkHref = document.getElementById("modalLinkHref");
const modalLinkText = document.getElementById("modalLinkText");
const modalListItems = document.getElementById("modalListItems");
const textField = document.getElementById("textField");
const imgFields = document.getElementById("imgFields");
const linkFields = document.getElementById("linkFields");
const listFields = document.getElementById("listFields");

const insertBtn = document.getElementById("modalInsert");
const cancelBtn = document.getElementById("modalCancel");

let currentAction = null;

// Show modal with relevant fields
function showModal(action) {
  currentAction = action;
  // Reset fields
  modalInputText.value = "";
  modalImgSrc.value = "";
  modalImgAlt.value = "";
  modalLinkHref.value = "";
  modalLinkText.value = "";
  modalListItems.value = "";

  // Hide all fields
  textField.classList.add("hidden");
  imgFields.classList.add("hidden");
  linkFields.classList.add("hidden");
  listFields.classList.add("hidden");

  // Adjust modal for specific actions
  switch (action) {
    case "H1":
    case "H2":
    case "H3":
    case "H4":
    case "H5":
    case "H6":
    case "P":
      modalTitle.textContent = `Insert ${action}`;
      textField.classList.remove("hidden");
      break;
    case "IMG":
      modalTitle.textContent = `Insert Image`;
      imgFields.classList.remove("hidden");
      break;
    case "LINK":
      modalTitle.textContent = `Insert Link`;
      linkFields.classList.remove("hidden");
      break;
    case "LIST":
      modalTitle.textContent = `Insert List`;
      listFields.classList.remove("hidden");
      break;
  }

  modalOverlay.style.display = "flex";
  // Focus on first relevant field
  if (!textField.classList.contains("hidden")) {
    modalInputText.focus();
  } else if (!imgFields.classList.contains("hidden")) {
    modalImgSrc.focus();
  } else if (!linkFields.classList.contains("hidden")) {
    modalLinkHref.focus();
  } else if (!listFields.classList.contains("hidden")) {
    modalListItems.focus();
  }
}

function hideModal() {
  modalOverlay.style.display = "none";
}

// Insert element into editor
function insertElement() {
  let newEl = null;
  switch (currentAction) {
    case "H1":
    case "H2":
    case "H3":
    case "H4":
    case "H5":
    case "H6":
      if (modalInputText.value.trim() !== "") {
        newEl = document.createElement(currentAction.toLowerCase());
        newEl.textContent = modalInputText.value.trim();
      }
      break;
    case "P":
      if (modalInputText.value.trim() !== "") {
        newEl = document.createElement("p");
        newEl.textContent = modalInputText.value.trim();
      }
      break;
    case "IMG":
      if (modalImgSrc.value.trim() !== "") {
        newEl = document.createElement("img");
        newEl.src = modalImgSrc.value.trim();
        newEl.alt = modalImgAlt.value.trim();
      }
      break;
    case "LINK":
      if (
        modalLinkHref.value.trim() !== "" &&
        modalLinkText.value.trim() !== ""
      ) {
        newEl = document.createElement("a");
        newEl.href = modalLinkHref.value.trim();
        newEl.textContent = modalLinkText.value.trim();
        newEl.target = "_blank";
      }
      break;
    case "LIST":
      if (modalListItems.value.trim() !== "") {
        newEl = document.createElement("ul");
        const lines = modalListItems.value.split("\n");
        lines.forEach((line) => {
          const li = document.createElement("li");
          li.textContent = line.trim();
          if (li.textContent !== "") {
            newEl.appendChild(li);
          }
        });
      }
      break;
  }

  if (newEl) {
    editor.appendChild(newEl);
  }

  hideModal();
}

document.querySelectorAll(".toolbar button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const action = btn.getAttribute("data-action");
    showModal(action);
  });
});

insertBtn.addEventListener("click", insertElement);
cancelBtn.addEventListener("click", hideModal);

// Close modal on escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    hideModal();
  }
});

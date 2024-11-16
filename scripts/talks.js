const talksWrapper = document.querySelector("#talks__wrapper");

window.onload = () => {
    load()
}

async function load() {
    fetch("http://localhost:3000/talks")
        .then((response) => response.json())
        .then((data) => render(data));
}

function render(talks) {
    // talksWrapper.innerHTML = "";
}
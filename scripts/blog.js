

const listWrapper = document.querySelector("#list-wrapper");

window.onload = () => {
  load();
};

function load() {
  fetch("http://localhost:3000/blogs")
    .then((response) => response.json())
    .then((data) => render(data));
}

function render(blogs) {
  blogs.sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  listWrapper.innerHTML = "";

  blogs.forEach((blog) => {
    listWrapper.innerHTML += `
         <li class="list-group-item" onclick="toBlogDetail('${
           blog.id
         }')" style="cursor: pointer;">
            <div class="list-item-content">
                <div class="list-item-left">
                    <span>${blog.created_at}</span>
                    <h5 class="mt-2">${generateTitle(blog.current_titles)}</h5>
                </div>
                <!-- <div class="list-item-left"></div> -->
            </div>
        </li>
    `;
  });
}

function generateTitle(titles) {
  let cTitle = "<p>";

  for (const title of titles) {
    cTitle += `<span style="${title.style}">${title.value}</span>`;
  }
  cTitle += "</p>";
  return cTitle;
}

function toBlogDetail(id) {
  window.location.href = "/pages/blogDetail.html?id=" + id;
}

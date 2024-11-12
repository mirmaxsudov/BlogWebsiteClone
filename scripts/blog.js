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
  listWrapper.innerHTML = "";

  for (const blog of blogs) {
    listWrapper.innerHTML += `
      <li class="list-group-item" onclick="toDetail('${blog.id}')">
        <div class="list-item-content">
            <div class="list-item-left">
                <span>${blog.created_at}</span>
                <h4>${generateTitle(blog.current_titles)}</h4>
            </div> 
            <div class="list-item-left"></div>
        </div>
    </li>
    `;
  }
}

function toDetail(blogId) {
  window.location.href = "../pages/blogDetail.html?id=" + blogId;
}

function generateTitle(titles) {
  console.log(titles);

  let wrapper = "";

  for (const title of titles)
    wrapper += `<span style="${title.style}">${title.value}</span>`;

  return wrapper;
}

// const listWrapper = document.querySelector("#list-wrapper");

// window.onload = () => {
//   load();
// };

// function load() {
//   fetch("http://localhost:3000/blogs")
//     .then((response) => response.json())
//     .then((data) => render(data));
// }

// function render(blogs) {
//   console.log(blogs);

//   listWrapper.innerHTML = "";

//   blogs.forEach((blog) => {
//     listWrapper.innerHTML += `
//          <li class="list-group-item" onclick="toBlogDetail('${blog.id}')">
//             <div class="list-item-content">
//                 <div class="list-item-left">
//                     <span>${blog.created_at}</span>
//                     <h5 class="mt-2">${generateTitle(blog.current_titles)}</h5>
//                 </div>
//                 <!-- <div class="list-item-left"></div> -->
//             </div>
//         </li>
//     `;
//   });
// }

// function generateTitle(titles) {
//   let cTitle = "<p>";

//   for (const title of titles) {
//     cTitle += `<span style="${title.style}">${title.value}</span>`;
//   }
//   cTitle += "</p>";
//   return cTitle;
// }

// function toBlogDetail(id) {
//   window.location.href = "/pages/blogDetail.html?id=" + id;
// }

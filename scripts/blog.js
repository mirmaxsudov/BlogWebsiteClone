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
  blogs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const years = getUniqueYears(blogs);

  let wrapperBase = ``;

  for (const year of years) {
    let zIndex = 500;

    wrapperBase += `
      <li class="z-1">
        <ul class="mt-4 mb-4 p-year">
          <li class="bg-year-for-blog" style="z-index: ${zIndex}">
            <h1 style="z-index: ${zIndex++}">${year}</h1>
          </li>
    `;

    const months = getUniqueMonthsByYear(blogs, year);

    for (const month of months) {
      const monthName = getMonthName(month);

      wrapperBase += `
        <ul>
          <li>
            <h4 class="ms-3 mt-3 month-name">
              ${monthName}
            </h4>
          </li>
      `;

      const blogsInMonth = blogs.filter((blog) => {
        const date = new Date(blog.created_at);
        return date.getFullYear() === year && date.getMonth() === month;
      });

      let isBorder = false;

      for (const blog of blogsInMonth) {
        wrapperBase += `
          <a href="/pages/blogDetail.html?id=${blog.id}">
            <li class="list-group-item" style="cursor: pointer;">
              <div class="list-item-content ${
                !isBorder
                  ? "border border-start-0 border-end-0"
                  : "border border-start-0 border-end-0 border-top-0"
              } mt-0 d-flex justify-content-between">
                <div class="list-item-left">
                  <span>${blog.created_at}</span>
                  <h5 class="mt-2 blog-title">${generateTitle(
                    blog.current_titles
                  )}</h5>
                </div>
                <div class="list-item-left d-flex align-items-center">
                  <i id="arrow-right-icon" class="bi bi-arrow-right" style="font-size: 20px; width: 20px; height: 20px;"></i>
                </div>
              </div>
            </li>
          </a>
        `;
      }

      wrapperBase += `
        </ul>
      `;
    }

    wrapperBase += `
        </ul>
      </li>
    `;
  }

  // Insert the generated HTML into the page
  listWrapper.innerHTML = wrapperBase;
}

// Helper function to get unique years from blogs
function getUniqueYears(blogs) {
  const years = new Set();
  for (const blog of blogs) {
    const date = new Date(blog.created_at);
    years.add(date.getFullYear());
  }
  return Array.from(years).sort((a, b) => b - a);
}

function getUniqueMonthsByYear(blogs, year) {
  const months = new Set();
  for (const blog of blogs) {
    const date = new Date(blog.created_at);
    if (date.getFullYear() === year) {
      months.add(date.getMonth());
    }
  }
  return Array.from(months).sort((a, b) => b - a);
}

function getMonthName(monthIndex) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[monthIndex];
}

/* 
<li class="z-1">
  <ul class="mt-4 mb-4 p-year">
    <li class="bg-year-for-blog">
        <h1>2024</h1>
    </li>
    <ul>
        <li>
            <h4 class="ms-3 mt-3">
                Aprel
            </h4>
        </li>
        <a href="/pages/blogDetail.html?id=${blog.id}">
            <li class="list-group-item" style="cursor: pointer;" onclick="" \>
                <div class="list-item-content d-flex justify-content-between">
                    <div class="list-item-left">
                        <span>${blog.created_at}</span>
                        <h5 class="mt-2">${generateTitle(
                            blog.current_titles
                            )}</h5>
                    </div>
                    <div class="list-item-left d-flex align-items-center">
                        <i id="arrow-right-icon" class="bi bi-arrow-right"
                            id="arrow__right"
                            style="font-size: 20px; width: 20px; height: 20px;"></i>
                    </div>
                </div>
            </li>
        </a>
        <a href="/pages/blogDetail.html?id=${blog.id}">
            <li class="list-group-item" style="cursor: pointer;" onclick="" \>
                <div class="list-item-content d-flex justify-content-between">
                    <div class="list-item-left">
                        <span>${blog.created_at}</span>
                        <h5 class="mt-2">${generateTitle(
                            blog.current_titles
                            )}</h5>
                    </div>
                    <div class="list-item-left d-flex align-items-center">
                        <i id="arrow-right-icon" class="bi bi-arrow-right"
                            id="arrow__right"
                            style="font-size: 20px; width: 20px; height: 20px;"></i>
                    </div>
                </div>
            </li>
        </a>
    </ul>
    <ul>
        <li>
            <h4 class="ms-3 mt-3">
                May
            </h4>
        </li>
        <a href="/pages/blogDetail.html?id=${blog.id}">
            <li class="list-group-item" style="cursor: pointer;" onclick="" \>
                <div class="list-item-content d-flex justify-content-between">
                    <div class="list-item-left">
                        <span>${blog.created_at}</span>
                        <h5 class="mt-2">${generateTitle(
                            blog.current_titles
                            )}</h5>
                    </div>
                    <div class="list-item-left d-flex align-items-center">
                        <i id="arrow-right-icon" class="bi bi-arrow-right"
                            id="arrow__right"
                            style="font-size: 20px; width: 20px; height: 20px;"></i>
                    </div>
                </div>
            </li>
        </a>
        <a href="/pages/blogDetail.html?id=${blog.id}">
            <li class="list-group-item" style="cursor: pointer;" onclick="" \>
                <div class="list-item-content d-flex justify-content-between">
                    <div class="list-item-left">
                        <span>${blog.created_at}</span>
                        <h5 class="mt-2">${generateTitle(
                            blog.current_titles
                            )}</h5>
                    </div>
                    <div class="list-item-left d-flex align-items-center">
                        <i id="arrow-right-icon" class="bi bi-arrow-right"
                            id="arrow__right"
                            style="font-size: 20px; width: 20px; height: 20px;"></i>
                    </div>
                </div>
            </li>
        </a>
    </ul>
  </ul>
</li> */

// listWrapper.innerHTML += `
//   <a href="/pages/blogDetail.html?id=${blog.id}">
//   <li class="list-group-item" style="cursor: pointer;" onclick="toBlogDetail('${
//     blog.id
//   }')">
//           <div class="list-item-content d-flex justify-content-between">
//               <div class="list-item-left">
//                   <span>${blog.created_at}</span>
//                   <h5 class="mt-2">${generateTitle(
//                     blog.current_titles
//                   )}</h5>
//               </div>
//               <div class="list-item-left d-flex align-items-center">
//                   <i id="arrow-right-icon" class="bi bi-arrow-right" id="arrow__right"
//                       style="font-size: 20px; width: 20px; height: 20px;"></i>
//               </div>
//           </div>
//       </li>
//   </a>
// `;

function returnAllOfYears(blogs) {
  const years = [];

  for (const blog of blogs) {
    const year = extractYearFromString(blog.created_at);
    if (!years.includes(year)) years.push(year);
  }

  return years;
}

function returnAllOfMonthsByYear(blogs, year) {
  const months = [];

  for (const blog of blogs) {
    const month = extractDateFromString(blog.created_at);
    if (
      extractYearFromString(blog.created_at) == year &&
      !months.includes(month)
    )
      months.push(month);
  }

  return months;
}

function extractDateFromString(str) {
  const values = str.split(" ");
  return values[1].substr(0, values[1].length - 1);
}

function extractYearFromString(str) {
  return str.split(" ")[2];
}

function generateTitle(titles) {
  let cTitle = "<p>";

  for (const title of titles)
    cTitle += `<span style="${title.style}">${title.value}</span>`;

  cTitle += "</p>";
  return cTitle;
}

function toBlogDetail(id) {
  window.location.href = "/pages/blogDetail.html?id=" + id;
}

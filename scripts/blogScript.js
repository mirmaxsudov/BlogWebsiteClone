const blogId = new URLSearchParams(window.location.search).get("id");
const blogDetailWrapper = document.querySelector(".blog__detail-wrapper");

document.addEventListener("DOMContentLoaded", () => {
  loadSingle();
});

function loadSingle() {
  fetch("http://localhost:3000/blogs/" + blogId)
    .then((response) => response.json())
    .then((data) => renderSingle(data));
}

function renderSingle(blog) {
  blogDetailWrapper.innerHTML = `
     <div class="row">
        <h1 class="h1">${generateTitle(blog.current_titles)}</h1>
        <div class="col-12">
            <p class="text-black-50">${blog.created_at}</p>
        </div>
    </div>
    <div id="line"></div>
    <div class="blog__detail-content">
        ${generateBase(blog)}
    </div>
    `;
}

function generateBase(blog) {
  console.log(blog.quotes);
  let base = blog.base;

  if (blog.images) {
    base = generateImages(base, blog.images);
  }
  if (blog.texts) {
    base = generateTexts(base, blog.texts);
  }
  if (blog.links) {
    base = generateLinks(base, blog.links);
  }
  if (blog.quotes) {
    base = generateQuotes(base, blog.quotes);
  }
  if (blog.subtitles) {
    base = generateSubtitles(base, blog.subtitles);
  }
  if (blog.lists) {
    base = generateLists(base, blog.lists);
  }

  return base;
}

function generateLists(base, lists) {
  for (const list of lists) {
    let cList = `<${list.type}>`;

    for (const item of list.items) {
      cList += `<li class="cList">${item.value}</li>`;
    }

    cList += `</${list.type}>`;

    base = base.replaceAll(list.id, cList);
  }
  return base;
}

function generateSubtitles(base, subtitles) {
  for (const subtitle of subtitles) {
    base = base.replaceAll(
      subtitle.id,
      `<h4 class="mt-4 mb-4">${subtitle.value}</h4>`
    );
  }
  return base;
}

function generateQuotes(base, quotes) {
  for (const quote of quotes)
    base = base.replaceAll(quote.id, `<blockquote>${quote.value}</blockquote>`);

  return base;
}

function generateLinks(base, links) {
  for (const a of links)
    base = base.replaceAll(a.id, `<a href="${a.link}">${a.value}</a>`);

  return base;
}

function generateTexts(base, texts) {
  for (const text of texts)
    base = base.replaceAll(text.id, `<p>${text.value}</p>`);

  return base;
}

function generateImages(base, images) {
  for (const img of images)
    base = base.replaceAll(
      img.id,
      `<img class="w-100" src="${img.url}" title="${img.title}" alt="${img.alt}"/>`
    );

  return base;
}

function generateTitle(titles) {
  return titles
    .map((title) => `<span style="${title.style}">${title.value}</span>`)
    .join("");
}

// const blogId = new URLSearchParams(window.location.search).get("id");
// const blogDetailWrapper = document.querySelector(".blog__detail-wrapper");

// window.onload = () => {
//   if (!blogId) {
//     window.location.href = "/pages/blog.html";
//     return;
//   }

//   load(blogId);
// };

// function load(blogId) {
//   fetch("http://localhost:3000/blogs/" + blogId)
//     .then((response) => response.json())
//     .then((data) => render(data));
// }

// function render(blog) {
//   blogDetailWrapper.innerHTML = `
//     <div class="row">
//         <h1 class="h1">${generateTitle(blog.current_titles)}</h1>
//         <div class="col-12">
//             <p class="text-black-50">${blog.created_at}</p>
//         </div>
//     </div>
//     <div id="line"></div>
//     <div class="blog__detail-content">
//         ${generateBase(blog)}
//     </div>
//     `;
// }

// function generateBase(blog) {
//   let base = ``;

//   console.log(blog);

//   if (blog.texts) {
//     base = generateTexts(blog.base, blog.texts);
//   }
//   if (blog.links) {
//     base = generateA(base, blog.links);
//   }
//   if (blog.quotes) {
//     base = generateQuotes(base, blog.quotes);
//   }
//   if (blog.images) {
//     base = generateImages(base, blog.images);
//   }
//   if (blog.lists) {
//     base = generateLists(base, blog.lists);
//   }
//   if (blog.subtitles) {
//     base = generateSubtitles(base, blog.subtitles);
//   }

//   return base;
// }

// function generateSubtitles(base, subtitles) {
//   for (const subtitle of subtitles) {
//     base = base.replaceAll(subtitle.id, `<h4 class="mt-4 mb-4">${subtitle.value}</h4>`);
//   }
//   return base;
// }

// function generateLists(base, lists) {
//   console.log(lists);

//   for (const list of lists) {
//     let cList = `<${list.type}>`;

//     for (const item of list.items) {
//       cList += `<li class="cList">${item.value}</li>`;
//     }

//     cList += `</${list.type}>`;

//     base = base.replaceAll(list.id, cList);
//   }

//   return base;
// }

// function generateImages(base, images) {
//   for (const image of images) {
//     base = base.replaceAll(
//       image.id,
//       `<img class="w-100 mt-1 mb-2" src="${image.url}" alt="${image.alt}">`
//     );
//   }

//   return base;
// }

// function generateQuotes(base, quotes) {
//   for (const quote of quotes) {
//     base = base.replaceAll(quote.id, `<blockquote>${quote.value}</blockquote>`);
//   }
//   return base;
// }

// function generateTexts(base, texts) {
//   for (const text of texts)
//     base = base.replaceAll(text.id, `<p class="justify">${text.value}</p>`);

//   return base;
// }

// function generateA(base, as) {
//   for (const a of as) {
//     base = base.replaceAll(
//       a.id,
//       `<a style="${a.style}" href="${a.link}">${a.value}</a>`
//     );
//   }

//   return base;
// }

// function generateTitle(titles) {
//   let cTitle = "<p>";

//   for (const title of titles) {
//     cTitle += `<span style="${title.style}">${title.value}</span>`;
//   }
//   cTitle += "</p>";
//   return cTitle;
// }

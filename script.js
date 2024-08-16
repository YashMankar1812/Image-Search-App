// const API_KEY = 'https://api.unsplash.com/users/samuelzeller/photos █';
// const searchButton = document.getElementById('search-button');
// const searchBar = document.getElementById('search-bar');
// const imageContainer = document.getElementById('image-container');
// const showMoreButton = document.getElementById('show-more-button');

// let currentPage = 1;
// let query = '';

// searchButton.addEventListener('click', () => {
//   query = searchBar.value;
//   currentPage = 1;
//   imageContainer.innerHTML = '';
//   fetchImages();
// });

// showMoreButton.addEventListener('click', () => {
//   currentPage++;
//   fetchImages();
// });

// async function fetchImages() {
//   try {
//     const response = await fetch(`https://api.unsplash.com/users/samuelzeller/photos`);
//     const data = await response.json();
//     displayImages(data.results);
//   } catch (error) {
//     console.error('Error fetching images:', error);
//   }
// }

// function displayImages(images) {
//   images.forEach(image => {
//     const imgElement = document.createElement('img');
//     imgElement.src = image.urls.small;
//     imageContainer.appendChild(imgElement);
//   });
// }





// const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

// const formEl = document.querySelector("form");
// const searchInputEl = document.getElementById("search-input");
// const searchResultsEl = document.querySelector(".search-results");
// const showMoreButtonEl = document.getElementById("show-more-button");

// let inputData = "";
// let page = 1;

// async function searchImages() {
//   inputData = searchInputEl.value;
//   const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

//   const response = await fetch(url);
//   const data = await response.json();
//   if (page === 1) {
//     searchResultsEl.innerHTML = "";
//   }

//   const results = data.results;

//   results.map((result) => {
//     const imageWrapper = document.createElement("div");
//     imageWrapper.classList.add("search-result");
//     const image = document.createElement("img");
//     image.src = result.urls.small;
//     image.alt = result.alt_description;
//     const imageLink = document.createElement("a");
//     imageLink.href = result.links.html;
//     imageLink.target = "_blank";
//     imageLink.textContent = result.alt_description;

//     imageWrapper.appendChild(image);
//     imageWrapper.appendChild(imageLink);
//     searchResultsEl.appendChild(imageWrapper);
//   });

//   page++;

//   if (page > 1) {
//     showMoreButtonEl.style.display = "block";
//   }
// }

// formEl.addEventListener("submit", (event) => {
//   event.preventDefault();
//   page = 1;
//   searchImages();
// });

// showMoreButtonEl.addEventListener("click", () => {
//   searchImages();
// });



















// const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

// const formEl = document.querySelector("form");
// const searchInputEl = document.getElementById("search-input");
// const searchResultsEl = document.querySelector(".search-results");
// const showMoreButtonEl = document.getElementById("show-more-button");

// let inputData = "";
// let page = 1;

// async function fetchImages(query, page) {
//   const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}`;
//   const response = await fetch(url);
//   return response.json();
// }

// async function renderImages(data) {
//   const results = data.results;
//   results.forEach((result) => {
//     const imageWrapper = document.createElement("div");
//     imageWrapper.classList.add("search-result");
//     const image = document.createElement("img");
//     image.src = result.urls.small;
//     image.alt = result.alt_description;
//     const imageLink = document.createElement("a");
//     imageLink.href = result.links.html;
//     imageLink.target = "_blank";
//     imageLink.textContent = result.alt_description;

//     imageWrapper.appendChild(image);
//     imageWrapper.appendChild(imageLink);
//     searchResultsEl.appendChild(imageWrapper);
//   });
// }

// async function searchImages(event) {
//   event.preventDefault();
//   inputData = searchInputEl.value;
//   searchResultsEl.innerHTML = "";
//   showMoreButtonEl.style.display = "none";
//   page = 1;

//   const data = await fetchImages(inputData, page);
//   await renderImages(data);
//   page++;

//   if (data.results.length === 10) {
//     showMoreButtonEl.style.display = "block";
//   }
// }

// async function loadMoreImages() {
//   const data = await fetchImages(inputData, page);
//   await renderImages(data);
//   page++;

//   if (data.results.length === 10) {
//     showMoreButtonEl.style.display = "block";
//   } else {
//     showMoreButtonEl.style.display = "none";
//   }
// }

// formEl.addEventListener("submit", searchImages);
// showMoreButtonEl.addEventListener("click", loadMoreImages);






const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";
const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");

let query = "";
let page = 1;

async function fetchImages(query, page) {
  try {
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error: ", error);
    alert("Failed to fetch images. Please try again.");
  }
}

function createImageElement(result) {
  const imageWrapper = document.createElement("div");
  imageWrapper.classList.add("search-result");
  
  const image = document.createElement("img");
  image.src = result.urls.small;
  image.alt = result.alt_description;

  const imageLink = document.createElement("a");
  imageLink.href = result.links.html;
  imageLink.target = "_blank";
  imageLink.textContent = result.alt_description || "View Image";

  imageWrapper.appendChild(image);
  imageWrapper.appendChild(imageLink);

  return imageWrapper;
}

async function renderImages(data) {
  const results = data.results;
  if (results.length === 0) {
    searchResultsEl.innerHTML = "<p>No results found. Try a different query.</p>";
    return;
  }
  
  results.forEach((result) => {
    const imageWrapper = createImageElement(result);
    searchResultsEl.appendChild(imageWrapper);
  });
}

async function searchImages(event) {
  event.preventDefault();
  query = searchInputEl.value.trim();
  
  if (query === "") {
    alert("Please enter a search term.");
    return;
  }

  searchResultsEl.innerHTML = "";
  showMoreButtonEl.style.display = "none";
  page = 1;

  const data = await fetchImages(query, page);
  if (data) {
    await renderImages(data);
    page++;
    toggleShowMoreButton(data.results.length);
  }
}

async function loadMoreImages() {
  const data = await fetchImages(query, page);
  if (data) {
    await renderImages(data);
    page++;
    toggleShowMoreButton(data.results.length);
  }
}

function toggleShowMoreButton(resultsLength) {
  showMoreButtonEl.style.display = resultsLength === 10 ? "block" : "none";
}

formEl.addEventListener("submit", searchImages);
showMoreButtonEl.addEventListener("click", loadMoreImages);



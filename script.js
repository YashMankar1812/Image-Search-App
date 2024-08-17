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



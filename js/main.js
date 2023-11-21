let APIKey = "6a8145d3";
let movies = document.getElementById("movies");
const searchBox = document.getElementById("searchBox");
const error = document.getElementById("error");
const searchButton = document.getElementById("searchButton");
error.style.display = "none";

searchButton.addEventListener("click", loadMovies);

window.addEventListener("load", function () {
  const saveInfo = localStorage.getItem("query");
  searchBox.value = saveInfo;
  loadMovies();
});

async function loadMovies() {
  console.log("test");
  error.innerHTML = "";
  let query = searchBox.value;
  localStorage.setItem("query", query);

  try {
    let result = await fetch(
      `http://www.omdbapi.com/?s=${query}&apikey=${APIKey}`
    );
    let json = await result.json();
    console.log(json);
    if (json.Error) {
      error.style.display = "block";
      error.innerHTML = "No results found!";
    } else {
      error.style.display = "none";
    }

    displayData(json);
  } catch (errorMessage) {
    console.log(errorMessage);
    error.style.display = "block";
    error.innerHTML = errorMessage;
  }
}

function displayData(json) {
  movies.innerHTML = "";
  for (let i = 0; i < json.Search.length; i++) {
    const card = document.createElement("div");
    card.className = "card col-4 rounded-2";
    card.style.margin = "10px";
    document.body.appendChild(card);

    const title = document.createElement("h2"); //<h2></h2>
    title.innerHTML = json.Search[i].Title; //<h2>Toy Story</h2>
    title.className = "card-title mt-3 text-center";
    card.append(title);

    const year = document.createElement("h3");
    year.innerHTML = json.Search[i].Year;
    year.className = "card-year";
    card.append(year);

    const image = document.createElement("img");
    if (json.Search[i].Poster == "N/A") {
      image.src = "./image/placeholder.jpg";
    } else {
      image.src = json.Search[i].Poster;
      image.className = "card-img rounded-2";
    }
    image.alt = json.Search[i].Title;

    const plot = document.createElement("p");
    plot.innerHTML = json.Search[i].imdbID;
    plot.className = "card-text";

    card.append(plot);

    card.append(image);
    movies.append(card);
  }
}

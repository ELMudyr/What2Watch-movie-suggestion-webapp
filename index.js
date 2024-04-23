const apiKey = "6acf56c"; // Replace with your actual OMDb API key

// Select form elements
const categorySelect = document.querySelector("#category");
const ratingInput = document.querySelector("#ratingMargin");
const selectedRating = document.querySelector("#selectedRating");
const submitButton = document.querySelector("#submitButton");
const suggestionsSection = document.querySelector("#suggestions");

// Update the displayed rating value when slider input changes
ratingInput.addEventListener("input", function () {
  selectedRating.textContent = this.value; // Update displayed rating value (span)
});

// Function to build the movie suggestion element
function createMovieSuggestion(movie) {
  const posterImg = document.getElementById("posterImg");
  posterImg.src = movie.Poster;
  posterImg.alt = `${movie.Title} Poster`;

  const title = document.getElementById("movieTitle");
  title.textContent = movie.Title;

  // Add poster image (optional)
  if (movie.Poster) {
    const poster = document.createElement("img");
    poster.src = movie.Poster;
    poster.alt = `${movie.Title} Poster`;
    suggestion.appendChild(poster);
  }

  suggestion.appendChild(title);

  // Add more details like rating, etc. (optional)

  return suggestion;
}

// Function to fetch movie data from OMDb API
async function fetchMovies(category) {
  const url = `https://www.omdbapi.com/?s=${category}&apikey=${apiKey}&type=movie`;
  console.log("Request URL:", url); // Log the constructed URL

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Search) {
      const topRatedMovie = data.Search.reduce((prev, current) => {
        return parseFloat(current.imdbRating) > parseFloat(prev.imdbRating)
          ? current
          : prev;
      });

      return topRatedMovie;
    } else {
      console.error("No movies found for this category.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    return null;
  }
}

// Function to handle form submission
async function handleSubmit(event) {
  event.preventDefault();

  const selectedCategory = categorySelect.value;
  console.log("Selected category:", selectedCategory); // Log the selected category

  // Use await to wait for movies data before proceeding
  try {
    const movie = await fetchMovies(selectedCategory);

    if (movie) {
      const suggestion = createMovieSuggestion(movie);
      suggestionsSection.innerHTML = ""; // Clear previous suggestions
      suggestionsSection.appendChild(suggestion);
    } else {
      suggestionsSection.textContent =
        "No movies found matching your criteria.";
    }
  } catch (error) {
    console.error("Error handling form submission:", error);
  }
}

// Add event listener to submit button
submitButton.addEventListener("click", handleSubmit);

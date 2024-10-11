const apiKey = "67f9544bea06bbbbff7d5e0d7aebefbe"; // Replace with your actual TMDb API key

// Mapping of genre names to TMDb genre IDs
const genreMap = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  "Science Fiction": 878,
  "TV Movie": 10770,
  Thriller: 53,
  War: 10752,
  Western: 37,
};

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

// Function to update the movie suggestion element
function updateMovieSuggestion(movie) {
  const posterImg = document.getElementById("posterImg");
  posterImg.src = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "placeholder.jpg";
  posterImg.alt = `${movie.title} Poster`;

  const posterImgBg = document.getElementById("posterImgBg");
  posterImgBg.src = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "placeholder.jpg";
  posterImgBg.alt = `${movie.title} Poster`;

  const title = document.getElementById("movieTitle");
  title.textContent = movie.title;

  const rating = document.getElementById("ratingDisplay");

  const movieRating = movie.vote_average;

  ratingDisplay.textContent = `${movieRating.toString().substring(0, 3)} ⭐`;

  const release_date = movie.release_date;
  const release_year = release_date.substring(0, 4);

  const date = document.getElementById("date");
  date.textContent = `(${release_year})`;
}

// Function to fetch movie data from TMDb API
async function fetchMovies(categoryName, rating) {
  const category = genreMap[categoryName];
  if (!category) {
    console.error("Invalid genre selected.");
    return null;
  }

  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${category}&vote_average.gte=${rating}&vote_average.lte=10`;
  console.log("Request URL:", url); // Log the constructed URL

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      // Select a random movie from the results
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const randomMovie = data.results[randomIndex];

      return randomMovie;
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
  const rating = ratingInput.value;
  console.log("Selected category:", selectedCategory); // Log the selected category
  console.log("Selected rating:", rating); // Log the selected rating

  // Use await to wait for movies data before proceeding
  try {
    const movie = await fetchMovies(selectedCategory, rating);

    if (movie) {
      updateMovieSuggestion(movie);

      // Disable the submit button while waiting
      submitButton.disabled = true;

      // Use setTimeout to wait for 1 second before re-enabling the submit button
      setTimeout(() => {
        submitButton.disabled = false;
      }, 1000);
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

//Gsap animations

var tl = gsap.timeline();
// tl.from("#card", {
//   autoAlpha: 0,
//   duration: 1,
// });
tl.from("#posterImg, #movieTitle , #card", {
  y: "-200%",
  autoAlpha: 0,
  duration: 1,
  ease: "back",
});
tl.from("#submitButton", {
  yPercent: 50,
  duration: 0.5,
  autoAlpha: 0,
  delay: 1,
});

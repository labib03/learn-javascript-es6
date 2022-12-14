import fetchData from "./fetch";

const searchInput = $("#movie-search-input");
const searchForm = $("#movie-search-form");

const searchElement = () => {
  searchForm.on("submit", (e) => {
    e.preventDefault();
    const value = searchInput.val();
    fetchData("search/movie", { query: value });
  });
};

searchInput.on("input", (e) => {
  console.log("isi e", e.target.value);
  if (e.target.value.length > 0) {
    $("#trending-movies-container").addClass("hidden");
  } else {
    $("#trending-movies-container").removeClass("hidden");
  }
});

export default searchElement;

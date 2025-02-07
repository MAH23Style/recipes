// mobile menu
const mobileMenu = document.getElementById("mobile-menu");
const navbarMenu = document.querySelector(".navbar-menu");

mobileMenu.addEventListener("click", () => {
  navbarMenu.classList.toggle("active");
});

var today = new Date();
var date =
  ("0" + today.getDate()).slice(-2) +
  "/" +
  ("0" + (today.getMonth() + 1)).slice(-2) +
  "/" +
  today.getFullYear();
document.getElementById("footer").innerHTML += date;

const API_KEY = "7baa4d5fbdf64a1f950c85e9f0973216 ";

const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
const recipesContainer = document.getElementById("recipes-container");

async function fetchRecipes(query) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${API_KEY}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
}

async function fetchRecipeDetails(recipeId) {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    return null;
  }
}

async function displayRecipes(recipes) {
  recipesContainer.innerHTML = "";

  if (recipes.length === 0) {
    recipesContainer.innerHTML =
      "<p>No recipes found. Try a different search!</p>";
    return;
  }

  for (const recipe of recipes) {
    const recipeDetails = await fetchRecipeDetails(recipe.id);

    if (recipeDetails) {
      const recipeCard = document.createElement("div");
      recipeCard.classList.add("recipe-card");

      recipeCard.innerHTML = `
                <img src="${recipeDetails.image}" alt="${recipeDetails.title}">
                <h3>${recipeDetails.title}</h3>
                <a href="${recipeDetails.sourceUrl}" class="more-info-button" target="_blank">View Full Recipe</a>
            `;

      recipesContainer.appendChild(recipeCard);
    }
  }
}

searchButton.addEventListener("click", async () => {
  const query = searchBar.value.trim();

  if (query) {
    const recipes = await fetchRecipes(query);
    displayRecipes(recipes);
  } else {
    alert("Please enter a search term!");
  }
});

searchBar.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const query = searchBar.value.trim();

    if (query) {
      const recipes = await fetchRecipes(query);
      displayRecipes(recipes);
    } else {
      alert("Please enter a search term!");
    }
  }
});

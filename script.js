const title = document.querySelector(".title");
const ingridient = document.querySelector(".ingridient");
const desc = document.querySelector(".desc");
const calories = document.querySelector(".calories");
const error = document.querySelector(".error");
const loading = document.querySelector(".loading");

const image = document.querySelector(".image");
const pTitle = document.querySelector(".p_title");
const pIngridients = document.querySelector(".p_ingridients");
const pDesc = document.querySelector(".p_desc");
const pCalories = document.querySelector(".p_calories");

const addIngridient = document.querySelector(".addIngridient");
const getPhoto = document.querySelector(".getPhoto");
const addRecipe = document.querySelector(".addRecipe");

addIngridient.addEventListener("click", addHandler);
getPhoto.addEventListener("click", getHandler);
addRecipe.addEventListener("click", recipeHandler);

const imgSrc = "";

let recipe = {
  key: "",
  title: "",
  description: "",
  calories: "",
  picture: "",
  ingridients: [],
};

function addHandler() {
  clearError();

  if (ingridient.value.trim() === "") return;

  pIngridients.innerHTML += `
    <li>${ingridient.value}</li>

    `;

  recipe.ingridients.push(ingridient.value.trim().toLowerCase());

  ingridient.value = "";
}

async function getHandler() {
  loading.classList.add("hide");
  image.classList.remove("hide");

  clearError();

  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );

  const data = await response.json();
  image.src = data.meals[0].strMealThumb;
  recipe.picture = data.meals[0].strMealThumb;
}

function recipeHandler() {
  if (recipe.ingridients.length < 3) {
    error.innerHTML = "Add at least 3 ingridients";
    return;
  } else if (recipe.picture === "") {
    error.innerHTML = "Add image ";
    return;
  } else if (recipe.title === "") {
    error.innerHTML = "Add title";
    return;
  } else if (recipe.description === "") {
    error.innerHTML = "Add description";
    return;
  } else if (recipe.calories === "") {
    error.innerHTML = "Add calories";
    return;
  }

  recipe.key = keyGenerator();

  let recipes = JSON.parse(window.localStorage.getItem("recipes"));

  !recipes && (recipes = []);

  recipes.push(recipe);
  window.localStorage.setItem("recipes", JSON.stringify(recipes));

  clear();
  error.innerHTML = "Recipe added";
}

function keyGenerator() {
  return Math.round(Math.random() * 10000000);
}

function clearError() {
  error.innerHTML = "";
}

function clear() {
  clearError();

  loading.classList.remove("hide");
  image.classList.add("hide");

  title.value = "";
  desc.value = "";
  calories.value = "";
  pTitle.innerHTML = "";
  pDesc.innerHTML = "";
  pCalories.innerHTML = "";
  image.src = "";

  recipe = {
    key: "",
    title: "",
    description: "",
    calories: "",
    picture: "",
    ingridients: [],
  };

  pIngridients.innerHTML = "";
}

title.onchange = (e) => {
  clearError();
  pTitle.innerHTML = e.target.value.trim();
  recipe.title = title.value.trim();
};

desc.onchange = (e) => {
  clearError();
  recipe.description = desc.value.trim();
  pDesc.innerHTML = e.target.value.trim();
};

calories.onchange = (e) => {
  if (e.target.value < 0) {
    calories.value = "";
    error.innerHTML = "Calories can not be negative";
  }
  clearError();
  recipe.calories = calories.value.trim();
  pCalories.innerHTML = e.target.value.trim() + " Calories";

  if (e.target.value === "") {
    pCalories.innerHTML = "";
  }
};

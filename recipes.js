const title = document.querySelector(".filters__title");
const calories = document.querySelector(".filters__calories");
const ingridients = document.querySelector(".filters__ingridients");

const items = document.querySelector(".items");

const filter = document.querySelector(".filter");
filter.addEventListener("click", filterData);

let recipes = [];

function getRecipes() {
  recipes = JSON.parse(window.localStorage.getItem("recipes"));
  displayRecipes(recipes);
}

function displayRecipes(data) {
  items.innerHTML = "";
  data.map((item) => {
    items.innerHTML += `
    <div class="box">
          <div class="recipes__photo">
            <img src=${item.picture} alt="picture of food" />
          </div>
          <div class="recipes__title">${item.title}</div>
          <div class="recipes__calories">${
            item.calories
          } <strong>Calories</strong></div>
          <div class="recipes__desc"><strong>Description</strong>:<br/>${
            item.description
          }</div>
          <div class="recipes__ingridiants"><strong>Ingridients</strong>:<br/>${item.ingridients.join(
            ", "
          )}</div>
        </div>
    `;
  });
}

function filterData() {
  let titleArr = recipes.filter((item) =>
    title.value ? title.value.toLowerCase() === item.title.toLowerCase() : item
  );

  let caloriesArr = titleArr.filter((item) =>
    calories.value ? calories.value === item.calories : item
  );

  let ingridientsArr = caloriesArr.filter((item) =>
    ingridients.value
      ? item.ingridients.includes(ingridients.value.toLowerCase())
      : item
  );
  displayRecipes(ingridientsArr);
}

getRecipes();

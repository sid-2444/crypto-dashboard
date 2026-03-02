const container = document.getElementById("cardsContainer");
const loader = document.getElementById("loader");
const errorEl = document.getElementById("error");

let allCoins = [];
let favorites =
  JSON.parse(localStorage.getItem("favorites")) || [];

/* Load Data */
async function init() {
  loader.classList.remove("hidden");
  errorEl.classList.add("hidden");

  const data = await fetchCoins();

  if (!data || !Array.isArray(data)) {
    loader.classList.add("hidden");
    errorEl.textContent = "Unable to load data. Please try again.";
    errorEl.classList.remove("hidden");
    return;
  }

  allCoins = data;
  renderCards(allCoins);

  loader.classList.add("hidden");
}

function renderCards(data) {
  container.innerHTML = "";

  data.forEach(coin => {
    const card = document.createElement("div");
    card.classList.add("card");

    const isFav = favorites.includes(coin.id);

    card.innerHTML = `
      <div class="card-header">
        <h3>${coin.name}</h3>
        <button class="fav-btn" data-id="${coin.id}">
          ${isFav ? "★" : "☆"}
        </button>
      </div>
      <img src="${coin.image}" class="coin-img">
      <div class="price">${formatCurrency(coin.current_price)}</div>
      <div class="${coin.price_change_percentage_24h >= 0 ? "profit" : "loss"}">
        ${coin.price_change_percentage_24h.toFixed(2)}%
      </div>
    `;

    container.appendChild(card);
  });
}

/* SEARCH */
document.addEventListener("input", function (e) {
  if (e.target.id === "searchInput") {
    const value = e.target.value.toLowerCase();

    const filtered = allCoins.filter(coin =>
      coin.name.toLowerCase().includes(value)
    );

    renderCards(filtered);
  }
});

/* FAVORITES */
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("fav-btn")) {
    const id = e.target.dataset.id;

    if (favorites.includes(id)) {
      favorites = favorites.filter(f => f !== id);
    } else {
      favorites.push(id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderCards(allCoins);
  }
});

/* DARK MODE */
document.addEventListener("click", function (e) {
  if (e.target.id === "darkToggle") {
    document.body.classList.toggle("light-mode");

    localStorage.setItem(
      "theme",
      document.body.classList.contains("light-mode")
        ? "light"
        : "dark"
    );
  }
});

/* Restore Theme */
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
}

init();
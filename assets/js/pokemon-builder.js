const root = document.getElementById("pokedex-root");
const loadingCard = {
  card: document.getElementById("loading-card"),
  button: document.getElementById("load-more"),
  icon: document.getElementById("loading-icon"),
  isLoading: false,
};

function insertPokemonIntoCardlist(pokemon) {
  const [type1, type2] = pokemon.types;

  const newCard = `
  <li class="pokemon-card ${type1.type.name}">
      <span class="pokedex-entry">Nº ${pokemon.id}</span>
      <span class="pokemon-name">${
        pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
      }</span>
      <div class="pokemon-details">
        <ul class="types">
          <li class="type ${type1.type.name}">${type1.type.name}</li>
          ${
            type2
              ? `<li class="type ${type2.type.name}">${type2.type.name}</li>`
              : ""
          }
        </ul>
        <img
          src="${pokemon.picture}"
          alt=""
        />
      </div>
  </li>
  `;
  const range = document.createRange();
  const newCardElement = range.createContextualFragment(newCard);
  root.insertBefore(newCardElement, loadingCard.card);
}

async function loadMorePokemons() {
  const { button, icon, isLoading } = loadingCard;

  if (isLoading) return;

  const toggleloadingSettings = () => {
    button.hidden = !button.hidden;
    icon.hidden = !icon.hidden;
    loadingCard.isLoading = !loadingCard.isLoading;
  };

  toggleloadingSettings();
  (await fetchPokemons()).map(insertPokemonIntoCardlist);
  toggleloadingSettings();
}

loadMorePokemons();

loadingCard.button.addEventListener("click", loadMorePokemons);
window.addEventListener("scroll", () => {
  const pageScroll = window.scrollY + window.outerHeight;
  //                                            altura de 1 pokemon card
  if (pageScroll > document.body.scrollHeight - 100) {
    loadMorePokemons();
  }
});

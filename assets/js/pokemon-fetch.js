const pokeApiUrlbase = "https://pokeapi.co/api/v2/";
let currentPage = pokeApiUrlbase + "pokemon?limit=10";

function buildPokemonObject(pokemon) {
  // console.log(pokemon)
  return {
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types,
    // moves: pokemon.moves, /* futuras atualizações */
    picture: pokemon.sprites.other["official-artwork"].front_default,
  };
}

function getPokemonDetails(pokemon) {
  // console.log(pokemon);
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(buildPokemonObject);
}

async function fetchPokemons() {
  return fetch(currentPage)
    .then((response) => response.json())
    .then((json) => {
      currentPage = json.next;
      return json.results;
    })
    .then((pokemonUrls) => pokemonUrls.map((p) => fetch(p.url)))
    .then((pokemonFetchs) => Promise.all(pokemonFetchs))
    .then((pokemonsRawResponse) => pokemonsRawResponse.map(getPokemonDetails))
    .then((pokemons) => Promise.all(pokemons));
}

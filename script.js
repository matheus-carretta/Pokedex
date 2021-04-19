const input = document.getElementById('input');
const searchButton = document.getElementById('button');
const gen1Button = document.getElementById('gen1');
const gen2Button = document.getElementById('gen2');
const gen3Button = document.getElementById('gen3');
const gen4Button = document.getElementById('gen4');

searchButton.addEventListener('click', () => {
  const pokemon = input.value.toLowerCase();
  resetPokemonDiv();
  fetchPokemon(pokemon);
})

function resetPokemonDiv() {
  const pokemonDiv = document.getElementById('showPokemon');
  pokemonDiv.innerHTML = '';
}

async function fetchByGen(genNumber) {
  const response = await fetch(`https://pokeapi.co/api/v2/generation/${genNumber}/`);
  const data = await response.json();
  const {
    pokemon_species
  } = data;
  resetPokemonDiv();
  pokemon_species.forEach((pokemon) => {
    fetchPokemon(pokemon.name);
  })

}

gen1Button.addEventListener('click', () => fetchByGen(1));
gen2Button.addEventListener('click', () => fetchByGen(2));
gen3Button.addEventListener('click', () => fetchByGen(3));
gen4Button.addEventListener('click', () => fetchByGen(4));

async function fetchPokemon(pokemon) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await response.json();
    const pokeImg = data.sprites.other.dream_world.front_default;
    const pokeName = data.name;
    const pokeType = data.types;
    renderPokemon(pokeImg, pokeName, pokeType);
  } catch (error) {
    alert('Pokémon não encontrado');
  }
}

function renderPokemon(image, name, types) {
  const pokemonDiv = document.getElementById('showPokemon');
  const newDiv = document.createElement('div');
  const newImage = document.createElement('img');
  const newP = document.createElement('p');
  const pokemonName = name[0].toUpperCase() + name.substr(1);
  const typeArray = types.map((type) => {
    return type.type.name;
  })

  newP.className = 'pokemonText';
  newDiv.className = 'pokemonCard border border-dark rounded'
  newImage.src = image;
  newImage.className = 'pokemonImg';
  newP.innerHTML = `${pokemonName}, tipo: ${typeArray}`;

  newDiv.appendChild(newImage);
  newDiv.appendChild(newP);

  pokemonDiv.appendChild(newDiv);
}
const input = document.getElementById('input');
const button = document.getElementById('button');

button.addEventListener('click', () => {
  const pokemon = input.value.toLowerCase();
  fetchPokemon(pokemon);
})

async function fetchPokemon(pokemon) {
  try {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const data = await response.json();
  const pokeImg = data.sprites.other.dream_world.front_default;
  const pokeName = data.name;
  renderPokemon(pokeImg, pokeName);
  } catch (error) {
    alert('Pokémon não encontrado');
  }
}

function renderPokemon(image, name) {
  const pokemonDiv = document.getElementById('showPokemon');
  const newDiv = document.createElement('div');
  const newImage = document.createElement('img');
  const newP = document.createElement('p');

  newP.className = 'pokemonText';
  newDiv.className = 'pokemonCard border border-dark rounded'
  newImage.src = image;
  newImage.className = 'pokemonImg';
  newP.innerHTML = name;

  newDiv.appendChild(newImage);
  newDiv.appendChild(newP);

  pokemonDiv.innerHTML = '';
  pokemonDiv.appendChild(newDiv);
}
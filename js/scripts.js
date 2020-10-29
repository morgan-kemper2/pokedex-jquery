let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: "Bulbasaur",
      height: 7.0,
      type: ["Grass", " Poison"],
    },
    {
      name: "Wartortle",
      height: 1.5,
      type: [" Water"],
    },
    {
      name: "Beedrill",
      height: 1.0,
      type: ["Poison", " Bug"],
    },
    {
      name: "Fearow",
      height: 1.2,
      type: ["Flying", " Normal"],
    },
    {
      name: "Nidoran",
      height: 0.4,
      type: ["Poison"],
    },
  ];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function addListItem(pokemon) {
    let pokeItem = document.querySelector(".pokelist");
    let listItem = document.createElement("li");
    pokeItem.appendChild(listItem);
    listItem.classList.add('list-i');
    let button = document.createElement('button');
    button.classList.add('btnclass');
    button.innerText = pokemon.name;
    button.addEventListener('click', function(showDetails){
      console.log(pokemon.name);
    })
    listItem.appendChild(button);
    
  }
  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
  };

})();

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});


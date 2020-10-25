let pokemonRepository = (function () {
let pokemonList = [
  {
    name: "Bulbasaur",
    height: 7.0,
    type: ["Grass", "Poison"]
  },
  {
    name: "Wartortle",
    height: 1.0,
    type: ["Water"]
  },
  {
    name: "Beedrill",
    height: 1.0,
    type: ["Bug", "Poison"]
  },
  {
    name: "Fearow",
    height: 1.2,
    type: ["Flying", "Normal"]
  },
  {
    name: "Nidoran",
    height: 0.4,
    type: ["Poison"]
  }
];

function getAll () {
  return pokemonList;
}

function add(pokemon) {
  pokemonList.push(pokemon);
}

return {
  getAll: getAll,
  add: add
};
}) ();

pokemonRepository.getAll().forEach(function(pokemon){
  document.write(pokemon.name + "<br>");
  document.write("Type:" + " " + pokemon.type + " " + "---" + " ");
  document.write(" " + "Height:" + " " + pokemon.height + "<br>");
});

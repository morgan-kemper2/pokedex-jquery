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
for (let i = 0; i < pokemonList.length; i++) {
  document.write(' Name: ' + pokemonList[i].name + ' /Height: ' + pokemonList[i].height + ' /Type: ' + pokemonList[i].type);
  document.write("<br>");
  if (pokemonList[i].height >= 4) {
    document.write("Wow! That is Big!");
    document.write("<br>");
  } else {
    document.write("");
  }
};

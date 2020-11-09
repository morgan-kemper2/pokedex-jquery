let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (typeof pokemon === "object" &&
    "name" in pokemon &&
    "detailsUrl" in pokemon
    ) {
    pokemonList.push(pokemon);
  } else {
    console.log("pokemon is not correct");
  } 
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokeItem = $('.pokelist');
    let listItem = $('<li class = "list-i"></li>');
    let button = $('<button class = "btnclass">'+ pokemon.name +'</button>');
    button.attr("data-toggle", "modal");
    button.attr("data-target", "#pokemonModal");
    listItem.append(button);
    pokeItem.append(listItem);
    button.on('click', function(){
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      // console.log(pokemon);
      showModal(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then((response) => {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.other.dream_world.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = []
      details.types.forEach(function(itemType){
        item.types.push(itemType.type.name)
      });
      item.abilities = []
      details.abilities.forEach(function(itemAbilities){
        item.abilities.push(itemAbilities.ability.name)
      })
    }).catch(function (e) {
      console.error(e);
    });
  }

 

  function showModal(pokemon) {
    let modalTitle = $(".modal-title");
    let modalBody = $(".modal-body");
    modalTitle.empty();
    modalBody.empty();

    let nameElement = $("<h1>" + pokemon.name + "</h1>");
    let imageElement = $('<img></img>');
    imageElement.attr("src", pokemon.imageUrl);
    let heightElement = $("<p>" + "Height: " + pokemon.height + "</p>");
    let weightElement = $("<p>" + "Weight: " + pokemon.weight + "</p>");
    let typeElement = $("<p>" + "Types: " + pokemon.types + "</p>");
    let abilityElement = $("<p>" + "Abilities: " + pokemon.abilities + "</p>")

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typeElement);
    modalBody.append(abilityElement);
  }

return {
  getAll: getAll,
  add: add,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails,

}

})();

// console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});


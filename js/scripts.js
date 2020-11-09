let pokemonRepository = (function () {
  let modalContainer = document.querySelector('#modal-container');
  let pokemonList = []
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
    // let pokeItem = document.querySelector(".pokelist");
    let pokeItem = $('.pokelist');
    // let ul = document.createElement("ul");
    // ul.classList.add("pokelist");
    // let listItem = document.createElement("li");
    let listItem = $('<li class = "list-i"></li>');
    // listItem.classList.add('list-i');
    let button = $('<button class = "btnclass">'+ pokemon.name +'</button>');
    // button.classList.add('btnclass');
    // button.innerText = pokemon.name;
    // console.log(button);
    // document.body.appendChild(ul);
    button.on('click', function(){
      showDetails(pokemon);
    })
    listItem.append(button);
    pokeItem.append(listItem);
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
      item.imageUrlAnimated = details.sprites.versions['generation-v']['black-white'].animated.front_default;
      item.height = details.height;
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

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
      console.log(pokemon);
    });
  }


  function showModal(pokemon) {
    let modalContainer = $('#modal-container');
    modalContainer.empty();

    let modal = $('<div class = "modal"></div>');
    // modal.classList.add('modal');

    let closeButtonElement = $('<button class = "modal-close">X</button>');
    // closeButtonElement.classList.add('modal-close');
    // closeButtonElement.innerText = 'X';
    closeButtonElement.on('click', hideModal);

    let titleElement = $('<h1>' + pokemon.name + '</h1>');
    // titleElement.innerText = pokemon.name;

    let contentElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');
    // contentElement.innerText = 'Height: ' + pokemon.height;

    let myImage = $('<img class = "modal-img"></img>');
    // myImage.classList.add('modal-img');
    myImage.attr('src', pokemon.imageUrl);
    // let myImageAnimated = document.createElement('img');
    // myImageAnimated.classList.add('modal-img-animated');
    // myImageAnimated.src = pokemon.imageUrlAnimated;

    let types = $('<h3>' + 'Type: ' + pokemon.types + '</h3>');
    // types.innerText = 'Type: ' + pokemon.types;

    let abilities = $('<h4>' + 'Abilities ' + pokemon.abilities + '</h4>');
    // abilities.innerText = 'Abilities: ' + pokemon.abilities;

    modal.append(closeButtonElement);
    modal.append(titleElement);
    modal.append(myImage);
    // modal.append(myImageAnimated);
    modal.append(contentElement);
    modal.append(types);
    modal.append(abilities);
    modalContainer.append(modal);
    modalContainer.addClass('is-visible');
  }

  function hideModal() {
    let $modalContainer = $("#modal-container");
    $modalContainer.removeClass("is-visible");
  }
  //hides modal when clicked on ESC on keyboard
  jQuery(window).on("keydown", (e) => {
    let $modalContainer = $("#modal-container");
    if (
      e.key === "Escape" &&
      $modalContainer.classList.contains("is-visible")
    ) {
      hideModal();
    }
  });
  //hides modal if clicked outside of it
    let $modalContainer = document.querySelector("#modal-container");
    $modalContainer.addEventListener("click", (e) => {
      var target = e.target;
      if (target === $modalContainer) {
        hideModal();
      }
    });


return {
  getAll: getAll,
  add: add,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails,
  showModal: showModal,
  hideModal: hideModal
}

})();

// console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});


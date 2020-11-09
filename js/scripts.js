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
    let pokeItem = document.querySelector(".pokelist");
    // let ul = document.createElement("ul");
    // ul.classList.add("pokelist");
    let listItem = document.createElement("li");
    pokeItem.appendChild(listItem);
    listItem.classList.add('list-i');
    let button = document.createElement('button');
    button.classList.add('btnclass');
    button.innerText = pokemon.name;
    // console.log(button);
    // document.body.appendChild(ul);
    button.addEventListener('click', function(){
      showDetails(pokemon);
    })
    listItem.appendChild(button);
    
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
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;

    let contentElement = document.createElement('p');
    contentElement.innerText = 'Height: ' + pokemon.height;

    let myImage = document.createElement('img');
    myImage.classList.add('modal-img');
    myImage.src = pokemon.imageUrl;
    // let myImageAnimated = document.createElement('img');
    // myImageAnimated.classList.add('modal-img-animated');
    // myImageAnimated.src = pokemon.imageUrlAnimated;

    let types = document.createElement('h3');
    types.innerText = 'Type: ' + pokemon.types;

    let abilities = document.createElement('h4');
    abilities.innerText = 'Abilities: ' + pokemon.abilities;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(myImage);
    // modal.appendChild(myImageAnimated);
    modal.appendChild(contentElement);
    modal.appendChild(types);
    modal.appendChild(abilities);
    modalContainer.appendChild(modal);
    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    let $modalContainer = document.querySelector("#modal-container");
    $modalContainer.classList.remove("is-visible");
  }
  //hides modal when clicked on ESC on keyboard
  window.addEventListener("keydown", (e) => {
    let $modalContainer = document.querySelector("#modal-container");
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


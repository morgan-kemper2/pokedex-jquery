let pokemonRepository=function(){let e=[],t="https://pokeapi.co/api/v2/pokemon/?limit=150";function o(t){"object"==typeof t&&"name"in t&&"detailsUrl"in t?e.push(t):console.log("pokemon is not correct")}function n(e){r(e).then(function(){l(e)})}function r(e){let t=e.detailsUrl;return fetch(t).then(e=>e.json()).then(function(t){e.imageUrl=t.sprites.other.dream_world.front_default,e.height=t.height,e.weight=t.weight,e.types=[];for(let o=0;o<t.types.length;o++)e.types.push(" "+t.types[o].type.name);e.abilities=[];for(let o=0;o<t.abilities.length;o++)e.abilities.push(" "+t.abilities[o].ability.name)}).catch(function(e){console.error(e)})}function l(e){let t=$(".modal-title");t.empty();$(".modal-header");let o=$('<h1 style="color: white;">'+e.name+"</h1>"),n=$(".modal-body");n.empty();let r=$('<img class="modal-img" alt="..." style="width: 50%; padding: 30px;">');r.attr("src",e.imageUrl);let l=$('<h4 style="background-color:#d88780; padding: 5px; color: white;">Profile</h4>'),a=$("<p><strong>Height</strong>: "+e.height+'"</p>'),s=$("<p><strong>Type</strong>: "+e.types+"</p>"),d=$("<p><strong>Abilities</strong>: "+e.abilities+"</p>");t.append(o),n.append(r),n.append(l),n.append(a),n.append(s),n.append(d),e.types.includes("grass")?$(".modal-header").css("background-color","rgb(120, 200, 80)"):e.types.includes("fire")?$(".modal-header").css("background-color","rgb(240, 128, 48)"):e.types.includes("poison")?$(".modal-header").css("background-color","rgb(168, 144, 240)"):e.types.includes("water")?$(".modal-header").css("background-color","rgb(104, 144, 240)"):e.types.includes("bug")?$(".modal-header").css("background-color","rgb(168, 184, 32)"):e.types.includes("water")?$(".modal-header").css("background-color","rgb(69, 120, 237)"):e.types.includes("ice")?$(".modal-header").css("background-color","rgb(66, 174, 174)"):e.types.includes("electric")?$(".modal-header").css("background-color","rgb(252, 234, 161)"):e.types.includes("ground")?$(".modal-header").css("background-color","rgb(219, 181, 77)"):e.types.includes("fairy")?$(".modal-header").css("background-color","rgb(232, 120, 144)"):e.types.includes("ghost")?$(".modal-header").css("background-color","rgb(100, 78, 136)"):e.types.includes("normal")&&$(".modal-header").css("background-color","rgb(156, 156, 99)")}return{getAll:function(){return e},add:o,addListItem:function(e){pokemonRepository.loadDetails(e).then(function(){let t=$(".row"),o=$('<div class="card mt-5" style="width: 18rem; margin:13px;"></div>'),r=$('<img class="card-img-top mx-auto" style="width: 35%;" alt="...">'),l=$('<h5 class="card-title">'+e.name+"</h5>");r.attr("src",e.imageUrl);let a=$('<div class="card-body" style="text-align: center;"></div>'),s=$('<button type="button" class="btn" style="background-color: #d88780; color: white" data-toggle="modal" data-target="#pokemonModal">See profile</button>');t.append(o),o.append(r),o.append(a),a.append(l),a.append(s),s.on("click",function(t){n(e)})})},loadList:function(){return fetch(t).then(function(e){return e.json()}).then(function(e){e.results.forEach(function(e){o({name:e.name,detailsUrl:e.url})})}).catch(function(e){console.error(e)})},loadDetails:r,showDetails:n,showModal:l}}();function search(){let e,t,o,n,r,l,a;for(t=(e=document.getElementById("myInput")).value.toUpperCase(),n=(o=document.getElementById("myrow")).querySelectorAll(".card"),l=0;l<n.length;l++)(a=(r=n[l].querySelector(".card-body").querySelector(".card-title")).textContent||r.innerText).toUpperCase().indexOf(t)>-1?n[l].style.display="":n[l].style.display="none"}pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})});
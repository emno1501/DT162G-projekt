"use strict";

//URL till webbtjänst
let url = "https://sleepy-tundra-34734.herokuapp.com/api/recipes";

// Ny instans av Vue
let app = new Vue({
    el: '#app',
    data: {
        recipes: "",
        date: new Date().getFullYear()
    },
    created() {
        this.get(); // När Vue-instansen skapas anropa metoden get som hämtar datan från rest api:et
    },
    computed: {
        // Funktion som kortar av arrayen med recept till fyra recept och returnerar dessa
        startrecipes: function() {
            this.recipes.slice(0, 4);
            return this.recipes;
        }
    },
    methods: {
        // Hämtar datan med fetch api
        get: function() {
            fetch(url)
            .then((res) => res.json())
            .then((data) => this.recipes = data)
            .catch((err) => console.log(err)); 
            
        },
        // Möjliggör funktion att fälla ned och upp receptboxarna för att visa mer eller mindre
        readMore: function(event) {
            if (event.target.parentElement.style.height != "unset") {
                event.target.parentElement.style.height = "unset";
                event.target.innerHTML = "Läs mindre";
                event.target.style.bottom = "-3%";
            } else {
                event.target.parentElement.style.height = "450px";
                event.target.innerHTML = "Läs mer";
                event.target.style.bottom = "-5%";

            }
        }
    }
});
//Ändra färg på header när man scrollar nedåt
window.onscroll = function() {
    var header = document.getElementById('header');
    if (window.scrollY > 350) {
      header.classList.add('headerBackground');
    } else {
      header.classList.remove('headerBackground');
    }
  }


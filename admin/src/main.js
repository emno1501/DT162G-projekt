"use strict";

//URL till webbtjänst
let url = "https://sleepy-tundra-34734.herokuapp.com/api/recipes";

// Ny VUe-instans
let app = new Vue({
    el: '#app',
    data: {
        recipeList: "",
        new_recipename: "",
        new_ingredients: "",
        new_instruction: "",
        new_time: "",
        new_portions: "",
        new_image: ""
    },
    created() { // Vid skapande av Vue-instansen:
        // Kontrollera inlogg 
        if (!localStorage.getItem("username")) {
            window.location.replace("adminlogin.html");
        }
        // Anropa metod som hämtar data från rest api
        this.get();
    },
    methods: {
        get: function() { // Hämta alla recept med fetch api
            fetch(url)
            .then((res) => res.json())
            .then((data) => {
                for (let i = 0; i<data.length; i++)
                {
                    // Gör om ingrediens- och instruktionsarrayerna till textsträngar
                    data[i].ingredients = data[i].ingredients.join("\n");
                    data[i].instruction = data[i].instruction.join("\n");
                }

                this.recipeList = data}) // Lagra datan i recipeList i Vue:s data
            .catch((err) => console.log(err)); 
            
        },
        del: function(id) { // Ta bort recept
            if(!id) {
                alert("Ladda om sidan innan borttagning kan genomföras.");
            } else {
                fetch(url+"/delete/" + id, { //Lägger till IDt som skickades med som argument till url:en
                    method: "DELETE",
                })
                .then((res) => res.json())
                .then((data) => console.log(data))
                .catch((err) => console.log(err));
                let found = -1;
                // Ta bort receptet ur recipeList-arrayen för att se aktuell receptlista utan att behöva ladda om sidan
                for (let i = 0; i < this.recipeList.length; i++) {
                    if(id == this.recipeList[i]._id) {
                        found = i;
                        if (found != -1) {
                            this.recipeList.splice(found, 1);
                        }
                    }
                }
            }
            
        },
        add: function(event) { // Lägg till nytt recept
            let new_ingredients = this.new_ingredients.split("\n"); // Gör array av ingrediens-textsträng
            let new_instruction = this.new_instruction.split("\n"); // Gör array av instruktion-textsträng
            let ob = {};
            // Lagra värden från inputfälten i ett objekt
            ob.recipeName = this.new_recipename;
            ob.ingredients = new_ingredients;
            ob.instruction = new_instruction;
            ob.time = parseInt(this.new_time);
            ob.portions = parseInt(this.new_portions);
            ob.image = this.new_image;

            let jsonStr = JSON.stringify(ob); // Konvertera objekt till JSON
            fetch(url + "/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: jsonStr // Skicka med JSON-strängen i fetch-anropet
            }) .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
            
            // Gör textsträngar av ingrediens- och instruktions-array igen
            ob.ingredients = ob.ingredients.join("\n");
            ob.instruction = ob.instruction.join("\n");
            this.recipeList.unshift(ob); // Lägg till objektet först i arrayen med resterande recept för att se det tillagda receptet utan att behöva ladda om sida
            // Töm inputfälten i lägg till-formuläret
            this.new_recipename = this.new_ingredients = this.new_instruction = this.new_time = this.new_portions = this.new_image = "";
            
        },
        upd: function(event) { // Uppdatera recept
            
            let updValueArr = event.target.value.split("|"); // Gör array av den textsträng med inputfältens värden som lagrats i uppdatera-knappens value-attribut
            let ingredients = updValueArr[1].split("\n"); // Gör array av ingrediens-textsträngen
            let instruction = updValueArr[2].split("\n"); // Gör array av instruktion-textsträngen
            let ob = {};
            // Lagra värden från arrayen som skapats i ett objekt
            ob.recipeName = updValueArr[0];
            ob.ingredients = ingredients;
            ob.instruction = instruction;
            ob.time = parseInt(updValueArr[3]);
            ob.portions = parseInt(updValueArr[4]);
            ob.image = updValueArr[5];

            let jsonStr = JSON.stringify(ob); // KOnvertera objektet till JSON
            if(!event.target.id) {
                alert("Ladda om sidan innan uppdatering kan genomföras.");
            } else {
                fetch(url+"/update/" + event.target.id, { //Lägger till IDt till url:en
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: jsonStr // Skicka med JSON-strängen i anropet
                })
                .then((res) => res.json())
                .then((data) => console.log(data))
                .catch((err) => console.log(err))
            }
        },
        logout: function(event) { // Loggar ut admin när denne klickar på logga ut-knappen
            localStorage.clear(); // Tar bort lagrat värde som bekräftar inloggning i localStorage
            location.replace("adminlogin.html"); // Skickar användare till logga in-sidan
        },
        readMore: function(event) { // Möjliggör att fälla ned och upp boxarna med formulären frö att visa mer/mindre
            if (event.target.parentElement.style.height != "unset") {
                event.target.parentElement.style.height = "unset";
                event.target.innerHTML = "Visa mindre";
            } else {
                event.target.parentElement.style.height = "25px";
                event.target.innerHTML = "Visa mer";

            }
        }
    }
});
 


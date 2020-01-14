"use strict"; //URL till webbtjänst

let url = "https://sleepy-tundra-34734.herokuapp.com/api/recipes";
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

  created() {
    // Kontrollera inlogg
    if (!localStorage.getItem("username")) {
      window.location.replace("adminlogin.html");
    }

    this.get();
  },

  methods: {
    get: function () {
      fetch(url).then(res => res.json()).then(data => {
        for (let i = 0; i < data.length; i++) {
          data[i].ingredients = data[i].ingredients.join("\n");
          data[i].instruction = data[i].instruction.join("\n");
        }

        this.recipeList = data;
      }).catch(err => console.log(err));
    },
    del: function (id) {
      fetch(url + "/delete/" + id, {
        //Lägger till IDt från det element som användaren klickade på till url:en
        method: "DELETE"
      }).then(res => res.json()).then(data => console.log(data)).catch(err => console.log(err));
      let found = -1;

      for (let i = 0; i < this.recipeList.length; i++) {
        if (id == this.recipeList[i]._id) {
          found = i;

          if (found != -1) {
            this.recipeList.splice(found, 1);
          }
        }
      }
    },
    add: function (event) {
      let new_ingredients = this.new_ingredients.split("\n");
      let new_instruction = this.new_instruction.split("\n");
      let ob = {};
      ob.recipeName = this.new_recipename;
      ob.ingredients = new_ingredients;
      ob.instruction = new_instruction;
      ob.time = parseInt(this.new_time);
      ob.portions = parseInt(this.new_portions);
      ob.image = this.new_image;
      let jsonStr = JSON.stringify(ob);
      fetch(url + "/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: jsonStr
      }).then(res => res.json()).then(data => console.log(data)).catch(err => console.log(err));
      ob.ingredients = ob.ingredients.join("\n");
      ob.instruction = ob.instruction.join("\n");
      this.recipeList.unshift(ob);
      this.new_recipename = this.new_ingredients = this.new_instruction = this.new_time = this.new_portions = this.new_image = "";
    },
    upd: function (event) {
      let updValueArr = event.target.value.split("|");
      let ingredients = updValueArr[1].split("\n");
      let instruction = updValueArr[2].split("\n");
      let ob = {};
      ob.recipeName = updValueArr[0];
      ob.ingredients = ingredients;
      ob.instruction = instruction;
      ob.time = parseInt(updValueArr[3]);
      ob.portions = parseInt(updValueArr[4]);
      ob.image = updValueArr[5];
      let jsonStr = JSON.stringify(ob);
      fetch(url + "/update/" + event.target.id, {
        //Lägger till IDt till url:en
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: jsonStr
      }).then(res => res.json()).then(data => console.log(data)).catch(err => console.log(err));
    },
    logout: function (event) {
      localStorage.clear();
      location.replace("adminlogin.html");
    },
    readMore: function (event) {
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
//# sourceMappingURL=main.js.map

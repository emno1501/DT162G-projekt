"use strict"; //URL till webbtjänst

let loginurl = "https://sleepy-tundra-34734.herokuapp.com/login"; // Ny instans av Vue

let login = new Vue({
  el: '#login',
  data: {
    input_username: "",
    input_password: "",
    username: "",
    password: "",
    message: ""
  },

  created() {
    this.getData();
  },

  methods: {
    getData: function () {
      // Hämtar användarnamn och lösenord som finns lagrat i databasen
      fetch(loginurl + "/get").then(res => res.json()).then(data => {
        // Lagrar hämtade datan i variabler i Vue:s data
        this.username = data[0].username;
        this.password = data[0].password;
      }).catch(err => console.log(err));
    },
    log_in: function (event) {
      // Kontrollerar användarnamn och lösen från inloggningsformuläret och 
      // loggar in användare om dessa stämmer överens med inloggningsuppgifterna hämtade från databasen
      if (this.username == this.input_username && this.password == this.input_password) {
        localStorage.setItem("username", this.username);
        location.replace("admin.html");
      } else {
        this.message = "Användarnamn eller lösenord är felaktigt"; // Felmeddelande
      }
    }
  }
});
//# sourceMappingURL=login.js.map

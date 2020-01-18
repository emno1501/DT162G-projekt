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

  created() {//this.getData();
  },

  methods: {
    getData: function () {
      // Hämtar användarnamn och lösenord som finns lagrat i databasen
      fetch(loginurl + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: jsonStr // Skicka med JSON-strängen i fetch-anropet

      }).then(res => res.json()).then(data => {
        // Lagrar hämtade datan i variabler i Vue:s data
        if (data.message = "Inloggad") {
          this.loggedin = true;
        } else if (data.message == "Fel_Login") {
          this.message = "Användarnamn eller lösenord är felaktigt"; // Felmeddelande
        }
      }).catch(err => console.log(err));
    },
    log_in: function (event) {
      let ob = {}; // Lagra värden från inputfälten i ett objekt

      ob.username = this.input_username;
      ob.password = this.input_password;
      let jsonStr = JSON.stringify(ob); // Konvertera objekt till JSON

      fetch(loginurl + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: jsonStr // Skicka med JSON-strängen i fetch-anropet

      }).then(res => res.json()).then(data => {
        // Lagrar hämtade datan i variabler i Vue:s data
        if (data.message == "Inloggad") {
          localStorage.setItem("username", this.input_username);
          location.replace("admin.html");
        } else if (data.message == "Fel_Login") {
          this.message = "Användarnamn eller lösenord är felaktigt"; // Felmeddelande
        }
      }).catch(err => console.log(err)); // Kontrollerar användarnamn och lösen från inloggningsformuläret och 
      // loggar in användare om dessa stämmer överens med inloggningsuppgifterna hämtade från databasen

      /* if (this.loggedin == true) {
          localStorage.setItem("username", this.input_username);
          location.replace("admin.html");
      } else {
          this.message = "Användarnamn eller lösenord är felaktigt"; // Felmeddelande
      } */
    }
  }
});
//# sourceMappingURL=login.js.map

"use strict";

//URL till webbtjänst
let loginurl = "https://sleepy-tundra-34734.herokuapp.com/login";

let login = new Vue({
    el: '#login',
    data: {
        input_username: "",
        input_password: "",
        username: "",
        password: "",
        message: ""
        
    },
    methods: {
        getData: function(event) {
            fetch(loginurl+"/get")
            .then((res) => res.json())
            .then((data) => {
                this.username = data[0].username;
                this.password = data[0].password;   
            })
            .catch((err) => console.log(err));
        },
        log_in: function(event) {
            if (this.username == this.input_username && this.password == this.input_password) {
                localStorage.setItem("username", this.username);
                location.replace("admin.html");
            } else {
                this.message = "Användarnamn eller lösenord är felaktigt";
            }
            
                /* console.log("input: " + this.input_username);
                console.log("data: " + this.username);
                console.log("local storage: " + localStorage.getItem("username")); */
        },
        upd: function(event) {
            
            let updValueArr = event.target.value.split(", ");
            let ingredients = updValueArr[1].replace("[", "").replace("]", "");
            let instruction = updValueArr[2].replace("[", "").replace("]", "");
            let ob = {};
            ob.recipeName = updValueArr[0];
            ob.ingredients = ingredients.split(",\n");
            ob.instruction = instruction.split("\n");
            ob.time = parseInt(updValueArr[3]);
            ob.portions = parseInt(updValueArr[4]);
            ob.image = updValueArr[5];

            let jsonStr = JSON.stringify(ob);

            fetch(loginurl+"/update/" + event.target.id, { //Lägger till IDt till url:en
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: jsonStr
            })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
        }
    }
});
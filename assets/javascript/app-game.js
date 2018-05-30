

  // Initialize Firebase
var config_game = {
    apiKey: "AIzaSyAaV6Uv70z82Irs2DQBwRVd6sdkwpD0m8s",
    authDomain: "unit7-game.firebaseapp.com",
    databaseURL: "https://unit7-game.firebaseio.com",
    projectId: "unit7-game",
    storageBucket: "",
    messagingSenderId: "344398316702"
};
var firebase_game = firebase.initializeApp(config_game);
var database_game = firebase_game.database();

var vacancy = 2, total_win;
var initial_name, initial_choice;
var player1_name, player2_name, player1_choice, player2_choice;
var you_name = initial_name, oppo_name, you_choice = initial_choice, oppo_choice;

$("#submitButton").on("click", function(event) {
    event.preventDefault();

    console.log("current vacancy is: " + vacancy);

    initial_name = $("#username").val();
    initial_choice = $("input[name=options]:checked").val();

    database_game.ref().update({
        vac: vacancy
    });
    console.log("CLICK: " + initial_choice + " " + initial_name);

    // database_game.ref().set({
    //     vac: vacancy
    // });


database_game.ref().on("value", function(snapshot) {

    // !snapshot.child("vac") || 

    if(snapshot.val().vac == 2) {
        vacancy = 1;
        database_game.ref().set({
            // vac: 1,
            p1: initial_name,
            c1: initial_choice
        });
        // vacancy = snapshot.val().vac;
        // console.log(vacancy);
    }
    else if (snapshot.val().vac == 1 && snapshot.child("p1").exists() && snapshot.child("c1").exists()) {
        vacancy = 0;
        database_game.ref().update({
            // vac: 0,
            p2: initial_name,
            c2: initial_choice
        });
        // vacancy = snapshot.val().vac;
        // console.log(vacancy);
    };

    database_game.ref().update({
        vac: vacancy
    });

    if(vacancy == 0) {
        total_win = $("#win-count").val();
        player1_name = snapshot.val().p1;
        player2_name = snapshot.val().p2;
        player1_choice = snapshot.val().c1;
        player2_choice = snapshot.val().c2;
    
        console.log(vacancy + player1_name +player2_name + player1_choice + player2_choice);
    
        if(initial_name == player1_name) {
            oppo_name = player2_name;
            oppo_choice = player2_choice;
        }
        else if (initial_name == player2_name) {
            oppo_name = player1_name;
            oppo_choice = player1_choice;
        };
    
        if ((you_choice == "r" && oppo_choice == "s") ||
            (you_choice == "p" && oppo_choice == "r") ||
            (you_choice == "s" && oppo_choice == "p")) {
                total_win++;
                $("#win-count").text(total_win);
        };
        
        vacancy = 2;
        database_game.ref().update({
            vac: vacancy
        });
    }
    


})

})

function gameStart() {
    total_win = $("#win-count").val();
    player1_name = snapshot.val().p1;
    player2_name = snapshot.val().p2;
    player1_choice = snapshot.val().c1;
    player2_choice = snapshot.val().c2;

    console.log(vacancy + player1_name +player2_name + player1_choice + player2_choice);

    if(initial_name == player1_name) {
        oppo_name = player2_name;
        oppo_choice = player2_choice;
    }
    else if (initial_name == player2_name) {
        oppo_name = player1_name;
        oppo_choice = player1_choice;
    };

    if ((you_choice == "r" && oppo_choice == "s") ||
        (you_choice == "p" && oppo_choice == "r") ||
        (you_choice == "s" && oppo_choice == "p")) {
            total_win++;
            $("#win-count").text(total_win);
    };
    
    vacancy = 2;
    database_game.ref().update({
        vac: vacancy
    });
}


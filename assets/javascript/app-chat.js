  // Initialize Firebase
var config_chat = {
    apiKey: "AIzaSyAOizBa0q6H98llDEoNIfhi8j9bUViiU3U",
    authDomain: "unit7-chat.firebaseapp.com",
    databaseURL: "https://unit7-chat.firebaseio.com",
    projectId: "unit7-chat",
    storageBucket: "unit7-chat.appspot.com",
    messagingSenderId: "145724070068"
};
var firebase_chat = firebase.initializeApp(config_chat);
var database_chat = firebase_chat.database();
    
var userName = "";
var previousText;

database_chat.ref().on('child_added', function(childsnapshot) {
    previousText = msg.text();
    msg.text(`${previousText}\n${childsnapshot.val().username}: ${childsnapshot.val().message}`);
    
    msg.scrollTop(msg[0].scrollHeight);
})

database_chat.ref().once('value').then(function(snapshot) {
    var storeCurrent = msg.val();
    if(storeCurrent === undefined) {
        storeCurrent = "";
    };

    msg.text(storeCurrent);

});

$("#username").on("change", function(event) {

    userName = $("#username").val();

})

$("#submitButton2").on("click", function(event) {
    event.preventDefault();

    var msgContent = $("#message").val();

    database.ref().push({
        username: userName,
        message: msgContent
    });

})
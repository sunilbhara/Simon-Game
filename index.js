// alert("Jai ganesha");

var buttonColoures = ["darkcyan","orange","lightgreen","purple"];

var gamepattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// identify that which is key has been pressed any perform task when user click any key
$(document).keypress(function() {
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

// perform operation when user click on any button display on screen 
$(".btn").click(function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

})

// check whether user enter correct sequence or not
function checkAnswer(currentLevel) {

    if(gamepattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("suceess");

        // if user enter correct sequence
        if(userClickedPattern.length === gamepattern.length) {
            setTimeout(function () {
                nextSequence();
            },1000);
        }
    }

    // if user enter incorrect sequence
    else {
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }

}

// For restart the game if user enter wrong sequence
function startOver() {
    level = 0;
    gamepattern = [];
    started = false;
}

// for genrating a randomnumber so that a random button will display
function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor((Math.random() * 4));
    var randomchosenColour = buttonColoures[randomNumber];
    gamepattern.push(randomchosenColour);

    $("#" + randomchosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomchosenColour);

}

// for playing sound on buttons
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// for play animation on buttons
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout (function(){
        $("#" + currentColour).removeClass("pressed")
    },100);
}











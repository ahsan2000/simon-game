// initiating variables
var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = []; //random colors saving in this array
var userClickedPattern = []; //user clicked colors saving in this array
var level = 0; // game level
var started = false; // toggle var to start the game

// main function
function newSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenNumber = buttonColors[randomNumber];
    gamePattern.push(randomChosenNumber);
    //reset user click pattern every time
    userClickedPattern = [];
    level++; //increasing level
    $("h1").text("Level " + level); // changing levels

    // input in sound function
    makeSound(randomChosenNumber);

    // animate the button
    $("#" + randomChosenNumber).fadeOut(100).fadeIn(100);
}

// checking answer against the random colors
function checkAnswer(currentLevel){
    // checking user data against game Pattern
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) { //checking is length of user clicks is equal to game Patten
            setTimeout(() => {
                newSequence();
            }, 1000);
        }
    } else {
        makeSound("wrong");
        $("body").addClass("game-over"); //add class to show warning in background
        $("h1").text("Game Over, Press Any Key to Restart."); // changing tittle to restart the game

        setTimeout(() => { //removing class of warning to show like flash
            $("body").removeClass("game-over");
        }, 200);

        // calling function to reset the game
        startOver();
    }
}

// storing data by clicking on buttons
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    // calling  functions
    makeSound(userChosenColor);
    buttonAnimation(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

// for animation by clicking on buttons
function buttonAnimation(currentKey){
    var activeButton = document.querySelector("." + currentKey);
    activeButton.classList.add("pressed");
    setTimeout(function(){
        activeButton.classList.remove("pressed");
    }, 100);
}

// sounds
function makeSound(soundKey) {
    var playSound = new Audio("sounds/" + soundKey + ".mp3");
    playSound.play();
}

// resetting the game
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

// calling main function
$("body").keydown(function () { 
    if (!started){
        $("h1").text("Level " + level);
        newSequence();
        started = true;
    }
});
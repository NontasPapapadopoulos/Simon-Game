var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var gameOn = false;

$(document).keypress(function () {
    if (!gameOn) {
        $("#level-title").text("Level " + level);
        nextSequence();
        gameOn = true;
    }
});



// play Sounds
function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3")
    audio.play();
}

// click and playSound and animate
$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

// animates 
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}




function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }

    else {
        $("#level-title").text("Game Over, Press Any Key to Restart");

        playSound("wrong");

        $("body").addClass(".game-over");
        setTimeout(function () {
            $("body").removeClass(".game-over");
        }, 200);

        startOver();
    }
}




function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level: " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}



function startOver() {
    level = 0;
    gamePattern = [];
    gameOn = false;
}













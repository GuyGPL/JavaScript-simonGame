buttonColors = ["red", "blue", "green", "yellow"]
gamePattern = []
userPattern = []
var level = 0
var started = false


// first set up when user press key
$(document).keypress(function() {
  if (started != true) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true
    console.log("start over")
  }
})

userInput();

// ===========================================================================

function nextSequence() {
  // add random selected color's button to gamePattern array, change h1 text, make fade animation, make sound, and clear userPattern.
  level++
  var ranNum = Math.floor(Math.random() * 3)
  var randomChosenColour = buttonColors[ranNum]
  gamePattern.push(randomChosenColour)

  $("#level-title").text("Level " + level);
  $("#" + randomChosenColour).fadeOut(200).fadeIn(200)
  makeSound(randomChosenColour)
  userPattern = []
}

// ===========================================================================

function userInput() {
  // add selected button by user to userPattern array by using button's id, make sound, animation and check answer.
  $(".btn").click(function() {
    var userChick = $(this).attr("id")
    userPattern.push(userChick)
    makeSound(userChick)
    animatePress($(this))
    chackAnswer(level)
  })
}
// ===========================================================================

function animatePress(button) {
  //  make animation when press buttons
  $(button).addClass("pressed");
  setTimeout(function() {
    $(button).removeClass("pressed")
  }, 100)

}
// ===========================================================================

function makeSound(colour) {
  // make sound when press buttons
  switch (colour) {
    case "green":
      var greenSound = new Audio("sounds/green.mp3")
      greenSound.play();
      break;
    case "blue":
      var blueSound = new Audio("sounds/blue.mp3")
      blueSound.play();
      break;
    case "red":
      var redSound = new Audio("sounds/red.mp3")
      redSound.play();
      break;
    case "yellow":
      var yellowSound = new Audio("sounds/yellow.mp3")
      yellowSound.play();
      break;
    default:
      console.log(buttonInnerHTML);
  }
}

// ==========================================================================

function chackAnswer(currentLevel) {
  // check answer by index
  if (userPattern[userPattern.length - 1] == gamePattern[userPattern.length - 1] && gamePattern.length != 0) {
    console.log("success")
    console.log(userPattern)
    console.log(gamePattern)
  }
  else if (userPattern[userPattern.length - 1] != gamePattern[userPattern.length - 1] && gamePattern.length != 0) {
    console.log("wrong");
    console.log(userPattern)
    console.log(gamePattern)
    $("#level-title").text("Game Over! Level " + currentLevel +", Press Any Key to Restart");
    gameOver()
    startOver()
  }

  if (userPattern.length == currentLevel && gamePattern.length != 0) {
    setTimeout(function() {
      nextSequence()
    }, 1000)
  }
}
// ==========================================================================

function gameOver() {
  // sound
  var gameOver = new Audio("sounds/wrong.mp3")
  gameOver.play();
  // animation
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over")
  }, 200)

}
// ===========================================================================

function startOver() {
  // reset game
  level = 0
  gamePattern = []
  started = false
}

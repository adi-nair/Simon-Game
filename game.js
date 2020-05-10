var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var isPress = false;
var gameOn = true;


$(document).keydown(function(){
  while (isPress === false){
    $("h1").text("Level " + level)
    isPress = true;
    nextSequence();

  }
});



$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  //$(this) allows us to access jquery methods. 'this' is pure JS and we cant put jQueryin it.
  userClickedPattern.push(userChosenColour);

  playMusic(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
})

function nextSequence(){
    userClickedPattern = [];
    level ++;
    $("h1").text("Level " + level);

    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    playMusic(randomChosenColour);
    $( "#"+ randomChosenColour).fadeOut(100).fadeIn(100);
    animatePress(randomChosenColour);
}

function checkAnswer(curLevel){
  if (userClickedPattern[curLevel] === gamePattern[curLevel]){
    console.log("success");

    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    playMusic("wrong");
    console.log("fail");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press Any Key to Restart");


    startOver();
    }
  }

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  isPress = false;

}

function playMusic(nombre){
  var sound = new Audio("sounds/"+nombre+".mp3");
  sound.play();
}

function animatePress(currentCol){
  $("#"+currentCol).addClass("pressed");
  setTimeout(function(){
    $("#"+currentCol).removeClass("pressed");
  }, 100);
}

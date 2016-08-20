

$(init)

function init() {


  console.log("hello");

  //setting up game object

  var game = {
    bestScore: 0
    
  }

  
  
  
  


  //adding functions to game object

  game.startNewGame = function(){
    //resets all variables
    // event.preventDefault();
    game.computerSequence = [];
    game.currentScore= 0;
    game.gameOn= true;
    game.round = 0;



    // launch game
    game.startNewRound();
    
  }


  game.startNewRound= function() {
    //resets variables except bestScore
    console.log("startNewRound");
    this.sequenceIndex= 0;
    playTunes();

    // game.computerSequence = [];
    // game.sequenceIndex= 0;
    this.round++;
  }

  

 

  game.processUserChoice= function(buttonId) {
    
    console.log("Button ID: " + buttonId + " computer id: " + game.computerSequence[game.sequenceIndex]);

    if(buttonId == game.computerSequence[game.sequenceIndex]){
    // sequenceIndex++;
    console.log("You win!");
    }

    if(game.sequenceIndex === game.computerSequence.length){
      // console.log("You win!");
     
      game.currentScore++;
      // console.log(game.currentScore);
    }
    else{
      console.log("Try again.");
    }

    // startNewRound();
  }


  //HTML (VIEW + CONTROLLER)
  
  function clickButtons(){
    var buttonId = this.getAttribute("value");
    game.processUserChoice(buttonId);
    
    // game.userSequence.push(buttonId);
    // console.log("User clicked = " + game.userSequence);
    console.log("User clicked = " + buttonId);
  }

  function playTunes() {
    // event.preventDefault();
    console.log("Play Tunes");
    
    randNum = (Math.floor((Math.random() * 4) + 1));
    game.computerSequence.push(randNum);
    console.log("Computer plays: " + game.computerSequence);
  

    //play buttons (sounds and highlight colors)
  }





  //START PROGRAM

  //add eventlisteners

  $("#newRound").on("click", game.startNewRound);
  $("li").on("click", clickButtons);

  game.startNewGame();



 

}



$(init)

function init() {


    console.log("hello");

    //setting up game object

    var game = {
        bestScore: 0

    }


    //adding functions to game object

    game.startNewGame = function() {
        //resets all variables
        // event.preventDefault();
        console.log("startNewGame");

        game.computerSequence = [];
        game.currentScore = 0;
        game.gameOn = true;
        game.round = 0;



        // launch game
        game.startNewRound();

    }


    game.startNewRound = function() {
        //resets variables except bestScore
        console.log("startNewRound");

        //this is the user index sequence
        this.sequenceIndex = 0;
        playTunes();

        // game.computerSequence = [];
        // game.sequenceIndex= 0;
        this.round++;
    }


    game.endGame = function() {
        console.log("endGame");
    }


    game.processUserChoice = function(buttonId) {

        console.log("Button ID: " + buttonId + " computer id: " + this.computerSequence[this.sequenceIndex]);

        if (buttonId == this.computerSequence[this.sequenceIndex]) {



            if (this.sequenceIndex === this.computerSequence.length - 1) {
                console.log("You win!");
                this.currentScore++;
                this.startNewRound();
            } else {
                this.sequenceIndex++;
            }

        } else {

            this.endGame();
        }


    }

    //HTML (VIEW + CONTROLLER)

    function clickButtons() {
        var buttonId = this.getAttribute("value");
        console.log("User clicked = " + buttonId);

        game.processUserChoice(buttonId);
    }


    function playTunes() {
        // event.preventDefault();
        console.log("Play Tunes");

        var randNum = (Math.floor((Math.random() * 4) + 1));
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
$(init)

function init() {


    console.log("hello");

    //setting up game object

    var game = {
        bestScore: 0

    }


    buttonInfos = [{
        color: "red",
        sound: "moo",
        timeout: 1000
    }, {
        color: "green",
        sound: "quack",
        timeout: 500
    }, {
        color: "blue",
        sound: "oink",
        timeout: 500
    }, {
        color: "yellow",
        sound: "woof",
        timeout: 500
    }]


    //adding functions to game object

    game.startNewGame = function() {
        //resets all variables
        // event.preventDefault();
        console.log("startNewGame");

        game.computerSequence = [];
        game.currentScore = 0;
        game.gameOn = true;
        game.round = 0;

        document.getElementById("message").innerHTML = "";
        document.getElementById("bestScore").innerHTML = "";




        // launch game
        game.startNewRound();

    }


    game.startNewRound = function() {
        //resets variables except bestScore
        console.log("startNewRound");

        //this is the user index sequence
        this.sequenceIndex = 0;

        var randNum = Math.floor((Math.random() * 4) + 1);
        this.computerSequence.push(randNum);

        setTimeout(playTunes, 1500);

        // game.computerSequence = [];
        // game.sequenceIndex= 0;
        this.round++;
    }









    game.endGame = function() {
        console.log("endGame");
        document.getElementById("message").innerHTML = "Game Over: Press START to try again.";
        document.getElementById("bestScore").innerHTML = "Best Score: " + game.bestScore;
        game.gameOn = false;

    }

    game.processUserChoice = function(buttonId) {

        if (game.gameOn === false) {
            return;
        }

        console.log("Button ID: " + buttonId + " computer id: " + this.computerSequence[this.sequenceIndex]);

        if (buttonId == this.computerSequence[this.sequenceIndex]) {



            if (this.sequenceIndex === this.computerSequence.length - 1) {
                console.log("You win!");
                this.currentScore++;
                this.bestScore = this.currentScore;
                this.startNewRound()

            } else {
                this.sequenceIndex++;
            }

        } else {

            this.endGame();
        }


    }


    //HTML (VIEW + CONTROLLER)
    var song;
    var audio;

    function clickButtons() {
        console.log("click");
        if (game.gameOn === false) {
            return;
        }

        var buttonId = this.getAttribute("value");
        song = this.getAttribute("sound");
        console.log("song: " + song);
        console.log("User clicked = " + buttonId);

        var buttonInfo = buttonInfos[buttonId - 1]

        this.style.backgroundColor = buttonInfo.color;

        audio = new Audio("sounds/" + buttonInfo.sound + ".wav");
        audio.play();



        game.processUserChoice(buttonId);
    }

    function mouseUp() {
        console.log("mouseUp");
        this.style.backgroundColor = "";
        audio.pause();

    }



    function FadeButton(buttonId) {
        var button = $("#square" + buttonId)
        var x = document.getElementsByTagName("li");
        x[buttonId - 1].style.backgroundColor = buttonColors[buttonId - 1];
        setTimeout(FadeButtonDone.bind(0, buttonId), 500)
        //button.fadeOut(200).fadeIn(200)
        //button.backgroundColor = "";
    }

    function FadeButtonDone(buttonId) {
        var button = $("#square" + buttonId)
            //button.backgroundColor = "red";
            //.fadeOut(200).fadeIn(200)
        var x = document.getElementsByTagName("li");
        x[buttonId - 1].style.backgroundColor = "";
    }


    function playTunes() {
        // event.preventDefault();
        console.log("Play Tunes");


        var x = document.getElementsByTagName("li");

        for (var i = 0; i < game.computerSequence.length; i++) {
            var buttonId = game.computerSequence[i];

            setTimeout(FadeButton.bind(0, buttonId), 750 * i)

        }



        console.log("Computer plays: " + game.computerSequence);

    }



    //START PROGRAM

    //add eventlisteners

    // $("#newRound").on("click", game.startNewRound);
    $("li").mousedown(clickButtons);
    $("li").mouseup(mouseUp);

    $("#startButton").on("click", game.startNewGame);
    game.startNewGame();



}
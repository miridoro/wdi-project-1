$(init)

function init() {


    //setting up game object

    var game = {
        bestScore: 0

    }

    buttonColors = [
        "red", "green", "blue", "yellow"
    ]


    buttonInfos = [{
        color: "red",
        sound: "sounds/moo.wav",
        timeout: 1000
    }, {
        color: "green",
        sound: "sounds/quack.wav",
        timeout: 500
    }, {
        color: "blue",
        sound: "sounds/oink.wav",
        timeout: 500
    }, {
        color: "yellow",
        sound: "sounds/woof.wav",
        timeout: 500
    }]


    //adding functions to game object

    game.startNewGame = function() {
        //resets all variables
        console.log("startNewGame");

        game.computerSequence = [];
        game.currentScore = 0;
        game.gameOn = true;


        $("#message").html("");
        $("#bestScore").html("");




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

    }



    game.endGame = function() {
        console.log("endGame");
        $("#message").html("Game Over: Press START to try again.");
        $("#bestScore").html("Best Score: " + game.bestScore);

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


    function clickButtons() {
        console.log("click");
        if (game.gameOn === false) {
            return;
        }

        var buttonId = $(this).attr("value");

        console.log("User clicked = " + buttonId);

        var buttonInfo = buttonInfos[buttonId - 1];

        $(this).css('background-color', buttonInfo.color);

        var audio = new Audio(buttonInfo.sound);
        audio.play();


        game.processUserChoice(buttonId);

    }

    function mouseUp() {
        console.log("mouseUp");
        $(this).css('background-color', '');
    }



    function FadeButton(buttonId) {
        // var button = $("#square" + buttonId)
        var x = $("li");
        x[buttonId - 1].style.backgroundColor = buttonColors[buttonId - 1];
        //setTimeout(FadeButtonDone.bind(0, buttonId), 500)
        //button.fadeOut(200).fadeIn(200)
        //button.backgroundColor = "";
        var pcbuttonInfo = buttonInfos[buttonId - 1]
        var audio = new Audio(pcbuttonInfo.sound);
        audio.play();
    }

    function FadeButtonDone(buttonId) {
        var button = $("#square" + buttonId)
            //button.backgroundColor = "red";
            //.fadeOut(200).fadeIn(200)
        var x = $("li");
        x[buttonId - 1].style.backgroundColor = "";
    }


    function playTunes() {
        console.log("Play Tunes");



        // for (var i = 0; i < game.computerSequence.length; i++) {
        //     var buttonId = game.computerSequence[i];

        //     setTimeout(FadeButton.bind(0, buttonId), 1000 * i);
        //     setTimeout(FadeButtonDone.bind(0, buttonId), 1000 * i + 500);

        // }


        $.each(game.computerSequence, function(i, buttonId) {
            for (var i = 0; i < game.computerSequence.length; i++) {
                var buttonId = game.computerSequence[i];

                setTimeout(FadeButton.bind(0, buttonId), 750 * i);
                setTimeout(FadeButtonDone.bind(0, buttonId), 750 * i + 500);

            }
        })

        console.log("Computer plays: " + game.computerSequence);

    }



    //START PROGRAM

    //add eventlisteners

    $("li").mousedown(clickButtons);
    $("li").mouseup(mouseUp);
    $("#startButton").on("click", game.startNewGame);

    game.startNewGame();


}
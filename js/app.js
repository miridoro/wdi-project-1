// PSEUDOCODE
// Start New Game as soon as webpage loads
// Set all variables 
// Generate a random number and add to computer sequence array
// Call playTunes() function to play audio files linked to values in computer array
// Now User can click animal images and audio files will play
// If there is a match, Score count will increase and game continues to next round
// If the user makes a mistake the game will end
// User can click the START button to start over game



$(init)

function init() {


    //setting up game object

    var game = {
        bestScore: 0
    }


    buttonInfos = [{
        color: "red",
        sound: "sounds/moo.wav",
        timeout: 1000
    }, {
        color: "green",
        sound: "sounds/oink.wav",
        timeout: 500
    }, {
        color: "blue",
        sound: "sounds/sheep.wav",
        timeout: 500
    }, {
        color: "yellow",
        sound: "sounds/rubberduck.wav",
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
        $("#message").html("GAME OVER! Press START to try again.");
        $("#bestScore").html("Best Score: " + game.bestScore);
        $("#currentScore").html("");

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
                $('#currentScore').html("Score: " + this.currentScore);
                this.bestScore = this.currentScore;
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
        if (game.gameOn === false) {
            return;
        }

        var buttonId = $(this).attr("value");

        //find() accesses child element of <li>
        var imageElem = $(this).find("img")[0];


        console.log(imageElem);
        console.log("User clicked = " + buttonId);

        var buttonInfo = buttonInfos[buttonId - 1];
        // $(this).css('background-color', buttonInfo.color);

        var audio = new Audio(buttonInfo.sound);
        audio.play();

        game.processUserChoice(buttonId);

    }

    function mouseUp() {
        console.log("mouseUp");
        $(this).css('background-color', '');
    }



    function FadeButton(buttonId) {

        console.log("This is this: " + this);

        if (game.gameOn === false) {
            return;
        }


        var lis = $(".animalButton");
        var buttonInfo = buttonInfos[buttonId - 1];
        // $(lis[buttonId - 1]).css('background-color', buttonInfo.color);

        var imageElem = $(lis[buttonId - 1]).find("img")[0];

        $(imageElem).addClass("animalImage_hover");

        //setTimeout(FadeButtonDone.bind(0, buttonId), 500)

        var audio = new Audio(buttonInfo.sound);
        audio.play();
    }


    function FadeButtonDone(buttonId) {

        var lis = $(".animalButton");
        var imageElem = $(lis[buttonId - 1]).find("img")[0];
        $(imageElem).removeClass("animalImage_hover");

        // $(lis[buttonId - 1]).css('background-color', '');
    }


    function playTunes() {
        console.log("Play Tunes");


        for (var i = 0; i < game.computerSequence.length; i++) {
            var buttonId = game.computerSequence[i];

            setTimeout(FadeButton.bind(0, buttonId), 1000 * i);
            setTimeout(FadeButtonDone.bind(0, buttonId), 1000 * i + 500);
        }

        console.log("Computer plays: " + game.computerSequence);

    }


    //START PROGRAM

    //add eventlisteners

    $(".animalButton").mousedown(clickButtons);
    $(".animalButton").mouseup(mouseUp);
    $("#startButton").on("click", game.startNewGame);

    game.startNewGame();


}
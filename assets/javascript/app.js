$(document).ready(function () {
    var options = [
        {
            question: "Who won the first Super Bowl?",
            choice: ["Chicago Bears", "Green Bay Packers", "Miami Dolphins", "Pittsburg steelers"],
            answer: 1,
            photo: "C:\Users\Craig\code\TriviaGame\assets\images\GB-Packers.jpg"
        },
        {
            question: "Who from this list DID NOT win the Heisman Trophy",
            choice: ["Dan Marino", "Steve Spurier", "Charlie Ward", "Barry Sanders"],
            answer: 0,
            photo: "assets\images\Dan-Marino.jpg"
        },
        {
            question: "Who has thrown for the most passing yards in NFL history?",
            choice: ["Peyton Manning", "Tom Brady", "Drew Brees", "Brett Farve"],
            answer: 2,
            photo: "assets\images\Drew-Brees.jpg"
        },
        {
            question: "Which player has scored the most touchdowns in NFL history?",
            choice: ["Emmit Smith", "Barry Sanders", "Jerry Rice", "Lynn Swan"],
            answer: 2,
            photo: "assets\images\Jerry-Rice.jpg"
        },
        {
            question: "Which of these former NFL players had a second career in major league baseball?",
            choice: ["Walter Payton", "Jim Kelly", "Roger Craig", "Bo Jackson"],
            answer: 3,
            photo: "assets\images\Bo-Jackson.jpg"
        },
        {
            question: "Which player has the most tackles in NFL history?",
            choice: ["Alan Page", "Jesse Tuggle", "Ray Lewis", "Junior Seau"],
            answer: 1,
            photo: "assets\images\Jesse-Tuggle.jpg"
        },
        {
            question: "Who is currently the highest paid player in the NFL?",
            choice: ["Kalil Mack", "Aaron Rodgers", "Matt Ryan", "Jimmy Garoppolo"],
            answer: 1,
            photo: "assets\images\Aaron-Rodgers.jpg"
        },
        {
            question: "Which head coach holds the record for the most wins in NFL history?",
            choice: ["Don Shula", "Bill Belichick", "Tom Landry", "Chuck Knoll"],
            answer: 0,
            photo: "assets\images\Don-Shula.jpg"
        }];

    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess = "";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];

    $("#reset").hide();

    //click start button to start game
    $("#start").on("click", function () {
        $("#start").hide();
        displayQuestion();
        runTimer();
        for (var i = 0; i < options.length; i++) {
            holder.push(options[i]);
        }
    })

    //timer start
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }

    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer--;

        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    }

    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random() * options.length);
        pick = options[index];

        //iterate through answer array and display
        $("#questionblock").html("<h2>" + pick.question + "</h2>");
        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            //assign array position to it so can check answer
            userChoice.attr("data-guessvalue", i);
            $("#answerblock").append(userChoice);
            //		}
        }

        //click function to select answer and outcomes
        $(".answerchoice").on("click", function () {
            //grab array position from userGuess
            userGuess = parseInt($(this).attr("data-guessvalue"));

            //correct guess or wrong guess outcomes
            if (userGuess === pick.answer) {
                stop();
                correctCount++;
                userGuess = "";
                $("#answerblock").html("<p>Correct!</p>");
                hidepicture();

            } else {
                stop();
                wrongCount++;
                userGuess = "";
                $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                hidepicture();
            }
        })
    }


    function hidepicture() {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index, 1);

        var hidpic = setTimeout(function () {
            $("#answerblock").empty();
            timer = 20;

            //run the score screen if all questions answered
            if ((wrongCount + correctCount + unanswerCount) === qCount) {
                $("#questionblock").empty();
                $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
                $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>");
                $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>");
                $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>");
                $("#reset").show();
                correctCount = 0;
                wrongCount = 0;
                unanswerCount = 0;

            } else {
                runTimer();
                displayQuestion();

            }
        }, 3000);


    }

    $("#reset").on("click", function () {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for (var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();

    })

})
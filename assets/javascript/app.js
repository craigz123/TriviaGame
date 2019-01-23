

const questions = [
    {
        question: "Who won the first Super Bowl?",
        choice: ["Chicago Bears", "Green Bay Packers", "Miami Dolphins", "Pittsburg steelers"],
        answer: 1,
        photo: "C:\Users\Craig\code\TriviaGame\assets\images\GB-Packers.jpg"
    },
    {
        question: "Who from this list DID NOT win the Heisman Trophy?",
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
        question: "Which player has the record for the most touchdowns in NFL history?",
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

let results = {};
let correct = 0;
let incorrect = 0;
let timer = 60;
let interval;
$('#start').on('click', function () {
    interval = setInterval(function () {
        if (timer > 0) {
            timer--
            $('#timeleft').html(`<div>${timer}</div>`)
        } else {
            clearInterval(interval);
            runEndGame();
        }

    }, 1000)
    populateQuestions()
})


function populateQuestions() {
    for (let i = 0; i < questions.length; i++) {
        console.log(questions[i].question);
        const currentQuestion = questions[i];
        const questionNumber = i;
        $('#questionblock').append(`<div class="questions">${questions[i].question}</div>`)
        for (let i = 0; i < currentQuestion.choice.length; i++) {
            $('#questionblock').append(`<div data-number=${questionNumber} data-value=${i} class="options">${currentQuestion.choice[i]}</div>`)
        }
    }
    $('.options').on('click', function () {
        const qNumber = $(this).attr('data-number');
        const value = $(this).attr('data-value');
        results[qNumber] = value;
        console.log(results);
    })
}

$('#submit').on('click', function () {
    runEndGame();
})

function runEndGame() {
    for (let i = 0; i < questions.length; i++) {
        if (questions[i].answer == results[i]) {
            correct++
        } else {
            incorrect++
        }
    }

    alert('You had ' + correct + " questions correct. And " + incorrect + " answers incorrect")
}


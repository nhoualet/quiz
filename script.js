const questions = [
    {
        question: "Peut on faire cuire un oeuf sur Mars ?",
        optionA: "Oui",
        optionB: "Cela dépend de la saison",
        optionC: "Non",
        correctOption: "optionC",
        explicationWrong: "Non, il n'est malheureusement pas possible de cuire des oeufs à la simple température de Mars. Les températures sur Mars varient de -125°C à 20°C or, pour faire cuire un oeuf il faut une température de 60°C minimum",
        explicationGood: "Bonne réponse, effectivement il n'est pas possible de cuire des oeufs à la simple température de Mars car les températures au niveau de la surface martienne varient de -125°C à 20°C. Pour faire cuire un oeuf il faudrait une température de 60°C minimum"
    },

    {
        question: "De quelle hauteur serait un saut sur Mars ?",
        optionA: "Moins que sur Terre",
        optionB: "Comme sur Terre",
        optionC: "Plus haut que sur Terre",
        correctOption: "optionC",
        explicationWrong: "Mauvaise réponse, La gravité à la surface de Mars étant plus faible que sur Terre (37% de celle de la Terre), il serait possible de sauter jusqu'a environ 1m20",
        explicationGood: "Bonne réponse, La gravité étant de 37% de celle de la Terre, on pourrait effectuer des sauts allant jusqu'a environ 1m20."
    },

    {
        question: "Où peut on trouver de l'eau liquide sur Mars ?",
        optionA: "Dans les lacs",
        optionB: "Au niveau des glaciers",
        optionC: "En profondeur",
        correctOption: "optionC",
        explicationWrong: "TODO IDK", // TODO
        explicationGood: "Bonne réponse, de l'eau a était découverte sous la surface marsienne à plus de 80km de profondeur"

    },

    {
        question: "Quelle est la durée d'une journée sur Mars ? (arrondi à l'heure près)",
        optionA: "12 heures",
        optionB: "48 heures",
        optionC: "24 heures",
        correctOption: "optionC",
        explicationWrong: "Mauvaise réponse, la durée d'une journée sur Mars est de 24 heures et 37 minutes. En arrondissant à l'heure près on obtient donc 24 heures.",
        explicationGood: "Bonne réponse, la durée d'une journée sur Mars est de 24 heures et 37 minutes. En arrondissant à l'heure près on obtient donc 24 heures"
    },

    {
        question: "Quelle serais au minimum le temps du trajet Terre->Mars pour un humain avec nos moyens actuels ?",
        optionA: "30 jours",
        optionB: "620 jours",
        optionC: "260 jours",
        correctOption: "optionC",
        explicationWrong: "IDK TODO", // TODO
        explicationGood: "IDK TODO" // TODO

    }
]

let shuffledQuestions = [] //empty array to hold shuffled selected questions

function handleQuestions() {
    questions.forEach(q => {
        shuffledQuestions.push(q)
    });
    // désactivé pour le moment
    // while (shuffledQuestions.length <= questions.length-1) {
    //     const random = questions[Math.floor(Math.random() * questions.length)]
    //     if (!shuffledQuestions.includes(random)) {
    //         shuffledQuestions.push(random)
    //     }
    // }
}


let questionNumber = 1
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0

// function for displaying next question in the array to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    // document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })
   
    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    //delays next question displaying for a second
    setTimeout(() => {
        if (indexNumber < questions.length) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    const scorePercent = (playerScore / questions.length) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = scorePercent
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('right-answers2').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal and resets game
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}

function toggleLicense(state){
    var copyrightElem = document.getElementById("copyright-text");
    if (copyrightElem.style.display === "none") {
        copyrightElem.style.display = "block";
        document.getElementById("copyright-button").innerHTML = "Clickez ici pour cacher la licence"
    } else {
        copyrightElem.style.display = "none";
        document.getElementById("copyright-button").innerHTML = "Quiz basé sur le code de Sulaimon Olaniran, clickez sur ce message pour voir la licence."
    }
}

function load(){
    for (const elem of document.getElementsByClassName("nb-questions")) {
        elem.innerHTML = questions.length
    }
    console.log(document.getElementsByClassName("nb-questions"))
    NextQuestion(0)
}
console.log("script loaded")

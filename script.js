document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'f5cCeNuuNbDrNxhlb2oYYtcoMdmIc2M4GO8S36t6';
    let currentQuestionIndex = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    const quizForm = document.getElementById('quizForm');
    const startQuizButton = document.getElementById('startQuiz');
    const nextQuestionButton = document.getElementById('nextQuestion');
    const resetScoreButton = document.getElementById('resetScore');
    const quizContainer = document.getElementById('quizContainer');
    const scoreContainer = document.getElementById('scoreContainer');
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options');
    const resultElement = document.getElementById('result');
    const scoreElement = document.getElementById('score');

    startQuizButton.addEventListener('click', startQuiz);
    nextQuestionButton.addEventListener('click', loadNextQuestion);
    resetScoreButton.addEventListener('click', resetScore);

    function startQuiz() {
        currentQuestionIndex = 0;
        correctAnswers = 0;
        incorrectAnswers = 0;
        scoreContainer.style.display = 'none';
        loadNextQuestion();
    }

    async function loadNextQuestion() {
        const difficulty = document.getElementById('difficulty').value;
        const apiUrl = `https://quizapi.io/api/v1/questions?apiKey=${apiKey}&limit=1&difficulty=${difficulty}`;
        
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.length > 0) {
                const question = data[0];
                displayQuestion(question);
            } else {
                alert('Error loading question. Please try again.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function displayQuestion(question) {
        quizForm.style.display = 'none';
        quizContainer.style.display = 'block';

        questionElement.textContent = question.question;
        resultElement.textContent = '';

        optionsContainer.innerHTML = '';

        const answerKeys = ['answer_a', 'answer_b', 'answer_c', 'answer_d', 'answer_e', 'answer_f'];

        answerKeys.forEach(key => {
            if (question.answers[key] !== null) {
                const button = document.createElement('button');
                button.textContent = question.answers[key];
                button.addEventListener('click', () => checkAnswer(question, key));
                optionsContainer.appendChild(button);
            }
        });
    }

    function checkAnswer(question, selectedAnswer) {
        const correctAnswerKey = Object.keys(question.correct_answers)
            .find(key => question.correct_answers[key] === 'true');

        if (selectedAnswer === correctAnswerKey) {
            resultElement.textContent = 'Correct!';
            correctAnswers++;
        } else {
            resultElement.textContent = 'Incorrect!';
            incorrectAnswers++;
        }

        quizForm.style.display = 'block';
        quizContainer.style.display = 'none';
        updateScore();
    }

    function updateScore() {
        scoreElement.textContent = `Score: ${correctAnswers} correct, ${incorrectAnswers} incorrect`;
        scoreContainer.style.display = 'block';
    }

    function resetScore() {
        scoreContainer.style.display = 'none';
        correctAnswers = 0;
        incorrectAnswers = 0;
        updateScore();
    }
});

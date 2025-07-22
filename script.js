document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const introScreen = document.getElementById('intro-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultsScreen = document.getElementById('results-screen');
    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const retryBtn = document.getElementById('retry-btn');
    const downloadBtn = document.getElementById('download-btn');
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options');
    const feedbackElement = document.getElementById('feedback');
    const scoreElement = document.getElementById('score');
    const progressBar = document.getElementById('progress-bar');
    const finalScoreElement = document.getElementById('final-score');
    const totalQuestionsElement = document.getElementById('total-questions');
    const performanceMessageElement = document.getElementById('performance-message');
    const certificate = document.getElementById('certificate');
    const certificateName = document.getElementById('certificate-name');
    const certificateScore = document.getElementById('certificate-score');
    const certificateTotal = document.getElementById('certificate-total');
    const certificateDate = document.getElementById('certificate-date');

    // Quiz Variables
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedOption = null;
    
    // Quiz Questions
    const questions = [
        {
            question: "Which of the following is NOT a JavaScript data type?",
            options: ["String", "Boolean", "Number", "Float"],
            answer: "Float",
            explanation: "JavaScript has Number type which includes both integer and floating-point numbers, but not a separate Float type."
        },
        {
            question: "What does the 'DOM' stand for in web development?",
            options: ["Document Object Model", "Data Object Management", "Display Object Model", "Digital Output Module"],
            answer: "Document Object Model",
            explanation: "DOM stands for Document Object Model, which represents the structure of a document as a tree of objects."
        },
        {
            question: "Which method is used to add an element to the end of an array in JavaScript?",
            options: ["push()", "pop()", "shift()", "unshift()"],
            answer: "push()",
            explanation: "The push() method adds one or more elements to the end of an array and returns the new length of the array."
        },
        {
            question: "What is the purpose of the 'this' keyword in JavaScript?",
            options: [
                "It refers to the current function",
                "It refers to the previous object",
                "It refers to the current object",
                "It refers to the global object"
            ],
            answer: "It refers to the current object",
            explanation: "The 'this' keyword refers to the object that is executing the current function or method."
        },
        {
            question: "Which of these is NOT a way to declare a variable in JavaScript?",
            options: ["var", "let", "const", "def"],
            answer: "def",
            explanation: "'def' is not a JavaScript keyword. It's used in Python for function definitions."
        }
    ];

    // Initialize the quiz
    function initQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        scoreElement.textContent = `Score: ${score}`;
        showQuestion();
    }

    // Show current question
    function showQuestion() {
        resetState();
        const question = questions[currentQuestionIndex];
        const questionNo = currentQuestionIndex + 1;
        
        // Update progress bar
        const progressPercent = (questionNo / questions.length) * 100;
        progressBar.style.width = `${progressPercent}%`;
        
        questionElement.textContent = `${questionNo}. ${question.question}`;
        
        // Create options
        question.options.forEach(option => {
            const button = document.createElement('div');
            button.textContent = option;
            button.classList.add('option');
            button.addEventListener('click', () => selectOption(button, option));
            optionsContainer.appendChild(button);
        });
    }

    // Reset quiz state for new question
    function resetState() {
        nextBtn.classList.add('hidden');
        feedbackElement.classList.add('hidden');
        
        while (optionsContainer.firstChild) {
            optionsContainer.removeChild(optionsContainer.firstChild);
        }
    }

    // Handle option selection
    function selectOption(selectedButton, selectedAnswer) {
        const question = questions[currentQuestionIndex];
        
        // Remove previous selection if any
        if (selectedOption) {
            selectedOption.classList.remove('selected');
        }
        
        selectedOption = selectedButton;
        selectedButton.classList.add('selected');
        
        // Disable all options after selection
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.style.pointerEvents = 'none';
        });
        
        // Check answer and provide feedback
        const isCorrect = selectedAnswer === question.answer;
        
        if (isCorrect) {
            selectedButton.classList.add('correct');
            selectedButton.innerHTML = `<i class="fas fa-check-circle"></i> ${selectedAnswer}`;
            score++;
            scoreElement.textContent = `Score: ${score}`;
            feedbackElement.textContent = `Correct! ${question.explanation}`;
            feedbackElement.classList.add('correct');
        } else {
            selectedButton.classList.add('incorrect');
            selectedButton.innerHTML = `<i class="fas fa-times-circle"></i> ${selectedAnswer}`;
            feedbackElement.textContent = `Incorrect. The correct answer is: ${question.answer}. ${question.explanation}`;
            feedbackElement.classList.add('incorrect');
            
            // Highlight correct answer
            options.forEach(option => {
                if (option.textContent === question.answer) {
                    option.classList.add('correct');
                    option.innerHTML = `<i class="fas fa-check-circle"></i> ${question.answer}`;
                }
            });
        }
        
        feedbackElement.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
    }

    // Show final results
    function showResults() {
        quizScreen.classList.add('hidden');
        resultsScreen.classList.remove('hidden');
        
        finalScoreElement.textContent = score;
        totalQuestionsElement.textContent = questions.length;
        certificateScore.textContent = score;
        certificateTotal.textContent = questions.length;
        
        // Set current date
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        certificateDate.textContent = today.toLocaleDateString('en-US', options);
        
        // Performance message
        const percentage = (score / questions.length) * 100;
        let message;
        
        if (percentage >= 80) {
            message = "Excellent work! You've demonstrated a strong understanding of JavaScript fundamentals.";
        } else if (percentage >= 60) {
            message = "Good job! You have a solid foundation, with some areas to improve.";
        } else if (percentage >= 40) {
            message = "Not bad! Keep practicing and you'll master these concepts in no time.";
        } else {
            message = "Keep learning! Review the concepts and try again. Everyone starts somewhere!";
        }
        
        performanceMessageElement.textContent = message;
        
        // Show certificate if passed (50% or more)
        if (percentage >= 50) {
            certificate.classList.remove('hidden');
        }
    }

    // Download certificate as image
    function downloadCertificate() {
        if (!certificate.classList.contains('hidden')) {
            // In a real app, you would use a library like html2canvas to convert the certificate to an image
            alert("Certificate downloaded! (In a real app, this would save the certificate as an image)");
        } else {
            alert("You need to score at least 50% to earn a certificate. Try again!");
        }
    }

    // Event Listeners
    startBtn.addEventListener('click', () => {
        introScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        initQuiz();
    });

    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    });

    retryBtn.addEventListener('click', () => {
        resultsScreen.classList.add('hidden');
        introScreen.classList.remove('hidden');
    });

    downloadBtn.addEventListener('click', downloadCertificate);

    // Prompt for name when certificate is shown
    resultsScreen.addEventListener('click', function(e) {
        if (e.target === downloadBtn && certificate.classList.contains('hidden')) {
            return;
        }
        
        if (certificateName.textContent === "Participant") {
            const name = prompt("Enter your name for the certificate:");
            if (name) {
                certificateName.textContent = name;
            }
        }
    });
});
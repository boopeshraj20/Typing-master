class TypingSpeedTest {
    constructor() {
        this.currentDifficulty = 'easy';
        this.testText = '';
        this.startTime = null;
        this.isTestActive = false;
        this.currentIndex = 0;
        this.correctChars = 0;
        this.totalChars = 0;
        this.timer = null;
       
        this.textSamples = {
            easy: [
                "The sun is bright today. We can see many birds in the sky. Children are playing in the park. Life is good when we are happy.",
                "I like to read books. My cat is sleeping on the chair. The weather is nice and warm. We should go for a walk soon.",
                "Flowers bloom in spring. Trees are green and tall. Water flows in the river. People smile and laugh together.",
                "Music makes me happy. Friends are very important. Food tastes better when shared. Home is where love lives.",
                "Dogs are loyal pets. Cars drive on roads. Stars shine at night. Morning brings new hope and joy."
            ],
            medium: [
                "Technology has transformed the way we communicate with each other. Social media platforms allow us to connect instantly with people around the world, but they also present challenges for privacy and authentic relationships.",
                "Environmental conservation requires collective effort from governments, businesses, and individuals. Climate change affects weather patterns, biodiversity, and economic systems across the globe in complex ways.",
                "Education systems must adapt to prepare students for rapidly changing job markets. Critical thinking, creativity, and digital literacy have become essential skills for success in the modern workplace.",
                "Scientific research drives innovation in medicine, engineering, and technology. Collaboration between institutions accelerates discoveries that improve quality of life for millions of people worldwide.",
                "Economic policies influence employment rates, inflation, and social welfare programs. Understanding these relationships helps citizens make informed decisions about their financial futures."
            ],
            hard: [
                "Quantum mechanics fundamentally challenges our intuitive understanding of reality by demonstrating that particles can exist in superposition states until observed, suggesting that consciousness might play a crucial role in determining physical phenomena.",
                "Philosophical epistemology examines the nature of knowledge itself, questioning whether absolute truth exists or if all understanding is contextual, culturally constructed, and inherently subjective to human cognitive limitations and biases.",
                "Neuroplasticity research indicates that the brain continuously reorganizes neural pathways throughout life, contradicting previous assumptions about fixed cognitive capacity and suggesting unprecedented potential for rehabilitation and enhancement.",
                "Cryptographic algorithms ensure digital security through mathematical complexity that would require exponential computational resources to break, yet quantum computing threatens to render current encryption methods obsolete within decades.",
                "Bioethical considerations surrounding genetic engineering raise profound questions about human enhancement, equitable access to treatments, and the potential consequences of altering evolutionary processes through technological intervention."
            ]
        };
       
        this.difficultyInfo = {
            easy: "Simple words and common phrases - Perfect for beginners",
            medium: "Complex sentences and technical terms - Good for intermediate typists",
            hard: "Advanced vocabulary and challenging concepts - For expert typists"
        };
       
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadNewText();
    }

    setupEventListeners() {
        // Difficulty buttons
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setDifficulty(e.target.dataset.level);
            });
        });

        // Control buttons
        document.getElementById('startBtn').addEventListener('click', () => this.startTest());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetTest());
        document.getElementById('newTextBtn').addEventListener('click', () => this.loadNewText());

        // Typing input
        const typingInput = document.getElementById('typingInput');
        typingInput.addEventListener('input', (e) => this.handleTyping(e));
        typingInput.addEventListener('paste', (e) => e.preventDefault());
    }

    setDifficulty(level) {
        this.currentDifficulty = level;
       
        // Update button states
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-level="${level}"]`).classList.add('active');
       
        // Update difficulty info
        document.getElementById('difficultyInfo').innerHTML =
            `<strong>${level.charAt(0).toUpperCase() + level.slice(1)} Mode:</strong> ${this.difficultyInfo[level]}`;
       
        this.loadNewText();
        this.resetTest();
    }

    loadNewText() {
        const texts = this.textSamples[this.currentDifficulty];
        this.testText = texts[Math.floor(Math.random() * texts.length)];
        this.displayText();
    }

    displayText() {
        const textDisplay = document.getElementById('textDisplay');
        let displayHTML = '';
       
        for (let i = 0; i < this.testText.length; i++) {
            let className = '';
            if (i < this.currentIndex) {
                className = 'correct';
            } else if (i === this.currentIndex) {
                className = 'current';
            }
           
            displayHTML += `<span class="${className}">${this.testText[i]}</span>`;
        }
       
        textDisplay.innerHTML = displayHTML;
    }

    startTest() {
        this.isTestActive = true;
        this.startTime = new Date();
        this.currentIndex = 0;
        this.correctChars = 0;
        this.totalChars = 0;
       
        const typingInput = document.getElementById('typingInput');
        typingInput.disabled = false;
        typingInput.value = '';
        typingInput.focus();
       
        document.getElementById('startBtn').disabled = true;
       
        this.timer = setInterval(() => this.updateStats(), 100);
        this.displayText();
    }

    handleTyping(e) {
        if (!this.isTestActive) return;
       
        const input = e.target.value;
        this.totalChars = input.length;
        this.currentIndex = input.length;
       
        // Calculate correct characters
        this.correctChars = 0;
        for (let i = 0; i < Math.min(input.length, this.testText.length); i++) {
            if (input[i] === this.testText[i]) {
                this.correctChars++;
            }
        }
       
        this.updateDisplay();
        this.updateStats();
       
        // Check if test is complete
        if (input.length >= this.testText.length) {
            this.completeTest();
        }
    }

    updateDisplay() {
        const textDisplay = document.getElementById('textDisplay');
        const input = document.getElementById('typingInput').value;
        let displayHTML = '';
       
        for (let i = 0; i < this.testText.length; i++) {
            let className = '';
            if (i < input.length) {
                className = input[i] === this.testText[i] ? 'correct' : 'incorrect';
            } else if (i === input.length) {
                className = 'current';
            }
           
            displayHTML += `<span class="${className}">${this.testText[i]}</span>`;
        }
       
        textDisplay.innerHTML = displayHTML;
       
        // Update progress bar
        const progress = (input.length / this.testText.length) * 100;
        document.getElementById('progressFill').style.width = `${Math.min(progress, 100)}%`;
    }

    updateStats() {
        if (!this.isTestActive || !this.startTime) return;
       
        const currentTime = new Date();
        const timeElapsed = (currentTime - this.startTime) / 1000;
        const minutes = timeElapsed / 60;
       
        // Calculate WPM (assuming 5 characters per word)
        const wpm = minutes > 0 ? Math.round((this.correctChars / 5) / minutes) : 0;
       
        // Calculate accuracy
        const accuracy = this.totalChars > 0 ? Math.round((this.correctChars / this.totalChars) * 100) : 100;
       
        // Update display
        document.getElementById('wpmStat').textContent = wpm;
        document.getElementById('accuracyStat').textContent = `${accuracy}%`;
        document.getElementById('timeStat').textContent = `${Math.round(timeElapsed)}s`;
        document.getElementById('charsStat').textContent = this.totalChars;
    }

    completeTest() {
        this.isTestActive = false;
        clearInterval(this.timer);
       
        const typingInput = document.getElementById('typingInput');
        typingInput.disabled = true;
       
        document.getElementById('startBtn').disabled = false;
       
        this.showResults();
    }

    showResults() {
        const currentTime = new Date();
        const timeElapsed = (currentTime - this.startTime) / 1000;
        const minutes = timeElapsed / 60;
        const wpm = minutes > 0 ? Math.round((this.correctChars / 5) / minutes) : 0;
        const accuracy = this.totalChars > 0 ? Math.round((this.correctChars / this.totalChars) * 100) : 100;
       
        // Update modal content
        document.getElementById('finalWPM').textContent = wpm;
        document.getElementById('finalAccuracy').textContent = `${accuracy}%`;
        document.getElementById('finalTime').textContent = `${Math.round(timeElapsed)}s`;
        document.getElementById('finalChars').textContent = this.totalChars;
       
        // Performance rating
        let rating = '';
        let ratingClass = '';
       
        if (wpm >= 70 && accuracy >= 95) {
            rating = '🏆 Excellent! You\'re a typing master!';
            ratingClass = 'excellent';
        } else if (wpm >= 50 && accuracy >= 85) {
            rating = '🌟 Great job! Above average performance!';
            ratingClass = 'good';
        } else if (wpm >= 30 && accuracy >= 75) {
            rating = '👍 Good work! Keep practicing to improve!';
            ratingClass = 'average';
        } else {
            rating = '💪 Keep practicing! You\'ll improve with time!';
            ratingClass = 'poor';
        }
       
        const performanceDiv = document.getElementById('performanceRating');
        performanceDiv.textContent = rating;
        performanceDiv.className = `performance-rating ${ratingClass}`;
       
        // Show modal
        const modal = document.getElementById('resultsModal');
        const modalContent = document.getElementById('modalContent');
        modal.style.display = 'flex';
        setTimeout(() => {
            modalContent.classList.add('show');
        }, 100);
    }

    resetTest() {
        this.isTestActive = false;
        clearInterval(this.timer);
        this.currentIndex = 0;
        this.correctChars = 0;
        this.totalChars = 0;
        this.startTime = null;
       
        const typingInput = document.getElementById('typingInput');
        typingInput.value = '';
        typingInput.disabled = true;
       
        document.getElementById('startBtn').disabled = false;
        document.getElementById('progressFill').style.width = '0%';
       
        // Reset stats
        document.getElementById('wpmStat').textContent = '0';
        document.getElementById('accuracyStat').textContent = '100%';
        document.getElementById('timeStat').textContent = '0s';
        document.getElementById('charsStat').textContent = '0';
       
        this.displayText();
    }
}

function closeModal() {
    const modal = document.getElementById('resultsModal');
    const modalContent = document.getElementById('modalContent');
    modalContent.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new TypingSpeedTest();
});

// Close modal when clicking outside
document.getElementById('resultsModal').addEventListener('click', (e) => {
    if (e.target.id === 'resultsModal') {
        closeModal();
    }
});
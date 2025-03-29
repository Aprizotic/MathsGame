function randomNumber(min, max) {
	return Math.floor(min + (Math.random() * (max - min + 1)));
}

function updateStreak(correct) {
	const bgGradients = ['#003840', '#225268', '#516a8d', '#8980ac', '#c496c0', '#fbafc9'];
	const streakGradients = ['#04BB9B', '#10B092', '#1DA58A', '#299A81', '#368F78', '#428470', '#4F7967', '#5B6F5F', '#676456', '#74594D', '#804E45', '#8D433C', '#993833', '#A62D2B', '#B22222']
	const streak = document.getElementById('streak');
	const body = document.querySelector('body');

	if (correct) {
		const newValue = Number(streak.textContent) + 1;
		streak.textContent = newValue;
	}
	else streak.textContent = 0;

	// Make sure it doesn't exceed the gradient length
	const newBgGradient = bgGradients[Math.min(Number(streak.textContent), bgGradients.length - 1)];
	body.style.setProperty('--gradientColor', newBgGradient);

	const newStreakGradient = streakGradients[Math.min(Number(streak.textContent), streakGradients.length - 1)];
	streak.style.color = newStreakGradient;
}

function createQuestion() {
	const streak = document.getElementById('streak');
	const difficulty = Math.max(Number(streak.textContent), 1);
	const question = document.getElementById('question');
	const randomChoice = randomNumber(0, 3);
	const algebraOn = randomNumber(0, 1);

	// Difficulty increase range of values
	const num1 = randomNumber(0, (50 * difficulty));
	const num2 = randomNumber(0, (50 * difficulty));
	const num3 = randomNumber(1, (11 + difficulty));
	const num4 = randomNumber(1, (11 + difficulty));
	
	switch (randomChoice) {
		case 0:
			if (algebraOn) { 
				question.textContent = `𝓧 - ${num1} = ${num2}`;
				return num1 + num2
			}
			else {
				question.textContent = `${num1} + ${num2} = ?`;
				return num1 + num2;
			}
		case 1: 
			// If difficulty reaches 10, allow negatives
			if (difficulty > 9) {
				if (algebraOn) {
					question.textContent = `𝓧 + ${num1} = ${num2}`;
					return num2 - num1;
				}
				else {
					question.textContent = `${num1} - ${num2} = ?`;
					return num1 - num2;
				}
			}
			else {
				if (num1 >= num2) {
				question.textContent = `${num1} - ${num2} = ?`;
				return num1 - num2;
				}
				else if (num2 >= num1) {
					question.textContent = `${num2} - ${num1} = ?`;
					return num2 - num1;
				}
			}
		case 2:
			if (algebraOn) {
				question.textContent = `𝓧/${num3} = ${num4}`;
				return num3 * num4;
			}
			else {
				question.textContent = `${num3} x ${num4} = ?`;
				return num3 * num4;
			}
		case 3:
			const num5 = num3 * num4;
			if (algebraOn) {
				question.textContent = `${num3}𝓧 = ${num5}`;
				return num5 / num3;
			}
			else {
				question.textContent = `${num5} / ${num3} = ?`;
				return num5 / num3;
			}
		}
}

function checkAnswer(userAnswer, questionAnswer) {
	const answerBox = document.getElementById('answer-box');

	if (userAnswer == questionAnswer) {
		answerBox.style.boxShadow = '0 0 10px 10px #7CB46B';

		setTimeout(() => {
			answerBox.style.boxShadow = '';
		}, '100');

		answerBox.value = '';
		updateStreak(true);
	}
	else {
		answerBox.style.boxShadow = '0 0 10px 10px #FF746C';

		setTimeout(() => {
			answerBox.style.boxShadow = '';
		}, '100');

		answerBox.value = '';
		updateStreak(false);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const answerBox = document.getElementById('answer-box');
	let questionAnswer = createQuestion();

	window.addEventListener('keydown', (e) => {
		if (e.key === 'Enter') {
			// If the user entered an answer
			if (answerBox.value) {
				answerBox.placeholder = 'Enter Answer';
				checkAnswer(answerBox.value, questionAnswer);
				questionAnswer = createQuestion();
			}
		}
	});

	// Keep the answer box focused
	window.addEventListener('click', () => {
		answerBox.focus();
	});

	answerBox.focus();
})
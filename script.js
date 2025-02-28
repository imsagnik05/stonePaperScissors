const choices = ["rock", "paper", "scissors"];
let round = 1;
let playerWins = 0;
let computerWins = 0;
const totalRounds = 3;

// DOM Elements
const buttons = document.querySelectorAll(".choice");
const resultMessage = document.getElementById("result-message");
const roundWins = document.getElementById("round-wins");
const restartButton = document.getElementById("restart");
const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");
const welcomeScreen = document.getElementById("welcome-screen");
const startButton = document.getElementById("start-game");
const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");
const loseSound = document.getElementById("loseSound");
const drawSound = document.getElementById("drawSound");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Fireworks Effect
function createFireworksEffect() {
  const particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      size: Math.random() * 3 + 1,
      speedX: Math.random() * 6 - 3,
      speedY: Math.random() * 6 - 3,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      life: 0
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      particle.life++;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
      if (particle.life > 50) particles.splice(index, 1);
    });

    if (particles.length > 0) {
      requestAnimationFrame(animateParticles);
    } else {
      canvas.style.display = "none";
    }
  }

  canvas.style.display = "block";
  animateParticles();
}

// Computer Choice
function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

// Play a Round
function playRound(playerChoice) {
  document.body.classList.remove("gloomy-background");
  resultMessage.classList.remove("gloomy-message");

  const computerChoice = getComputerChoice();
  let roundResult;

  if (playerChoice === computerChoice) {
    roundResult = `Round ${round}: It's a draw! Both chose ${playerChoice}.`;
    drawSound.play();
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    playerWins++;
    roundResult = `Round ${round}: You win! ${playerChoice} beats ${computerChoice}.`;
    winSound.play();
    createFireworksEffect();
  } else {
    computerWins++;
    roundResult = `Round ${round}: You lose! ${computerChoice} beats ${playerChoice}.`;
    loseSound.play();
    document.body.classList.add("gloomy-background");
    resultMessage.classList.add("gloomy-message");
  }

  resultMessage.textContent = roundResult;
  roundWins.textContent = `Player wins: ${playerWins} | Computer wins: ${computerWins}`;

  round++;
  if (round > totalRounds) {
    let gameResult;
    if (playerWins > computerWins) {
      gameResult = "Game over! You win the game!";
      createFireworksEffect(); // Optional: Add a bigger effect here if desired
    } else if (computerWins > playerWins) {
      gameResult = "Game over! Computer wins the game!";
      document.body.classList.add("gloomy-background");
    } else {
      gameResult = "Game over! It's a draw!";
    }
    resultMessage.textContent = gameResult;
  }
}

// Button Click Events
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    clickSound.play();
    const playerChoice = button.getAttribute("data-choice");
    playRound(playerChoice);
  });
});

// Start Game
startButton.addEventListener("click", () => {
  welcomeScreen.style.display = "none";
});

// Restart Game
restartButton.addEventListener("click", () => {
  round = 1;
  playerWins = 0;
  computerWins = 0;
  resultMessage.textContent = "Make your move to start!";
  roundWins.textContent = "Player wins: 0 | Computer wins: 0";
  document.body.classList.remove("gloomy-background");
  resultMessage.classList.remove("gloomy-message");
});

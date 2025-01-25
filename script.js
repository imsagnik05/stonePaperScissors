const choices = ["rock", "paper", "scissors"];
let playerScore = 0;
let computerScore = 0;

// Select DOM elements
const buttons = document.querySelectorAll(".choice");
const resultMessage = document.getElementById("result-message");
const scores = document.getElementById("scores");
const restartButton = document.getElementById("restart");
const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Fireworks effect function
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

      if (particle.life > 50) {
        particles.splice(index, 1);
      }
    });

    if (particles.length > 0) {
      requestAnimationFrame(animateParticles);
    } else {
      canvas.style.display = "none";  // Hide fireworks once finished
    }
  }

  canvas.style.display = "block";  // Show the canvas
  animateParticles();
}

// Function to get computer's choice
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Function to determine the winner
function playRound(playerChoice) {
  const computerChoice = getComputerChoice();

  if (playerChoice === computerChoice) {
    return `It's a draw! Both chose ${playerChoice}.`;
  }

  if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    playerScore++;
    createFireworksEffect();  // Trigger fireworks when player wins
    return `You win! ${playerChoice} beats ${computerChoice}.`;
  } else {
    computerScore++;
    document.body.classList.add("gloomy-background"); // Apply gloomy effect
    resultMessage.classList.add("gloomy-message"); // Change message style
    return `You lose! ${computerChoice} beats ${playerChoice}.`;
  }
}

// Handle button clicks
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const playerChoice = button.getAttribute("data-choice");
    const result = playRound(playerChoice);
    resultMessage.textContent = result;
    scores.textContent = `Player: ${playerScore} | Computer: ${computerScore}`;
  });
});

// Restart game
restartButton.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  resultMessage.textContent = "Make your move to start!";
  scores.textContent = "Player: 0 | Computer: 0";
  document.body.classList.remove("gloomy-background");
  resultMessage.classList.remove("gloomy-message");
});

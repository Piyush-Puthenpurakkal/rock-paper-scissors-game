let roundSetter = document.getElementById("rounds");
let startGameButton = document.getElementById("start-game");
let choicesContainer = document.getElementById("choices");
let resultDisplay = document.getElementById("result-display");
let playerChoiceElement = document.getElementById("player-choice");
let computerChoiceElement = document.getElementById("computer-choice");
let resultMessage = document.getElementById("result-message");
let playAgainButton = document.getElementById("play-again");
let rulesButton = document.getElementById("rules-btn");
let rulesImage = document.getElementById("rules-image");
let roundSetterContainer = document.getElementById("round-setter");
let scoreboard = document.getElementById("scoreboard");
let playerScoreElement = document.getElementById("player-score");
let computerScoreElement = document.getElementById("computer-score");

let rounds;
let currentRound = 0;
let playerScore = 0;
let computerScore = 0;
let isRoundActive = false;

const setChoicesEnabled = (enabled) => {
  console.log(`Setting choices enabled: ${enabled}`);
  const buttons = document.querySelectorAll(".choices .button");
  buttons.forEach((button) => {
    button.style.pointerEvents = enabled ? "auto" : "none";
    button.style.opacity = enabled ? "1" : "0.6";
  });
};

// Disable choices initially
setChoicesEnabled(false);
choicesContainer.style.display = "none";

toggleRules = () => {
  console.log("Toggling rules display");
  rulesImage.style.display =
    rulesImage.style.display === "none" || rulesImage.style.display === ""
      ? "block"
      : "none";
};

rulesButton.addEventListener("click", toggleRules);

startGameButton.addEventListener("click", () => {
  console.log("Start game button clicked");
  rounds = parseInt(roundSetter.value);
  console.log(`Rounds set to: ${rounds}`);

  if (isNaN(rounds) || rounds <= 0) {
    alert("Please set a valid number of rounds!");
    return;
  }

  currentRound = 0;
  playerScore = 0;
  computerScore = 0;
  isRoundActive = true; // Allow choices after starting the game
  console.log("Game reset. Scores and rounds initialized");

  roundSetterContainer.classList.add("hidden");
  scoreboard.classList.remove("hidden");

  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;

  choicesContainer.classList.remove("hidden");
  choicesContainer.style.display = "flex";
  resultDisplay.classList.add("hidden");

  setChoicesEnabled(true);
});

choicesContainer.addEventListener("click", (e) => {
  console.log("Choice container clicked");
  if (!isRoundActive || !e.target.closest(".button")) {
    console.log("Click ignored: Round inactive or invalid target");
    return;
  }

  let playerChoice = e.target.closest(".button").dataset.choice;
  console.log(`Player chose: ${playerChoice}`);

  let computerChoice = ["rock", "paper", "scissors"][
    Math.floor(Math.random() * 3)
  ];
  console.log(`Computer chose: ${computerChoice}`);

  determineWinner(playerChoice, computerChoice);

  // Hide the choices and show the result display
  choicesContainer.style.display = "none"; // Hides choices immediately
  resultDisplay.classList.remove("hidden"); // Show the result display

  // End the current round
  isRoundActive = false;
  setChoicesEnabled(false);
});

const determineWinner = (playerChoice, computerChoice) => {
  currentRound++;
  console.log(`Determining winner for round ${currentRound}`);

  // Get the player and computer choice elements
  const playerChoiceDiv = document.getElementById("player-choice");
  const computerChoiceDiv = document.getElementById("computer-choice");

  // Clear any existing border classes
  playerChoiceDiv.classList.remove("rock", "paper", "scissors", "animate");
  computerChoiceDiv.classList.remove("rock", "paper", "scissors", "animate");

  // Update player's choice in result display
  const playerImgSrc = `assets/${
    playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)
  }.png`;
  document.getElementById("player-choice-img").src = playerImgSrc;
  document.getElementById("player-choice-img").alt = playerChoice;
  playerChoiceDiv.classList.add(playerChoice); // Add border class based on choice

  // Update computer's choice in result display
  const computerImgSrc = `assets/${
    computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
  }.png`;
  document.getElementById("computer-choice-img").src = computerImgSrc;
  document.getElementById("computer-choice-img").alt = computerChoice;
  computerChoiceDiv.classList.add(computerChoice); // Add border class based on choice

  // Determine the winner and display the result
  if (playerChoice === computerChoice) {
    resultMessage.textContent = "It's a draw!";
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    playerScore++;
    resultMessage.textContent = "You win this round!";
    playerChoiceDiv.classList.add("animate"); // Add glow effect to the player
  } else {
    computerScore++;
    resultMessage.textContent = "Computer wins this round!";
    computerChoiceDiv.classList.add("animate"); // Add glow effect to the computer
  }

  // Update the scoreboard
  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;

  console.log(
    `Scores updated: Player ${playerScore}, Computer ${computerScore}`
  );

  // Check if the game is over
  if (currentRound >= rounds) {
    setTimeout(() => {
      if (playerScore > computerScore) {
        window.location.href = "win.html";
      } else if (playerScore < computerScore) {
        window.location.href = "lose.html";
      } else {
        window.location.href = "draw.html";
      }
    }, 2000); // Wait 2 seconds before redirecting
  } else {
    // Reset for the next round
    setTimeout(() => {
      resultDisplay.classList.add("hidden");
      choicesContainer.style.display = "flex";
      isRoundActive = true;
      setChoicesEnabled(true);
    }, 2000);
  }
};

playAgainButton.addEventListener("click", () => {
  console.log("Play again button clicked");

  if (currentRound < rounds) {
    console.log("Next round starting");
    resultDisplay.classList.add("hidden");
    choicesContainer.style.display = "flex"; // Show choices for new round
    isRoundActive = true; // Re-enable choices for the next round
    setChoicesEnabled(true);
  } else {
    console.log("Game over. Calculating final result...");

    // Determine the overall game result
    if (playerScore > computerScore) {
      console.log("Player wins the game!");
      window.location.href = "win.html"; // Redirect to win page
    } else if (playerScore < computerScore) {
      console.log("Computer wins the game!");
      window.location.href = "lose.html"; // Redirect to lose page
    } else {
      console.log("The game is a draw!");
      window.location.href = "draw.html"; // Redirect to draw page
    }
  }
});

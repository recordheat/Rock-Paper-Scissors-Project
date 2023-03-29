
// Game function
function playGame() {
  const symbols = document.querySelectorAll(".symbol-box");
  const playAgainBox = document.querySelector("#play-again-box");
  const updatePlayer = document.querySelector("#update-player");
  const updateScoreboard = document.querySelector("#update-scoreboard");
  const updateComputer = document.querySelector("#update-computer");
  const audio = document.querySelector('audio');
  let playerScore = 0;
  let computerScore = 0;
  let gameIsOver = false;
  symbols.forEach((symbol) => {
    symbol.classList.remove("disabled");
  });


  // Reset game function
  function resetGame() {
    playerScore = 0;
    computerScore = 0;
    updatePlayer.textContent = "";
    updateScoreboard.textContent = "";
    updateComputer.textContent = "";
    gameIsOver = false;
    if (playerScore === 5 || computerScore === 5) {
    symbols.forEach((symbol) => {
      symbol.classList.add("enabled");
    });
  }
  }

  // Computer's choice function
  function computerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
  }

  // Play round function
  function playRound(playerChoice) {

    if (gameIsOver) {
      return;
    }

    const computerChoiceValue = computerChoice();
    let roundResult = "";

    switch (playerChoice) {
      case "rock":
        if (computerChoiceValue === "scissors") {
          roundResult = "win";
        } else if (computerChoiceValue === "paper") {
          roundResult = "lose";
        } else {
          roundResult = "tie";
        }
        break;
      case "paper":
        if (computerChoiceValue === "rock") {
          roundResult = "win";
        } else if (computerChoiceValue === "scissors") {
          roundResult = "lose";
        } else {
          roundResult = "tie";
        }
        break;
      case "scissors":
        if (computerChoiceValue === "paper") {
          roundResult = "win";
        } else if (computerChoiceValue === "rock") {
          roundResult = "lose";
        } else {
          roundResult = "tie";
        }
        break;
      default:
        break;
    }
    // Update scores
    if (roundResult === "win") {
      playerScore++;
      updatePlayer.textContent = "You chose " + playerChoice + " and won this round!";
      updateComputer.textContent = "";
    } else if (roundResult === "lose") {
      computerScore++;
      updateComputer.textContent =
        "The computer chose " + computerChoiceValue + " and won this round!";
      updatePlayer.textContent = "";
    } else {
      updatePlayer.textContent = "You and the computer both chose " + playerChoice + ". It's a tie!";
      updateComputer.textContent = "Computer chose " + computerChoiceValue + " as well! Tie!";
    }
    updateScoreboard.textContent = `${playerScore} - ${computerScore}`;

    // Check if game is over
    if (playerScore === 5) {
      gameIsOver = true;
      let winner = playerScore > computerScore ? "Player" : "Computer";
      //alert(`${winner} has won the game!`);
      updatePlayer.textContent = winner + " has won the game!";
      updateComputer.textContent = "";
    } else if (computerScore === 5) {
      gameIsOver = true;
      let winner = playerScore > computerScore ? "Player" : "Computer";
      updateComputer.textContent = winner + " has won the game!";
      updatePlayer.textContent = "";
    }
    symbols.forEach((symbol) => {
      symbol.classList.add("disabled");
    });
  }

  function playAudio() {
    audio.playbackRate = 1.5;
    audio.currentTime = 0;
    audio.play();
  }

  // Event listener for symbol clicks
  symbols.forEach((symbol) => {
    symbol.addEventListener("click", () => {
      playRound(symbol.firstElementChild.alt.toLowerCase());
    });
  });

  // Event listener for sound FX
  symbols.forEach((symbol) => {
    symbol.addEventListener('click', playAudio);
  });
  playAgainBox.addEventListener("click", playAudio);

  // Event listener for play again button
  playAgainBox.addEventListener("click", () => {
  playAgainBox.style.transform = "scale(1.1)";
  resetGame();
});

  playAgainBox.addEventListener("mouseout", () => {
  playAgainBox.style.transform = "scale(1.0)";
});

  playAgainBox.addEventListener("mouseover", () => {
  playAgainBox.style.transform = "scale(1.1)";
  });
}

// Call the game function
playGame();
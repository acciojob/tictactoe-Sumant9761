const submitBtn = document.getElementById("submit");
    const playerForm = document.getElementById("player-form");
    const gameArea = document.getElementById("game-area");
    const board = document.getElementById("board");
    const message = document.querySelector(".message");

    let player1 = "";
    let player2 = "";
    let currentPlayer = "x";
    let gameOver = false;

    const boardState = Array(9).fill("");

    const winPatterns = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    submitBtn.addEventListener("click", () => {
        player1 = document.getElementById("player1").value.trim();
        player2 = document.getElementById("player2").value.trim();

        if(player1 === "" || player2 === "") {
            alert("Enter both player names");
            return;
        }

        playerForm.style.display = "none";
        gameArea.style.display = "block";
        board.style.display = "grid";

        message.textContent = `${player1}, you're up`;
    });

    document.querySelectorAll(".cell").forEach((cell, index) => {

        cell.addEventListener("click", () => {

            if(gameOver || cell.textContent !== "") return;

            cell.textContent = currentPlayer;
            boardState[index] = currentPlayer;

            if(checkWinner()) {
                const winnerName =
                    currentPlayer === "x" ? player1 : player2;

                message.textContent =
                    `${winnerName} congratulations you won!`;

                gameOver = true;
                return;
            }

            currentPlayer = currentPlayer === "x" ? "o" : "x";

            message.textContent =
                currentPlayer === "x"
                ? `${player1}, you're up`
                : `${player2}, you're up`;
        });

    });

    function checkWinner() {

        for(let pattern of winPatterns) {

            const [a,b,c] = pattern;

            if(
                boardState[a] &&
                boardState[a] === boardState[b] &&
                boardState[a] === boardState[c]
            ) {
                document.getElementById(a + 1).classList.add("winner");
                document.getElementById(b + 1).classList.add("winner");
                document.getElementById(c + 1).classList.add("winner");

                return true;
            }
        }

        return false;
    }
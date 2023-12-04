const winnerMenu = document.getElementById("winner-menu");
const winnerText = document.getElementById("winner-text");

const xScoreText = document.getElementById("x-score");
const oScoreText = document.getElementById("o-score");

const xMark = /*html*/`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M208.49 191.51a12 12 0 0 1-17 17L128 145l-63.51 63.49a12 12 0 0 1-17-17L111 128L47.51 64.49a12 12 0 0 1 17-17L128 111l63.51-63.52a12 12 0 0 1 17 17L145 128Z"/></svg>`;

const oMark = /*html*/`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M128 20a108 108 0 1 0 108 108A108.12 108.12 0 0 0 128 20Zm0 192a84 84 0 1 1 84-84a84.09 84.09 0 0 1-84 84Z"/></svg>`;

const game = (function () {
    let gameBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    let xTurn = true;

    let xScore = 0;
    let oScore = 0;

    let isGameStarted = true;

    function checkWinner() {
        let x = false;
        let o = false;

        for (let i = 0; i < 3; i++) {
            x |= JSON.stringify(gameBoard[i]) == JSON.stringify(["x", "x", "x"]);
            o |= JSON.stringify(gameBoard[i]) == JSON.stringify(["o", "o", "o"]);

            if (x || o) {
                applyLine(0, i);
                return returnWinner(x, o);
            }
        }

        for (let i = 0; i < 3; i++) {
            const column = [gameBoard[0][i], gameBoard[1][i], gameBoard[2][i]];

            x |= JSON.stringify(column) == JSON.stringify(["x", "x", "x"]);
            o |= JSON.stringify(column) == JSON.stringify(["o", "o", "o"]);

            if (x || o) {
                applyLine(1, i);
                return returnWinner(x, o);
            }
        }

        diag1 = [gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]];
        diag2 = [gameBoard[0][2], gameBoard[1][1], gameBoard[2][0]];

        x |= JSON.stringify(diag1) == JSON.stringify(["x", "x", "x"]);
        o |= JSON.stringify(diag1) == JSON.stringify(["o", "o", "o"]);

        if (x || o) {
            applyLine(2, 0);
            return returnWinner(x, o);
        }

        x |= JSON.stringify(diag2) == JSON.stringify(["x", "x", "x"]);
        o |= JSON.stringify(diag2) == JSON.stringify(["o", "o", "o"]);

        if (x || o) {
            applyLine(3, 0);
            return returnWinner(x, o);
        }

        return "";
    }

    function returnWinner(x, o) {
        if (o) {
            return "o";
        } else if (x) {
            return "x"
        } else {
            return ""
        }
    }

    function resetGame() {
        gameBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        xTurn = true;
        winnerMenu.classList.remove("show-winner-menu");

        for (let i = 0; i < 9; i++) {
            const grid = document.getElementById(`grid-${i + 1}`);

            grid.innerHTML = "";
        }

        applyLine(100000, 1000000);
    }

    function placeMark(positionX, positionY, gridID) {
        if (checkWinner() == "" && isGameStarted) {
            const grid = document.getElementById(`${gridID}`);

            if (gameBoard[positionX][positionY] == 0) {
                if (xTurn) {
                    gameBoard[positionX][positionY] = "x";
                    grid.innerHTML = xMark;
                    xTurn = false;
                } else {
                    gameBoard[positionX][positionY] = "o";
                    grid.innerHTML = oMark;
                    xTurn = true;
                }
            }


            const winner = checkWinner();

            if (winner == "x") {
                isGameStarted = false;
                setTimeout(() => { winnerMenu.classList.add("show-winner-menu"); isGameStarted = true; }, 750);
                winnerText.textContent = "X Won";
                xScore++;
                xScoreText.textContent = xScore;
            } else if (winner == "o") {
                isGameStarted = false;
                setTimeout(() => { winnerMenu.classList.add("show-winner-menu"); isGameStarted = true; }, 750);
                winnerText.textContent = "O Won";
                oScore++;
                oScoreText.textContent = oScore;
            } else if (!JSON.stringify(gameBoard).includes(0)) {
                isGameStarted = false;
                setTimeout(() => { winnerMenu.classList.add("show-winner-menu"); isGameStarted = true; }, 750);
                winnerText.textContent = "Tie";
            }
        }
    };

    function applyLine(option, i) {
        const line = document.getElementById("winner-line")
        document.getElementById("winner-line-container").classList.remove("hide");

        line.style.rotate = "z 0deg";
        line.style.top = "0";
        line.style.left = "0"

        if (option == 0) {
            if (i == 0) {
                // Horizontal 1
                line.style.rotate = "z 0deg";
                line.style.top = "calc((100% / 6) - 3pt)";
            }
            else if (i == 1) {
                // Horizontal 2
                line.style.rotate = "z 0deg";
                line.style.top = "calc((100% / 6) * 3 - 3pt)";
            }
            else if (i == 2) {
                // Horizontal 3
                line.style.rotate = "z 0deg";
                line.style.top = "calc((100% / 6) * 5 - 2pt)";
            }
        }
        else if (option == 1) {
            if (i == 0) {
                // Vertical 1
                line.style.rotate = "z 90deg";
                line.style.top = "50%";
                line.style.left = "-33%"
            }
            else if (i == 1) {
                // Vertical 2
                line.style.rotate = "z 90deg";
                line.style.top = "50%";
                line.style.left = "0"
            }
            else if (i == 2) {
                // Vertical 3
                line.style.rotate = "z 90deg";
                line.style.top = "50%";
                line.style.left = "33%"
            }
        }
        else if (option == 2) {
            // Diagonal 1
            line.style.rotate = "z 45deg";
            line.style.top = "50%";
        }
        else if (option == 3) {
            // Diagonal 2
            line.style.rotate = "z -45deg";
            line.style.top = "50%";
        } else {
            document.getElementById("winner-line-container").classList.add("hide");
        }
    }

    return { resetGame, placeMark, checkWinner };
})();
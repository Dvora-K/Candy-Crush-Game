document.addEventListener('DOMContentLoaded', () => {
    let board = [];
    let rows = Data.lastLevel;
    let columns = Data.lastLevel;
    let score = 0;
    let otherCandy;
    let currCandy;
    let state = false;
    let counter = Data.times;
    let timer = 60;
    const displayTimer = document.getElementById("timer");
    let crushAudio = new Audio("../audio/crush.mp3");

    function rndCandy() {
        let x = Math.floor(Math.random() * colors.length);
        return colors[x];
    }

    startGame();
    function startGame() {
        let entireBoard = document.querySelector(".board");
        entireBoard.style.gridTemplateColumns = `repeat(${columns}, 50px)`;
        entireBoard.style.gridTemplateRows = `repeat(${rows}, 50px)`;
        entireBoard.style.width = `${columns * 62}px`;
        entireBoard.style.height = `${rows * 62}px`;
        for (let r = 0; r < rows; r++) {
            let row = [];
            for (let c = 0; c < columns; c++) {
                let candy = document.createElement("img");
                candy.id = r.toString() + "-" + c.toString();
                let randomCandy = rndCandy();
                candy.src = `../images/${randomCandy}.png`;
                candy.alt = randomCandy;
                //DRAG FUNCTIONALITY
                candy.addEventListener("dragstart", dragStart); //click on a candy, initialize drag process
                candy.addEventListener("dragover", dragOver);  //clicking on candy, moving mouse to drag the candy
                candy.addEventListener("drop", dragDrop); //dropping a candy over another candy
                candy.addEventListener("dragend", dragEnd); //after drag process completed, we swap candies
                entireBoard.append(candy);
                row.push(candy);
            }
            board.push(row);
        }
        crushThree();
        console.log(board);
    }

    function dragStart() {
        state = true;
        currCandy = this;
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragDrop() {
        otherCandy = this;
    }

    function dragEnd() {
        let indCurr = currCandy.id.split("-");//id: "1-0" indCurr=[1,0]
        let indOther = otherCandy.id.split("-");
        let currAlt = currCandy.alt;
        let otherAlt = otherCandy.alt;
        let currRow = parseInt(indCurr[0]);
        let currCol = parseInt(indCurr[1]);
        let otherRow = parseInt(indOther[0]);
        let otherCol = parseInt(indOther[1]);
        if (currCol == otherCol && currRow - 1 == otherRow || currCol == otherCol && currRow + 1 == otherRow ||
            currCol - 1 == otherCol && currRow == otherRow || currCol + 1 == otherCol && currRow == otherRow) {
            let currImg = currCandy.src;
            let otherImg = otherCandy.src;
            currCandy.src = otherImg;
            otherCandy.src = currImg;
            currCandy.alt = otherAlt;
            otherCandy.alt = currAlt;
        }
    }
    function addScore(points) {
        if (state) {
            crushAudio.play();
            score += points;
            document.getElementById("score").innerText = score;
        }
    }

    function crushFour() {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns - 3; j++) {
                let candy1 = board[i][j];
                let candy2 = board[i][j + 1];
                let candy3 = board[i][j + 2];
                let candy4 = board[i][j + 3];
                if (candy1.alt == candy2.alt && candy1.alt == candy3.alt && candy3.alt == candy4.alt && candy1.alt != "") {
                    candy1.src = "";
                    candy2.src = "";
                    candy3.src = "";
                    candy4.src = "";
                    candy1.alt = "";
                    candy2.alt = "";
                    candy3.alt = "";
                    candy4.alt = "";
                    addScore(4);
                }
            }
        }
        for (let j = 0; j < columns; j++) {
            for (let i = 0; i < rows - 3; i++) {
                let candy1 = board[i][j];
                let candy2 = board[i + 1][j];
                let candy3 = board[i + 2][j];
                let candy4 = board[i + 3][j];
                if (candy1.alt == candy2.alt && candy1.alt == candy3.alt && candy3.alt == candy4.alt && candy1.alt != "") {
                    candy1.src = "";
                    candy2.src = "";
                    candy3.src = "";
                    candy4.src = "";
                    candy1.alt = "";
                    candy2.alt = "";
                    candy3.alt = "";
                    candy4.alt = "";
                    addScore(4);
                }
            }
        }
    }

    function crushThree() {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns - 2; j++) {
                let candy1 = board[i][j];
                let candy2 = board[i][j + 1];
                let candy3 = board[i][j + 2];
                if (candy1.alt == candy2.alt && candy1.alt == candy3.alt && candy1.alt != "") {
                    candy1.src = "";
                    candy2.src = "";
                    candy3.src = "";
                    candy1.alt = "";
                    candy2.alt = "";
                    candy3.alt = "";
                    addScore(3);
                }
            }
        }
        for (let j = 0; j < columns; j++) {
            for (let i = 0; i < rows - 2; i++) {
                let candy1 = board[i][j];
                let candy2 = board[i + 1][j];
                let candy3 = board[i + 2][j];
                if (candy1.alt == candy2.alt && candy1.alt == candy3.alt && candy1.alt != "") {
                    candy1.src = "";
                    candy2.src = "";
                    candy3.src = "";
                    candy1.alt = "";
                    candy2.alt = "";
                    candy3.alt = "";
                    addScore(3);
                }
            }
        }
    }

    function slide() {
        for (let i = 0; i < rows - 1; i++) {
            for (let j = 0; j < columns; j++) {
                if (board[i + 1][j].alt == "") {
                    board[i + 1][j].alt = board[i][j].alt;
                    board[i + 1][j].src = board[i][j].src;
                    board[i][j].alt = "";
                    board[i][j].src = "";
                }
            }
        }
    }

    function generateCandy() {
        for (let j = 0; j < columns; j++) {
            if (board[0][j].alt == "") {
                let randomCandy = rndCandy();
                board[0][j].src = `../images/${randomCandy}.png`;
                board[0][j].alt = randomCandy;
            }
        }
    }

    function timerGame() {
        displayTimer.innerHTML = timer--;
        if (timer == 0) {
            if (score >= `${rows * 10}`) {
                Data.winner += 1;
                updateUserData();
                window.location = "../html/win.html";
            }
            else {
                updateUserData();
                window.location = "../html/GameOver.html";
            }

        }
    }

    let timerInterval = setInterval(timerGame, 1000);

    function updateUserData() {
        if (Data.highestScore < score)
            Data.highestScore = score;
        Data.lastLevel = rows;
        counter++;
        Data.times = counter;
        let updateData = JSON.stringify(Data);
        localStorage.setItem(`${currentUser}`, updateData);
    }

    window.setInterval(function () {
        crushFour();
        crushThree();
        slide();
        generateCandy();
    }, 10);
})





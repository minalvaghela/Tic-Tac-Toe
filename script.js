document.addEventListener("DOMContentLoaded", function () {
    const music = new Audio("music.mp3");
    const audioTurn = new Audio("ping.mp3");
    const gameover = new Audio("gameover.mp3");
    let turn = "X";
    let isgameover = false;

    const boxtext = document.getElementsByClassName('boxtext');
    const info = document.querySelector('.info');
    const imgbox = document.querySelector('.imgbox');
    const line = document.querySelector(".line");
    const boxes = document.getElementsByClassName("box");

    // Function to change the turn
    const changeTurn = () => (turn === "X" ? "0" : "X");

    // Function to check for a win
    const checkWin = () => {
        const wins = [
            [0, 1, 2, 5, 5, 0],
            [3, 4, 5, 5, 15, 0],
            [6, 7, 8, 5, 25, 0],
            [0, 3, 6, -5, 15, 90],
            [1, 4, 7, 5, 15, 90],
            [2, 5, 8, 15, 15, 90],
            [0, 4, 8, 5, 15, 45],
            [2, 4, 6, 5, 15, 135],
        ];

        for (const e of wins) {
            const [a, b, c, x, y, z] = e;
            if (boxtext[a].innerText === boxtext[b].innerText &&
                boxtext[b].innerText === boxtext[c].innerText &&
                boxtext[a].innerText !== "") {
                info.innerText = boxtext[a].innerText + " Won";
                isgameover = true;
                imgbox.getElementsByTagName('img')[0].style.width = "200px";
                line.style.transform = `translate(${x}vw, ${y}vw) rotate(${z}deg)`;
                line.style.width = "20vw";

                // Stop the music when a player wins
                music.pause();
                music.currentTime = 0;

                // Play the gameover audio
                gameover.play();
                return;
            }
        }
    };

    // Playing music logic
    function playMusic() {
        music.play();
        music.addEventListener('ended', function () {
            // When the music ends, play it again from the beginning
            this.currentTime = 0;
            this.play();
        });
    }

    // Call the playMusic function when the page loads
    window.addEventListener('load', () => {
        playMusic();
    });

    // Function to handle a player's move
    function handleMove(boxtext, element) {
        if (boxtext.innerText === '' && !isgameover) {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!isgameover) {
                info.innerText = "Turn for " + turn;
            }
        }
    }

    // Event listener for box clicks
    Array.from(boxes).forEach(element => {
        const boxtext = element.querySelector('.boxtext');
        element.addEventListener('click', () => {
            handleMove(boxtext, element);
        });
    });

    // Event listener for reset button
    const reset = document.getElementById("reset");
    reset.addEventListener('click', () => {
        Array.from(boxtext).forEach(element => {
            element.innerText = "";
        });
        turn = "X";
        isgameover = false;
        line.style.width = "0vw";
        info.innerText = "Turn for " + turn;
        imgbox.getElementsByTagName('img')[0].style.width = "0px";

        // Restart the music playback
        playMusic();
    });
});

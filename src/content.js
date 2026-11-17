import { Chess } from "chess.js";

let game = new Chess();
let currentMove = ""; // create an empty string to hold the moves

console.log("Current game FEN: ", game.fen());

function toggleVisible(e) {
    if (!(e instanceof HTMLElement)) {
        console.log("Unable to take given element for toggling");
        return;
    }

    if (e.style.display === "none") {
        e.style.display = "grid";
        hideButton.textContent = "Hide";
    } else {
        e.style.display = "none";
        hideButton.textContent = "Show";
    }
};

const extensionContainer = document.createElement("div");
extensionContainer.id = "main-container";

const visibilityControls = document.createElement("div");
visibilityControls.id = "vis-Controls";

const chessContainer = document.createElement("div");
chessContainer.id = "chess-input";

const hideButton = document.createElement("button");
hideButton.id = "hide-button";
hideButton.textContent = "Hide";

hideButton.addEventListener("click", () => {
    toggleVisible(chessContainer);
});

const moveInput = document.createElement("input");
moveInput.type = "text";
moveInput.placeholder = "Enter your Move..";

// div for custom auto complete

const customCorrections = document.createElement("div");
customCorrections.id = "correctionsContainer";

moveInput.addEventListener("input", () => {

    const legalMoves = game.moves();

    const filteredMoves = legalMoves.filter(move => 
        move.toLowerCase().startsWith(moveInput.value.toLowerCase())
    );

    customCorrections.innerHTML = "";

    if (moveInput.value.trim() == "") return;

    filteredMoves.forEach(move => {
        const suggestion = document.createElement("button");

        suggestion.textContent = move;

        suggestion.addEventListener("click", () => {
            moveInput.value = suggestion.textContent;
        });

        customCorrections.appendChild(suggestion);
    });

});

const submit = document.createElement("button");
submit.textContent = "Submit";
submit.id = "Submit-Button";

visibilityControls.append(hideButton);
chessContainer.append(moveInput);
chessContainer.append(submit);
chessContainer.append(customCorrections);
extensionContainer.append(visibilityControls);
extensionContainer.append(chessContainer);
document.body.appendChild(extensionContainer);


submit.addEventListener("click", () => {
    console.log("Move Attempted: ", moveInput.value);

    try {
        currentMove = moveInput.value.trim();
        game.move(currentMove);

        console.log("Legal Move");

        submit.classList.add("success");
        submit.textContent = "✓";
    
        setTimeout(() => {
            submit.classList.remove("success");
            submit.textContent = "Submit";
        }, 700);

    } catch (error) {
        console.log("Illegal Move");

        submit.classList.add("error");

        setTimeout(() => {
            submit.classList.remove("error");
        }, 1000);
    }

    moveInput.value = "";
    customCorrections.innerHTML = "";
});




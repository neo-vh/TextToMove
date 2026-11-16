import { Chess } from "chess.js";

let game = new Chess();
let currentMove = ""; // create an empty string to hold the moves

console.log("Current game FEN: ", game.fen());

const chessContainer = document.createElement("div");
chessContainer.id = "chess-input";

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

chessContainer.append(moveInput);
chessContainer.append(submit);
chessContainer.append(customCorrections);
document.body.appendChild(chessContainer);

submit.addEventListener("click", () => {
    console.log("Move Attempted: ", moveInput.value);

    try {
        currentMove = moveInput.value.trim();
        game.move(currentMove);

        console.log("Legal Move");

    } catch (error) {
        console.log("Illegal Move");

        submit.style.backgroundColor = "#81b64c";
        submit.style.color = "white";
        submit.style.borderRadius = "6px";
    }

    moveInput.value = "";

    customCorrections.innerHTML = "";

});




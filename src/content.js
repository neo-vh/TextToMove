import { Chess } from "chess.js";

let game = new Chess();
let currentMove = new String; // create an empty string to hold the moves

console.log("Current game FEN: ", game.fen());

console.log("Extension Loaded!");

const chessContainer = document.createElement("div");
chessContainer.id = "chess-input";

const moveInput = document.createElement("input");
moveInput.type = "text";
moveInput.placeholder = "Enter your Move..";

const submit = document.createElement("button");
submit.textContent = "Submit";

chessContainer.append(moveInput);
chessContainer.append(submit);
document.body.appendChild(chessContainer);

submit.addEventListener("click", () => {
    console.log("Move Attempted: ", moveInput.value);

    try {
        currentMove = moveInput.value.trim();
        game.move(currentMove);

        console.log("Legal Move");

    } catch (error) {
        console.log("Illegal Move");
    }
});




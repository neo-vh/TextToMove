console.log("EXTENSION LOADED");


const container = document.createElement("div");
container.id = 'chess-input-box';

const input = document.createElement("input");
input.type = "text";
input.placeholder = "your move...";

const button = document.createElement("button");
button.textContent = "Submit";

button.addEventListener("click", () => {
    console.log("Move enetered: " + input.value);
    input.value = ""
});

container.appendChild(input);
container.appendChild(button);

document.body.appendChild(container)
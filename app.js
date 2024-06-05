let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset");
let newGameButton = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
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

const resetGame = () =>{
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    resetButton.classList.remove('glow');
}

const handleClick = (event) => {
    const box = event.target;
    if (turnO){
        box.innerHTML = "<span class='circle'>O</span>";
        turnO = false;
    } else {
        box.innerHTML = "<span class='cross'>X</span>";
        turnO = true;
    }
    box.classList.add('disabled');
    box.removeEventListener("click", handleClick);

    checkWinner();
};

boxes.forEach((box)=>{
    box.addEventListener("click", handleClick);
});

const disableBoxes = () =>{
    boxes.forEach((box) => {
        box.classList.add('disabled');
        box.removeEventListener("click", handleClick);
    });
}

const enableBoxes = () =>{
    boxes.forEach((box) => {
        box.classList.remove('disabled');
        box.innerHTML = "";
        box.addEventListener("click", handleClick);
    });
}

const showWinner = (winner) =>{
    msg.innerHTML = `🎉 CONGRATULATIONS! WINNER IS <span class="winner">${winner}</span> 🎉`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    resetButton.classList.add('glow');
}

const checkWinner = () =>{
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return;
            }
        }     
    }

    // Check for a draw
    let allFilled = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            allFilled = false;
        }
    });

    if (allFilled) {
        msg.innerText = "It's a Draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
        resetButton.classList.add('glow');
    }
};

resetButton.addEventListener("click", resetGame);
newGameButton.addEventListener("click", resetGame);

//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", guess);

//global variables
let randomNumber = Math.floor(Math.random() * 99) + 1;

function guess(){

    let userGuess = document.querySelector("#guessBox").value;
    //alert(userGuess);
    document.querySelector("#answers").textContent += userGuess + ", ";
    // document.querySelector("#answers").textContent += ` ${userGuess} `;
    if(userGuess < randomNumber){
        document.querySelector("#guessValue").textContent = "too low"
        document.querySelector("#guessValue").style.color = "orange";
    } else if(userGuess > randomNumber) {
        document.querySelector("#guessValue").textContent = "too high"
        document.querySelector("#guessValue").style.color = "blue";
    } else {
        document.querySelector("#guessValue").textContent = "Correct!"
        document.querySelector("#guessValue").style.color = "green";
    }
}
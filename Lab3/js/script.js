document.querySelector("button").addEventListener("click", feedback1);


displayQ3Options();

function displayQ3Options(){

    let q3Options = ["font-color", "color", "fontColor", "text-color"];
    q3Options = _.shuffle(q3Options);

    for(let i of q3Options ) {
    let inputElement = document.createElement("input")
    inputElement.type = "radio";
    inputElement.name = "q3";
    inputElement.value = i
    console.log(inputElement);

    let labelElement = document.createElement("label")
    labelElement.textContent = i;
    labelElement.prepend(inputElement);

    document.querySelector("#q3Options").append(labelElement);
    }
}

function feedback1(){
    let userAnswer1 = document.querySelector("input[name=q1]:checked").value;
    if(userAnswer1 == "windows"){
        document.querySelector("#feedback1").textContent="Correct!";
        document.querySelector("#feedback1").style.color="green";
    } else {
        document.querySelector("#feedback1").textContent="Wrong!";
        document.querySelector("#feedback1").style.color="red";
    } 

    let userAnswer2 = document.querySelector("#textSize").value;
    if(userAnswer2 == "16"){
        document.querySelector("#feedback2").textContent="Correct!";
        document.querySelector("#feedback2").style.color="green";
    } else {
        document.querySelector("#feedback2").textContent="Wrong!";
        document.querySelector("#feedback2").style.color="red";
    }

    let userAnswer3 = document.querySelector("#q3").value;
    if(userAnswer3 == "templeOS"){
        document.querySelector("#feedback3").textContent="Correct!";
        document.querySelector("#feedback3").style.color="green";
    } else {
        document.querySelector("#feedback3").textContent="Wrong!";
        document.querySelector("#feedback3").style.color="red";
    }

    let userAnswer4 = document.querySelector("#q4").value;
    if(userAnswer4 == "RTX 5060 TI"){
        document.querySelector("#feedback4").textContent="Correct!";
        document.querySelector("#feedback4").style.color="green";
    } else {
        document.querySelector("#feedback4").textContent="Wrong!";
        document.querySelector("#feedback4").style.color="red";
    }

    if(document.querySelector("#q5a").checked && document.querySelector("q5b").checked && !document.querySelector("#q5c")){
        document.querySelector("#feedback5").textContent="Correct!";
        document.querySelector("#feedback5").style.color="green";
    } else {
        document.querySelector("#feedback5").textContent="Wrong!";
        document.querySelector("#feedback5").style.color="red";
    }

}

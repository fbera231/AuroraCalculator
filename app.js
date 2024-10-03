const math = require('mathjs');

function appendToDisplay(value) {
    document.getElementById("display").value += value;
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function calculatePercentage(){
     
    const value= parseFloat(document.getElementById("display").value);
    document.getElementById("display").value= value/100;

}

function calculateResult(){
    const display= document.getElementById("display");
    
    try{
        display.value = eval(display.value.replace(/\^/g, "**"));
    }catch(error){

        let value = display.value;
        let position = value.length - 1;
        while (position >= 0) {
             if (value[position] === '√') {
                // Slice the part after '√'
                let expressionAfterSqrt = value.slice(position + 1);
    
                try {
                    // Evaluate the expression after '√'
                    let result = eval(expressionAfterSqrt);
                    // Replace the part starting from '√' with the square root result
                    value = value.slice(0, position) + Math.sqrt(result);
                    // Update the display value
                    display.value = value;
                    // Continue checking from the last processed position
                    position = value.length - 1;
                } catch (e) {
                    display.value = 'Error'; // Handle any errors
                    break;
                }
            } else {
                // Move to the previous character
                position--;
            }
        }
        
    }
}

document.addEventListener("keydown", function(event) {
    const key = event.key;
    const display = document.getElementById("display");

    if (!isNaN(key) || key === ".") {
        appendToDisplay(key);
    } else if (key === "+" || key === "-" || key === "/" || key === "*" || key === "%" || key === "^" || key === "√") {
        appendToDisplay(key);
    } else if (key === "Backspace") {
        display.value = display.value.slice(0, -1);
    } else if (key === "Escape") {
        clearDisplay();
    } else if (key === "Enter") {
        calculateResult();
    }
});

function clearDisplay() {
    const display = document.getElementById("display");
    display.value = "";
}


/*document.addEventListener("keydown", function(event){

    const key = event.key;
    const display = document.getElementById("display");

    if(!isNaN(key) || key==="."){
        appendToDisplay(key)
    }else if(key === "+" || key === "-" || key === "/" || key === "*" || key === "%" || key === "^" || key === "√"){
        appendToDisplay(key);
    }else if(key === "Backspace"){
        display.value= display.value.slice(0,-1)
    }else if(key === "Escape"){
        clearDisplay();
    }else if(key === "Enter"){
        calculateResult()
    }
});
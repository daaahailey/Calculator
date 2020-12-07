const calculator = document.querySelector("#calculator");
const buttons = document.querySelectorAll(".cal_btn");
const operators = document.querySelectorAll(".operation_btn");
const calDisplay = document.querySelector("#cal_display");

function init() {
  let firstNumber = "";
  let secondNumber = "";
  let operator = "";
  let currentValue = "";

  buttons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      const btn = event.target;
      const btnValue = btn.innerText;
      const { type } = btn.dataset;
      const displayValue = calDisplay.innerText;
      
      if (type === "number") {
        if (displayValue === "0" && operator == "") {
          calDisplay.innerText = btnValue;
          firstNumber = displayValue;
        } else if (displayValue !== "0" && operator == "") {
          calDisplay.innerText = displayValue + btnValue;
          firstNumber = displayValue;
        } else if (currentValue !== "") {
          firstNumber = currentValue.toString();
          secondNumber += btnValue;
          calDisplay.innerText = secondNumber;
        } else {
          secondNumber += btnValue;
          calDisplay.innerText = secondNumber;
        }      
      }
      if (type === "operator") {
        if (operator === "") {
          firstNumber = displayValue;
          operator = btnValue;
        } else if (currentValue === "") {
          currentValue = calculation(operator, firstNumber, secondNumber);
          operator = btnValue;
          firstNumber = currentValue.toString();
          calDisplay.innerText = firstNumber;
          secondNumber = "";
        } else if (operator !== "" && currentValue !== "") {
          currentValue = calculation(operator, firstNumber, secondNumber);
          operator = btnValue;
          firstNumber = currentValue.toString();
          calDisplay.innerText = firstNumber;
          secondNumber = "";
        }
      }
      if (type === "equal") {
        currentValue = calculation(operator, firstNumber, secondNumber);
        calDisplay.innerText = currentValue.toString();
        firstNumber = displayValue;
        secondNumber = "";
        currentValue = "";
        operator = "";
      }
      if (type === "clear") {
        calDisplay.innerText = "0";
        firstNumber = "";
        secondNumber = "";
        currentValue = "";
        operator = "";
      }
    });
  });
}

function calculation(operator, firstNumber, secondNumber) {
  firstNumber = parseFloat(firstNumber);
  secondNumber = parseFloat(secondNumber);
  if (operator === "+") {
    return firstNumber + secondNumber;
  } else if (operator === "-") {
    return firstNumber - secondNumber;
  } else if (operator === "*") {
    return firstNumber * secondNumber;
  } else if (operator === "/") {
    return firstNumber / secondNumber;
  }
}

init();
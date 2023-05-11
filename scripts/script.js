"use strict";

const gameContainer = document.querySelector(".container");
const numbersBetween = document.querySelector(".number-between");
const input = document.querySelector(".number-input");
const infoField = document.querySelector(".info");
const checkButton = document.querySelector(".btn-check");
const newGameButton = document.querySelector(".btn-new-game");

let maxNumber = 0;
const guesses = [];

// CANCEL THE GAME
const gameCancelled = () => {
  maxNumber = 2;
  numbersBetween.textContent = "GAME CANCELLED";
  input.classList.toggle("hide");
  checkButton.classList.toggle("hide");
  gameContainer.style.background = "#ff8787";
};

// NEW GAME
newGameButton.addEventListener("click", () => {
  window.location.reload();
});

// PROMPT LOOP
while (maxNumber <= 1) {
  let userInput = prompt("Enter a maximum number: ");

  maxNumber = Math.round(Number(userInput));
  console.log(`User's number: ${maxNumber}`);

  if (userInput === null) {
    gameCancelled();
  } else if (maxNumber <= 1 || isNaN(maxNumber)) {
    alert("Please enter a positive number greater than 1");
    maxNumber = 0;
  } else {
    numbersBetween.textContent = `Guess a number between 1 and ${maxNumber}`;
  }
}

// SECRET NUMBER
let secretNumber = Math.trunc(Math.random() * maxNumber) + 1;
console.log(`Number to guess: ${secretNumber}`);

// CHECK DUPLICATES
let duplicateFound = false;

const checkDuplicates = (number) => {
  if (guesses.includes(number)) {
    duplicateFound = true;
  } else {
    duplicateFound = false;
    guesses.push(number);
  }
};

const guessResult = (number) => {
  if (number < secretNumber) {
    checkDuplicates(number);

    if (duplicateFound) {
      infoField.classList.add("active");
      infoField.textContent = "You've already guessed this number.";
      infoField.style.color = "#fa5252";
    } else {
      infoField.classList.add("active");
      infoField.textContent = "No, try a higher 🔺 number.";
      infoField.style.color = "#194759";
    }
  } else if (number > secretNumber) {
    checkDuplicates(number);

    if (duplicateFound) {
      infoField.classList.add("active");
      infoField.textContent = "You've already guessed this number.";
      infoField.style.color = "#fa5252";
    } else {
      infoField.classList.add("active");
      infoField.textContent = "No, try a lower 🔻 number.";
      infoField.style.color = "#194759";
    }
  } else {
    checkButton.setAttribute("disabled", true);
    input.setAttribute("disabled", true);
    guesses.push(number);
    let tries = guesses.length;
    let result = guesses.join(", ");
    infoField.classList.add("active");

    if (guesses.length === 1) {
      gameContainer.style.backgroundColor = "#0ca678";
      infoField.textContent = `You got it! \nIt took you 1 try and your guess was ${guesses[0]}.`;
    } else {
      gameContainer.style.backgroundColor = "#0ca678";
      infoField.textContent = `You got it!\nIt took you ${tries} tries and your guesses were: ${result}.`;
    }
  }
};

const checkNumber = () => {
  const number = input.value;

  if (number === "") {
    infoField.classList.remove("active");
    infoField.classList.add("active");
    infoField.textContent = "This field should not be empty";
    infoField.style.color = "#fa5252";
  } else if (isNaN(number)) {
    infoField.classList.remove("active");
    infoField.classList.add("active");
    infoField.textContent = "That is not a number!";
    infoField.style.color = "#fa5252";
  } else if (Number(number) > maxNumber || Number(number) < 1) {
    infoField.classList.remove("active");
    infoField.classList.add("active");
    infoField.textContent = "That number is not in range, try again.";
    infoField.style.color = "#fa5252";
  } else {
    infoField.classList.remove("active");
    guessResult(number);
  }
};

checkButton.addEventListener("click", () => {
  checkNumber();
});

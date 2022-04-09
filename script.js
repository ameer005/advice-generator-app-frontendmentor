"use strict";

// Normal Elements
const adiveBoxContainer = document.querySelector(".advicebox");
const adviceHeadingEl = document.querySelector(".primary-heading");
const adviceNumberEl = document.querySelector(".advice-number");
const adviceTextEl = document.querySelector(".adive-text");

// Buttons
const btnDice = document.querySelector(".btn-dice");
const iconDice = document.querySelector(".icon-dice ");

// fix
function is_touch_enabled() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

if (!is_touch_enabled()) {
  btnDice.classList.add("btn2");
}

// Helper function
const wait = function (sec) {
  return new Promise(function (resolve) {
    setTimeout(resolve, sec * 1000);
  });
};

// adivce api code
const adviceGenrator = async function () {
  try {
    // getting the advice data
    const adviceRes = await fetch("https://api.adviceslip.com/advice");
    if (!adviceRes) {
      throw new Error("Something went wrong");
    }

    const { slip: adviceData } = await adviceRes.json();

    // Inserting adive data in html
    adiveBoxContainer.style.display = "none";
    iconDice.style.animation = "loading .7s ease infinite alternate";

    document.querySelector(".divider").style.marginTop = "1.4rem";
    adviceNumberEl.textContent = adviceData.id;
    adviceTextEl.textContent = "“" + adviceData.advice + "”";
    adviceTextEl.style.color = "#cee3e9";
    btnDice.style.backgroundColor = "hsl(216, 17%, 46%)";

    // Displaying result after 1 second
    await wait(1);
    iconDice.style.animation = "none";
    document.querySelector(".divider").style.marginTop = "0rem";

    btnDice.style.backgroundColor = "hsl(150, 100%, 66%)";

    // iconDice.removeProperty("animation");
    adiveBoxContainer.style.display = "block";
  } catch (err) {
    // Displaying error
    adviceTextEl.style.color = "#e47d83";
    adviceTextEl.textContent =
      "Looks like something went wrong. Please try again in a moment!";
    adviceNumberEl.textContent = "##";
  }
};

// Using button
btnDice.addEventListener("click", function () {
  adviceGenrator();
});

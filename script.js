const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const dayResult = document.getElementById("DD");
const monthResult = document.getElementById("MM");
const yearResult = document.getElementById("YYYY");

form.addEventlistener("submit", handlesubmit);

const date = new date();
let day = date.getDate();
let month = 1 + date.getMonth();
let year = date.getFullYear();

const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function validate() {
  const inputs = document.querySelectorAll("input");
  let validator = true;
  inputs.forEach((i) => {
    const parent = i.parentElement;
    if (!i.value) {
      i.style.borderColor = "red";
      parent.querySelector("small").innerText = "This field is required";
      validator = false;
    } else if (monthInput.value > 12) {
      monthInput.style.borderColor = "red";
      monthInput.parentElement.querySelector("small").innerText =
        "must be a valid month";
      validator = false;
    } else if (dayInput > 31) {
      dayInput.style.borderColor = "red";
      dayInput.parentElement.querySelector("small").innerText =
        "must be a valid day";
      validator = false;
    } else {
      i.style.borderColor = "black";
      parent.querySelector("small").innerText = "";
      validator = true;
    }
  });
  return validator;
}

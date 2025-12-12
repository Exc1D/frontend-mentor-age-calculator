const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const dayResult = document.getElementById("DD");
const monthResult = document.getElementById("MM");
const yearResult = document.getElementById("YY");
const form = document.querySelector("form");

form.addEventListener("submit", handleSubmit);

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function getDaysInMonth(month, year) {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2 && isLeapYear(year)) {
    return 29;
  }
  return daysInMonth[month - 1];
}

function validate() {
  const inputs = document.querySelectorAll("input");
  let isValid = true;

  inputs.forEach((input) => {
    const parent = input.parentElement;
    const small = parent.querySelector("small");
    input.style.borderColor = "";
    small.innerText = "";
  });

  if (!dayInput.value || !monthInput.value || !yearInput.value) {
    if (!dayInput.value) {
      dayInput.style.borderColor = "red";
      dayInput.parentElement.querySelector("small").innerText =
        "This field is required";
    }
    if (!monthInput.value) {
      monthInput.style.borderColor = "red";
      monthInput.parentElement.querySelector("small").innerText =
        "This field is required";
    }
    if (!yearInput.value) {
      yearInput.style.borderColor = "red";
      yearInput.parentElement.querySelector("small").innerText =
        "This field is required";
    }
    return false;
  }

  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value);
  const year = parseInt(yearInput.value);
  const today = new Date();
  const inputDate = new Date(year, month - 1, day);

  if (month < 1 || month > 12) {
    monthInput.style.borderColor = "red";
    monthInput.parentElement.querySelector("small").innerText =
      "What kind of calendar is that?";
    isValid = false;
  }

  if (day < 1 || day > getDaysInMonth(month, year)) {
    dayInput.style.borderColor = "red";
    dayInput.parentElement.querySelector("small").innerText =
      "Must be a valid day";
    isValid = false;
  }

  if (inputDate > today) {
    yearInput.style.borderColor = "red";
    yearInput.parentElement.querySelector("small").innerText =
      "Are you from the future?";
    isValid = false;
  }

  return isValid;
}

function calculateAge(birthDate) {
  const today = new Date();
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

function animateNumber(el, num) {
  let step = 50;
  num > 25 && (step = 35);
  num > 50 && (step = 25);
  num > 75 && (step = 20);
  num > 100 && (step = 10);
  num > 200 && (step = 1);

  let n = 0;
  if (num === 0) {
    el.innerHTML = n;
  } else {
    let interval = setInterval(() => {
      n += 1;
      if (n === num) {
        clearInterval(interval);
      }
      el.innerHTML = n;
    }, step);
  }
}
function handleSubmit(e) {
  e.preventDefault();

  if (validate()) {
    const birthDate = new Date(
      parseInt(yearInput.value),
      parseInt(monthInput.value) - 1,
      parseInt(dayInput.value)
    );

    const age = calculateAge(birthDate);

    animateNumber(dayResult, age.days);
    animateNumber(monthResult, age.months);
    animateNumber(yearResult, age.years);
  }
}

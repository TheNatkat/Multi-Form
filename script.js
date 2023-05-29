const first = document.querySelector(".form-infos");
const second = document.querySelector(".form-plan");
const third = document.querySelector(".form-add-ons");
const forth = document.querySelector(".form-summary");
const fiveth = document.querySelector(".form-thankyou");

const firstPageButton = document.querySelector("#first-pge-btn");
const secondPageButton = document.querySelector("#second-pge-btn");
const secondPageback = document.querySelector("#second-pge-back");
const thirdPageButton = document.querySelector("#third-pge-btn");
const thirdPageback = document.querySelector("#third-pge-back");
const forthPageButton = document.querySelector("#forth-pge-btn");
const forthPageback = document.querySelector("#forth-pge-back");

const step1 = document.querySelector("#step-1");
const step2 = document.querySelector("#step-2");
const step3 = document.querySelector("#step-3");
const step4 = document.querySelector("#step-4");

const planCheck = document.querySelector("#plan-check");

const allPrice = document.querySelectorAll(".price");

const free = document.querySelectorAll("span");
const allAddonPrice = document.querySelectorAll(".addon-price");

const yourPlan = document.querySelector("#your-plan");
const planCost = document.querySelector("#plan-cost");
const change = document.querySelector("#change");

const online = document.querySelector(".addon-1");
const storage = document.querySelector(".addon-2");
const custom = document.querySelector(".addon-3");

const grandTotal = document.querySelector("#grand-total");
const lastPrice = document.querySelectorAll(".last-price");

const month = document.querySelector("#month");
const year = document.querySelector("#year");

let allCheckBox = document.querySelectorAll('input[name="adds"]');
let checkedPlan;

let packprice = 0;
let total = 0;
let addOnSum = 0;

let yearPlan = false;

const allPackData = {
  Arcade: {
    monthlyPrice: 9,
    yearPrice: 90,
  },
  Advance: {
    monthlyPrice: 12,
    yearPrice: 120,
  },
  Pro: {
    monthlyPrice: 15,
    yearPrice: 150,
  },
};

const allAddOnsData = {
  service: {
    isSelect: false,
    monthlyPrice: 1,
    yearPrice: 10,
  },
  storage: {
    isSelect: false,
    monthlyPrice: 2,
    yearPrice: 20,
  },
  profile: {
    isSelect: false,
    monthlyPrice: 2,
    yearPrice: 20,
  },
};

function checkInputs() {
  const nameFeild = document.querySelector("#input-field-1");
  const emailFeild = document.querySelector("#input-field-2");
  const phoneFeild = document.querySelector("#input-field-3");
  const nameError = document.querySelector("#error-field-1");
  const emailError = document.querySelector("#error-field-2");
  const phoneError = document.querySelector("#error-field-3");

  let value = 0;
  if (nameFeild.value === "") {
    nameFeild.style.borderColor = "red";
    nameError.innerHTML = "This field is required";
  }else  value++;

  if (emailFeild.value === "") {
    emailFeild.style.borderColor = "red";
    emailError.innerHTML = "This field is required";
  }else value++;

  if (phoneFeild.value === "") {
    phoneFeild.style.borderColor = "red";
    phoneError.innerHTML = "This field is required";
  }else  value++;

  if (value === 3) return true;
  return false;
}

function resetAddons() {
  addOnSum = 0;
  allCheckBox.forEach((item) => {
    allAddOnsData[`${item.value}`].isSelect = false;
    if (item.value == "service") online.classList.toggle("hide");
    if (item.value == "storage") storage.classList.toggle("hide");
    if (item.value == "profile") custom.classList.toggle("hide");
  });
}

firstPageButton.addEventListener("click", () => {
  if (checkInputs()) {
    first.classList.toggle("hide");
    second.classList.toggle("hide");
    step1.classList.toggle("blue");
    step2.classList.toggle("blue");
  }
});

secondPageButton.addEventListener("click", () => {
  checkedPlan = document.querySelector('input[name="game-pack"]:checked').value;
  if (yearPlan) packprice = allPackData[`${checkedPlan}`].yearPrice;
  else packprice = allPackData[`${checkedPlan}`].monthlyPrice;
  
  allAddonPrice.forEach((item) => {
    let words = item.textContent;
    let temp;
    if (yearPlan) temp = words.replace("/mo", "0/yr");
    else temp = words.replace("0/yr", "/mo");
    item.textContent = temp;
  });

  second.classList.toggle("hide");
  third.classList.toggle("hide");
  step2.classList.toggle("blue");
  step3.classList.toggle("blue");
});

secondPageback.addEventListener("click", () => {
  second.classList.toggle("hide");
  first.classList.toggle("hide");
  step2.classList.toggle("blue");
  step1.classList.toggle("blue");
});

thirdPageButton.addEventListener("click", () => {
  allCheckBox = document.querySelectorAll('input[name="adds"]:checked');
  allCheckBox.forEach((item) => {
    allAddOnsData[`${item.value}`].isSelect = true;
    if (yearPlan) addOnSum += allAddOnsData[`${item.value}`].yearPrice;
    else addOnSum += allAddOnsData[`${item.value}`].monthlyPrice;
    if (item.value == "service") online.classList.toggle("hide");
    if (item.value == "storage") storage.classList.toggle("hide");
    if (item.value == "profile") custom.classList.toggle("hide");
  });

  yourPlan.innerText = `${checkedPlan}`;
  if (!yearPlan) planCost.innerText = `$${packprice}/mo`;
  else planCost.innerText = `$${packprice}/yr`;

  lastPrice.forEach((price) => {
    let words = price.textContent;
    let temp = words;
    if (yearPlan) temp = words.replace("/mo", "0/yr");
    else temp = words.replace("0/yr", "/mo");
    price.textContent = temp;
  });

  total = packprice + addOnSum;
  if (yearPlan) grandTotal.innerText = `+$${total}/yr`;
  else grandTotal.innerText = `+$${total}/mo`;

  third.classList.toggle("hide");
  forth.classList.toggle("hide");
  step3.classList.toggle("blue");
  step4.classList.toggle("blue");
});

thirdPageback.addEventListener("click", () => {
  total = 0;
  second.classList.toggle("hide");
  third.classList.toggle("hide");
  step3.classList.toggle("blue");
  step2.classList.toggle("blue");
});

forthPageButton.addEventListener("click", () => {
  forth.classList.toggle("hide");
  fiveth.classList.toggle("hide");
});

forthPageback.addEventListener("click", () => {
  forth.classList.toggle("hide");
  third.classList.toggle("hide");
  step4.classList.toggle("blue");
  step3.classList.toggle("blue");
  resetAddons();
});

change.addEventListener("click", () => {

  forth.classList.toggle("hide");
  second.classList.toggle("hide");
  step4.classList.toggle("blue");
  step2.classList.toggle("blue");
  resetAddons();
});

planCheck.addEventListener("change", () => {
  if (!yearPlan) {
    yearPlan = true;
    year.style.color = "hsl(213, 96%, 18%)";
    month.style.color = "hsl(231, 11%, 63%)";
  } else {
    yearPlan = false;
    year.style.color = "hsl(231, 11%, 63%)";
    month.style.color = "hsl(213, 96%, 18%)";
  }

  allPrice.forEach((price) => {
    let words = price.textContent;
    let temp = words;
    if (yearPlan) temp = words.replace("/mo", "0/yr");
    else temp = words.replace("0/yr", "/mo");
    price.textContent = temp;
  });

  console.log("Plan selected");
  free.forEach((item) => {
    item.classList.toggle("hide");
  });
});

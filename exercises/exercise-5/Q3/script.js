const zeroBtn = document.getElementById("zero-btn");
const oneBtn = document.getElementById("one-btn");
const twoBtn = document.getElementById("two-btn");
const threeBtn = document.getElementById("three-btn");
const fourBtn = document.getElementById("four-btn");
const fiveBtn = document.getElementById("five-btn");
const sixBtn = document.getElementById("six-btn");
const sevenBtn = document.getElementById("seven-btn");
const eightBtn = document.getElementById("eight-btn");
const nineBtn = document.getElementById("nine-btn");
const dotBtn = document.getElementById("dot-btn");
const backspaceBtn = document.getElementById("backspace-btn");
const addBtn = document.getElementById("add-btn");
const subtractBtn = document.getElementById("subtract-btn");
const multiplyBtn = document.getElementById("multiply-btn");
const divideBtn = document.getElementById("divide-btn");
const display = document.getElementById("display");
const result = document.getElementById("result");

const calculate = (value) => {
  let res = 0,
    i = 0,
    decimal = false;
  while (i < value.length) {
    let op = "+",
      val = NaN,
      valuesAfterDecimal = 0;
    if (
      value[i] === "+" ||
      value[i] === "-" ||
      value[i] === "*" ||
      value[i] === "/"
    ) {
      op = value[i];
      i++;
    } else if (value[i] === ".") {
      if (i !== value.length) {
        if (!decimal) {
          decimal = true;
          i++;
        } else {
          display.value = display.value.substring(0, display.value.length - 1);
          continue;
        }
      }
    }
    while (
      i < value.length &&
      (value[i] === "0" ||
        value[i] === "1" ||
        value[i] === "2" ||
        value[i] === "3" ||
        value[i] === "4" ||
        value[i] === "5" ||
        value[i] === "6" ||
        value[i] === "7" ||
        value[i] === "8" ||
        value[i] === "9")
    ) {
      if (isNaN(val)) {
        val = 0;
      }
      if (decimal) {
        valuesAfterDecimal++;
        val = val + value[i] / Math.pow(10, valuesAfterDecimal);
      } else {
        val = val * 10 + Number(value[i]);
      }
      i++;
    }
    switch (op) {
      case "+":
        decimal = false;
        res += val;
        break;
      case "-":
        decimal = false;
        res -= val;
        break;
      case "*":
        decimal = false;
        res *= val;
        break;
      case "/":
        decimal = false;
        res /= val;
        break;
    }
  }
  result.value = res;
};

zeroBtn.addEventListener("click", () => {
  display.value =
    display.value === "0" ? zeroBtn.value : display.value + zeroBtn.value;
  calculate(display.value);
});

oneBtn.addEventListener("click", () => {
  display.value =
    display.value === "0" ? oneBtn.value : display.value + oneBtn.value;
  calculate(display.value);
});

twoBtn.addEventListener("click", () => {
  display.value =
    display.value === "0" ? twoBtn.value : display.value + twoBtn.value;
  calculate(display.value);
});

threeBtn.addEventListener("click", () => {
  display.value =
    display.value === "0" ? threeBtn.value : display.value + threeBtn.value;
  calculate(display.value);
});

fourBtn.addEventListener("click", () => {
  display.value =
    display.value === "0" ? fourBtn.value : display.value + fourBtn.value;
  calculate(display.value);
});

fiveBtn.addEventListener("click", () => {
  display.value =
    display.value === "0" ? fiveBtn.value : display.value + fiveBtn.value;
  calculate(display.value);
});

sixBtn.addEventListener("click", () => {
  display.value =
    display.value === "0" ? sixBtn.value : display.value + sixBtn.value;
  calculate(display.value);
});

sevenBtn.addEventListener("click", () => {
  display.value =
    display.value === "0" ? sevenBtn.value : display.value + sevenBtn.value;
  calculate(display.value);
});

eightBtn.addEventListener("click", () => {
  display.value =
    display.value === "0" ? eightBtn.value : display.value + eightBtn.value;
  calculate(display.value);
});

nineBtn.addEventListener("click", () => {
  display.value =
    display.value === "0" ? nineBtn.value : display.value + nineBtn.value;
  calculate(display.value);
});

addBtn.addEventListener("click", () => {
  display.value =
    display.value === "0" ? addBtn.value : display.value + addBtn.value;
  calculate(display.value);
});

subtractBtn.addEventListener("click", () => {
  display.value =
    display.value === "0"
      ? subtractBtn.value
      : display.value + subtractBtn.value;
  calculate(display.value);
});

multiplyBtn.addEventListener("click", () => {
  display.value =
    display.value === "0"
      ? multiplyBtn.value
      : display.value + multiplyBtn.value;
  calculate(display.value);
});

divideBtn.addEventListener("click", () => {
  display.value =
    display.value === "0" ? divideBtn.value : display.value + divideBtn.value;
  calculate(display.value);
});

dotBtn.addEventListener("click", () => {
  display.value = display.value + dotBtn.value;
  calculate(display.value);
});

backspaceBtn.addEventListener("click", () => {
  if (display.value.length === 1) {
    display.value = "0";
  } else {
    display.value = display.value.substring(0, display.value.length - 1);
  }
  calculate(display.value);
});

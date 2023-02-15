// 1. Tip Calculator
console.log("Output for 1st");
function tipCalculator(bill) {
  if (typeof bill !== "number") {
    console.error("Please pass a valid number");
    return;
  } else if (bill < 50) {
    return 0.2 * bill;
  } else if (bill >= 50 && bill <= 200) {
    return 0.15 * bill;
  } else {
    return 0.1 * bill;
  }
}

const bills = [140, 45, 280];

let tipArray = bills.map((bill) => {
  return tipCalculator(bill);
});

let finalBillsPaid = bills.map((bill) => {
  return tipCalculator(bill) + bill;
});

console.log("Tips Paid : ", tipArray);
console.log("Final Bills Paid : ", finalBillsPaid);

// 2. a) Abbreviated uppercase array
console.log("\n\n\nOutput for 2nd");
const days = [
  "Sunday   ",
  "   Monday  ",
  "  Tuesday",
  "Wednesday  ",
  "  Thursday   ",
  "  Friday",
  "Saturday    ",
];
let trimmedArray = days.map((day) => {
  if (typeof day !== "string") {
    console.error("Not a valid string");
    return "Not a valid string";
  }
  return day.trim().substring(0, 3).toUpperCase();
});

console.log(trimmedArray);

// 2. b) Coded Version
const codedFunction = (input) => {
  if (typeof input !== "string") {
    console.error("Not a valid string");
    return "Not a valid string";
  }
  return input
    .trim()
    .replace(/a/g, "4")
    .replace(/e/g, "3")
    .replace(/i/g, "1")
    .replace(/o/g, "0")
    .replace(/s/g, "5");
};

console.log("Output: ", codedFunction("javascript is cool"));
console.log("Output: ", codedFunction("programming is fun"));
console.log("Output: ", codedFunction("  become a coder"));

console.log("\n\n\nOutput for 3rd");
// 3.
const shoes = [
  {
    type: "Rubber",
    color: "Black",
    size: 42,
    price: 8000,
  },
  {
    type: "Rubber",
    color: "Blue",
    size: 40,
    price: 10000,
  },
];

const shirts = [
  {
    type: "Nylon",
    color: "Blue",
    size: 42,
    price: 4500,
  },
  {
    type: "Silk",
    color: "Grey",
    size: 38,
    price: 7000,
  },
  {
    type: "Cubban collar",
    color: "Neon",
    size: 40,
    price: 3000,
  },
];

// 3. a)
let warehouseArray = shoes.concat(shirts);
console.log("Warehouse Array: ", warehouseArray);

// 3. b)
let totalPrice = 0;
warehouseArray.forEach((item) => {
  if (typeof item.price !== "number") {
    console.error("Not a valid price");
    return;
  }
  totalPrice += item.price;
});
console.log("Total Price: ", totalPrice);

// 3. c)
warehouseArray.sort((item1, item2) => {
  if (typeof item1 !== null || typeof item2 !== null) {
    console.error("Not a valid item: ", item1, item2);
  }
  item2.price - item1.price;
});
console.log("Sorted Warehouse: ", warehouseArray);

// 3. d)
blueProducts = warehouseArray.filter((item) => {
  if (typeof item.color !== "string") {
    console.error("Not a valid color for item: ", item);
    return "Not a valid color";
  }
  return item.color.toLowerCase() === "blue";
});
console.log("BlueProducts Array: ", blueProducts);

// 4.
console.log("\n\n\nOutput for 4th");
// 4. a)
const convertToJSON = (inputObjectAsString) => {
  if (typeof inputObjectAsString !== "string") {
    console.error("Not a valid string");
    return "Not a valid string";
  }
  JSON.parse(inputObjectAsString);
};
let jsonObject = convertToJSON(
  '{"firstName":"Alex","lastName":"Hunter","email":"alex@yahoo.com","age \
":24, "city":"london", "country":"england"}'
);
const jsonObjectKeys = Object.keys(jsonObject);
jsonObjectKeys.forEach((key) => {
  if (key.toLowerCase() !== "email" && typeof jsonObject[key] === "string") {
    jsonObject[key] = jsonObject[key].toUpperCase();
  }
});
console.log("Json Object: ", jsonObject);

// 4. b)
const { firstName, lastName, email, ...restProperties } = jsonObject;
const jsonString = JSON.stringify({ firstName, lastName, ...restProperties });
console.log("String Object: ", jsonString);

// 5.
console.log("\n\n\nOutput for 5th");
let keys = [];
let values = [];
const getKeysValues = (inputObject) => {
  if (typeof inputObject === "object") {
    Object.keys(inputObject).forEach((key) => {
      keys.push(key);
      getKeysValues(inputObject[key]);
    });
  } else {
    values.push(inputObject);
  }
};
const player = {
  firstName: "Leo",
  lastName: "Messi",
  address: {
    country: "Spain",
    city: "Barcelona",
  },
  careerInfo: {
    fcBarcelona: {
      appearances: 780,
      goals: {
        premierLeagueGoals: 590,
        championsLeagueGoals: 50,
      },
    },
  },
};
getKeysValues(player);
console.log("Keys: ", keys);
console.log("Values :", values);

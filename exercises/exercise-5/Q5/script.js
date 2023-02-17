// 1. Callbacks


// 2. Promises
const getData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const v = 1;
        resolve("Promise executed!!");
      } catch (e) {
        reject("Constant violated");
      }
    }, 2000);
  });
};

getData()
  .then((response) => console.log("Response: ", response))
  .catch((e) => console.log("Error: ", e));


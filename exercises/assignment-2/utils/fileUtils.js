import fs from "fs";
/**
 * 
 * @param {*} data Data to be written in file
 * @param {*} filePath File in which data is to be added
 * @returns response whether data is added properly or not
 */
const writeToFile = async (data, filePath) => {
  return await new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data), "utf-8", (err) => {
      if (err) {
        console.error(err);
        reject("Error occured! File not created");
      } else {
        console.log("Successfully created json file!!");
        resolve("Sucessfully created file!!");
      }
    });
  });
};

/**
 * 
 * @param {*} filePath File to be read
 * @returns Data stored in file
 */
const readFromFile = async (filePath) => {
  return await new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

export { writeToFile, readFromFile };

import fs from "fs";
import { logger } from "../logger/logger.js";
import {
  getErrorObject,
  getSuccessObject,
} from "./genericMessageTransformers.js";

/**
 * This function writes data to a file of path specified
 * @param {*} data This data will be stored in file
 * @param {*} filePath This is the file path where data 
 * @returns status (Whether write is successful or not)
 */
const writeToFile = async (data, filePath) => {
  return await new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data), "utf-8", (err) => {
      if (err) {
        logger.error(err);
        reject(
          getErrorObject(err, `Error occured! File ${filePath} not created`)
        );
      } else {
        logger.info("Successfully created json file!!");
        resolve(getSuccessObject({}, "Sucessfully created file!!"));
      }
    });
  });
};

/**
 * This function reads data from a file of path specified
 * @param {*} filePath This is the file path where data is stored
 * @returns data stored in file
 */
const readFromFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(
          getErrorObject(err, "Error occured! File not available to read")
        );
      } else {
        resolve(getSuccessObject(data, "File content successfully accessed!!"));
      }
    });
  });
};

/**
 * This is called when file is not found
 * @param {*} filePath 404.html file path will be passed
 * @param {*} res Send the content of file as an response
 */
const fileNotFound = (filePath, res) => {
  readFromFile(filePath)
    .then((content) => {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(content.data, "utf-8");
    })
    .catch((err) => err.error);
};

export { writeToFile, readFromFile, fileNotFound };

import path, { dirname } from "path";
import http from "http";
import { logger } from "./logger/logger.js";
import { fileURLToPath } from "url";
import { fileNotFound, readFromFile } from "./utils/fileUtils.js";
import { config } from "./constants/config.js";

const PORT = process.env.PORT || config.port;

const server = http.createServer();

/**
 * Takes a url and detect its file extension and content type
 * @param {*} url Takes a url as a parameter
 * @returns content type and extension of file passed
 */
const getContentType = (url) => {
  // Extension of file
  let extname = path.extname(url);

  // Initial content type
  let contentType = "text/html";

  // Check ext and set content type
  switch (extname) {
    case ".html":
      contentType = "text/html";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpeg":
      contentType = "image/jpeg";
      break;
  }
  return { contentType, extname };
};

/**
 * It reads content of file and renders it to the client browser as a response
 * @param {*} filePath It is a file path whose content will be rendered on the client browser
 * @param {*} res It is an response sent to the browser from server end
 * @param {*} contentType It returns the content-type of file to the browser for meta information
 */
function readContent(filePath, res, contentType) {
  readFromFile(filePath)
    .then((content) => {
      // Success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content.data);
    })
    .catch((err) => {
      if (err.error.code == "ENOENT") {
        // Page not found
        fileNotFound(
          path.join(
            dirname(fileURLToPath(import.meta.url)),
            "public",
            "404.html"
          ),
          res
        );
      } else {
        //  Some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.error.code}`);
      }
    });
}

/**
 * Site holds the current site user is visiting.
 * It help to redirect other meta files to redirect
 * at proper directory like style, js, png, jpeg etc..
 */
let site = "";
server.on("request", (req, res) => {
  if (req.method === "GET") {
    let directory = "public";
    if (req.url.includes("/cleanly") || req.url === "/") {
      site = "cleanly";
    } else if (req.url.includes("/todo")) {
      site = "todo";
    } else if (req.headers.referer === undefined) {
      site = req.url;
    }

    // Build file path
    let filePath = path.join(
      dirname(fileURLToPath(import.meta.url)),
      directory,
      site
    );

    // Get content type with help of file extension
    let { contentType, extname } = getContentType(req.url);

    // Check if contentType is text/html but no .html file extension
    if (contentType == "text/html" && extname == "") {
      filePath = path.join(filePath, "index.html");
    } else {
      filePath = path.join(filePath, req.url);
    }

    // log the filePath
    logger.info("filePath", filePath);

    // Read File
    readContent(filePath, res, contentType);
  }
});

// Listening server at port 'PORT'
server.listen(PORT);

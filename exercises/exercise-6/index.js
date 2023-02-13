const os = require("os");
const fs = require("fs");
const http = require("http");

// 1. a)
const OS = () => {
  const system = {
    HostName: os.hostname(),
    OperatingSystem: os.type(),
    Architecture: os.arch(),
    OSrelease: os.release(),
    Uptime: os.uptime(),
    CPUcores: os.cpus().length,
    TotalMemory: os.totalmem(),
    FreeMemory: os.freemem(),
    CurrentDirectory: __dirname,
  };
  return system;
};

const OperatingSystemDetails = OS();
console.log("1a:");
console.log(OperatingSystemDetails);

// 1. b)
fs.writeFile(
  "osDetails.json",
  JSON.stringify(OperatingSystemDetails),
  "utf-8",
  (err, data) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log("Successfully created json file!!");
    }
  }
);

// 1. c)

http
  .createServer((req, res) => {
    if (req.method == "GET") {
      fs.readFile("osDetails.json", "utf-8", (err, data) => {
        if (err) {
          console.error(err);
          throw err;
        } else {
          const osDetails = JSON.parse(data);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            `Hello, my name is ${os.hostname()}!\nHere is my system information:\n${JSON.stringify(
              osDetails
            )}`
          );
        }
      });
    }
  })
  .listen(5000);

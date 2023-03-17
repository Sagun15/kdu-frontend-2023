import http from "http";
import path, { dirname } from "path";
import cors from "cors";
import express from "express";
import { readFromFile } from "./utils/fileUtils.js";
import { fileURLToPath } from "url";

const PORT = 5000;
const app = express();
const server = http.createServer(app);

// Location : users location path
const usersFilePath = path.join(
  dirname(fileURLToPath(import.meta.url)),
  "db",
  "users.json"
);

// Static folder
app.use(
  express.static(path.join(dirname(fileURLToPath(import.meta.url)), "public"))
);

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/getData", (req, res) => {
  readFromFile(usersFilePath)
    .then((data) => {
      const users = [];
      data.map((user) => users.push(user));
      console.log(users);
      res.send(users);
    })
    .catch((err) => logger.error(err));
});

server.listen(PORT, () => console.log(`Server launched on port ${PORT}`));

import express from "express";
import { logger } from "./logger/logger.js";
import path, { dirname } from "path";
import { formatPost } from "./utils/postsFormatter.js";
import http from "http";
import { fileURLToPath } from "url";
import { readFromFile, writeToFile } from "./utils/fileUtils.js";
import { Server } from "socket.io";
import {
  userJoin,
  getAllUsersExceptCurrent,
  getUserById,
  userLeave,
} from "./utils/users.js";
import { formatMsg } from "./utils/msgFormatter.js";

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Location : posts location path
const postsFilePath = path.join(
  dirname(fileURLToPath(import.meta.url)),
  "public",
  "static",
  "db",
  "posts.json"
);

// Location : users location path
const usersFilePath = path.join(
  dirname(fileURLToPath(import.meta.url)),
  "public",
  "static",
  "db",
  "users.json"
);

// Static folder
app.use(
  express.static(path.join(dirname(fileURLToPath(import.meta.url)), "public"))
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * Runs when client joins
 * Acknowledges all users regarding new joinee
 */
io.on("connection", (socket) => {
  logger.info("New connection...");

  // Message array declared specific to particular
  socket.messages = [];

  socket.on("online", ({ username }) => {
    const user = userJoin(socket.id, username);

    socket.join(user.username);

    // Notification sent to all regarding update their users list
    io.emit("notification", "");
    socket.on("usersList", (message) => {
      socket.emit("usersList", { users: getAllUsersExceptCurrent(socket.id) });
    });
  });

  // Runs when user creates a new post
  socket.on("newpost", (post) => {
    post = { ...post, time: Date.now() };
    readFromFile(postsFilePath)
      .then((data) => {
        data.push(post);
        return data;
      })
      .then((posts) => writeToFile(posts, postsFilePath))
      .then(() => io.emit("newpost", formatPost(post)))
      .catch((err) => logger.error(err));
  });

  // Runs when user sends a new msg
  socket.on("sendMsg", ({ message, reciever }) => {
    const user = getUserById(socket.id);
    const recieverName = getUserById(reciever).username;
    const msgObject = formatMsg(
      message,
      user.username,
      recieverName,
      Date.now()
    );
    socket.emit("message", msgObject);
    socket
      .to(reciever)
      .emit("sendMsg", { ...msgObject, unix: Date.now(), senderId: socket.id });
    socket.messages.push({
      message,
      username: user.username,
      recieverName,
      time: Date.now(),
    });
  });

  // Reciever end stores message in array
  socket.on("recieveMsg", (msgObject) => {
    socket.messages.push({
      message: msgObject.msg,
      username: msgObject.username,
      recieverName: msgObject.recieverName,
      time: msgObject.unix,
    });
  });

  // Get all messages of sender and particular reciever using their socket ids
  socket.on("getAllMessages", (recieverId) => {
    const user = getUserById(socket.id);
    const reciever = getUserById(recieverId);
    socket.messages.forEach((msg) => {
      if (
        (msg.username === user.username &&
          msg.recieverName === reciever.username) ||
        (msg.recieverName === user.username &&
          msg.username === reciever.username)
      ) {
        const msgObject = formatMsg(
          msg.message,
          msg.username,
          msg.recieverName,
          msg.time
        );
        socket.emit("updateMsg", { msgObject, user: user.username });
      }
    });
  });

  // Runs when client disconnects and emits to all users to remove this user from DOM online members list
  socket.on("disconnect", () => {
    userLeave(socket.id);
    io.emit("logout", socket.id);
    logger.info("A user disconnected");
  });
});

// Get all posts
app.get("/posts", (req, res) => {
  readFromFile(postsFilePath)
    .then((data) => {
      const posts = [];
      data.map((post) => posts.push(formatPost(post)));
      res.send(posts);
    })
    .catch((err) => logger.error(err));
});

// Performs validation and redirects if authentication is valid
// to posts, otherwise redirects to login
app.post("/auth", (req, res) => {
  readFromFile(usersFilePath)
    .then((data) => {
      let validated = false;
      data.map((userDetails) => {
        if (
          userDetails.username === req.body.username &&
          userDetails.password === req.body.password
        ) {
          validated = true;
        }
      });
      if (validated) {
        res.redirect("/chat.html?username=" + req.body.username);
      } else {
        res.sendFile(
          path.join(
            dirname(fileURLToPath(import.meta.url)),
            "public",
            "index.html"
          )
        );
      }
    })
    .catch((err) => logger.error(err));
});

// Server listening on port PORT
server.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

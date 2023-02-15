import { io } from "socket.io-client";
import { logger } from "./logger/logger.js";
import * as Readline from "readline";

/**
 * Creates an interface for user to pass input and recieve output
 * using client interface
 */
const readline = Readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Connects user to the server
 */
const socket = io("http://localhost:3000");

/**
 * Recieves an message from server
 */
socket.on("notification", (notify) => {
  logger.info(notify);
});

/**
 * Provides an interface for user to
 * provide input using CLI
 */
readline.on("line", (msg) => {
  socket.emit("message", msg);
});

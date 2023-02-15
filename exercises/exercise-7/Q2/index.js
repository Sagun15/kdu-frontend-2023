import http from "http"
import { Server } from "socket.io";
import {logger} from "./logger/logger.js";
const PORT = process.env.PORT || 3000

// Creating server
const httpServer = http.createServer();

const io = new Server(httpServer);

/**
 * This executes whenever a new user connects with server
 * It allocates a unique socket ID to each user.
 */
io.on('connection', (socket) => {
    /**
     * 'socket' holds a unique ID which differentiates the current user with other
     * clients. It sends message to all users whenever a new user connects to the server,
     * except to the one who connects with this socket id.
     */
    socket.broadcast.emit('notification','Message recieved from server: A client connected')
    logger.info('New user connected')

    /**
     * It acts as a listener. It'll recieve message from user and log it,
     * After that it'll emit the same recieved message to all current users
     */
    socket.on("message", (msg) => {
        logger.info(`New message from client: ${msg}`);
        io.emit("notification", `Message recieved from server: ${msg}`);
    })

    /**
     * Whenever any user leave the session it'll emit a message to all
     * active users with a message.
     */
    socket.on('disconnecting', () => {
        logger.info('A client disconnected')
        socket.broadcast.emit('notification', 'Message recieved from server: A client disconnected')
    })
})

// Listening server at port "PORT"
httpServer.listen(PORT, () => logger.info(`Server launched on port ${PORT}`));
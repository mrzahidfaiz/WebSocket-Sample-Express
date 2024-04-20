import WebSocket, { WebSocketServer } from "ws";
import express from "express";

const app = express();
const httpServer = app.listen(8000, () =>
  console.log("Server is listening on port 8000")
);

const wss = new WebSocketServer({ server: httpServer });

let currentUsers = 0;
wss.on("connection", function connection(ws) {
  ws.on("error", (error) => console.log(error));

  ws.on("message", function incoming(message, isBinary) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message, { binary: isBinary });
      }
    });
  });

  console.log("current Connections are " + ++currentUsers);
  ws.send("Hello, from Express Server");
});

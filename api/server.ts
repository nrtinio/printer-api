// const app = require("./app");
// const debug = require("debug")("node-angular");
// const http = require("http");
import app from './app';
// const debug = require("debug")("node-angular");
import http from 'http';

const normalizePort = (val: string) => {
  const selectedPort = parseInt(val, 10);

  if (isNaN(selectedPort)) {
    // named pipe
    return val;
  }

  if (selectedPort >= 0) {
    // port number
    return selectedPort;
  }

  return false;
};

const onError = (error: any) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  // debug("Listening on " + bind);
  console.log('Listening on ' + bind)
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);

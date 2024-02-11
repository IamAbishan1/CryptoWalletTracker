require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const morgan = require("morgan")
const {connectDb} = require("./src/config/db")

//declaring routes
const mainRouter = require("./src/main.route");
const {
  errorCatch
} = require("./src/utils/error");

// Get port from environment and store in Express.
const port = process.env.NODE_ENV === "test" ? 5000 : process.env.PORT || 8000;
app.set("port", port);
app.use(morgan("dev"));

app.use("/api", mainRouter);

/** Catching invalid JSON payload in request **/
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(400).json({
      error: "Invalid JSON payload"
    });
  } else {
    next(err);
  }
});

//Handle other requests with a 404
app.use("*", (req, res) => {
  return errorCatch(req, res, 404, "API endpoint doesn't exist");
});

/** Create HTTP server. */
const server = http.createServer(app);

/** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`);
});

module.exports = {server , app};
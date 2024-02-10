require("dotenv").config();
const {connectDb} = require("./config/db");
const express = require("express");
const app = express();
const http = require("http");

//Connection to database

//declaring routes
const MainRouter = require("./main.route");
const { errorCatch } = require("./helper/error");

/** Create HTTP server. */
const server = http.createServer(app);

// Get port from environment and store in Express.
const port = process.env.PORT || "3000";
app.set("port", port);


//cors policy
// app.use((req, res, next) => {
//     const origin = req.headers.origin;
//     if (alloweddomain.includes(origin)) {
//       res.setHeader("Access-Control-Allow-Origin", origin);
//     }
  
//     res.header("Access-Control-Allow-Credentials", "true");
//     res.header("X-Frame-Options", "SAMEORIGIN");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin,X-Requested-With,Content-Type,Accept,Authorization"
//     );
  
//     if (req.method === "OPTIONS") {
//       res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//       return res.json({});
//     }
//     next();
//   });

app.use("/api", MainRouter);

/** Catching invalid JSON payload in request **/
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(400).json({ error: "Invalid JSON payload" });
  } else {
    next(err);
  }
});

//Handle other requests with a 404
app.use("*", (req, res) => {
  return errorCatch(req, res, 404, "API endpoint doesn't exist");
});

/** Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`);
});
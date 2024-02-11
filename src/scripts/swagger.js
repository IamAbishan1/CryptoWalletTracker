const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "CryptoWalletTracker",
    description: "This project is a CryptoWalletTracker is a Node.js application for tracking cryptocurrency wallet balances and their historical changes. application built with Node.js, Express and MongoDB. It provides APIs for handling users and crypto wallets and provides the reports based on wallet.",
  },
  host: "localhost:5500",
  schemes: ["http"],
};
const outputFile = "./swagger-output.json";

const endpoints = ["./server.js"];

swaggerAutogen(outputFile, endpoints, doc)
  .then(() => {
    console.log("Swagger-output generated.");
  })
  .catch((err) => {
    console.error(err);
  });
const axios = require("axios");
const cron = require("node-cron");
require("dotenv").config();
const Wallet = require('../models/wallet.model')
const {
  updateWalletBalance
} = require('../utils/helper');
const { connectDb } = require('../config/db');

//BSCSCAN API KEY VALIDATION
const validateApiKey = async () => {
  const endPoint = `https://api.bscscan.com/api?module=account&action=balance&address=0xsample&tag=latest&apikey=${process.env.BSCSCAN_API_KEY}`;
  try {
    const response = await axios.get(endPoint);
    if (response.status === 200 && response.data.status !== '1') {
      console.error("Invalid API key. Exiting...");
      process.exit(1);
    }
  } catch (error) {
    console.error("Error validating API key:", error.message);
    process.exit(1);
  }
};

const doJob = async () => {
  try {
    const wallets = await Wallet.find({}, 'address').lean();
    if (!wallets.length) {
      console.log("Missing data.")
      return 0;
    } else {
      for (const wallet of wallets) {
        updateWalletBalance(wallet.address)
      }
    }
  } catch (error) {
    return error;
  }
}

// Schedule every 5 minutes
cron.schedule("*/2 * * * *", async () => {
  await validateApiKey();
  await doJob();
  console.log("Wallet updated successfully.");
});
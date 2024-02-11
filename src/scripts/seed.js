require("dotenv").config();
const {
  walletData
} = require("./seedWallet");
const Wallet = require("../models/wallet.model");
const BalanceHistory = require("../models/balanceHistory.model");
const { connectDb } = require('../config/db');

const seeder = async () => {
  try {
    // Clear existing data
    await Promise.all([BalanceHistory.deleteMany(), Wallet.deleteMany()]);

    await Wallet.insertMany(walletData);

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    process.exit();
  }
};

seeder();
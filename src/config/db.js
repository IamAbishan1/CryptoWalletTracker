const mongoose = require('mongoose')
const mongoUrl = process.env.MONGO_URL
const Wallet = require("../models/wallet.model");
const BalanceHistory = require("../models/balanceHistory.model");
const {
  walletData
} = require("../scripts/seedWallet")

const connectDb = mongoose.connect(mongoUrl,
    // 	{
    // 	useNewUrlParser : true,
    // 	useUnifiedTopology: true,
    //   }
  )
  .then(async () => {
    console.log('Database Connected');

    const [wallets, balanceHistory] = await Promise.all([Wallet.find({}, '_id').lean(),BalanceHistory.find({},'_id').lean()]);
    if (!wallets.length && !balanceHistory.length) {
      //Automatically seeding wallet and balance while setting up the project
      await Wallet.insertMany(walletData);
      console.log("Wallet populated successfully!");
    }
  })
  .catch((err) => {
    // console.error(err);
    console.log("Error connecting database!!!.");
  });

// Function to close the mongoose connection
const closeDb = async () => {
  await mongoose.disconnect();
  console.log('Database connection closed.');
};

module.exports = { connectDb, closeDb };
let cron = require("node-cron");
require("dotenv").config();

const Wallet = require('./models/wallet.model')
const { updateWalletBalance } = require('./helper/helper'); 
const {connectDb} = require("./config/db");

const doJob = async () =>{
    try {
        const wallets = await Wallet.find({},'address').lean();
      if(!wallets.length){
        return 0;
      }
      else{
        for(const wallet of wallets){
            updateWalletBalance(wallet.address)
        }
      }
    } catch (error) {
      return error;
    } 
}

  // Schedule the cron job to run every 5 minutes
cron.schedule("*/2 * * * *", async () => {
    const currentTime = new Date().toLocaleString();
    console.log("Wallet updated successfully.");
    await doJob();
  });


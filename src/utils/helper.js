const axios = require("axios");
require('dotenv')
const BalanceHistory = require("../models/balanceHistory.model");
const Wallet = require("../models/wallet.model");

/**
 * Fetches the balance of a wallet from the Binance Smart Chain (BSC) using the BscScan API.
 * @async
 * @param {string} wAddress The address of the wallet for which to fetch the balance.
 * @returns {Promise<number>} A Promise that resolves with the balance of the wallet in BNB (Binance Coin).
 */
const fetchWalletBalance = async (wAddress) => {
    try {
        const endPoint = `https://api.bscscan.com/api?module=account&action=balance&address=${wAddress}&tag=latest&apikey=${process.env.BSCSCAN_API_KEY}`;

        const response = await axios.get(endPoint);
        if (response.status === 200 && response.data.status === '1') {
            // Convert the balance from wei to BNB
            const balance = (response.data.result) / 1e18 || 0;
            return balance;
        } else {
            throw new Error('Invalid response from BSCScan API');
        }

    } catch (error) {
        if (error.response) {
            console.error('BSCScan API responded with error status:', error.response.status);
        } else if (error.request) {
            console.error('No response received from BSCScan API');
        } else {
            console.error('Error occurred while fetching data from BSCScan API:', error.message);
        }
        throw error;
    }
};

/**
 * Updates the balance of a wallet and its corresponding balance history.
 * @async
 * @param {string} wAddress The address of the wallet to update.
 * @returns {Promise<void>} A Promise that resolves once the update is complete.
 */
const updateWalletBalance = async (wAddress) => {
    try {
        // Fetch wallet data and balance history
        const [walletData, bHistory] = await Promise.all([Wallet.findOne({
            address: wAddress
        }), BalanceHistory.findOne({
            address: wAddress
        })])

        const historyData = {
            balance: walletData.balance,
            date: new Date().toISOString()
        }
        if (bHistory) {
            bHistory.balanceHistory.push(historyData)
            bHistory.save();
        } else {
            const BalanceHistoryObj = new BalanceHistory({
                address: wAddress,
                balanceHistory: [historyData]
            })
            BalanceHistoryObj.save();
        }
        walletData.balance = await fetchWalletBalance(wAddress)
        await walletData.save()
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = { fetchWalletBalance , updateWalletBalance }
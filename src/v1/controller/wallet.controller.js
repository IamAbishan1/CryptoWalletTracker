const {
    errorCatch
} = require('../../utils/error')
const {
    calculatePercentChange,
    getPercentChange
} = require('../helper/helper');
const {
    getAllBalanceHistory,
    getHistorylength
} = require("../../services/balanceHistory.services");
const {
    getAllWallets,
    getWallet
} = require('../../services/wallet.services');

/**
 * Controller function to get wallet balance information.
 * @async
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} - Promise representing the operation completion.
 * @throws {Error} - If an error occurs during the operation.
 */
exports.getWalletBalanceController = async (req, res) => {
    try {
        let {
            wAddress,
            date,
            page = 1,
            length = 25
        } = req.query;

        let filterQuery = {};
        if (wAddress) {
            filterQuery.address = wAddress
        }
        date = date ? new Date(date) : new Date();   

        const wallets = await getAllWallets(filterQuery,page, length);
        const balanceHistory = await getAllBalanceHistory(filterQuery, page, length);
        const historyLength = await getHistorylength();
        if (!wallets || !wallets.length) {
            return errorCatch(req, res, 404, "No data found!")
        }

        if (historyLength && !balanceHistory.length) {
            return errorCatch(req, res, 404, "Wallet does not exist.")
        }

        if (!balanceHistory.length) {
            const response = wallets.map(data => {
                return {
                    address: data.address,
                    latestBalance: data.balance,
                    dailyChange: 0,
                    weeklyChange: 0
                }
            })

            return res.json({
                wallets: response
            })
        }
        const walletData = calculatePercentChange(date, balanceHistory)
        const response = walletData.map(data => {
            const balance = {};
            const wallet = wallets.filter(wallet => wallet.address == data.address);

            balance.address = wallet[0].address
            balance.latestBalance = wallet[0].balance
            balance.dailyChange = getPercentChange(parseFloat(data.balanceChanges.todayData), parseFloat(data.balanceChanges.prevData)).toFixed(2);
            balance.weeklyChange = getPercentChange(parseFloat(data.balanceChanges.thisWeekData), parseFloat(data.balanceChanges.prevWeekData)).toFixed(2);

            return balance;
        })

        res.json({
            "wallets": response
        })
    } catch (err) {
        console.error(err);
        errorCatch(req, res);
    }
}
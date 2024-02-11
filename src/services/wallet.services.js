const Wallet = require('../models/wallet.model')

/**
 * Retrieves all wallets from the database.
 * @async
 * @returns {Promise<Array>} - A promise that resolves to an array of wallet objects containing address and balance.
 * @throws {Error} - If an error occurs during the operation.
 */
exports.getAllWallets = async (page,length) => {
    const wallets = await Wallet.find({}, "address balance")
        .skip((page-1) * length)
        .limit(length)
        .lean();

    return wallets || [];
}
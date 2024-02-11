const Wallet = require('../models/wallet.model')

/**
 * Retrieves all wallets from the database.
 * @async
 * @returns {Promise<Array>} - A promise that resolves to an array of wallet objects containing address and balance.
 * @throws {Error} - If an error occurs during the operation.
 */
exports.getAllWallets = async (filterQuery, page, length) => {
    try {
        const wallets = await Wallet.find(filterQuery, "address balance")
            .skip((page - 1) * length)
            .limit(length)
            .lean();

        return wallets || [];
    } catch (err) {
        console.error(err);
        throw err;
    }
}

exports.getWallet = async (filterQuery) =>{
    try{
        const wallet = await Wallet.findOne(filterQuery).lean();
        return wallet;
    }catch(err){
        console.error(err);
        throw err;
    }
}
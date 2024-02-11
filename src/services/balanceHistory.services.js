const BalanceHistory = require('../models/balanceHistory.model');

/**
 * Retrieves balance history from the database based on the provided filter query.
 * @async
 * @param {object} filterQuery - Filter query to retrieve specific balance history records.
 * @returns {Promise<Array>} - A promise that resolves to an array of balance history objects.
 * @throws {Error} - If an error occurs during the operation.
 */
exports.getAllBalanceHistory = async (filterQuery,page,length) => {
        const balanceHistory = await BalanceHistory.find(filterQuery,'-_id -__v')
        .skip((page-1) * length)
        .limit(length)
        .lean();

        return balanceHistory || [];
}
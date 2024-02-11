const request = require('supertest');
const {
    app,
    server
} = require('../server');
const axios = require('axios')
const {
    closeDb
} = require("../src/config/db")

// Mock the axios.get function
jest.mock('axios');

describe('GET /api/api/wallet', () => {
    jest.setTimeout(30000);
    it('should fetch all walllet successfullly', async () => {
        jest.setTimeout(10000);
        const response = await request(app).get('/api/v1/wallet');

        expect(response.status).toBe(200);

        expect(response.body).toHaveProperty('wallet');
    });

    it('should fetch a single wallet successfully', async () => {
        jest.setTimeout(10000);
        // Define the mock data
        const singleWallet = {
            "wallet": [{
                "address": "0xbbbc35dfac3a00a03a8fde3540eca4f0e15c5e64",
                "latestBalance": "0.096914005",
                "dailyChange": 0,
                "weeklyChange": 0
            }, ]
        };
        const allWallets = await request(app).get('/api/v1/wallet');
        const mockWalletAddress = allWallets.body.wallet?.length ? allWallets.body.wallet[0].address : "wa12124";

        const response = await request(app).get(`/api/v1/wallet?wAddress=${mockWalletAddress}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('wallet');
    });

    it('should throw error message for wallet not available', async () => {
        jest.setTimeout(10000);

        const response = await request(app).get('/api/v1/wallet?wAddress=4637grf');
        expect(response.status).toBe(404);
    });
});
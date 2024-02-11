const request = require('supertest');
const {
    app,
} = require('../server');
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

        expect(response.body).toHaveProperty('wallets');
    });

    it('should fetch a single wallet successfully', async () => {
        jest.setTimeout(10000);
        
        const allWallets = await request(app).get('/api/v1/wallet');
        const mockWalletAddress = allWallets.body.wallets?.length ? allWallets.body.wallets[0].address : "wa12124";

        const response = await request(app).get(`/api/v1/wallet?wAddress=${mockWalletAddress}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('wallets');
    });

    it('should throw error message for wallet not available', async () => {
        jest.setTimeout(10000);

        const response = await request(app).get('/api/v1/wallet?wAddress=4637grf');
        expect(response.status).toBe(404);
    });
});
const axios = require('axios');
const {
  fetchWalletBalance
} = require('../src/utils/helper');

jest.mock('axios');

describe('fetchWalletBalance', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return balance when API response is valid', async () => {
    const mockResponse = {
      status: 200,
      data: {
        status: '1',
        result: '1000000000000000000'
      }
    };
    axios.get.mockResolvedValueOnce(mockResponse);

    const wAddress = '0x123abc';
    const balance = await fetchWalletBalance(wAddress);

    // Expected balance after conversion from wei to BNB
    expect(balance).toBe(1);
  });

  it('should throw an error when API response is invalid', async () => {
    const mockResponse = {
      status: 200,
      data: {
        status: '0',
        result: 'Invalid response' // Assuming invalid response
      }
    };
    axios.get.mockResolvedValueOnce(mockResponse);

    const wAddress = '0x123abc';

    await expect(fetchWalletBalance(wAddress)).rejects.toThrow('Invalid response from BSCScan API');
  });

  it('should throw an error when BSCScan API returns an error', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    const wAddress = '0x123abc'; // Example wallet address

    await expect(fetchWalletBalance(wAddress)).rejects.toThrow(errorMessage);
  });
});
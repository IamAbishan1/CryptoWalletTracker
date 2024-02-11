# CryptoWalletTracker

CryptoWalletTracker is a `Node.js` application for tracking cryptocurrency wallet balances and their historical changes.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

CryptoWalletTracker allows you to fetch and store cryptocurrency wallet balances from various sources, such as BSCScan. It periodically updates the balances and tracks their daily and weekly percentage changes. This application is useful for monitoring your cryptocurrency holdings over time.

## Features

- Fetches cryptocurrency wallet balances from BSCScan API.
- Stores wallet addresses and their balances in a MongoDB database.
- Periodically updates wallet balances and tracks historical changes.
- Provides API endpoints to retrieve the latest balance and percentage changes.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/IamAbishan1/CryptoWalletTracker.git

```

2. Install dependencies
```bash
cd CryptoWalletTracker
npm install
```

3. Create .env file with and declare following variables
```bash
   PORT=8000 
   MONGO_URL="YOUR_MONGO_URI"
   BSCSCAN_API_KEY="YOUR_BSCSCAN_API_KEY"
```

4. Seed data
```bash
npm run seed
```

5. Start cron
```bash
npm run cron
```

6. Start the server:
```bash 
npm start
```

## Usage
1. Ensure the application is running by executing 
```bash 
npm start
```
2. Seed the data by executing
```bash
npm run seed
```
3. Start the cron-job by executing
```bash
npm run cron
```
4. Get the swagger documentation by executing
```bash
npm run swagger-autogen
```
4. Use the provided API endpoints to interact with the application.


## Project Structure
The project follows a standard structure to organize its components:

```bash
CryptoWalletTracker/
├── src/
│   ├── config/
│   │   └── db.js                    # Database configuration
│   ├── models/
│   │   ├── balanceHistory.model.js  # MongoDB schema for balance history
│   │   └── wallet.model.js          # MongoDB schema for wallet
│   ├── scripts/
│   │   ├── seed.js                   # Script for seeding the database
│   │   ├── seedData.js               # Seed data for database population
│   │   ├── seedWallet.js             # Script for seeding wallet data
│   │   └── swagger.js                # Script for swagger documentation of endpoints
│   ├── services/
│   │   └── walletService.js         # Business logic and data processing for wallets
│   ├── utils/
│   │   ├── errorCatch.js            # Error handling utility
│   │   └── validator.js             # Validation utility
│   ├── v1/
│   │   ├── controller/
│   │   │   └── wallet.controller.js # Controller for wallet-related operations
│   │   ├── helper/              # Helper functions for controllers
│   │   │   ├── helper.js        # Helper functions
│   │   │   └── validator.js     # Validation functions
│   │   ├── middleware/              # Middleware for v1 routes
│   │   └── routes/                   # Routes for v1 API endpoints
│   │      ├── index.route.js        # Index route
│   │      └── wallet.route.js       # Wallet route
│   └── main.route.js                # Main route file for application entry point  
├──  test/
├── .env                             # Environment variables file
├── .env.example                     # Example environment variables file
├── .gitignore                       # Gitignore file
├── compose.yml                      # Docker Compose configuration file
├── Dockerfile                       # Docker configuration file
├── Jenkinsfile                      # Jenkins pipeline configuration file
├── README.md                        # README file
├── package.json                     # NPM package configuration file
└── server.js                        # Main server file
```

## Endpoints

# Fetch wallet
`GET /api/v1/wallet/`: Get all wallet with latest balance along with daily, weekly and monthly balance changed in percent

`GET /api/v1/wallet?wAddress=walletAddress`: Get a wallet with latest balance along with daily, weekly and monthly balance changed in percent


`GET /api/v1/wallet?date=yyyy/mm/day`: Get wallets with latest balance along with daily, weekly and monthly balance changed in percent with respective to given time

`GET /api/v1/wallet?wAddress=walletAddress&date=yyyy/mm/day`: Get a wallet with latest balance along with daily, weekly and monthly balance changed in percent with respective to given time


## Test
```bash
npm test
```
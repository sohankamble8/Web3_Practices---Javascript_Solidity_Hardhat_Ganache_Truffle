require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("./tasks/block-number");
require("solidity-coverage");
require("hardhat-gas-reporter");

/** @type import('hardhat/config').HardhatUserConfig */

const GANACHE_RPC_URL = process.env.GANACHE_RPC_URL;
const GANACHE_USER_PRIVATE_KEY = process.env.GANACHE_USER_PRIVATE_KEY;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

module.exports = {
  solidity: "0.8.17",
  networks: {
    localhost: {
      url: GANACHE_RPC_URL,
      accounts: [GANACHE_USER_PRIVATE_KEY],
      chainId: 1337,
    },
  },
  gasReporter: {
    enabled: true,
    noColors: true,
    outputFile: "Gas-Report.txt",
    currency: "INR",
    token: "MATIC",
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
};

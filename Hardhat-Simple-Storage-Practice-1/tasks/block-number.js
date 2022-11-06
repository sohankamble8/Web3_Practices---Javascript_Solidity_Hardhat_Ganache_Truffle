const { task } = require("hardhat/config");

task(
  "blockNumber",
  "Get latest mined block from attached blockchain network"
).setAction(async () => {
  const blockNumber = await hre.ethers.provider.getBlockNumber();
  console.log(`Latest Block Number is ${blockNumber}`);
});

exports.modules = {};

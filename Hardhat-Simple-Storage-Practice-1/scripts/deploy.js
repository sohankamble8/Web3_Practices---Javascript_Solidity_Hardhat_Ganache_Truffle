const { ethers } = require("hardhat");

const main = async () => {
  const simpleContractFactory = await ethers.getContractFactory(
    "SimpleStorage"
  );
  console.log("Deploying Contract, Please wait...");
  const simpleStorage = await simpleContractFactory.deploy();
  console.log(`Contract Deployed at ${simpleStorage.address}`);

  const favNoRes = await simpleStorage.retrieve();
  console.log(`Initial Favourite Number is ${favNoRes}`);
  console.log("Performing store operation, Please wait...");
  const storeTx = await simpleStorage.store(7);
  storeTx.wait(2);
  const updatedFavNo = await simpleStorage.retrieve();
  console.log(`Updated favourite Number is ${updatedFavNo}`);
};

main()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

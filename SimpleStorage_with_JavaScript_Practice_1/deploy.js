const ethers = require("ethers");
require("dotenv").config();
const fs = require("fs");

const main = async () => {
  const GANACHE_RPC_URL = process.env.GANACHE_RPC_URL;
  const ACCOUNT_PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY;
  const provider = new ethers.providers.JsonRpcProvider(GANACHE_RPC_URL);
  const wallet = new ethers.Wallet(ACCOUNT_PRIVATE_KEY, provider);
  const ABI = fs.readFileSync(
    "./bin-abi/SimpleStorage_sol_SimpleStorage.abi",
    "utf8"
  );
  const Binary = fs.readFileSync(
    "./bin-abi/SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(ABI, Binary, wallet);
  console.log("Deploying Contract, Please wait...");
  const simpleStorage = await contractFactory.deploy();
  console.log(`Contract Deployed to ${simpleStorage.address}`);
  const favouriteNo = await simpleStorage.retrieve();
  console.log(`Initial favourite Number is ${favouriteNo}`);
  const storeTx = await simpleStorage.store(7);
  storeTx.wait(2);
  const updateFavouriteNo = await simpleStorage.retrieve();
  console.log(`Updated favourite number is ${updateFavouriteNo}`);
  console.log("Adding People, Please wait...");
  const addPeople = await simpleStorage.addPeople("Joao", 15, 29);
  addPeople.wait(2);
  const getPeople = await simpleStorage.getPeople(15);
  console.log(`Person with ID 15 is ${getPeople.toString()}`);
};

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });

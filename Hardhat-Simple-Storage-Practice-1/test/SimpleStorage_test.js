const { assert } = require("chai");

describe("SimpleStorage", async function () {
  let simpleContractFactory, simpleStorage;
  beforeEach(async () => {
    simpleContractFactory = await hre.ethers.getContractFactory(
      "SimpleStorage"
    );
    simpleStorage = await simpleContractFactory.deploy();
  });

  it("Simple Storage Store Function Check", async () => {
    const expectedValue = "7";
    const storeTx = await simpleStorage.store(expectedValue);
    storeTx.wait(2);
    const actualValue = await simpleStorage.retrieve();
    assert.equal(actualValue, expectedValue);
  });

  it("Simple Storage Add Person Function Check", async () => {
    const expectedValue = ["Ram", 7];
    const addPersonTx = await simpleStorage.addPerson(
      expectedValue[0],
      expectedValue[1]
    );
    addPersonTx.wait(2);
    const actualValue = await simpleStorage.getPersonById(expectedValue[1]);
    console.log(`Actual Value: ${actualValue}`);
    assert.equal(actualValue.toString(), expectedValue);
  });

  it("Simple Storage No Person Found Scenario Check", async () => {
    const expectedValue = ["NA", 0];
    const actualValueWithDefault = await simpleStorage.getPersonById(7);
    assert.equal(actualValueWithDefault.toString(), expectedValue);
  });
});

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ChainwhizCore Basic --> Initialize", function () {
  let Chainwhiz, chainwhiz
  beforeEach(async () => {

    ;[owner, a1, a2, _] = await ethers.getSigners()
    Chainwhiz = await ethers.getContractFactory("ChainwhizCore");
    chainwhiz = await Chainwhiz.connect(owner).deploy(owner.address)
    // await chainwhiz.connect(owner).initialize(owner.address);
  })

  it("Should call the initialise function", async function () {
    expect(await chainwhiz.ChainwhizAdmin()).to.be.equal(owner.address)
  });

  // it("Should throw error for initialise function called twice", async function () {
  //   const trxObj = chainwhiz.connect(a1).initialize(a1.address)
  //   expect(trxObj).to.be.revertedWith("Contract is already initialised")
  // });

});


describe("ChainwhizCore Basic --> Contract Activation and Deactivation", function () {
  let Chainwhiz, chainwhiz
  beforeEach(async () => {

    ;[owner, a1, a2, _] = await ethers.getSigners()
    Chainwhiz = await ethers.getContractFactory("ChainwhizCore");
    chainwhiz = await Chainwhiz.connect(owner).deploy(owner.address);
    // await chainwhiz.connect(owner).initialize(owner.address);
  })

  it("Should deactivate contract", async function () {
    const activateTrxObj = await chainwhiz.connect(owner).deactivateContract()
    expect(activateTrxObj).to.be.emit(chainwhiz,"DeactivateContract")
    expect(await chainwhiz.isContractActive()).to.be.equal(false);
  });

  it("Should throw error if anyone other than admin calls deactivateContract function", async function () {
    const activateTrxObj = chainwhiz.connect(a1).deactivateContract()
    expect(activateTrxObj).to.be.revertedWith("ONLY_ADMIN");
    console.log("Should throw error if anyone other than admin calls deactivateContract function: Only Admin can do it")
  });

  it("Should throw error if owner calls deactivateContract even when contract is deactivated", async function () {
    await chainwhiz.connect(owner).deactivateContract()
    const activateTrxObj = chainwhiz.connect(owner).deactivateContract()
    expect(activateTrxObj).to.be.revertedWith("DEACTIVATE_ERROR");
    console.log("Should throw error if owner calls deactivateContract even when contract is deactivated: Contract is paused or is at halt")
    
  });

  it("Should successfuly activate the deactivated contract", async function () {
    await chainwhiz.connect(owner).deactivateContract()
    const activateTrxObj = chainwhiz.connect(owner).activateContract()
    expect(activateTrxObj).to.be.emit(chainwhiz,"ActivateContract")
    expect(await chainwhiz.isContractActive()).to.be.equal(true);
    
  });

});
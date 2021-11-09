const { expect } = require("chai");
const { ethers } = require("hardhat");

//helper function
bn = function (number, defaultValue = null) { if (number == null) { if (defaultValue == null) { return null } number = defaultValue } return ethers.BigNumber.from(number) }
tokensBN = function (amount) { return (bn(amount).mul(bn(10).pow(18))) }


describe("ChainwhizCore Solution Posting --> postSolution validations", function () {
  let Chainwhiz, chainwhiz
  beforeEach(async () => {

    ;[owner, a1, a2, a3, _] = await ethers.getSigners()
    Chainwhiz = await ethers.getContractFactory("ChainwhizCore");
    chainwhiz = await Chainwhiz.deploy()
    await chainwhiz.connect(owner).initialize(owner.address);
    chainwhiz.connect(a2).postIssue("efg", "www.google.com", tokensBN(10), tokensBN(2), Math.floor(Date.now() / 1000) + 1000, Math.floor(Date.now() / 1000) - 2000, Math.floor(Date.now() / 1000) + 5000, true, { value: tokensBN(12) })

  })

  it("Should revert with error for publisher solving the issue", async function () {
    const trxObj = chainwhiz.connect(a2).postSolution("abc", "www.facebook.com", "www.google.com", a2.address, "efg");
    expect(trxObj).to.be.revertedWith("Error in postSolution: Publisher cannot post solution")

  });

  it("Should show success message for submitting solution and revert with error solving through diff adress", async function () {
    const successTrxObj = await chainwhiz.connect(a1).postSolution("abc", "www.facebook.com", "www.google.com", a2.address, "efg");
    expect(successTrxObj).to.be.emit(chainwhiz, "SolutionSubmitted")
    const trxObj = chainwhiz.connect(a3).postSolution("abc", "www.facebook.com", "www.google.com", a2.address, "efg");
    expect(trxObj).to.be.revertedWith("Error in postSolution: The address linked github id is not the same")
  });

  it("Should revert with error for solver posting more than one solution", async function () {
    await chainwhiz.connect(a1).postSolution("abc", "www.facebook.com", "www.google.com", a2.address, "efg");
    const trxObj = chainwhiz.connect(a1).postSolution("abc", "www.facebook.com", "www.google.com", a2.address, "efg");
    expect(trxObj).to.be.revertedWith("Error in postSolution: Solver can post only one solution")
  });
})

describe("ChainwhizCore Solution Posting --> [Special testcase] to check time based error", function () {
  let Chainwhiz, chainwhiz
  beforeEach(async () => {

    ;[owner, a1, a2, a3, _] = await ethers.getSigners()
    Chainwhiz = await ethers.getContractFactory("ChainwhizCore");
    chainwhiz = await Chainwhiz.deploy()
    await chainwhiz.connect(owner).initialize(owner.address);
    chainwhiz.connect(a2).postIssue("efg", "www.google.com", tokensBN(10), tokensBN(2), Math.floor(Date.now() / 1000) - 1000, Math.floor(Date.now() / 1000) - 2000, Math.floor(Date.now() / 1000) - 5000, true, { value: tokensBN(12) })

  })

  it("Should revert with error forpsoting solution link beyond the solve time", async function () {
    const trxObj = chainwhiz.connect(a1).postSolution("abc", "www.facebook.com", "www.google.com", a2.address, "efg");
    expect(trxObj).to.be.revertedWith("Error in postSolution: Solving time has not started or has completed")

  });

})
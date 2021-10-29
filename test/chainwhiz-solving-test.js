const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ChainwhizCore Solution Posting --> postIssue validations", function () {
    let Chainwhiz, chainwhiz
    beforeEach(async () => {
  
      ;[owner, a1, a2, a3, _] = await ethers.getSigners()
      Chainwhiz = await ethers.getContractFactory("ChainwhizCore");
      chainwhiz = await Chainwhiz.deploy()
      await chainwhiz.connect(owner).initialize(owner.address);
      chainwhiz.connect(a2).postIssue("efg","www.google.com", tokensBN(10),tokensBN(2), 1638532684, 1648532684, 1658532684, true, { value: tokensBN(12) })

    })
  
    it("Should revert with error for publisher solving the issue", async function () {
      const trxObj = chainwhiz.connect(a2).postSolution("abc","www.facebook.com","www.google.com",a2.address,"efg");
      expect(trxObj).to.be.revertedWith("ChainwhizCore Error in postSolution: Publisher cannot post solution")

    });

    it("Should show success message for submitting solution and revert with error solving through diff adress", async function () {
      const successTrxObj = await chainwhiz.connect(a1).postSolution("abc","www.facebook.com","www.google.com",a2.address,"efg");
      expect(successTrxObj).to.be.emit(chainwhiz,"SolutionSubmitted")
      const trxObj = chainwhiz.connect(a3).postSolution("abc","www.facebook.com","www.google.com",a2.address,"efg");
      expect(trxObj).to.be.revertedWith("ChainwhizCore Error in postSolution: The address linked github id is not the same")
    });

    it("Should revert with error for solver posting more than one solution", async function () {
      await chainwhiz.connect(a1).postSolution("abc","www.facebook.com","www.google.com",a2.address,"efg");
      const trxObj = chainwhiz.connect(a1).postSolution("abc","www.facebook.com","www.google.com",a2.address,"efg");
      expect(trxObj).to.be.revertedWith("ChainwhizCore Error in postSolution: Solver can post only one solution")
    });
})

describe("ChainwhizCore Solution Posting --> [Special testcase] to check time based error", function () {
  let Chainwhiz, chainwhiz
  beforeEach(async () => {

    ;[owner, a1, a2, a3, _] = await ethers.getSigners()
    Chainwhiz = await ethers.getContractFactory("ChainwhizCore");
    chainwhiz = await Chainwhiz.deploy()
    await chainwhiz.connect(owner).initialize(owner.address);
    chainwhiz.connect(a2).postIssue("efg","www.google.com", tokensBN(10),tokensBN(2), 1618532684, 1619532684, 1620532684, true, { value: tokensBN(12) })

  })

  it("Should revert with error forpsoting solution link beyond the solve time", async function () {
    const trxObj = chainwhiz.connect(a2).postSolution("abc","www.facebook.com","www.google.com",a2.address,"efg");
    expect(trxObj).to.be.revertedWith("ChainwhizCore Error in postSolution: Solving time has not started or has completed")

  });

})
const { expect } = require("chai");
const { ethers } = require("hardhat");

//helper function
bn = function(number, defaultValue = null) { if (number == null) { if (defaultValue == null) { return null } number = defaultValue } return ethers.BigNumber.from(number) }
tokensBN = function (amount) { return (bn(amount).mul(bn(10).pow(18))) }

describe("ChainwhizCore Bounty Posting --> postIssue validations", function () {
  let Chainwhiz, chainwhiz
  beforeEach(async () => {

    ;[owner, a1, a2, a3, _] = await ethers.getSigners()
    Chainwhiz = await ethers.getContractFactory("ChainwhizCore");
    chainwhiz = await Chainwhiz.deploy()
    await chainwhiz.connect(owner).initialize(owner.address);
  })

  it("Should revert with error for insufficient balance", async function () {
    const trxObj = chainwhiz.connect(a1).postIssue("abcd","www.google.com", tokensBN(10000),tokensBN(10000), 123456, 23456, 8910, true, { value: tokensBN(20000) });
    expect(trxObj).to.be.revertedWith("ChainwhizCore Error in postIssue: User doesnt have enough balance")
  });

  it("Should revert with error for setting reward less than threshold", async function () {
    const trxObj = chainwhiz.connect(a2).postIssue("efg","www.google.com", tokensBN(1),tokensBN(2), 123456, 23456, 8910, true, { value: tokensBN(3) });
    expect(trxObj).to.be.revertedWith("ChainwhizCore Error in postIssue: Reawrd amount cannot be less than MIN_REWARD_AMOUNT")
  });

  it("Should revert with error for not transferring sufficient funds", async function () {
    const trxObj = chainwhiz.connect(a2).postIssue("efg","www.google.com", tokensBN(10),tokensBN(2), 123456, 23456, 8910, true, { value: tokensBN(7) });
    expect(trxObj).to.be.revertedWith("ChainwhizCore Error in postIssue: User didnt transfer sufficient funds")
  });

  it("Should revert with error for linking same github id with different account for posting issue", async function () {
   expect(chainwhiz.connect(a2).postIssue("efg","www.google.com", tokensBN(10),tokensBN(2), 123456, 23456, 8910, true, { value: tokensBN(12) })).to.be.emit(chainwhiz,"IssuePosted");

   const trxObj = chainwhiz.connect(a3).postIssue("efg","www.google.com", tokensBN(10),tokensBN(2), 123456, 23456, 8910, true,{ value: tokensBN(12) });
   expect(trxObj).to.be.revertedWith("ChainwhizCore Error in postIssue: The address linked github id is not the same");
  });

});
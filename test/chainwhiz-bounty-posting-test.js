const { expect } = require("chai");
const { ethers } = require("hardhat");

//helper function
bn = function (number, defaultValue = null) { if (number == null) { if (defaultValue == null) { return null } number = defaultValue } return ethers.BigNumber.from(number) }
tokensBN = function (amount) { return (bn(amount).mul(bn(10).pow(18))) }

describe("ChainwhizCore Bounty Posting --> postIssue validations", function () {
  let Chainwhiz, chainwhiz
  beforeEach(async () => {

    ;[owner, a1, a2, a3, _] = await ethers.getSigners()
    Chainwhiz = await ethers.getContractFactory("ChainwhizCore");
    chainwhiz = await Chainwhiz.connect(owner).deploy(owner.address)
    // await chainwhiz.connect(owner).initialize(owner.address);
  })

  it("Should revert with error for insufficient balance", async function () {
    try {
      balance = await provider.getBalance(a1.address);
      console.log(balance.toString());
      const trxObj = chainwhiz.connect(a1).postIssue("abcd", "www.google.com", tokensBN(100), tokensBN(9000), 123456, 23456, 8910, { value: tokensBN(20000) });
      console.log(trxObj)
      expect(trxObj).to.be.revertedWith("POST_ISSUE_C")
      console.log("Should revert with error for insufficient balance: Error in postIssue: User doesnt have enough balance")
    }
    catch (error) {
    }
  });

  it("Should revert with error for setting reward less than threshold", async function () {
    const trxObj = chainwhiz.connect(a2).postIssue("efg", "www.google.com", tokensBN(1), tokensBN(12), 123456, 23456, 8910, { value: tokensBN(3) });
    expect(trxObj).to.be.revertedWith("POST_ISSUE_B")
    console.log("Should revert with error for setting reward less than threshold: Error in postIssue: Reawrd amount is not within the range")
  });

  it("Should revert with error for setting community reward less than threshold", async function () {
    const trxObj = chainwhiz.connect(a2).postIssue("efg", "www.google.com", tokensBN(12), tokensBN(2), 123456, 23456, 8910, { value: tokensBN(14) });
    expect(trxObj).to.be.revertedWith("POST_ISSUE_E")
    console.log("Should revert with error for setting community less than threshold: Error in postIssue: Community Reward is not within the range")
  });

  it("Should revert with error for not transferring sufficient funds", async function () {
    const trxObj = chainwhiz.connect(a2).postIssue("efg", "www.google.com", tokensBN(10), tokensBN(12), 123456, 23456, 8910, { value: tokensBN(7) });
    expect(trxObj).to.be.revertedWith("POST_ISSUE_D")
    console.log("Should revert with error for not transferring sufficient funds: Error in postIssue: User didnt transfer sufficient funds")
  });

  it("Should successfully post an issue", async function () {
    expect(chainwhiz.connect(a2).postIssue("efg", "www.google.com", tokensBN(10), tokensBN(12), 123456, 23456, 8910, { value: tokensBN(22) })).to.be.emit(chainwhiz, "IssuePosted");

  });

  it("Should successfully allow posting multiple bounties", async function () {
    expect(chainwhiz.connect(a2).postIssue("efg", "www.google.com", tokensBN(10), tokensBN(12), 123456, 23456, 8910, { value: tokensBN(22) })).to.be.emit(chainwhiz, "IssuePosted");
    expect(chainwhiz.connect(a2).postIssue("efg", "www.yahoo.com", tokensBN(12), tokensBN(20), 123456, 23456, 8910, { value: tokensBN(32) })).to.be.emit(chainwhiz, "IssuePosted");
  });

});

describe("ChainwhizCore Bounty Posting --> postIssue error validation", function () {
  let Chainwhiz, chainwhiz
  beforeEach(async () => {

    ;[owner, a1, a2, a3, _] = await ethers.getSigners()
    Chainwhiz = await ethers.getContractFactory("ChainwhizCore");
    chainwhiz = await Chainwhiz.connect(owner).deploy(owner.address)
    // await chainwhiz.connect(owner).initialize(owner.address);
    await chainwhiz.connect(a2).postIssue("efg", "www.google.com", tokensBN(10), tokensBN(12), 123456, 23456, 8910, { value: tokensBN(22) })
  })
  it("Should revert with error for linking same github id with different account for posting issue", async function () {
    const trxObj = chainwhiz.connect(a3).postIssue("efg", "www.google.com", tokensBN(10), tokensBN(12), 123456, 23456, 8910, { value: tokensBN(22) });
    expect(trxObj).to.be.revertedWith("POST_ISSUE_A");
    console.log("Should revert with error for linking same github id with different account for posting issue:Error in postIssue: The address linked github id is not the same")
  });



});

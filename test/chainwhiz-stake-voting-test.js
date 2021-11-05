const { expect } = require("chai");
const { ethers } = require("hardhat");
const aaveAddresses = require("./constants")

//helper function
bn = function (number, defaultValue = null) { if (number == null) { if (defaultValue == null) { return null } number = defaultValue } return ethers.BigNumber.from(number) }
tokensBN = function (amount) { return (bn(amount).mul(bn(10).pow(18))) }

describe("ChainwhizCore Voting Stage --> startVotingStage validations", function () {
  let Chainwhiz, chainwhiz
  beforeEach(async () => {

    [owner, a1, a2, a3, _] = await ethers.getSigners()
    Chainwhiz = await ethers.getContractFactory("ChainwhizCore");
    chainwhiz = await Chainwhiz.deploy()
    await chainwhiz.connect(owner).initialize(owner.address);
    await chainwhiz.connect(a2).postIssue("efg", "www.google.com", tokensBN(10), tokensBN(2), Math.floor(Date.now() / 1000) + 1000, Math.floor(Date.now() / 1000) - 2000, Math.floor(Date.now() / 1000) + 5000, true, { value: tokensBN(12) })
    await chainwhiz.connect(a1).postSolution("abc", "www.facebook.com", "www.google.com", a2.address, "efg");
  })

  it("Should revert with error for admin/publisher not initiating the startVote", async function () {
    const trxObj = chainwhiz.connect(a3).startVotingStage("www.google.com", "efg", a2.address);
    expect(trxObj).to.be.revertedWith("Error in startVotingStage: Only admin or issue poster can initiate")
  });
})

describe("ChainwhizCore Voting Stage --> stakeVote", function () {
  let Chainwhiz, chainwhiz
  beforeEach(async () => {
    [owner, a1, a2, a3] = await ethers.getSigners()
    Chainwhiz = await ethers.getContractFactory("ChainwhizCore");
    chainwhiz = await Chainwhiz.deploy()
    await chainwhiz.connect(owner).initialize(owner.address);
    await chainwhiz.connect(a2).postIssue("efg", "www.google.com", tokensBN(10), tokensBN(2), Math.floor(Date.now() / 1000) + 1000, Math.floor(Date.now() / 1000) - 2000, Math.floor(Date.now() / 1000) + 5000, true, { value: tokensBN(12) })
    await chainwhiz.connect(a1).postSolution("abc", "www.facebook.com", "www.google.com", a2.address, "efg");
    await chainwhiz.connect(owner).setETHGatewayAddress(aaveAddresses.ETH_GATEWAY_ADDRESS)
    await chainwhiz.connect(owner).setLendingPoolProviderAddress(aaveAddresses.LENDING_POOL_PROVIDER_ADDRESS)
  })
  it("Should revert with error for staking when voting hasnt started", async function () {
    await chainwhiz.connect(owner).startVotingStage("www.google.com", "efg", a2.address);
    const trxObj =  chainwhiz.connect(a3).stakeVote("www.google.com", a2.address, "efg", "abc", a1.address, "www.facebook.com", tokensBN(1), "xyz");
    expect(trxObj).to.be.revertedWith("Error in stakeVote: Stake amount isn't within the range")
  })

  it("Should revert with error for staking on issue which doesnt exist", async function () {
    // await chainwhiz.connect(owner).startVotingStage("www.google.com","efg",a2.address);
    const trxObj =  chainwhiz.connect(a3).stakeVote("www.youtube.com", a2.address, "efg", "abc", a1.address, "www.facebook.com", tokensBN(1), "xyz");
    expect(trxObj).to.be.revertedWith("Error in stakeVote: Issue doesnt exist or has no community vote")
  })


  it("Should revert with error for staking when voting hasnt started", async function () {
    // await chainwhiz.connect(owner).startVotingStage("www.google.com","efg",a2.address);
    const trxObj =  chainwhiz.connect(a3).stakeVote("www.google.com", a2.address, "efg", "abc", a1.address, "www.facebook.com", tokensBN(1), "xyz");
    expect(trxObj).to.be.revertedWith("Error in stakeVote: Voting hasnt started")
  })

  it("Should revert with error for staking on solution that doesnt exist", async function () {
    await chainwhiz.connect(owner).startVotingStage("www.google.com", "efg", a2.address);
    const trxObj = chainwhiz.connect(a3).stakeVote("www.google.com", a2.address, "efg", "abc", a1.address, "www.youtube.com", tokensBN(12), "xyz");
    expect(trxObj).to.be.revertedWith("Error in stakeVote: Invalid soluton details")
  })

  it("Should revert with error for solver trying to vote", async function () {
    await chainwhiz.connect(owner).startVotingStage("www.google.com", "efg", a2.address);
    const trxObj = chainwhiz.connect(a1).stakeVote("www.google.com", a2.address, "efg", "abc", a1.address, "www.facebook.com", tokensBN(12), "xyz");
    expect(trxObj).to.be.revertedWith("Error in stakeVote: Publisher or solver cant vote")
  })

  it("Should revert with error for publisher trying to vote", async function () {
    await chainwhiz.connect(owner).startVotingStage("www.google.com", "efg", a2.address);
    const trxObj =  chainwhiz.connect(a2).stakeVote("www.google.com", a2.address, "efg", "abc", a1.address, "www.facebook.com", tokensBN(12), "xyz");
    expect(trxObj).to.be.revertedWith("Error in stakeVote: Publisher or solver cant vote")
  })

  it("Should revert with error for staking multiple times", async function () {
    await chainwhiz.connect(owner).startVotingStage("www.google.com", "efg", a2.address);
     chainwhiz.connect(a3).stakeVote("www.google.com", a2.address, "efg", "abc", a1.address, "www.facebook.com", tokensBN(12), "xyz")
    expect(await chainwhiz.connect(a3).stakeVote("www.google.com", a2.address, "efg", "abc", a1.address, "www.facebook.com", tokensBN(12), "xyz")).to.be.revertedWith("Error in stakeVote: Voter already staked")
    // trxObj.to.be.emit(chainwhiz,"VoteStaked")
  }).timeout(200000);

})
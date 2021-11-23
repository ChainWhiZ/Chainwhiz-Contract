const { expect } = require("chai");
const { ethers } = require("hardhat");
const aaveAddresses = require("./constants")

//helper function
bn = function (number, defaultValue = null) { if (number == null) { if (defaultValue == null) { return null } number = defaultValue } return ethers.BigNumber.from(number) }
tokensBN = function (amount) { return (bn(amount).mul(bn(10).pow(18))) }

describe("ChainwhizCore Voting Stage --> startVotingStage validations", function () {
  let Chainwhiz, chainwhiz
  beforeEach(async () => {

    [owner, a1, a2, a3, a4, _] = await ethers.getSigners()
    Chainwhiz = await ethers.getContractFactory("ChainwhizCore");
    chainwhiz = await Chainwhiz.connect(owner).deploy(owner.address)
    // await chainwhiz.connect(owner).initialize(owner.address);
    await chainwhiz.connect(a2).postIssue("efg", "www.google.com", tokensBN(10), tokensBN(12), Math.floor(Date.now() / 1000) + 1000, Math.floor(Date.now() / 1000) - 2000, Math.floor(Date.now() / 1000) + 5000, { value: tokensBN(22) })
    await chainwhiz.connect(a1).postSolution("abc", "www.facebook.com", "www.google.com", a2.address, "efg");
  })

  it("Should revert with error for admin/publisher not initiating the startVote", async function () {
    const trxObj = chainwhiz.connect(a3).startVotingStage("www.google.com", "efg", a2.address);
    expect(trxObj).to.be.revertedWith("START_VOTE_B")
  });
})

describe("ChainwhizCore Voting Stage --> stakeVote", function () {
  this.timeout(300000);
  let Chainwhiz, chainwhiz, matic, AMatic
  beforeEach(async () => {
    [owner, a1, a2, a3] = await ethers.getSigners()
    Chainwhiz = await ethers.getContractFactory("ChainwhizCore");
    chainwhiz = await Chainwhiz.connect(owner).deploy(owner.address)
    // matic = await ethers.getContractAt("IERC20");
    // console.log(matic)
    // AMatic = await matic.attach("0xF45444171435d0aCB08a8af493837eF18e86EE27");

    // await chainwhiz.connect(owner).initialize(owner.address);
    await chainwhiz.connect(a2).postIssue("efg", "www.google.com", tokensBN(10), tokensBN(12), Math.floor(Date.now() / 1000) + 1000, Math.floor(Date.now() / 1000) - 2000, Math.floor(Date.now() / 1000) + 5000, { value: tokensBN(22) })
    await chainwhiz.connect(a1).postSolution("abc", "www.facebook.com", "www.google.com", a2.address, "efg");
    await chainwhiz.connect(owner).setETHGatewayAddress(aaveAddresses.ETH_GATEWAY_ADDRESS)
    await chainwhiz.connect(owner).setLendingPoolProviderAddress(aaveAddresses.LENDING_POOL_PROVIDER_ADDRESS)
  })
  it("Should revert with error for staking when voting hasnt started", async function () {
    // await chainwhiz.connect(owner).startVotingStage("www.google.com", "efg", a2.address);
    const trxObj = chainwhiz.connect(a3).stakeVote("www.google.com", a2.address, "efg", "abc", a1.address, "www.facebook.com", "xyz", { value: tokensBN(13) });
    expect(trxObj).to.be.revertedWith("STAKE_VOTE_D")
  })

  it("Should revert with error for staking on issue which doesnt exist", async function () {
    await chainwhiz.connect(owner).startVotingStage("www.google.com", "efg", a2.address);
    try {
      const trxObj = chainwhiz.connect(a3).stakeVote("www.youtube.com", a2.address, "efg", "abc", a1.address, "www.facebook.com", "xyz", { value: tokensBN(13) });
      expect(trxObj).to.be.revertedWith("STAKE_VOTE_B")
    } catch (error) {
      console.log(error)
    }
  }).timeout(100000);


  it("Should revert with error for staking when voting hasnt started", async function () {
    // await chainwhiz.connect(owner).startVotingStage("www.google.com","efg",a2.address);
    const trxObj = chainwhiz.connect(a3).stakeVote("www.google.com", a2.address, "efg", "abc", a1.address, "www.facebook.com", "xyz", { value: tokensBN(13) });
    expect(trxObj).to.be.revertedWith("STAKE_VOTE_D")
  })

  it("Should revert with error for staking on solution that doesnt exist", async function () {
    await chainwhiz.connect(owner).startVotingStage("www.google.com", "efg", a2.address);
    const trxObj = chainwhiz.connect(a3).stakeVote("www.google.com", a2.address, "efg", "abc", a1.address, "www.youtube.com", "xyz", { value: tokensBN(13) });
    expect(trxObj).to.be.revertedWith("STAKE_VOTE_C")
  })

  it("Should revert with error for solver trying to vote", async function () {
    await chainwhiz.connect(owner).startVotingStage("www.google.com", "efg", a2.address);
    const trxObj = chainwhiz.connect(a1).stakeVote("www.google.com", a2.address, "efg", "abc", a1.address, "www.facebook.com", "xyz", { value: tokensBN(13) });
    expect(trxObj).to.be.revertedWith("STAKE_VOTE_E")
  })

  it("Should revert with error for publisher trying to vote", async function () {
    await chainwhiz.connect(owner).startVotingStage("www.google.com", "efg", a2.address);
    const trxObj = chainwhiz.connect(a2).stakeVote("www.google.com", a2.address, "efg", "abc", a1.address, "www.facebook.com", "xyz", { value: tokensBN(13) });
    expect(trxObj).to.be.revertedWith("STAKE_VOTE_E")
  })

  it("Should revert with error for staking multiple times", async function () {
    await chainwhiz.connect(owner).startVotingStage("www.google.com", "efg", a2.address);
    chainwhiz.connect(a4).stakeVote("www.google.com", a2.address, "efg", "abc", a1.address, "www.facebook.com", "xyz", { value: tokensBN(13) })
    expect(chainwhiz.connect(a4).stakeVote("www.google.com", a2.address, "efg", "abc", a1.address, "www.facebook.com", "xyz", { value: tokensBN(23) })).to.be.revertedWith("STAKE_VOTE_G")
    // trxObj.to.be.emit(chainwhiz,"VoteStaked")
  })

  it("Should stake successfully", async function () {
    await chainwhiz.connect(owner).startVotingStage("www.google.com", "efg", a2.address);
    const trxObj = await chainwhiz.connect(a4).stakeVote("www.google.com", a2.address, "efg", "abc", a1.address, "www.facebook.com", "xyz", { value: tokensBN(13) })
    expect(Number(trxObj.value.toString())).to.be.equal(13 * Math.pow(10, 18))

  })

})
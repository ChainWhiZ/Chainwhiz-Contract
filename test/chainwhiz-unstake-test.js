
// //Ustake is working 
// const { expect } = require("chai");
// const { ethers } = require("hardhat");
// const aaveAddresses = require("./constants")

// //helper function
// bn = function (number, defaultValue = null) { if (number == null) { if (defaultValue == null) { return null } number = defaultValue } return ethers.BigNumber.from(number) }
// tokensBN = function (amount) { return (bn(amount).mul(bn(10).pow(18))) }

// describe("ChainwhizCore Voting Stage --> setUnstakeAmount", function () {
//     let Chainwhiz, chainwhiz
//     beforeEach(async () => {
//       [owner, a1, a2, a3] = await ethers.getSigners()
//       Chainwhiz = await ethers.getContractFactory("ChainwhizCore");
//       chainwhiz = await Chainwhiz.deploy()
//       await chainwhiz.connect(owner).initialize(owner.address);
//       await chainwhiz.connect(a2).postIssue("efg", "www.google.com", tokensBN(10), tokensBN(2), Math.floor(Date.now() / 1000) +20, Math.floor(Date.now() / 1000) + 30, Math.floor(Date.now() / 1000) +5000, true, { value: tokensBN(12) })
//       await chainwhiz.connect(a1).postSolution("abc", "www.facebook.com", "www.google.com", a2.address, "efg");
//       await chainwhiz.connect(owner).setETHGatewayAddress(aaveAddresses.ETH_GATEWAY_ADDRESS)
//       await chainwhiz.connect(owner).setLendingPoolProviderAddress(aaveAddresses.LENDING_POOL_PROVIDER_ADDRESS)
//     //   await chainwhiz.connect(owner).startVotingStage("www.google.com", "efg", a2.address);
//     //   await chainwhiz.connect(a3).stakeVote("www.google.com", a2.address, "efg", "abc", a1.address, "www.facebook.com", tokensBN(12), "xyz")
//     })
//     it("Should set the ammount", async function () {
//         // commented out the check for staking time has ended;
//         await chainwhiz.connect(owner).setUnstakeAmount("www.google.com",a2.address,["www.facebook.com"],[a3.address], [tokensBN(1)],0,1);

//     }).timeout(200000)
  
   
//   })
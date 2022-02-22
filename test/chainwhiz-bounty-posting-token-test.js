const { expect } = require("chai");
const { ethers } = require("hardhat");

//helper function
bn = function (number, defaultValue = null) { if (number == null) { if (defaultValue == null) { return null } number = defaultValue } return ethers.BigNumber.from(number) }
tokensBN = function (amount) { return (bn(amount).mul(bn(10).pow(18))) }

describe("ChainwhizCore Bounty Posting(In tokens) --> postIssue validations", function () {
    let Chainwhiz, chainwhiz
    beforeEach(async () => {

        ;[owner, a1, a2, a3, _] = await ethers.getSigners()
        Chainwhiz = await ethers.getContractFactory("ChainwhizCore");
        DummyToken = await ethers.getContractFactory("DummyToken")
        dummyToken = await DummyToken.connect(owner).deploy()
        chainwhiz = await Chainwhiz.connect(owner).deploy(owner.address)
        await chainwhiz.connect(owner).setTokenDetails("DUM", dummyToken.address)
        await dummyToken.connect(owner).transfer(a1.address, tokensBN(20))

        // await chainwhiz.connect(owner).initialize(owner.address);
    })

    it("Successfullly post issue", async function () {
        await dummyToken.connect(owner).approve(chainwhiz.address, tokensBN(200))
        await chainwhiz.connect(owner).postIssue("abcd", "www.google.com", tokensBN(11), tokensBN(11), 123456, 23456, 8910, "DUM");
        const mappingDetail = (await chainwhiz.issueDetail(owner.address, "www.google.com"))
        const contractBalance = await dummyToken.balanceOf(chainwhiz.address)
        const mapDetails = await chainwhiz.issueDetail(owner.address,"www.google.com")
        console.log(mapDetails)
        expect(contractBalance).to.equal((22*Math.pow(10,18)).toString())
        expect(mappingDetail.solverRewardAmount).to.equal((11*Math.pow(10,18)).toString())
        // expect(trxObj).to.be.revertedWith("POST_ISSUE_C")
        // console.log("Should revert with error for insufficient balance: Error in postIssue: User doesnt have enough balance")

    }).timeout(100000)

    it("Throw error for trying to send funds without approval", async function () {
        const trxObj = chainwhiz.connect(owner).postIssue("abcd", "www.google.com", tokensBN(11), tokensBN(11), 123456, 23456, 8910, "DUM");
        expect(trxObj).to.be.revertedWith("POST_ISSUE_D_TOKEN")
        // console.log("Should revert with error for insufficient balance: Error in postIssue: User doesnt have enough balance")

    }).timeout(100000)

    it("Throw error for having low balance", async function () {
        const trxObj = chainwhiz.connect(a1).postIssue("abcd", "www.google.com", tokensBN(11), tokensBN(11), 123456, 23456, 8910, "DUM");
        expect(trxObj).to.be.revertedWith("POST_ISSUE_C_TOKEN")
        // console.log("Should revert with error for insufficient balance: Error in postIssue: User doesnt have enough balance")

    }).timeout(100000)
})
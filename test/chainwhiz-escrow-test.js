const { expect } = require("chai");
const { ethers } = require("hardhat");
//helper function
bn = function (number, defaultValue = null) { if (number == null) { if (defaultValue == null) { return null } number = defaultValue } return ethers.BigNumber.from(number) }
tokensBN = function (amount) { return (bn(amount).mul(bn(10).pow(18))) }

describe("ChainwhizCore Escrow --> initiateEscrow validations", function () {
    let Chainwhiz, chainwhiz
    beforeEach(async () => {

        ;[owner, a1, a2, a3, _] = await ethers.getSigners()
        Chainwhiz = await ethers.getContractFactory("ChainwhizCore");
        chainwhiz = await Chainwhiz.connect(owner).deploy(owner.address)
        // await chainwhiz.connect(owner).initialize(owner.address);
        await chainwhiz.connect(a2).postIssue("efg", "www.google.com", tokensBN(10), tokensBN(0), Math.floor(Date.now() / 1000) + 1000, 0, 0, { value: tokensBN(12) })
        await chainwhiz.connect(a1).postSolution("abc", "www.facebook.com", "www.google.com", a2.address, "efg");
    })

    it("Should revert with error for some other person trying to init escrow", async function () {
        const trxObj = chainwhiz.connect(a3).initiateEscrow("www.google.com", "abc");
        expect(trxObj).to.be.revertedWith("INIT_ESCROW_A")
    });

    it("Should revert with error for selection solution that doest exist", async function () {
        const trxObj =  chainwhiz.connect(a2).initiateEscrow("www.google.com", "xyz");
        expect(trxObj).to.be.revertedWith("INIT_ESCROW_B")
    });
    // not able to test because of time issue
    // it("Should sucessfully init", async function () {
    //     const trxObj =  await chainwhiz.connect(a2).initiateEscrow(a2.address, "www.google.com", "abc");
    //     expect(trxObj).to.be.revertedWith("Error in initiateEscrow:invalid solution")
    // });
})


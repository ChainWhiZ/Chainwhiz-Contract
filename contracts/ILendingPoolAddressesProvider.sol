//SPDX-License-Identifier:UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface ILendingPoolAddressesProvider {
    function getLendingPool() external view returns (address);
}
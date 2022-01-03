// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <=0.9.0;
interface IERC20 {
   function approve(address spender, uint256 amount) external returns (bool);
   function balanceOf(address account) external view returns (uint256);
   function allowance(address owner, address spender) external view returns (uint256);
   function transfer(address recipient, uint256 amount) external returns (bool);
   function transferFrom(address sender,address recipient,uint256 amount) external returns (bool);
}
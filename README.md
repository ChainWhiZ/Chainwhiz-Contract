 Sūrya's Description Report

 ## Flow Diagram
 ![Graph](https://github.com/ChainWhiZ/Chainwhiz-Contract/blob/main/chainwhiz.png?raw=true)

 ## Contracts Description Table

 Legend

|  Symbol  |  Meaning  |
|:--------:|-----------|
|    🛑    | Function can modify state |
|    💵    | Function is payable |


|  Contract  |         Type        |       Bases      |                  |                 |
|:----------:|:-------------------:|:----------------:|:----------------:|:---------------:|
|     └      |  **Function Name**  |  **Visibility**  |  **Mutability**  |  **Modifiers**  |
||||||
| **ChainwhizCore** | Implementation | ReentrancyGuard |||
| └ | <Fallback> | External ❗️ | 🛑  |NO❗️ |
| └ | <Receive Ether> | External ❗️ |  💵 |NO❗️ |
| └ | <Constructor> | Public ❗️ | 🛑  | ReentrancyGuard |
| └ | setChainwhizAdmin | External ❗️ | 🛑  | onlyChainwhizAdmin onlyActiveContract |
| └ | setMinimumRewardAmount | External ❗️ | 🛑  | onlyChainwhizAdmin onlyActiveContract |
| └ | setMinimumStakeAmount | External ❗️ | 🛑  | onlyChainwhizAdmin onlyActiveContract |
| └ | deactivateContract | External ❗️ | 🛑  | onlyChainwhizAdmin onlyActiveContract |
| └ | activateContract | External ❗️ | 🛑  | onlyChainwhizAdmin onlyDeactiveContract |
| └ | setETHGatewayAddress | External ❗️ | 🛑  | onlyChainwhizAdmin onlyActiveContract |
| └ | setLendingPoolProviderAddress | External ❗️ | 🛑  | onlyChainwhizAdmin onlyActiveContract |
| └ | setAaveIncentiveAddress | External ❗️ | 🛑  | onlyChainwhizAdmin onlyActiveContract |
| └ | setReawrdArrayAddress | External ❗️ | 🛑  | onlyChainwhizAdmin onlyActiveContract |
| └ | setaMaticAddress | External ❗️ | 🛑  | onlyChainwhizAdmin onlyActiveContract |
| └ | postIssue | Public ❗️ |  💵 | onlyActiveContract nonReentrant |
| └ | _postIssue | Private 🔐 | 🛑  | onlyActiveContract nonReentrant |
| └ | postSolution | Public ❗️ | 🛑  | onlyActiveContract |
| └ | startVotingStage | Public ❗️ | 🛑  | onlyActiveContract |
| └ | stakeVote | External ❗️ | 🛑  | onlyActiveContract nonReentrant |
| └ | _checkAlreadyVoted | Private 🔐 |   | onlyActiveContract |
| └ | _lendToAave | Private 🔐 | 🛑  | nonReentrant |
| └ | _storeVoteDetail | Private 🔐 | 🛑  | onlyActiveContract nonReentrant |
| └ | setUnstakeAmount | External ❗️ | 🛑  | onlyActiveContract onlyChainwhizAdmin |
| └ | unstake | External ❗️ | 🛑  | onlyActiveContract nonReentrant |
| └ | _withdrawFromAave | Private 🔐 | 🛑  | onlyActiveContract nonReentrant |
| └ | initiateEscrow | External ❗️ | 🛑  | onlyActiveContract |
| └ | transferRewardAmount | External ❗️ | 🛑  | onlyActiveContract nonReentrant |
| └ | _transferFunds | Private 🔐 | 🛑  | onlyActiveContract nonReentrant |
| └ | claimInterest | External ❗️ | 🛑  | onlyActiveContract onlyChainwhizAdmin nonReentrant |
| └ | withdrawFromTrasery | External ❗️ | 🛑  | onlyActiveContract onlyChainwhizAdmin nonReentrant |
| └ | setApproval | Public ❗️ | 🛑  |NO❗️ |
||||||
| **Initializable** | Implementation |  |||
||||||
| **ReentrancyGuard** | Implementation |  |||
| └ | <Constructor> | Public ❗️ | 🛑  |NO❗️ |
||||||
||||||
| **IWETHGateway** | Interface |  |||
| └ | depositETH | External ❗️ |  💵 |NO❗️ |
| └ | withdrawETH | External ❗️ | 🛑  |NO❗️ |
||||||
| **ILendingPoolAddressesProvider** | Interface |  |||
| └ | getLendingPool | External ❗️ |   |NO❗️ |
||||||
| **IERC20** | Interface |  |||
| └ | approve | External ❗️ | 🛑  |NO❗️ |
| └ | allowance | External ❗️ |   |NO❗️ |
||||||
| **IAaveIncentivesController** | Interface |  |||
| └ | claimRewards | External ❗️ | 🛑  |NO❗️ |
| └ | getRewardsBalance | External ❗️ |   |NO❗️ |



 Legend

|  Symbol  |  Meaning  |
|:--------:|-----------|
|    🛑    | Function can modify state |
|    💵    | Function is payable |

# To deploy
 `npx hardhat run --network mumbai scripts/deploy.js`

 # To Verify
 `npx hardhat verify "Address" --network mumbai "constructor parameter"`


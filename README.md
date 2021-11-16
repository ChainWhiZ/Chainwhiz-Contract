 Sūrya's Description Report

 Files Description Table


|  File Name  |  SHA-1 Hash  |
|-------------|--------------|
| /Users/ashispradhan/Desktop/Projects/ChainWhiZ/Chainwhiz-Contract-v2/contracts/ChainwhizCore.sol | b32c10ddaa1cda68ad9ef5b6d2f791a6c132da4f |
| /Users/ashispradhan/Desktop/Projects/ChainWhiZ/Chainwhiz-Contract-v2/node_modules/@openzeppelin/contracts/proxy/utils/Initializable.sol | 3b684c30ed2ad0aed9baceb3fdcc6523e0279e8d |
| /Users/ashispradhan/Desktop/Projects/ChainWhiZ/Chainwhiz-Contract-v2/node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol | 6372eddb504565dc1944c647c13c075cffcaa2f7 |
| /Users/ashispradhan/Desktop/Projects/ChainWhiZ/Chainwhiz-Contract-v2/node_modules/hardhat/console.sol | ba36558e776f482d532a19c9857446aeaec0f0ca |
| /Users/ashispradhan/Desktop/Projects/ChainWhiZ/Chainwhiz-Contract-v2/contracts/IWETHGateway.sol | e2b297dd5868a9f044882766ee15d51d08701307 |
| /Users/ashispradhan/Desktop/Projects/ChainWhiZ/Chainwhiz-Contract-v2/contracts/ILendingPoolAddressesProvider.sol | c8737b8fbf52bd682679e44d5e534297bff6d716 |
| /Users/ashispradhan/Desktop/Projects/ChainWhiZ/Chainwhiz-Contract-v2/contracts/IERC20.sol | 273beb3eccf3d4133c376d16bf492f9908cea537 |
| /Users/ashispradhan/Desktop/Projects/ChainWhiZ/Chainwhiz-Contract-v2/contracts/IAaveIncentivesController.sol | 2a52365922c289b9dd9dddc25bc1544b9fb13e88 |


 Contracts Description Table


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
| **console** | Library |  |||
| └ | _sendLogPayload | Private 🔐 |   | |
| └ | log | Internal 🔒 |   | |
| └ | logInt | Internal 🔒 |   | |
| └ | logUint | Internal 🔒 |   | |
| └ | logString | Internal 🔒 |   | |
| └ | logBool | Internal 🔒 |   | |
| └ | logAddress | Internal 🔒 |   | |
| └ | logBytes | Internal 🔒 |   | |
| └ | logBytes1 | Internal 🔒 |   | |
| └ | logBytes2 | Internal 🔒 |   | |
| └ | logBytes3 | Internal 🔒 |   | |
| └ | logBytes4 | Internal 🔒 |   | |
| └ | logBytes5 | Internal 🔒 |   | |
| └ | logBytes6 | Internal 🔒 |   | |
| └ | logBytes7 | Internal 🔒 |   | |
| └ | logBytes8 | Internal 🔒 |   | |
| └ | logBytes9 | Internal 🔒 |   | |
| └ | logBytes10 | Internal 🔒 |   | |
| └ | logBytes11 | Internal 🔒 |   | |
| └ | logBytes12 | Internal 🔒 |   | |
| └ | logBytes13 | Internal 🔒 |   | |
| └ | logBytes14 | Internal 🔒 |   | |
| └ | logBytes15 | Internal 🔒 |   | |
| └ | logBytes16 | Internal 🔒 |   | |
| └ | logBytes17 | Internal 🔒 |   | |
| └ | logBytes18 | Internal 🔒 |   | |
| └ | logBytes19 | Internal 🔒 |   | |
| └ | logBytes20 | Internal 🔒 |   | |
| └ | logBytes21 | Internal 🔒 |   | |
| └ | logBytes22 | Internal 🔒 |   | |
| └ | logBytes23 | Internal 🔒 |   | |
| └ | logBytes24 | Internal 🔒 |   | |
| └ | logBytes25 | Internal 🔒 |   | |
| └ | logBytes26 | Internal 🔒 |   | |
| └ | logBytes27 | Internal 🔒 |   | |
| └ | logBytes28 | Internal 🔒 |   | |
| └ | logBytes29 | Internal 🔒 |   | |
| └ | logBytes30 | Internal 🔒 |   | |
| └ | logBytes31 | Internal 🔒 |   | |
| └ | logBytes32 | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
| └ | log | Internal 🔒 |   | |
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

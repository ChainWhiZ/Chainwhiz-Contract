 SÅ«rya's Description Report

 ## Flow Diagram
 ![Graph](https://github.com/ChainWhiZ/Chainwhiz-Contract/blob/main/chainwhiz.png?raw=true)

 ## Contracts Description Table

 Legend

|  Symbol  |  Meaning  |
|:--------:|-----------|
|    ð    | Function can modify state |
|    ðµ    | Function is payable |


|  Contract  |         Type        |       Bases      |                  |                 |
|:----------:|:-------------------:|:----------------:|:----------------:|:---------------:|
|     â      |  **Function Name**  |  **Visibility**  |  **Mutability**  |  **Modifiers**  |
||||||
| **ChainwhizCore** | Implementation | ReentrancyGuard |||
| â | <Fallback> | External âï¸ | ð  |NOâï¸ |
| â | <Receive Ether> | External âï¸ |  ðµ |NOâï¸ |
| â | <Constructor> | Public âï¸ | ð  | ReentrancyGuard |
| â | setChainwhizAdmin | External âï¸ | ð  | onlyChainwhizAdmin onlyActiveContract |
| â | setMinimumRewardAmount | External âï¸ | ð  | onlyChainwhizAdmin onlyActiveContract |
| â | setMinimumStakeAmount | External âï¸ | ð  | onlyChainwhizAdmin onlyActiveContract |
| â | deactivateContract | External âï¸ | ð  | onlyChainwhizAdmin onlyActiveContract |
| â | activateContract | External âï¸ | ð  | onlyChainwhizAdmin onlyDeactiveContract |
| â | setETHGatewayAddress | External âï¸ | ð  | onlyChainwhizAdmin onlyActiveContract |
| â | setLendingPoolProviderAddress | External âï¸ | ð  | onlyChainwhizAdmin onlyActiveContract |
| â | setAaveIncentiveAddress | External âï¸ | ð  | onlyChainwhizAdmin onlyActiveContract |
| â | setReawrdArrayAddress | External âï¸ | ð  | onlyChainwhizAdmin onlyActiveContract |
| â | setaMaticAddress | External âï¸ | ð  | onlyChainwhizAdmin onlyActiveContract |
| â | postIssue | Public âï¸ |  ðµ | onlyActiveContract nonReentrant |
| â | _postIssue | Private ð | ð  | onlyActiveContract nonReentrant |
| â | postSolution | Public âï¸ | ð  | onlyActiveContract |
| â | startVotingStage | Public âï¸ | ð  | onlyActiveContract |
| â | stakeVote | External âï¸ | ð  | onlyActiveContract nonReentrant |
| â | _checkAlreadyVoted | Private ð |   | onlyActiveContract |
| â | _lendToAave | Private ð | ð  | nonReentrant |
| â | _storeVoteDetail | Private ð | ð  | onlyActiveContract nonReentrant |
| â | setUnstakeAmount | External âï¸ | ð  | onlyActiveContract onlyChainwhizAdmin |
| â | unstake | External âï¸ | ð  | onlyActiveContract nonReentrant |
| â | _withdrawFromAave | Private ð | ð  | onlyActiveContract nonReentrant |
| â | initiateEscrow | External âï¸ | ð  | onlyActiveContract |
| â | transferRewardAmount | External âï¸ | ð  | onlyActiveContract nonReentrant |
| â | _transferFunds | Private ð | ð  | onlyActiveContract nonReentrant |
| â | claimInterest | External âï¸ | ð  | onlyActiveContract onlyChainwhizAdmin nonReentrant |
| â | withdrawFromTrasery | External âï¸ | ð  | onlyActiveContract onlyChainwhizAdmin nonReentrant |
| â | setApproval | Public âï¸ | ð  |NOâï¸ |
||||||
| **Initializable** | Implementation |  |||
||||||
| **ReentrancyGuard** | Implementation |  |||
| â | <Constructor> | Public âï¸ | ð  |NOâï¸ |
||||||
||||||
| **IWETHGateway** | Interface |  |||
| â | depositETH | External âï¸ |  ðµ |NOâï¸ |
| â | withdrawETH | External âï¸ | ð  |NOâï¸ |
||||||
| **ILendingPoolAddressesProvider** | Interface |  |||
| â | getLendingPool | External âï¸ |   |NOâï¸ |
||||||
| **IERC20** | Interface |  |||
| â | approve | External âï¸ | ð  |NOâï¸ |
| â | allowance | External âï¸ |   |NOâï¸ |
||||||
| **IAaveIncentivesController** | Interface |  |||
| â | claimRewards | External âï¸ | ð  |NOâï¸ |
| â | getRewardsBalance | External âï¸ |   |NOâï¸ |



 Legend

|  Symbol  |  Meaning  |
|:--------:|-----------|
|    ð    | Function can modify state |
|    ðµ    | Function is payable |

# To deploy
 `npx hardhat run --network mumbai scripts/deploy.js`

 # To Verify
 `npx hardhat verify "Address" --network mumbai "constructor parameter"`

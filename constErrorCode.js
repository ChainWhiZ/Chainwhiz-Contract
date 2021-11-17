const ErrorCodes = {
    //main errors
    "ONLY_ADMIN": "Only Admin can do it",
    "DEACTIVATE_ERROR": "Contract is paused or is at halt",
    "ACTIVE_ERROR": "Contract is active",
    //issue related errors
    "POST_ISSUE_A": "Error in postIssue: The address linked github id is not the same",
    "POST_ISSUE_B": "Error in postIssue: Reawrd amount cannot be less than MIN_REWARD_AMOUNT",
    "POST_ISSUE_C": "Error in postIssue: User doesnt have enough balance",
    "POST_ISSUE_D": "Error in postIssue: User didnt transfer sufficient funds",
    //solution related errors
    "POST_SOLUTION_A": "Error in postSolution: Publisher cannot post solution",
    "POST_SOLUTION_B": "Error in postSolution: The address linked github id is not the same",
    "POST_SOLUTION_C": "Error in postSolution: The github issue doesnt exist",
    "POST_SOLUTION_D": "Error in postSolution: Solving time has not started or has completed",
    "POST_SOLUTION_E": "Error in postSolution: Solver can post only one solution",
    //start vote related errors
    "START_VOTE_A": "Error in startVotingStage: Community vote is disabled or initiated beyond the voting phase",
    "START_VOTE_B": "Error in startVotingStage: Only admin or issue poster can initiate",
    // stake vote errors
    "STAKE_VOTE_A":"Error in stakeVote: The address linked github id is not the same",
    "STAKE_VOTE_B":"Error in stakeVote: Issue doesnt exist or has no community vote",
    "STAKE_VOTE_C":"Error in stakeVote: Invalid soluton details",
    "STAKE_VOTE_D":"Error in stakeVote: Voting hasnt started",
    "STAKE_VOTE_E":"Error in stakeVote: Publisher or solver cant vote",
    "STAKE_VOTE_F":"Error in stakeVote: Stake amount isn't within the range",
    "STAKE_VOTE_G":"Error in stakeVote: Voter already staked",
    "STAKE_VOTE_H":"Error in stakeVote: Voter already voted in a solution",
    //set unstake amount errors
    "SET_UNSTAKE_A":"Error in setUnstakeAmount:Uneven size",
    "SET_UNSTAKE_B":"Error in setUnstakeAmount: Voting hasnt over or already set",
    "SET_UNSTAKE_C":"Error in setUnstakeAmount:unstake is zero or invalid entry",
    //initiate escrow errors
    "INIT_ESCROW_A":"Error in initiateEscrow: Unautorized",
    "INIT_ESCROW_B":"Error in initiateEscrow:invalid solution",
    "INIT_ESCROW_C":"Error in initiateEscrow: Voting/Solving hasnt finished",
    "INIT_ESCROW_D":"Error in initiateEscrow:Voting/Solve is going on",
    // transfer reward errors
    "TRANSFER_REWARD_A":"Error in transferOwnership: Unauthorized",
    "TRANSFER_REWARD_B":"Error in transferOwnership: Not at right state",
    //trasrey withdraw error
    "TREASARY_WITHDRAW_A":"Error in withdrawFromTrasery: Invalid amount",
    "TREASARY_WITHDRAW_B":"Error in withdrawFromTreasery:Not valid to address"



}
module.export = ErrorCodes
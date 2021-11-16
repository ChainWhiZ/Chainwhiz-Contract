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



}
module.export = ErrorCodes
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <=0.9.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "hardhat/console.sol";
import "./IWETHGateway.sol";
import "./ILendingPoolAddressesProvider.sol";

contract ChainwhizCore is Initializable, ReentrancyGuard {
    //************************   State Variables   ************************ */
    address public ChainwhizAdmin;
    uint256 public MIN_REWARD_AMOUNT = 5 ether;
    uint256 public MAX_REWARD_AMOUNT = 40 ether;
    uint256 public MIN_STAKING_AMOUNT = 5 ether;
    uint256 public MAX_STAKE_AMOUNT = 40 ether;
    uint256 public MAI_COMMUNITY_REWARD_AMOUNT = 10 ether;
    uint256 public MAX_COMMUNITY_REWARD_AMOUNT = 40 ether;
    bool public isInitialised = false;
    bool public isContractActive = true;
    address public ethGateWayAddress;
    address public lendingPoolProviderAddress;

    //************************   Enums   ************************ */
    enum QuestionStatus {
        Solve,
        Vote,
        Escrow,
        Over
    }

    enum EscrowStatus {
        Initiate,
        TransferOwnership,
        TransferMoney,
        Emergency
    }

    //************************   Structures   ************************ */
    struct Question {
        address publisher;
        uint256 solverRewardAmount;
        uint256 communityVoterRewardAmount;
        uint256 startSolveTime;
        uint256 endSolveTime;
        uint256 startVoteTime;
        uint256 endVoteTime;
        bool isCommunityVote;
        address[] voterAddress;
        QuestionStatus questionStatus;
    }

    struct Solution {
        address solver;
        string solutionLink;
        uint256 timeOfPosting;
        uint256 totalStakedAmount;
        EscrowStatus escrowStatus;
    }

    struct Vote {
        address voter;
        uint256 votingPower;
        uint256 amountStaked;
        uint256 returnAmount;
        bool isUnstake;
    }

    //************************   Mappings   ************************ */
    //Mapping for Publisher
    //Overall mapping from publisher to issue detail (githubId -> publisher address -> issue link -> issue detail)
    //mapping for githubid and publisher address
    mapping(string => address) public publisher;
    //mapping publisher address to issue link
    mapping(address => mapping(string => Question)) public issueDetail;

    //Mapping for Voter
    //mapping github id to solver address
    mapping(string => address) public voter;
    //mapping solutionLink to voter address which in turn is mapped to vote details
    mapping(string => mapping(address => Vote)) public voteDetails;

    //Mapping for Solver
    //mapping for github id and the solver address
    mapping(string => address) public solver;
    //mapping issue link to solver githubid which is turn is mapped to the solution details
    mapping(string => mapping(string => Solution)) public solutionDetails;

    //************************   Events   ************************ */
    event DeactivateContract();
    event ActivateContract();
    event ETHGateWayAddressChanged(address newAddress);
    event LendingPoolProviderAddressChanged(address newAddress);
    event IssuePosted(
        address publisher,
        string githubid,
        string githubUrl,
        uint256 solverRewardAmount,
        uint256 communityVoteReward
    );

    event SolutionSubmitted(
        string solverGithubId,
        string solutionLink,
        string publisherGithubId,
        string issueGithubUrl
    );

    event VoteStaked(
        string solutionLink,
        address voter,
        uint amount
    );

    //************************   Modifiers   ************************ */
    modifier onlyChainwhizAdmin() {
        require(msg.sender == ChainwhizAdmin, "Only Admin can do it");
        _;
    }

    modifier onlyActiveContract() {
        require(
            isContractActive == true,
            "Contract is at halt for some reason"
        );
        _;
    }

    modifier onlyDeactiveContract() {
        require(isContractActive == false, "Contract is active");
        _;
    }

    //************************   Functions   ************************ */
    fallback() external {}

    receive() external payable {}

    /// @notice Used to initialise the admin
    /// @dev After deploying the contract, initialise is called immediately to set the admin
    /// @param _ChainwhizAdmin the admin address needs to be passed

    function initialize(address _ChainwhizAdmin) external onlyActiveContract {
        require(isInitialised == false, "Contract is already initialised");
        ChainwhizAdmin = _ChainwhizAdmin;
        isInitialised = true;
    }

    /// @notice Used to set the new admin
    /// @dev The modifier onlyChainwhizAdmin is used so that the current admin can change the address
    /// @param _newChainwhizAdmin takes in the address of new admin

    function setChainwhizAdmin(address _newChainwhizAdmin)
        external
        onlyChainwhizAdmin
        onlyActiveContract
    {
        ChainwhizAdmin = _newChainwhizAdmin;
    }

    /// @notice Used to set the minimum reward amount
    /// @dev The modifier onlyChainwhizAdmin is used so that the current admin can change the minimum reward
    /// @param _newRewardAmount as input from admin

    function setMinimumRewardAmount(uint256 _newRewardAmount)
        external
        onlyChainwhizAdmin
        onlyActiveContract
    {
        MIN_REWARD_AMOUNT = _newRewardAmount;
    }

    /// @notice Used to set the minimum stake amount
    /// @dev The modifier onlyChainwhizAdmin is used so that the current admin can change the minimum stake
    /// @param _newStakeAmount as input from admin

    function setMinimumStakeAmount(uint256 _newStakeAmount)
        external
        onlyChainwhizAdmin
        onlyActiveContract
    {
        MIN_STAKING_AMOUNT = _newStakeAmount;
    }

    /// @notice Used to deactive contract in case of security issue
    /// @dev Modifiers onlyChainwhizAdmin onlyActiveContract are used

    function deactivateContract()
        external
        onlyChainwhizAdmin
        onlyActiveContract
    {
        isContractActive = false;
        emit DeactivateContract();
    }

    /// @notice Used to activate contract
    /// @dev Modifiers onlyChainwhizAdmin onlyDeactiveContract are used

    function activateContract()
        external
        onlyChainwhizAdmin
        onlyDeactiveContract
    {
        isContractActive = true;
        emit ActivateContract();
    }

    /// @notice Set the address of ETHGateway Contract of Aave
    function setETHGatewayAddress(address _ethGateWayAddress)
        external
        onlyChainwhizAdmin
        onlyActiveContract
    {
        ethGateWayAddress = _ethGateWayAddress;
        emit ETHGateWayAddressChanged(_ethGateWayAddress);
    }

    /// @notice Set the address of LendingPoolAddressesProvider Contract of Aave
    function setLendingPoolProviderAddress(address _lendingPoolProviderAddress)
        external
        onlyChainwhizAdmin
        onlyActiveContract
    {
        lendingPoolProviderAddress = _lendingPoolProviderAddress;
        emit LendingPoolProviderAddressChanged(_lendingPoolProviderAddress);
    }

    /// @notice Post a bounty
    /// @dev The require check are there for various validations
    /// @param _githubId the github id
    /// @param _githubUrl the github url
    /// @param _solverRewardAmount the bounty given to solver
    /// @param _communityVoterRewardAmount reward to voter for staking
    /// @param _endSolverTime Time at which solving will be over
    /// @param _startVoteTime Time at which voting will start
    /// @param _endVoteTime Time at which voting will over
    /// @param _isCommunityReaward bool type to define if it involves community reward or not
    /// @return true if posted successfully or false
    function postIssue(
        string memory _githubId,
        string memory _githubUrl,
        uint256 _solverRewardAmount,
        uint256 _communityVoterRewardAmount,
        uint256 _endSolverTime,
        uint256 _startVoteTime,
        uint256 _endVoteTime,
        bool _isCommunityReaward
    ) public payable returns (bool) {
        // If the github id is not registered with an address then, register it
        if (publisher[_githubId] == address(0)) {
            publisher[_githubId] = msg.sender;
        }
        // To check if the github url linked with address is valid or not
        require(
            publisher[_githubId] == msg.sender,
            "Error in postIssue: The address linked github id is not the same"
        );
        // Reward should be greater than min reward
        require(
            _solverRewardAmount >= MIN_REWARD_AMOUNT,
            "Error in postIssue: Reawrd amount cannot be less than MIN_REWARD_AMOUNT"
        );
        // Check user has enough balance
        require(
            (msg.sender).balance >
                (_solverRewardAmount + _communityVoterRewardAmount),
            "Error in postIssue: User doesnt have enough balance"
        );
        // Check if the sent fund and the total amount set for rewards matches or not
        require(
            msg.value >= (_solverRewardAmount + _communityVoterRewardAmount),
            "Error in postIssue: User didnt transfer sufficient funds"
        );

        emit IssuePosted(
            msg.sender,
            _githubId,
            _githubUrl,
            _solverRewardAmount,
            _communityVoterRewardAmount
        );

        // Store issue related info
        _postIssue(
            msg.sender,
            _githubUrl,
            _solverRewardAmount,
            _communityVoterRewardAmount,
            _endSolverTime,
            _startVoteTime,
            _endVoteTime,
            _isCommunityReaward
        );
        return true;
    }

    /// @notice Post a bounty
    /// @dev - Create the struct and store the details.
    ///      - Trasnfer the token to the contract

    function _postIssue(
        address _publisher,
        string memory _githubUrl,
        uint256 _solverRewardAmount,
        uint256 _communityVoterRewardAmount,
        uint256 _endSolverTime,
        uint256 _startVoteTime,
        uint256 _endVoteTime,
        bool _isCommunityReaward
    ) private {
        Question storage question = issueDetail[msg.sender][_githubUrl];
        question.publisher = _publisher;
        question.solverRewardAmount = _solverRewardAmount;
        question.communityVoterRewardAmount = _communityVoterRewardAmount;
        question.startSolveTime = block.timestamp;
        question.endSolveTime = _endSolverTime;
        question.startVoteTime = _startVoteTime;
        question.endVoteTime = _endVoteTime;
        question.isCommunityVote = _isCommunityReaward;
        payable(address(this)).transfer(msg.value);

        //****************************  Logs for testing only  ****************************************** */
        // console.log((issueDetail[msg.sender][_githubUrl]).solverRewardAmount);
        // console.log((issueDetail[msg.sender][_githubUrl]).communityVoterRewardAmount);
        // console.log((issueDetail[msg.sender][_githubUrl]).startSolveTime);
        // console.log("Contract Balance");
        // console.log((address(this)).balance);
    }

    /// @notice To store the solution link
    /// @dev Need issue url and publisher address to fetch issue related information
    /// @param _solutionLink the solution link
    /// @param _githubId the github id is of the solver
    /// @param _publisherAddress address of publisher
    /// @param _issueGithubUrl github issue url
    /// @param _publisherGithubId github issue url
    /// @return bool type true for success or failure
    function postSolution(
        string memory _githubId,
        string memory _solutionLink,
        string memory _issueGithubUrl,
        address _publisherAddress,
        string memory _publisherGithubId
    ) public returns (bool) {
        // Work around to get timestamp: 1635532684
        // console.log(block.timestamp);
        // If the github id is not registered with an address then, register it
        if (solver[_githubId] == address(0)) {
            solver[_githubId] = msg.sender;
        }
        // To prevent publisher from solving
        require(
            publisher[_publisherGithubId] != msg.sender &&
                solver[_githubId] != _publisherAddress &&
                keccak256(abi.encodePacked((_publisherGithubId))) !=
                keccak256(abi.encodePacked((_githubId))),
            "Error in postSolution: Publisher cannot post solution"
        );
        // To check if the github url linked with address is valid or not

        require(
            solver[_githubId] == msg.sender,
            "Error in postSolution: The address linked github id is not the same"
        );
        // Fetch issue related details. It's marked as memory as it saves gas fees
        Question memory question = issueDetail[_publisherAddress][
            _issueGithubUrl
        ];
        //Check if the solution exists or not
        require(
            question.solverRewardAmount != 0,
            "Error in postSolution: The github issue doesnt exist"
        );
        // Check if the solver has posted within the solving time
        require(
            question.startSolveTime <= block.timestamp &&
                question.endSolveTime >= block.timestamp &&
                question.questionStatus == QuestionStatus.Solve,
            "Error in postSolution: Solving time has not started or has completed"
        );
        // Check if solver is posting multiple solutions
        require(
            solutionDetails[_issueGithubUrl][_githubId].solver != msg.sender,
            "Error in postSolution: Solver can post only one solution"
        );

        Solution storage solution = solutionDetails[_issueGithubUrl][_githubId];
        solution.solver = msg.sender;
        solution.solutionLink = _solutionLink;
        solution.timeOfPosting = block.timestamp;
        emit SolutionSubmitted(
            _githubId,
            _solutionLink,
            _publisherGithubId,
            _issueGithubUrl
        );
        return true;
    }

    /// @notice Start the voting phase
    /// @param _issueGithubUrl a parameter just like in doxygen (must be followed by parameter name)
    /// @param _publisherGithubId a parameter just like in doxygen (must be followed by parameter name)
    /// @param _publisherAddress a parameter just like in doxygen (must be followed by parameter name)
    function startVotingStage(
        string memory _issueGithubUrl,
        string memory _publisherGithubId,
        address _publisherAddress
    ) public {
        //work around to get the timestamp for testing
        // console.log(block.timestamp);
        //get issue detail
        Question storage questionDetail = issueDetail[_publisherAddress][
            _issueGithubUrl
        ];
        //Only with community vote enabled can be moves to voting phase
        require(
            questionDetail.isCommunityVote &&
                questionDetail.startVoteTime <= block.timestamp &&
                questionDetail.endVoteTime >= block.timestamp,
            "Error in startVotingStage: Community vote is disabled or initiated beyond the voting phase"
        );
        //Only chainwhiz admin or issue publihser can initiate it
        require(
            ChainwhizAdmin == msg.sender ||
                (publisher[_publisherGithubId] == msg.sender &&
                    msg.sender == _publisherAddress),
            "Error in startVotingStage: Only admin or issue poster can initiate"
        );

        questionDetail.questionStatus = QuestionStatus.Vote;
    }

    /// @notice Vote on the solution by staking Matic
    /// @dev Explain to a developer any extra details
    /// @param _issueGithubUrl The issue github url
    /// @param _publisherAddress Publisher address
    /// @param _publisherGithubId publisher github id
    /// @param _solverGithubId solver github id
    /// @param _solver solver address
    /// @param _solutionLink the solution link to be voted on
    /// @param _stakeAmount amount to be staked
    /// @param _githubId the voter github id
    function stakeVote(
        string memory _issueGithubUrl,
        address _publisherAddress,
        string memory _publisherGithubId,
        string memory _solverGithubId,
        address _solver,
        string memory _solutionLink,
        uint256 _stakeAmount,
        string memory _githubId
    ) external {
        // If the github is not registered as voter, it registers it
        if (voter[_githubId] == address(0)) {
            voter[_githubId] = msg.sender;
        }
        // To check if th github url is linked with the address is valid or not
        require(
            voter[_githubId] == msg.sender,
            "Error in stakeVote: The address linked github id is not the same"
        );
        console.log(1);
        //To check issue exists
        Question memory  question = issueDetail[_publisherAddress][_issueGithubUrl];
        require(
            publisher[_publisherGithubId] == _publisherAddress &&
                issueDetail[_publisherAddress][_issueGithubUrl]
                    .solverRewardAmount !=
                0 &&
                issueDetail[_publisherAddress][_issueGithubUrl].isCommunityVote,
            "Error in stakeVote: Issue doesnt exist or has no community vote"
        );
        console.log(2);
        //Check that the solution exists
        Solution memory solution = solutionDetails[_issueGithubUrl][
            _solverGithubId
        ];
        require(
            solver[_solverGithubId] == _solver &&
                solution.solver != address(0) &&
                keccak256(abi.encodePacked(solution.solutionLink)) !=
                keccak256(abi.encodePacked("")) &&
                keccak256(abi.encodePacked(solution.solutionLink)) ==
                keccak256(abi.encodePacked(_solutionLink)),
            "Error in stakeVote: Invalid soluton details"
        );
        console.log(3);
        //Check if the staking is done within the time
        require(
            issueDetail[_publisherAddress][_issueGithubUrl].questionStatus ==
                QuestionStatus.Vote &&
                issueDetail[_publisherAddress][_issueGithubUrl].startVoteTime <=
                block.timestamp &&
                issueDetail[_publisherAddress][_issueGithubUrl].endVoteTime >=
                block.timestamp,
            "Error in stakeVote: Voting hasnt started"
        );
        console.log(4);
        // To check github id of solver and publisher doesnt match with the voter
        require(
            publisher[_githubId] != msg.sender &&
                solver[_githubId] != msg.sender &&
                solution.solver != msg.sender &&
                question.publisher != msg.sender &&
                keccak256(abi.encodePacked((_publisherGithubId))) !=
                keccak256(abi.encodePacked((_githubId))) &&
                keccak256(abi.encodePacked((_solverGithubId))) !=
                keccak256(abi.encodePacked((_githubId))),
            "Error in stakeVote: Publisher or solver cant vote"
        );
        console.log(5);
        // To check is stake amount is within the limit
        require(
            _stakeAmount >= MIN_STAKING_AMOUNT &&
                _stakeAmount <= MAX_STAKE_AMOUNT,
            "Error in stakeVote: Stake amount isn't within the range"
        );
        console.log(6);
        //Voter shouldnt vote multiple times
        require(
            voteDetails[_solutionLink][msg.sender].voter == address(0),
            "Error in stakeVote: Voter already staked"
        );
        console.log(7);
        //Check if voter has alreay voted in any solution
        bool voterVoted = _checkAlreadyVoted(
            issueDetail[_publisherAddress][_issueGithubUrl].voterAddress,
            msg.sender
        );
        require(
            !voterVoted,
            "Error in stakeVote: Voter already voted in a solution"
        );
        console.log(8);
        // lend to aave protocol
        _lendToAave(_stakeAmount);
        //store vote detail
        console.log(9);
        _storeVoteDetail(
            _solutionLink,
            msg.sender,
            _stakeAmount,
            _publisherAddress,
            _issueGithubUrl
        );
        console.log(10);
        //emit the event
        emit VoteStaked(_solutionLink, msg.sender, _stakeAmount);
    }

    function _checkAlreadyVoted(address[] memory _voterAddress, address _voter)
        private
        pure
        returns (bool)
    {
        uint256 lengthOfArr = _voterAddress.length;
        for (uint256 i = 0; i < lengthOfArr; i++) {
            if (_voter == _voterAddress[i]) return true;
        }

        return false;
    }

    function _lendToAave(uint256 _amount) private {
        // Initialise the ETHGateway Contract
        IWETHGateway ethGateWay = IWETHGateway(ethGateWayAddress);
        // Initialise the LendingPoolAddressesProvider Contract
        ILendingPoolAddressesProvider lendingProvider = ILendingPoolAddressesProvider(
                lendingPoolProviderAddress
            );
        // Lend the matic tokens to the Aave Protocol.
        ethGateWay.depositETH{value: _amount}(
            // Address of Lending Pool
            lendingProvider.getLendingPool(),
            // The address that would receive the aToken, in this case the contract
            address(this),
            // Referal Code: For now its 0
            0
        );
    }

    function _storeVoteDetail(
        string memory _solutionLink,
        address _voter,
        uint256 _stakeAmount,
        address _publisherAddress,
        string memory _issueGithubUrl
    ) private {
        Vote storage vote = voteDetails[_solutionLink][_voter];
        vote.voter = _voter;
        vote.amountStaked = _stakeAmount;

        Question storage question = issueDetail[_publisherAddress][
            _issueGithubUrl
        ];
        question.voterAddress.push(_voter);
    }
}

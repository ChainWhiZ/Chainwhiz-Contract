// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <=0.9.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "hardhat/console.sol";

contract ChainwhizCore is Initializable, ReentrancyGuard {
    //************************   State Variables   ************************ */
    address public ChainwhizAdmin;
    uint256 public MIN_REWARD_AMOUNT = 5 ether;
    uint256 public MIN_STAKING_AMOUNT = 5 ether;
    bool public isInitialised = false;
    bool public isContractActive = true;

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
        uint256 solverRewardAmount;
        uint256 communityVoterRewardAmount;
        uint256 startSolveTime;
        uint256 endSolveTime;
        uint256 startVoteTime;
        uint256 endVoteTime;
        bool isCommunityVote;
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
    event IssuePosted(
        address publisher,
        string githubid,
        string githubUrl,
        uint256 solverRewardAmount,
        uint256 communityVoteReward
    );

    //************************   Modifiers   ************************ */
    modifier onlyChainwhizAdmin() {
        require(
            msg.sender == ChainwhizAdmin,
            "ChainwhizCore Error: Only Admin can do it"
        );
        _;
    }

    modifier onlyActiveContract() {
        require(
            isContractActive == true,
            "ChainwhizCore Error: Contract is at halt for some reason"
        );
        _;
    }

    modifier onlyDeactiveContract() {
        require(
            isContractActive == false,
            "ChainwhizCore Error: Contract is active"
        );
        _;
    }

    //************************   Functions   ************************ */
    fallback() external {}

    receive() external payable {}

    /// @notice Used to initialise the admin
    /// @dev After deploying the contract, initialise is called immediately to set the admin
    /// @param _ChainwhizAdmin the admin address needs to be passed

    function initialize(address _ChainwhizAdmin) external onlyActiveContract {
        require(
            isInitialised == false,
            "ChainwhizCore Error: Contract is already initialised"
        );
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
        // If the github url is not registered with an address then, register it
        if (publisher[_githubId] == address(0)) {
            publisher[_githubId] = msg.sender;
        }
        // To check if the github url linked with address is valid or not
        require(
            publisher[_githubId] == msg.sender,
            "ChainwhizCore Error: The address linked github id is not the same"
        );
        // Reward should be greater than min reward
        require(
            _solverRewardAmount >= MIN_REWARD_AMOUNT,
            "ChainwhizCore Error: Reawrd amount cannot be less than MIN_REWARD_AMOUNT"
        );
        // Check user has enough balance
        require(
            (msg.sender).balance >
                (_solverRewardAmount + _communityVoterRewardAmount),
            "ChainwhizCore Error: User doesnt have enough balance"
        );
        // Check if the sent fund and the total amount set for rewards matches or not
        require(
            msg.value >= (_solverRewardAmount + _communityVoterRewardAmount),
            "ChainwhizCore Error: User didnt transfer sufficient funds"
        );
        // Store issue related info
        Question storage question = issueDetail[msg.sender][_githubUrl];
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

        emit IssuePosted(
            msg.sender,
            _githubId,
            _githubUrl,
            _solverRewardAmount,
            _communityVoterRewardAmount
        );
        return true;
    }
}

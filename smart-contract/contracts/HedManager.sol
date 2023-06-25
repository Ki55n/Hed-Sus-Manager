// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract HedManager {
    using Counters for Counters.Counter;
    using SafeMath for uint256;

    Counters.Counter private explorersCount;
    Counters.Counter private projectCount;

    struct Explorer {
        uint256 id;
        address payable owner;
        uint256 dateJoined;
        string name;
        string bio;
        string country;
        string avatar;
        string twitter;
        string github;
    }

    struct Project {
        uint256 projectId;
        uint256 explorerId;
        address payable owner;
        string image;
        string title;
        string github_link;
        string demo;
        string website;
        uint256 target_amount;
        string description;
        string category;
        uint256 amountReceived;
        address[] sponsors; // Array to store sponsor addresses
    }

    mapping(uint256 => Explorer) explorers;
    mapping(uint256 => Project) projects;
    mapping(address => bool) public isRegistered;

    function createExplorer(
        string memory _name,
        string memory _bio,
        string memory _country,
        string memory _avatar,
        string memory _twitter,
        string memory _github
    ) public {
        explorersCount.increment();
        uint256 explorerId = explorersCount.current();
        isRegistered[msg.sender] = true;
        explorers[explorerId] = Explorer(
            explorerId,
            payable(msg.sender),
            block.timestamp,
            _name,
            _bio,
            _country,
            _avatar,
            _twitter,
            _github
        );
    }

    function createProject(
        string memory _image,
        string memory _title,
        string memory _github_link,
        string memory _demo,
        string memory _website,
        uint256 _target_amount,
        string memory _description,
        string memory _category,
        uint256 _explorerId
    ) public {
        projectCount.increment();
        uint256 projectId = projectCount.current();
        projects[projectId] = Project(
            projectId,
            _explorerId,
            payable(msg.sender),
            _image,
            _title,
            _github_link,
            _demo,
            _website,
            _target_amount,
            _description,
            _category,
            0,
            new address[](0) // Initialize empty sponsors array
        );
    }

    function addSponsor(
        uint256 _id
    ) public payable {
        require(_id > 0 && _id <= projectCount.current());
        Project storage project = projects[_id];
        project.owner.transfer(msg.value);
        project.amountReceived = project.amountReceived.add(msg.value);
        project.sponsors.push(msg.sender); // Add sponsor address to the project's sponsors array
    }

    function getExplorers() public view returns (Explorer[] memory) {
        Explorer[] memory _explorers = new Explorer[](explorersCount.current());
        for (uint256 i = 1; i <= explorersCount.current(); i++) {
            _explorers[i - 1] = explorers[i];
        }
        return _explorers;
    }

    function getProjects() public view returns (Project[] memory) {
        Project[] memory _projects = new Project[](projectCount.current());
        for (uint256 i = 1; i <= projectCount.current(); i++) {
            _projects[i - 1] = projects[i];
        }
        return _projects;
    }
    function getUser(uint256 _id) public view returns (Explorer memory) {
        return explorers[_id];
    }

    function getProject(uint256 _id) public view returns (Project memory) {
        return projects[_id];
    }

    function isRegisteredFunc() public view returns (bool) {
        return isRegistered[msg.sender];
    }
}

pragma solidity ^0.5.0;

import "../../3rdparty/openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "../../3rdparty/openzeppelin-solidity/contracts/crowdsale/distribution/RefundableCrowdsale.sol";
import "../../3rdparty/openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "../../3rdparty/openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "../../3rdparty/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "./Allocation.sol";
/**
 * @title SampleCrowdsaleToken
 * @dev Very simple ERC20 Token that can be minted.
 * It is meant to be used in a crowdsale contract.
 */
contract SampleCrowdsaleToken is ERC20Mintable, ERC20Detailed {
    constructor () public ERC20Detailed("Sample Crowdsale Token", "SCT", 18) {
        // solhint-disable-previous-line no-empty-blocks
    }
}

/**
 * @title SampleCrowdsale
 * @dev This is an example of a fully fledged crowdsale.
 * The way to add new features to a base crowdsale is by multiple inheritance.
 * In this example we are providing following extensions:
 * CappedCrowdsale - sets a max boundary for raised funds
 * RefundableCrowdsale - set a min goal to be reached and returns funds if it's not met
 * MintedCrowdsale - assumes the token can be minted by the crowdsale, which does so
 * when receiving purchases.
 *
 * After adding multiple features it's good practice to run integration tests
 * to ensure that subcontracts works together as intended.
 */
contract MintableSale is Allocation, CappedCrowdsale, MintedCrowdsale {
    constructor (
        uint256 rate,
        address payable wallet,
        uint256 cap,
        ERC20Mintable token
    )
        public
        Allocation(rate, wallet, token)
        CappedCrowdsale(cap)
    {

    }
}
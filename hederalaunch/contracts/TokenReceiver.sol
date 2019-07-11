pragma solidity ^0.5.0;

contract TokenReceiver{
    mapping (address=>uint256) _balance;

    function balanceOf(address account) public view returns (uint256){
        return _balance[account];
    }

    function tokenFallback( address from, uint256 value ) public returns(bool){
        _balance[from] = _balance[from] + value;
        return true;
    }
}
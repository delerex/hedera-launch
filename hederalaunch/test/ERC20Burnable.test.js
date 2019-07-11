const TOKEN = "TokenMintable"
const INITIAL_SUPPLY = 1000000; 

const { BN } = require('openzeppelin-test-helpers');

const { shouldBehaveLikeERC20Burnable } = require('./behaviors/ERC20Burnable.behavior');
const ERC20BurnableMock = artifacts.require(TOKEN);

contract(TOKEN, function ([ owner, ...otherAccounts]) {
  const initialBalance = new BN(10).pow(new BN(18)).mul(new BN(INITIAL_SUPPLY) );

  beforeEach(async function () {
    this.token = await ERC20BurnableMock.new( { from: owner });
  });

  shouldBehaveLikeERC20Burnable(owner, initialBalance, otherAccounts);
});

const TOKEN = "TokenMintable";

const { BN } = require('openzeppelin-test-helpers');

const ERC20DetailedMock = artifacts.require(TOKEN);

contract(TOKEN, function () {
  const _name = 'Hedera Mintable Token';
  const _symbol = 'TKNA';
  const _decimals = new BN(18);

  it('getting deployed instance', async function () {
    this.detailedERC20 = await ERC20DetailedMock.deployed();
  });

  it('has a name', async function () {
    (await this.detailedERC20.name()).should.be.equal(_name);
  });

  it('has a symbol', async function () {
    (await this.detailedERC20.symbol()).should.be.equal(_symbol);
  });

  it('has an amount of decimals', async function () {
    (await this.detailedERC20.decimals()).should.be.bignumber.equal(_decimals);
  });
});

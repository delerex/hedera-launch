const TOKEN  = "TokenMintable";
const TOKENSALE  = "MintableSale";
const RATE = 10;
const PURCHASE = 1;

const ERC20MintableMock = artifacts.require(TOKEN);
const TokenSaleMintableMock = artifacts.require(TOKENSALE);
const { BN, constants, expectEvent, expectRevert } = require('openzeppelin-test-helpers');

const CAP = new BN(10).pow(new BN(18)).mul(new BN(100000));
const GOAL = new BN(10).pow(new BN(18)).mul(new BN(80000));

contract(TOKENSALE, function ([ minter, buyer, ...otherAccounts]) {
  beforeEach(async function () {
    this.token = await ERC20MintableMock.new({ from: minter });
    this.tokensale = await TokenSaleMintableMock.new(RATE, minter, CAP, this.token.address, { from: minter });
  });

  describe('Setting up crowdsale', function () {

    beforeEach(async function () {
        this.token_contract = this.token;
        await this.token_contract.addMinter(this.tokensale.address, {from: minter})
    });
    
    it("Purchase", async function(){
        const amount = new BN(10).pow(new BN(18)).mul(new BN(PURCHASE));
        const minter_balance = new BN(await web3.eth.getBalance(minter));
        this.tokensale.sendTransaction({from:buyer, value : amount });
        (await this.token.balanceOf(buyer)).should.be.bignumber.equal( amount.mul(new BN(RATE)));
        (new BN(await web3.eth.getBalance(minter))).should.be.bignumber.equal( amount.add(minter_balance));
    });


  });



});
const TOKEN = 'TokenMintable';
const INITIAL_SUPPLY = 1000000;
const MINT_LIMIT = 2000000;
const MINT_AMOUNT = 100000;

const { shouldBehaveLikeERC20Mintable } = require('./behaviors/ERC20Mintable.behavior');
const ERC20MintableMock = artifacts.require(TOKEN);
const TokenReceiverMock = artifacts.require('TokenReceiver');
const { shouldBehaveLikePublicRole } = require('./behaviors/access/roles/PublicRole.behavior');
const { BN, constants, expectEvent, expectRevert } = require('openzeppelin-test-helpers');

contract(TOKEN, function ([ minter, otherMinter, ...otherAccounts]) {
  beforeEach(async function () {
    this.token = await ERC20MintableMock.new({ from: minter });
    this.token_receiver = await TokenReceiverMock.new({ from: minter });
  });

  describe(TOKEN + ' mint limit', function () {
    beforeEach(async function () {
      this.contract = this.token;
    });

    it("Mint more than a limit", async function(){
      const amount= new BN(10).pow(new BN(18)).mul(new BN(MINT_LIMIT-INITIAL_SUPPLY+1)); 
      await expectRevert(this.contract.mint(minter, amount, {from:minter}),
            'Mint limit exceeded'
          );
    });
    it("Mint less than the limit", async function(){
      const mintLimit= new BN(10).pow(new BN(18)).mul( new BN(INITIAL_SUPPLY).add(new BN(MINT_AMOUNT))); 
      const amount = new BN(10).pow(new BN(18)).mul( new BN(MINT_AMOUNT)); 
      await this.contract.mint(minter, amount, {from:minter});
      (await this.contract.balanceOf(minter)).should.be.bignumber.equal(mintLimit);
      (await this.contract.totalSupply()).should.be.bignumber.equal(mintLimit);
    });

    it("Mint up to the limit", async function(){
      const mintLimit= new BN(10).pow(new BN(18)).mul( new BN(INITIAL_SUPPLY).add(new BN(MINT_LIMIT-INITIAL_SUPPLY))); 
      const amount = new BN(10).pow(new BN(18)).mul( new BN(MINT_LIMIT-INITIAL_SUPPLY)); 
      await this.contract.mint(minter, amount, {from:minter});
      (await this.contract.balanceOf(minter)).should.be.bignumber.equal(mintLimit);
      (await this.contract.totalSupply()).should.be.bignumber.equal(mintLimit);
    });

  });

  describe(TOKEN + ' bulk transfer', async function () {
    beforeEach(async function () {
      this.contract = this.token;
    });
    it("bulkTransfer", async function(){
      const amounts = [];
      for(let i = 0; i<otherAccounts.length; i++ ){
        amounts.push( new BN(10).pow(new BN(18)).mul( new BN(i)) );
      }

      await this.contract.bulkTransfer(otherAccounts, amounts);

      for(let i = 0; i<otherAccounts.length; i++ ){
        (await this.contract.balanceOf(otherAccounts[i])).should.be.bignumber.equal(amounts[i]);
      }
    });


  });

  describe(TOKEN + ' trusted contract', async function () {
    beforeEach(async function () {
      this.contract = this.token;
      this.contract_receiver = this.token_receiver;
    });

    it("trusted", async function(){
      const amount = new BN(10).pow(new BN(18)).mul( new BN(100));
      await this.contract.setTrustedAddress(this.contract_receiver.address, true);
      await this.contract.transfer(this.contract_receiver.address, amount);
      (await this.contract_receiver.balanceOf(minter)).should.be.bignumber.equal(amount)
    });


  });

});

# Hedera Hashgraph Launchpad smart contracts

## Idea

Crowdsale and token smart contracts based on openzeppelin-solidity for Hedera Hashgraph along with light-weighted React/Redux front-end to organize pre-IEO presale campaigns.

## Token options

### Fixed Supply
A predefined number of tokens issued. No further emission is possible. 

This option can be chosen to assure token holders there will be no further emission. 
It is possible to burn surplus when the campaign finishes. 

### Mintable 
Further emission is possible. 

This option is ok if you plan to run a long-term campaign with multiple funding rounds but you do not know the exact schedule and amounts required for running further campaigns. 

### Limited mintable
Emission is possible up to a predefined limit. 

This option is ok when you prefer not to deal with token burn promises, have some amount of tokens presold, and want to run the campaign for the rest amount of tokens. 

### Burnable 
A number of tokens can be burned to decrease overall emission.  

You can add this option if you plan to manage the circulation. The best result can be achieved along with the mint when you can affect the distribution depending on the current market situation.   

## Crowdsale options 

### Delivery

#### Immediate delivery
Tokens are transferred immediately after contribution. 

This option suits best if you want your contributors to receive tokens immediately after contribution. 

#### Post-delivery
Tokens will be delivered according to the allocation when the campaign finishes. 

This option is ok when there's a goal for the campaign and tokens will be or will not be distributed depending on was the goal achieved or not. 

### Emission 

#### Mintable emission 
Tokens are minter according to contributions received. 

This option suits best to mintable limited tokens. Crowdsale smart contract becomes minter.

#### Transfer within limit
Tokens are transferred to crowd sale smart contract the then distributed. 

Best suits fixed supply tokens. Tokens are transferred to the crowd sale smart contract and then distributed according to contributions. 

### Price

#### Fixed price
Tokens are distributed according to the current rate that cannot be changed in the future.  

This option suits best to assure contributors they got an equal price, and there will be no additional discounts for other investors.   

#### Variable price
Token price can be changed in the future. 

This option is ok if you plan to change the token price in future. It is possible to prevent the price from being set lower than the current level. 

#### Contribution-dependant price
Token price depends on contribution amount. 

This option suits best to increase average contribution amount. 

#### Auction
Tokens are distributed among contributors according to their stakes. Best stakes receive tokens first. 

This option is perfect when demand significantly exceeds the supply, and your book is going to be fully closed.

#### Subscription
Tokens are distributed among contributors who offered the best price. Distribution price is calculated to close the book and applies to each contribution. 


This option helps to determine a fair price and distribute tokens among people willing to pay more. Average weighted distribution price can be a good indicator before the token's listing.  



## Smart contract examples


### Limited mintable, burnable token
TokenMintable.sol is limited mintable, burnable token implementation.

### Mintable refundable sale 
MintableRefundableSale/sol is refundable token sale campaign implementation. Sets the period and the goal that must be reached. If the campaign doesn't reach the goal,  contributed amounts can be withdrawn. Owner gets access to tokens only if the goal is reached. 

### Mintable sale
MintableSale.sol is a simple mintable sale, when tokens are distributed immediately to contributors, and funds transferred to contract owner. 



# TESTNET 

## Hedera launch front-end mock

https://hedera.delerex.com


## Hedera TestNet ERC20 deployed smart contract 

0.0.28814

## Java smart contract deployment and interaction scripts 

Look at JAVA folder. 

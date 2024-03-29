const { expectRevert, constants, expectEvent } = require('openzeppelin-test-helpers');
const { ZERO_ADDRESS } = constants;

function capitalize (str) {
  return str.replace(/\b\w/g, l => l.toUpperCase());
}

// Tests that a role complies with the standard role interface, that is:
//  * an onlyRole modifier
//  * an isRole function
//  * an addRole function, accessible to role havers
//  * a renounceRole function
//  * roleAdded and roleRemoved events
// Both the modifier and an additional internal remove function are tested through a mock contract that exposes them.
// This mock contract should be stored in this.contract.
//
// @param authorized an account that has the role
// @param otherAuthorized another account that also has the role
// @param other an account that doesn't have the role, passed inside an array for ergonomics
// @param rolename a string with the name of the role
// @param manager undefined for regular roles, or a manager account for managed roles. In these, only the manager
// account can create and remove new role bearers.
function shouldBehaveLikePublicRole (authorized, otherAuthorized, [other], rolename, manager) {
  rolename = capitalize(rolename);

  describe('should behave like public role', function () {
    beforeEach('check preconditions', async function () {
      (await this.contract[`is${rolename}`](authorized)).should.equal(true);
      (await this.contract[`is${rolename}`](otherAuthorized)).should.equal(true);
      (await this.contract[`is${rolename}`](other)).should.equal(false);
    });

    if (manager === undefined) { // Managed roles are only assigned by the manager, and none are set at construction
      it('emits events during construction', async function () {
        await expectEvent.inConstruction(this.contract, `${rolename}Added`, {
          account: authorized,
        });
      });
    }

    it('reverts when querying roles for the null account', async function () {
      await expectRevert(this.contract[`is${rolename}`](ZERO_ADDRESS),
        'Roles: account is the zero address'
      );
    });


    describe('add', function () {
      const from = manager === undefined ? authorized : manager;

      context(`from ${manager ? 'the manager' : 'a role-haver'} account`, function () {
        it('adds role to a new account', async function () {
          await this.contract[`add${rolename}`](other, { from });
          (await this.contract[`is${rolename}`](other)).should.equal(true);
        });

        it(`emits a ${rolename}Added event`, async function () {
          const { logs } = await this.contract[`add${rolename}`](other, { from });
          expectEvent.inLogs(logs, `${rolename}Added`, { account: other });
        });

        it('reverts when adding role to an already assigned account', async function () {
          await expectRevert(this.contract[`add${rolename}`](authorized, { from }),
            'Roles: account already has role'
          );
        });

        it('reverts when adding role to the null account', async function () {
          await expectRevert(this.contract[`add${rolename}`](ZERO_ADDRESS, { from }),
            'Roles: account is the zero address'
          );
        });
      });
    });

    describe('remove', function () {
      // Non-managed roles have no restrictions on the mocked '_remove' function (exposed via 'remove').
      const from = manager === undefined ? authorized : manager;

      context(`from ${manager ? 'the manager' : 'any'} account`, function () {
        it('removes role from an already assigned account', async function () {
          await this.contract[`remove${rolename}`](authorized, { from });
          (await this.contract[`is${rolename}`](authorized)).should.equal(false);
          (await this.contract[`is${rolename}`](otherAuthorized)).should.equal(true);
        });

        it(`emits a ${rolename}Removed event`, async function () {
          const { logs } = await this.contract[`remove${rolename}`](authorized, { from });
          expectEvent.inLogs(logs, `${rolename}Removed`, { account: authorized });
        });

        it('reverts when removing from an unassigned account', async function () {
          await expectRevert(this.contract[`remove${rolename}`](other, { from }),
            'Roles: account does not have role'
          );
        });

        it('reverts when removing role from the null account', async function () {
          await expectRevert(this.contract[`remove${rolename}`](ZERO_ADDRESS, { from }),
            'Roles: account is the zero address'
          );
        });
      });
    });

    describe('renouncing roles', function () {
      it('renounces an assigned role', async function () {
        await this.contract[`renounce${rolename}`]({ from: authorized });
        (await this.contract[`is${rolename}`](authorized)).should.equal(false);
      });

      it(`emits a ${rolename}Removed event`, async function () {
        const { logs } = await this.contract[`renounce${rolename}`]({ from: authorized });
        expectEvent.inLogs(logs, `${rolename}Removed`, { account: authorized });
      });

      it('reverts when renouncing unassigned role', async function () {
        await expectRevert(this.contract[`renounce${rolename}`]({ from: other }),
          'Roles: account does not have role'
        );
      });
    });
  });
}

module.exports = {
  shouldBehaveLikePublicRole,
};

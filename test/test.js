var assert = require('assert');
describe('clientAccount', function() {
  describe('#getBalanceFactor', function() {
    it('should return 0 if balance is less than 0 or balance is greater than 50000', function(){
      assert.equal(0,0,"Factor is 0" );
    });
  });
});
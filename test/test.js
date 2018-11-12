  /*var assert = require('chai').assert;
  describe('clientAccount', function() {
    describe('#getBalanceFactor', function() {
      it('should return 0 if balance is less than 0 or balance is greater than 50000', function(){
        assert.equal(0,0,"Factor is 0" );
      });
    });
  });
  */
  var assert=require('assert');
  var fn= require('./../purchaseOrder.js');
  var sinon=require('sinon');
  var inventory=[];
  var inventoryThreshold;
  describe ("Robust-Strong Equivalence classes testing suite", function () {
  var sandboxFactor;
  var clientAccount={age:0, balance:0,creditScore:0};
 
  //={"restricted","default"};
  before(function (){ 
 inventory=[ // Courses Arrays
 [{name:"Fridge",productQuantity:1},{name:"Cellphone",productQuantity:2},
 {name:"Car",productQuantity:5}],
 [{name:"Truck",productQuantty:4},{name:"Table",productQuantity:7},
 {name:"Chair",productQuantity:100}],
 [{name:"Lamp",productQuantity:20}],
 
 ];
  //  sandboxFactor=sinon.createSandbox();
  // // sandboxFactor.stub(fn,"AccountStatus");
  // sandboxFactor.stub(fn,"getBalanceFactor");
  // sandboxFactor.stub(fn,"getAgeFactor");
  });
  after(function () { 
    //sandboxFactor.restore(); 
   });
   /*
   getAgeFactor function equivalence class testing
   */
  it.only("Age factor:GF: F1", function () { 
  clientAccount.age=4;
   assert.equal(fn.getAgeFactor(clientAccount),0);
  });
  it.only("GF: F2", function () { 
  clientAccount.age=6;
   assert.equal(fn.getAgeFactor(clientAccount),5);
  });
  it.only("GF: F3", function () { 
  clientAccount.age=15;
   assert.equal(fn.getAgeFactor(clientAccount),10);
  });
  it.only("GF: F4", function () { 
  clientAccount.age=19;
   assert.equal(fn.getAgeFactor(clientAccount),20);
  });
  it.only("GF: F5", function () { 
  clientAccount.age=40;
   assert.equal(fn.getAgeFactor(clientAccount),50);
  });
  it.only("GF: F6", function () { 
  clientAccount.age=80;
   assert.equal(fn.getAgeFactor(clientAccount),20);
  });
  it.only("GF: F7", function () { 
  clientAccount.age=140;
   assert.equal(fn.getAgeFactor(clientAccount),0);
  });
  /*
  BalanceFactor equivalence class testing
  */
  it.only("BalanceFactor: BF: F8", function () { 
  clientAccount.balance=0;
  assert.equal(fn.getBalanceFactor(clientAccount),0);
  });
   it.only("BF: F9", function () { 
  clientAccount.balance=-1;
  assert.equal(fn.getBalanceFactor(clientAccount),0);
  });
   it.only("BF: F10", function () { 
  clientAccount.balance=60000;
  assert.equal(fn.getBalanceFactor(clientAccount),0);
  });
   it.only("BF: F11", function () { 
  clientAccount.balance=50;
  assert.equal(fn.getBalanceFactor(clientAccount),6);
  });
   it.only("BF: F12", function () { 
  clientAccount.balance=120;
  assert.equal(fn.getBalanceFactor(clientAccount),16);
  });
   it.only("BF: F13", function () { 
  clientAccount.balance=2000;
  assert.equal(fn.getBalanceFactor(clientAccount),30);
  });
   it.only("BF: F14", function () { 
  clientAccount.balance=20000;
  assert.equal(fn.getBalanceFactor(clientAccount),70);
  });
   it.only("BF: F15", function () { 
  clientAccount.balance=40000;
  assert.equal(fn.getBalanceFactor(clientAccount),200);
  });
  /*
  CreditStatus function testing
  */
   it.only("CreditStatus: CS: F1", function () { 
  clientAccount.creditScore=50
  //creditCheckMode="strict";
  assert.equal(fn.creditStatus(clientAccount,"strict"),"good");
  });
  it.only("CS: F2", function () { 
  clientAccount.creditScore=-1
  //creditCheckMode="strict";
  assert.equal(fn.creditStatus(clientAccount,""),"invalid");
  });
  //problems in F3 and F4
  it.only("CS: F3", function () { 
  clientAccount.creditScore=25
  assert.equal(fn.creditStatus(clientAccount,"strict"),"bad");
  });
  //causing errors if creditscore is less than the scorethreshold
  it.only("CS: F4", function () { 
  clientAccount.creditScore=30
  assert.equal(fn.creditStatus(clientAccount,"default"),"bad");
  });
   it.only("CS: F5", function () { 
  clientAccount.creditScore=100
  assert.equal(fn.creditStatus(clientAccount,"default"),"good");
  });
    it.only("CS: F6", function () { 
  clientAccount.creditScore=101
  assert.equal(fn.creditStatus(clientAccount,"default"),"invalid");
  });
  //product status
  //when is it invalid?
  //do I need to check the range for the array?
   it.only("PS: F1", function () { 
  inventoryThreshold=50;
  assert.equal(fn.productStatus("Fridge",[{name:"Fridge",productQuantity:100}],inventoryThreshold),"available");
  });
   it.only("PS: F2", function () { 
  inventoryThreshold=100;
  assert.equal(fn.productStatus("Table",[{name:"Table",productQuantity:50}],inventoryThreshold),"limited");
  });
   it.only("PS: F3", function () { 
   inventoryThreshold=0;
   assert.equal(fn.productStatus("Car",[{name:"Car",productQuantity:0}],inventoryThreshold),"soldout");
   });
    it.only("PS: F4", function () { 
   inventoryThreshold=0;
   assert.equal(fn.productStatus("Table",[{name:"Fan",productQuantity:0}],inventoryThreshold),"invalid");
   });
     it.only("PS: F5", function () { 
   inventoryThreshold=100;
   assert.equal(fn.productStatus("Table",[{name:"Table",productQuantity:10001}],inventoryThreshold),"invalid");
   });
     it.only("PS: F6", function () { 
   inventoryThreshold=-1;
   assert.equal(fn.productStatus("Table",[{name:"Table",productQuantity:1000}],inventoryThreshold),"invalid");
   });

  it.only("AccountStatus: AS1: F1", function () { 
  var AGE=4;
  var BALANCE=-1;
   //var result=fn.AccountStatus(fn.getAgeFactor*fn.getBalanceFactor);
    assert.equal(fn.AccountStatus({age:AGE,balance:BALANCE}),"invalid");
    });
    it.only("AS:F2", function () { 
  var AGE=19;
    var BALANCE=90;
   assert.equal(fn.AccountStatus({age:AGE,balance:BALANCE}),"fair");
    });
      it.only("AS:F3", function () { 
  var AGE=44;
  var BALANCE=340;
  assert.equal(fn.AccountStatus({age:AGE,balance:BALANCE}),"good");
    });
      it.only("AS:F4", function () { 
  var AGE=6;
  var BALANCE=99;
  assert.equal(fn.AccountStatus({age:AGE,balance:BALANCE}),"poor");
    });
        it.only("AS:F5", function () { 
  var AGE=40;
  var BALANCE=15000;
  assert.equal(fn.AccountStatus({age:AGE,balance:BALANCE}),"very good");
   });
         it.only("AS:F6", function () { 
  var AGE=121;
  var BALANCE=70000;
  assert.equal(fn.AccountStatus({age:AGE,balance:BALANCE}),"invalid");
   });
   it.only("OrderHandling: F1",function() {
       var AGE=40;
       var BALANCE=15000
       var CREDITSCORE=100;
       var clientAccount2={age:AGE,balance:BALANCE,creditScore:CREDITSCORE}
       
       assert.equal(fn.orderHandling(clientAccount2,"TABLE",["TABLE",1000],1000,"strict"),"accepted");
   });
    it.only("OrderHandling: F2",function() {
       var AGE=-1;
       var BALANCE=50000
       var CREDITSCORE=10001;
       var clientAccount2={age:AGE,balance:BALANCE,creditScore:CREDITSCORE}
       assert.equal(fn.orderHandling(clientAccount2,"TABLE",inventory,10002,"strict"),"rejected");
   });
   
   it.only("OrderHandling: F3",function() {
      var AGE=19;
       var BALANCE=2000;
       var CREDITSCORE=30;
       var inventory2=[{name:"TABLE",productQuantity:100}];
       var clientAccountTwo={ age:AGE,balance: BALANCE,creditScore:CREDITSCORE};
       //var clientAccount2={age:AGE,balance:BALANCE,creditScore:CREDITSCORE}
       assert.equal(fn.orderHandling(clientAccountTwo,"TABLE",inventory2,50,"strict"),"underReview");
   });
    it.only("OrderHandling: F4",function() {
      var AGE=6;
       var BALANCE=2000;
       var CREDITSCORE=100;
       var inventory2=[{name:"TABLE",productQuantity:0}];
       var clientAccountTwo={ age:AGE,balance: BALANCE,creditScore:CREDITSCORE};
       //var clientAccount2={age:AGE,balance:BALANCE,creditScore:CREDITSCORE}
       assert.equal(fn.orderHandling(clientAccountTwo,"TABLE",inventory2,50,"strict"),"pending");
   });
    it.only("OrderHandling: F5",function() {
      var AGE=19;
       var BALANCE=99;
       var CREDITSCORE=30;
       var inventory2=[{name:"TABLE",productQuantity:100}];
       var clientAccountTwo={ age:AGE,balance: BALANCE,creditScore:CREDITSCORE};
       //var clientAccount2={age:AGE,balance:BALANCE,creditScore:CREDITSCORE}
       assert.equal(fn.orderHandling(clientAccountTwo,"TABLE",inventory2,50,"strict"),"underReview");
   });
}),

 describe("Decision Table Testing Suite for Credit Status", function () {
  var clientAccount={age:0, balance:0,creditScore:0};
  
  //var creditCheckMode="";
  before(function (){ });
  after(function () { });
  it.only("Rule1: CreditScore is is less than 0 then it should return invalid", function () { 
  clientAccount.creditScore=-1;
  assert.equal(fn.creditStatus(clientAccount,""),"invalid");
  });
   it.only("Rule3: CreditScore is less than scorethreshold and if strict, return bad", function () {
    clientAccount.creditScore=25;
    assert.equal(fn.creditStatus(clientAccount,"strict"),"bad");
  });
   it.only("Rule4: CreditScore is less than scorethreshold and if default, return bad", function () {
    clientAccount.creditScore=25;
    assert.equal(fn.creditStatus(clientAccount,"default"),"bad");
  });
  it.only("Rule5: CreditScore is greater than scorethreshold and if strict, return good", function () {
    clientAccount.creditScore=100;
    assert.equal(fn.creditStatus(clientAccount,"strict"),"good");
  });
  it.only("Rule6: CreditScore is greater than scorethreshold and if default, return good", function () {
    clientAccount.creditScore=75;
    assert.equal(fn.creditStatus(clientAccount,"default"),"good");
  });
   it.only("Rule2: CreditScore is out of bounds so  return invalid", function () {
    clientAccount.creditScore=200;
    assert.equal(fn.creditStatus(clientAccount,""),"invalid");
  });
}),
describe("Decision Table Testing Suite for Account Status",function() {
    before(function(){});
     after(function () { });
      it.only("Rule1: Age is less than 5, Balance is less than 0, Account Factor is 0 so Account Status is invalid", function () { 
   var AGE=4;
   var BALANCE=-1;
   var clientAccount={age:AGE, balance:BALANCE};
  assert.equal(fn.AccountStatus(clientAccount),"invalid");
  });
   it.only("Rule9: Account Factor is less than 100 so Account Status is poor", function () { 
   var AGE=6;
   var BALANCE=99;
   var clientAccount={age:AGE, balance:BALANCE};
  assert.equal(fn.AccountStatus(clientAccount),"poor");
  });  
   it.only("Rule11: Account Factor is between 100 and 500 so Account Status is fair", function () { 
   var AGE=20;
   var BALANCE=50;
   var clientAccount={age:AGE, balance:BALANCE};
  assert.equal(fn.AccountStatus(clientAccount),"fair");
  });
   it.only("Rule19: Account Factor is between 500 and 1000 so Account Status is good", function () { 
   var AGE=40;
   var BALANCE=101;
   var clientAccount={age:AGE, balance:BALANCE};
  assert.equal(fn.AccountStatus(clientAccount),"good");
  });
   it.only("Rule26: Account Factor is greater than 1000 so Account Status is very good", function () { 
   var AGE=50;
   var BALANCE=1000;
   var clientAccount={age:AGE, balance:BALANCE};
  assert.equal(fn.AccountStatus(clientAccount),"very good");
  });
   it.only("Rule49: Account Factor is 0 so Account Status is invalid", function () { 
   var AGE=121;
   var BALANCE=50000;
   var clientAccount={age:AGE, balance:BALANCE};
  assert.equal(fn.AccountStatus(clientAccount),"invalid");
  });
}),
describe("Decision table testing suite for productStatus",function() {
   var inventoryArray=[];
    before(function(){ 
  inventoryArray=[ 
 [{name:"Fridge",productQuantity:1},{name:"Cellphone",productQuantity:2},
 {name:"Car",productQuantity:200}],
 [{name:"Truck",productQuantty:4},{name:"Table",productQuantity:7},
 {name:"Chair",productQuantity:100}],
 [{name:"Lamp",productQuantity:20}],
 
 ];});
     after(function () { });
  it.only("Rule5: product Status is limited when productQuantity is less than inventorythreshold", function () { 
  inventoryThreshold=50;
  assert.equal(fn.productStatus("Car",[{name:"Car",productQuantity:20}],inventoryThreshold),"limited");
  });
   it.only("Rule7: product Status is available when productQuantity is greater than inventorythreshold", function () { 
  inventoryThreshold=50;
  assert.equal(fn.productStatus("Car",[{name:"Car",productQuantity:200}],inventoryThreshold),"available");
  });
   it.only("Rule1: product Status is soldout when productQuantity is 0", function () { 
  inventoryThreshold=50;
  assert.equal(fn.productStatus("Car",[{name:"Car",productQuantity:0}],inventoryThreshold),"soldout");
  });
   it.only("Rule9: product Status is available when productQuantity is equal to inventoryThreshold", function () { 
  inventoryThreshold=50;
  assert.equal(fn.productStatus("Car",[{name:"Car",productQuantity:50}],inventoryThreshold),"available");
  });
   it.only("Rule2: product Status is invalid when name of the product is not found in  inventory ", function () { 
  inventoryThreshold=150;
  assert.equal(fn.productStatus("Fan",[{name:"Car",productQuantity:50}],inventoryThreshold),"invalid");
  });
   it.only("Rule4: product Status is invalid when productQuantity and inventoryThreshold are out of bounds ", function () { 
  inventoryThreshold=2000;
  assert.equal(fn.productStatus("Fan",[{name:"Car",productQuantity:2000}],inventoryThreshold),"invalid");
  });
}),
describe("Decision table testing for OrderHandling", function() {
   var inventoryArray=[];
    before(function(){ 
  inventoryArray=[ 
 [{name:"Fridge",productQuantity:1},{name:"Cellphone",productQuantity:2},
 {name:"Car",productQuantity:200}],
 [{name:"Truck",productQuantty:4},
 {name:"Table",productQuantity:500},
 {name:"Chair",productQuantity:100}],
 [{name:"Lamp",productQuantity:20}],]});
    after(function(){});
     it.only("Rule27: Account Status is fair, good creditStatus and productStatus is available so return accepted",function() {
       var AGE=19;
       var BALANCE=101
       var CREDITSCORE=100;
       var clientAccount2={age:AGE,balance:BALANCE,creditScore:CREDITSCORE}
      var inventory2=[{name:"Table",productQuantity:200}]; 
       assert.equal(fn.orderHandling(clientAccount2,"Table",inventory2,200,"strict"),"accepted");
   });
    it.only("Rule43: Account Status is very good, good creditStatus and productStatus is soldout so return accepted",function() {
       var AGE=90;
       var BALANCE=15000
       var CREDITSCORE=100;
       var clientAccount2={age:AGE,balance:BALANCE,creditScore:CREDITSCORE}
      var inventory2=[{name:"Table",productQuantity:0}]; 
       assert.equal(fn.orderHandling(clientAccount2,"Table",inventory2,200,"strict"),"accepted");
   });
    it.only("Rule46: Invalid Account Status, Invalid creditstatus and invalid productStatus , return rejected",function() {
       var AGE=-1;
       var BALANCE=50000
       var CREDITSCORE=10001;
       var clientAccount2={age:AGE,balance:BALANCE,creditScore:CREDITSCORE}
       assert.equal(fn.orderHandling(clientAccount2,"TABLE",inventoryArray,10002,"strict"),"rejected");
   });
   
   it.only("Rule33: Good accountStatus, available productStatus, bad creditStatus, return underReview",function() {
      var AGE=19;
       var BALANCE=2000;
       var CREDITSCORE=25;
       var inventory2=[{name:"TABLE",productQuantity:100}];
       var clientAccountTwo={ age:AGE,balance: BALANCE,creditScore:CREDITSCORE};
       //var clientAccount2={age:AGE,balance:BALANCE,creditScore:CREDITSCORE}
       assert.equal(fn.orderHandling(clientAccountTwo,"TABLE",inventory2,50,"strict"),"underReview");
   });
    it.only("Rule25: fair accountStatus, good creditStatus, soldout productStatus, return pending OrderHandling",function() {
      var AGE=6;
       var BALANCE=2000;
       var CREDITSCORE=100;
       var inventory2=[{name:"TABLE",productQuantity:200}];
       var clientAccountTwo={ age:AGE,balance: BALANCE,creditScore:CREDITSCORE};
       //var clientAccount2={age:AGE,balance:BALANCE,creditScore:CREDITSCORE}
       assert.equal(fn.orderHandling(clientAccountTwo,"TABLE",inventory2,500,"strict"),"pending");
   });
   it.only("Rule26: fair accountStatus, good creditStatus, soldout productStatus, return pending OrderHandling",function() {
      var AGE=6;
       var BALANCE=2000;
       var CREDITSCORE=100;
       var inventory2=[{name:"TABLE",productQuantity:0}];
       var clientAccountTwo={ age:AGE,balance: BALANCE,creditScore:CREDITSCORE};
       //var clientAccount2={age:AGE,balance:BALANCE,creditScore:CREDITSCORE}
       assert.equal(fn.orderHandling(clientAccountTwo,"TABLE",inventory2,50,"strict"),"pending");
   });
    it.only("Rule 24: Fair accountStatus, bad creditStatus, productStatus limited , return underReview OrderHandling",function() {
      var AGE=19;
       var BALANCE=99;
       var CREDITSCORE=30;
       var inventory2=[{name:"TABLE",productQuantity:100}];
       var clientAccountTwo={ age:AGE,balance: BALANCE,creditScore:CREDITSCORE};
       //var clientAccount2={age:AGE,balance:BALANCE,creditScore:CREDITSCORE}
       assert.equal(fn.orderHandling(clientAccountTwo,"TABLE",inventory2,50,"strict"),"underReview");
   });
   it.only("Rule 31: good accountStatus, bad creditStatus, productStatus soldout , return underReview OrderHandling",function() {
      var AGE=19;
       var BALANCE=2000;
       var CREDITSCORE=30;
       var inventory2=[{name:"TABLE",productQuantity:0}];
       var clientAccountTwo={ age:AGE,balance: BALANCE,creditScore:CREDITSCORE};
       //var clientAccount2={age:AGE,balance:BALANCE,creditScore:CREDITSCORE}
       assert.equal(fn.orderHandling(clientAccountTwo,"TABLE",inventory2,50,"strict"),"underReview");
   });
      it.only("Rule 32: good accountStatus, bad creditStatus, productStatus limited , return underReview OrderHandling",function() {
      var AGE=19;
       var BALANCE=2000;
       var CREDITSCORE=30;
       var inventory2=[{name:"TABLE",productQuantity:300}];
       var clientAccountTwo={ age:AGE,balance: BALANCE,creditScore:CREDITSCORE};
       //var clientAccount2={age:AGE,balance:BALANCE,creditScore:CREDITSCORE}
       assert.equal(fn.orderHandling(clientAccountTwo,"TABLE",inventory2,500,"strict"),"underReview");
   });
   it.only("Rule15: poor Account Status, good creditstatus and available productStatus , return rejected",function() {
       var AGE=6;
       var BALANCE=101
       var CREDITSCORE=25;
       var clientAccount2={age:AGE,balance:BALANCE,creditScore:CREDITSCORE}
       var inventory2=[{name:"TABLE",productQuantity:300}];
       assert.equal(fn.orderHandling(clientAccount2,"TABLE",inventoryArray,100,"strict"),"rejected");
   });
   it.only("Rule35: good Account Status, good creditstatus and limited productStatus , return accepted",function() {
       var AGE=40;
       var BALANCE=101
       var CREDITSCORE=100;
       var clientAccount2={age:AGE,balance:BALANCE,creditScore:CREDITSCORE}
       var inventory2=[{name:"TABLE",productQuantity:100}];
       assert.equal(fn.orderHandling(clientAccount2,"TABLE",inventoryArray,300,"strict"),"accepted");
   });
}),
describe("Boundary Value Analysis suite for getAgeFactor, get BalanceFactor and AccountStatus",function() {
 
 var clientAccount={age:0,balance:0,creditScore:0};
 before(function(){});
 after(function(){});
 
 it.only("Age factor:GF: F1", function () { 
  clientAccount.age=4;
   assert.equal(fn.getAgeFactor(clientAccount),0);
  });
  it.only("GF: F2", function () { 
  clientAccount.age=5;
   assert.equal(fn.getAgeFactor(clientAccount),5);
  });
  it.only("GF: F3", function () { 
  clientAccount.age=6;
   assert.equal(fn.getAgeFactor(clientAccount),5);
  });
  it.only("GF: F4", function () { 
  clientAccount.age=9;
   assert.equal(fn.getAgeFactor(clientAccount),5);
  });
  it.only("GF: F5", function () { 
  clientAccount.age=10;
   assert.equal(fn.getAgeFactor(clientAccount),10);
  });
  it.only("GF: F6", function () { 
  clientAccount.age=11;
   assert.equal(fn.getAgeFactor(clientAccount),10);
  });
  it.only("GF: F7", function () { 
  clientAccount.age=17;
   assert.equal(fn.getAgeFactor(clientAccount),10);
  });   
  it.only("GF: F8", function () { 
  clientAccount.age=18;
   assert.equal(fn.getAgeFactor(clientAccount),20);
  });  
  it.only("GF: F9", function () { 
  clientAccount.age=19;
   assert.equal(fn.getAgeFactor(clientAccount),20);
  });  
   it.only("GF: F10", function () { 
  clientAccount.age=29;
   assert.equal(fn.getAgeFactor(clientAccount),20);
  });
   it.only("GF: F11", function () { 
  clientAccount.age=30;
   assert.equal(fn.getAgeFactor(clientAccount),50);
  }); 
  it.only("GF: F12", function () { 
  clientAccount.age=31;
   assert.equal(fn.getAgeFactor(clientAccount),50);
  });
  it.only("GF: F13", function () { 
  clientAccount.age=69;
   assert.equal(fn.getAgeFactor(clientAccount),50);
  });
   it.only("GF: F14", function () { 
  clientAccount.age=70;
   assert.equal(fn.getAgeFactor(clientAccount),20);
  });
   it.only("GF: F15", function () { 
  clientAccount.age=71;
   assert.equal(fn.getAgeFactor(clientAccount),20);
  });
   it.only("GF: F16", function () { 
  clientAccount.age=119;
   assert.equal(fn.getAgeFactor(clientAccount),20);
  });
   it.only("GF: F17", function () { 
  clientAccount.age=120;
   assert.equal(fn.getAgeFactor(clientAccount),0);
  });
   it.only("GF: F18", function () { 
  clientAccount.age=121;
   assert.equal(fn.getAgeFactor(clientAccount),0);
  });
   it.only("Boundary Value Analysis for BalanceFactor: F1", function () { 
  clientAccount.balance=-1;
   assert.equal(fn.getBalanceFactor(clientAccount),0);
  });
   it.only("BF: F2", function () { 
  clientAccount.balance=99;
   assert.equal(fn.getBalanceFactor(clientAccount),6);
  });
   it.only("BF: F3", function () { 
  clientAccount.balance=100;
   assert.equal(fn.getBalanceFactor(clientAccount),16);
  });
   it.only("BF: F4", function () { 
  clientAccount.balance=101;
   assert.equal(fn.getBalanceFactor(clientAccount),16);
  });
   it.only("BF: F5", function () { 
  clientAccount.balance=100;
   assert.equal(fn.getBalanceFactor(clientAccount),16);
  });
   it.only("BF: F6", function () { 
  clientAccount.balance=999;
   assert.equal(fn.getBalanceFactor(clientAccount),16);
  });
   it.only("BF: F7", function () { 
  clientAccount.balance=1000;
   assert.equal(fn.getBalanceFactor(clientAccount),30);
  });
   it.only("BF: F8", function () { 
  clientAccount.balance=9999;
   assert.equal(fn.getBalanceFactor(clientAccount),30);
  });
  it.only("BF: F9", function () { 
  clientAccount.balance=10001;
   assert.equal(fn.getBalanceFactor(clientAccount),70);
  });
    it.only("BF: F10", function () { 
  clientAccount.balance=29999;
   assert.equal(fn.getBalanceFactor(clientAccount),70);
  });
     it.only("BF: F11", function () { 
  clientAccount.balance=30000;
   assert.equal(fn.getBalanceFactor(clientAccount),200);
  });
    it.only("BF: F12", function () { 
  clientAccount.balance=49999;
   assert.equal(fn.getBalanceFactor(clientAccount),200);
  });
    it.only("BF: F13", function () { 
  clientAccount.balance=50000;
   assert.equal(fn.getBalanceFactor(clientAccount),0);
  });
   it.only("BF: F14", function () { 
  clientAccount.balance=50001;
   assert.equal(fn.getBalanceFactor(clientAccount),0);
  });
  it.only("Boundary Value Analysis forAccount Status: AS1",function() {
      var AGE=121;
      var BALANCE=50001;
      var clientAccount={age:AGE, balance: BALANCE};
      assert.equal(fn.AccountStatus(clientAccount),"invalid");
  });
    it.only("Boundary Value Analysis forAccount Status: AS2",function() {
      var AGE=4;
      var BALANCE=-1;
      var clientAccount={age:AGE, balance: BALANCE};
      assert.equal(fn.AccountStatus(clientAccount),"invalid");
  });
    it.only("Boundary Value Analysis forAccount Status: AS3",function() {
      var AGE=5;
      var BALANCE=100;
      var clientAccount={age:AGE, balance: BALANCE};
      assert.equal(fn.AccountStatus(clientAccount),"poor");
  });
    it.only("Boundary Value Analysis forAccount Status: AS4",function() {
      var AGE=9;
      var BALANCE=999;
      var clientAccount={age:AGE, balance: BALANCE};
      assert.equal(fn.AccountStatus(clientAccount),"poor");
  });
   it.only("Boundary Value Analysis forAccount Status: AS5",function() {
      var AGE=9;
      var BALANCE=9999;
      var clientAccount={age:AGE, balance: BALANCE};
      assert.equal(fn.AccountStatus(clientAccount),"fair");
  });
    it.only("Boundary Value Analysis forAccount Status: AS6",function() {
      var AGE=9;
      var BALANCE=29999;
      var clientAccount={age:AGE, balance: BALANCE};
      assert.equal(fn.AccountStatus(clientAccount),"fair");
  });
   it.only("Boundary Value Analysis forAccount Status: AS7",function() {
      var AGE=17;
      var BALANCE=49999;
      var clientAccount={age:AGE, balance: BALANCE};
      assert.equal(fn.AccountStatus(clientAccount),"very good");
  });
    it.only("Boundary Value Analysis forAccount Status: AS8",function() {
      var AGE=119;
      var BALANCE=49999;
      var clientAccount={age:AGE, balance: BALANCE};
      assert.equal(fn.AccountStatus(clientAccount),"very good");
  });
    it.only("Boundary Value Analysis forAccount Status: AS9",function() {
      var AGE=119;
      var BALANCE=9999;
      var clientAccount={age:AGE, balance: BALANCE};
      assert.equal(fn.AccountStatus(clientAccount),"good");
  });
 }),
 describe("Boundary Value Analysis suite for creditStatus and creditScore",function() {
 
 var clientAccount={age:0,balance:0,creditScore:0};
 before(function(){});
 after(function(){});
  it.only("CS: F1", function () { 
  clientAccount.creditScore=-1;
   assert.equal(fn.creditStatus(clientAccount,""),"invalid");
  });
  it.only("CS: F2", function () { 
  clientAccount.creditScore=0;
   assert.equal(fn.creditStatus(clientAccount,"strict"),"bad");
  });
   it.only("CS: F3", function () { 
  clientAccount.creditScore=0;
   assert.equal(fn.creditStatus(clientAccount,"default"),"bad");
  });
   it.only("CS: F4", function () { 
  clientAccount.creditScore=99;
   assert.equal(fn.creditStatus(clientAccount,"strict"),"good");
  });
    it.only("CS: F5", function () { 
  clientAccount.creditScore=1;
   assert.equal(fn.creditStatus(clientAccount,"default"),"bad");
  });
    it.only("CS: F6", function () { 
  clientAccount.creditScore=101;
   assert.equal(fn.creditStatus(clientAccount,"strict"),"invalid");
  });
}),
 describe("Boundary Value Analysis suite for productStatus, inventory and inventoryThreshold",function() {
 
    var inventoryArray=[];
    before(function(){ 
  inventoryArray=[ 
 [{name:"Fridge",productQuantity:1},{name:"Cellphone",productQuantity:2},
 {name:"Car",productQuantity:200}],
 [{name:"Truck",productQuantty:4},{name:"Table",productQuantity:7},
 {name:"Chair",productQuantity:100}],
 [{name:"Lamp",productQuantity:20}],
 
 ];});
     after(function () { });
  it.only("PS: F1", function () { 
  inventoryThreshold=-1;
  assert.equal(fn.productStatus("Car",[{name:"Car",productQuantity:-1}],inventoryThreshold),"invalid");
  });
  
   it.only("PS F2", function () { 
  inventoryThreshold="";
  assert.equal(fn.productStatus("Car",[{name:"Car",productQuantity:0}],inventoryThreshold),"soldout");
  });
   it.only("PS F3", function () { 
  inventoryThreshold=1;
  assert.equal(fn.productStatus("Car",[{name:"Lamp",productQuantity:1}],inventoryThreshold),"invalid");
  });
     it.only("PS F4", function () { 
  inventoryThreshold=1;
  assert.equal(fn.productStatus("Car",[{name:"Car",productQuantity:1}],inventoryThreshold),"available");
  });
   it.only("PS F5", function () { 
  inventoryThreshold=999;
  assert.equal(fn.productStatus("Car",[{name:"",productQuantity:""}],inventoryThreshold),"invalid");
  });
   it.only("PS F6 ", function () { 
  inventoryThreshold=1001
  assert.equal(fn.productStatus("Truck",[{name:"Truck",productQuantity:1001}],inventoryThreshold),"invalid");
  });
   it.only("PS F7", function () { 
  inventoryThreshold=1000
  assert.equal(fn.productStatus("Truck",[{name:"Truck",productQuantity:999}],inventoryThreshold),"limited");
  });
})


  
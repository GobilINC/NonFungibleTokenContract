//var YourContract = artifacts.require("YourContract");
var NFT = artifacts.require("NFT");
var NFTSeries = artifacts.require("NFTSeries");

contract('NFT', function(accounts) {
  it("get the size of the contract", async () => {
      let instance = await NFT.new();
    
      var bytecode = instance.constructor._json.bytecode;
      var deployed = instance.constructor._json.deployedBytecode;
      var sizeOfB  = bytecode.length / 2;
      var sizeOfD  = deployed.length / 2;
      console.log("size of bytecode in bytes = ", sizeOfB);
      console.log("size of deployed in bytes = ", sizeOfD);
      console.log("initialisation and constructor code in bytes = ", sizeOfB - sizeOfD);
    
  });
});
contract('NFTSeries', function(accounts) {
  it("get the size of the contract", async () => {
      let instance = await NFTSeries.new();
    
      var bytecode = instance.constructor._json.bytecode;
      var deployed = instance.constructor._json.deployedBytecode;
      var sizeOfB  = bytecode.length / 2;
      var sizeOfD  = deployed.length / 2;
      console.log("size of bytecode in bytes = ", sizeOfB);
      console.log("size of deployed in bytes = ", sizeOfD);
      console.log("initialisation and constructor code in bytes = ", sizeOfB - sizeOfD);
    
  });
});
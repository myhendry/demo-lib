const Migrations = artifacts.require("Demo");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};

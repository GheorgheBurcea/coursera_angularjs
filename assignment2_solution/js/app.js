(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

function ShoppingListCheckOffService(){
  var service = this;

  var toBuyList =  [
    {
        name : "Nuclear Missile(s)",
        quantity : 10
    },
    {
        name : "Aircraft carrier(s)",
        quantity : 3
    },
    {
        name : "Aircraft(s)",
        quantity : 30
    },
    {
        name : "Tank(s)",
        quantity : 500
    },
    {
        name : "AK47",
        quantity : 30000
    }
  ];
  var boughtList = [];

  service.getToBuyList = function(){
    return toBuyList;
  };

  service.getBoughtList = function(){
    return boughtList;
  };

  service.buyItem = function(itemName){
    var index = toBuyList.findIndex(function(arrayItem){
      return arrayItem.name === itemName;
    });
    var removedElements = toBuyList.splice(index,1);
    boughtList.push(removedElements[0]);
  };
}

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyCtrl = this;

  toBuyCtrl.toBuyList = ShoppingListCheckOffService.getToBuyList();
  toBuyCtrl.onBuyItem = function(itemName){
    ShoppingListCheckOffService.buyItem(itemName);
  }
};

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
  var boughtCtrl = this;

  boughtCtrl.boughtList = ShoppingListCheckOffService.getBoughtList();
};

})();

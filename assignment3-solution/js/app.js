(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController )
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var controller = this;

  controller.found = new Array();
  controller.narrowDownText = "";

  controller.onNarrowDown = function(){
    if(controller.narrowDownText.trim().length === 0){
      console.log("no text");
      controller.found = new Array();
      return;
    }
    console.log("calling the service");
    var promise = MenuSearchService.getMatchedMenuItems(controller.narrowDownText);
    promise.then(function(menuItems){
        controller.found = menuItems;
    });
  }

  controller.remove = function(index){
    console.log("Removing index: "+index);
    controller.found.splice(index, 1);
  }
}

function FoundItemsDirective(){
  var ddo = {
    restrict: 'E',
    templateUrl: 'foundItems.html',
    scope: {
      foundItems: '<',
      removeItem: '&onRemove'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  }

  return ddo;
}

function FoundItemsDirectiveController(){};

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath){
  var service = this;

  service.getMatchedMenuItems = function(searchTerm){
    return $http({
      method: 'GET',
      url: (ApiBasePath + '/menu_items.json')
    }).then(function success(response){
      var filtered = response.data.menu_items.filter(function (element){
        return element.description.indexOf(searchTerm) !== -1;
      });
      return filtered;
    });
  }
}

})();

(function () {
'use strict';

angular.module('Assignment1', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.foodList = "";
  $scope.number = 0;
  $scope.borderStyle = {};
  $scope.textStyle = {};

$scope.onNewDataEntered = function(){
  computeNumberOfDishes();
  computeStyles();
}

$scope.lunchMessage = function(){
  if($scope.number > 3){
    return "Too Much!";
  }else if($scope.number > 0){
    return "Enjoy!";
  }else{
    return "Please enter data first";
  }
};

 function computeNumberOfDishes(){
   var list = $scope.foodList.split(',');
   $scope.number = computeNumberNonEmptyElems(list);
 };

 function computeStyles(){
   if($scope.number > 0){
     $scope.borderStyle = {"border-color":"green"};
     $scope.textStyle = {"color":"green"};
   }else{
     $scope.borderStyle = {"border-color":"red"};
     $scope.textStyle = {"color":"red"};
   }
 }

function computeNumberNonEmptyElems(arrayOfElements){
    return arrayOfElements.map(function(currValue, index, arr){
      return currValue.trim().length;
    }).filter(function(currValue, index, arr){
      return currValue > 0;
    }).length;
  };
}

})();

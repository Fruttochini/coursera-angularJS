(function (){
    'use strict';
    angular.module('LunchCheck',[])
    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject=['$scope'];

    function LunchCheckController($scope){
        $scope.menuList = '';

        $scope.checkMenu = function(){

        $scope.messageColor="red";
        if (checkString($scope.menuList))
        {
            var items = $scope.menuList.split(',');

            var dishesCount = 0;
            items.forEach( function(element,index,array){
              if (checkString(element))
                  dishesCount++;
              else {
                  return;
                }
            });
            if (dishesCount==0)
            {
                $scope.checkResult = "Please enter your data!";
                return;
            }
            $scope.messageColor="green";
            if (dishesCount <=3)
                $scope.checkResult = "Enjoy!";
            else
                $scope.checkResult = "Too Much!";
        }
            else
                $scope.checkResult = "Please enter your data!";
        }

    //Internal function to Check string emptiness
    var checkString = function(inputString){
      return inputString!==""?true:false;
    }
  };
})();

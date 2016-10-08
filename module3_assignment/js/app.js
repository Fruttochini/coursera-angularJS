(function(){
    angular.module('NarrowDownModule',[])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .constant('menuEndpoint', 'https://davids-restaurant.herokuapp.com/menu_items.json');

    function FoundItemsDirective(){
        var ddo = {
            templateUrl: 'founditems.template.html',
            scope: {
                foundItemsList: '=',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };
        return ddo;
    };

    function FoundItemsDirectiveController(){
        var list = this;
    }


    MenuSearchService.$inject = ['$q','$http','menuEndpoint'];
    function MenuSearchService($q, $http, menuEndpoint){
        var service = this;

        service.getMatchedMenuItems = function (searchTerm)
        {
            var deffered = $q.defer();
            var filteredMenuItems = [];
            $http({
                method: "GET",
                url: menuEndpoint
            })
            .then(function (response){
                for (var i=0;i<response.data.menu_items.length;i++)
                {
                    if (response.data.menu_items[i].description
                        .indexOf(searchTerm)!==-1)
                        filteredMenuItems.push(response.data.menu_items[i]);
                }
                if(filteredMenuItems)
                    deffered.resolve(filteredMenuItems);
                else {
                    deffered.reject();
                }
            });

            return deffered.promise;
        };
    };

    NarrowItDownController.$inject = ['$q','MenuSearchService'];
    function NarrowItDownController($q, MenuSearchService){
        var narrowCtrl = this;

        narrowCtrl.searchString = "";
        narrowCtrl.found =[];
        narrowCtrl.onRemoveBtnClick = function(index){
            console.log(narrowCtrl.found[index]);
                narrowCtrl.found.splice(index,1);
        };
        narrowCtrl.onNarrowBtnClick = function(){
            if (narrowCtrl.searchString.length==0)
                {
                    narrowCtrl.nfMsg="Not Found";
                    return;
                }
            MenuSearchService.getMatchedMenuItems(narrowCtrl.searchString)
            .then(
                function(response){
                    if (response)
                        narrowCtrl.found = response;
                    else {
                        narrowCtrl.nfMsg = "Not Found";
                    }

                }
            );
        };
    };
})();

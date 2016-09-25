(function(){
    "use strict";
    angular.module("ShoppingListApp",[])
    .controller("ToBuyShoppingController",ToBuyShoppingController)
    .controller("AlreadyBoughtShoppingController",AlreadyBoughtShoppingController)
    .service("ShoppingListCheckOffService",ShoppingListCheckOffService);

    ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyShoppingController(ShoppingListCheckOffService){
        var tbsc = this;
        //bind items from service
        tbsc.listOfItemsToBuy = ShoppingListCheckOffService.getToBuyItems();
        //buy item click handler
        tbsc.onBoughtClick = function(itemIndex){
            ShoppingListCheckOffService.clickBoughtBtn(itemIndex);
        };
        //show the List Empty message if true
        tbsc.isListEmpty = function(){
            return tbsc.listOfItemsToBuy.length===0;
        }
    };

    AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtShoppingController(ShoppingListCheckOffService){
        var absc = this;
        //bind bought items list
        absc.listOfItemsBought = ShoppingListCheckOffService.getAlreadyBoughtItems();
        //show the list empty message if true
        absc.isListNotEmpty = function(){
            return absc.listOfItemsBought.length ===0;
        };
    };

    function ShoppingListCheckOffService(){
        var slcoService = this;

        var toBuyArray = [
            new ShoppingListItem("bottle(s) of water",6),
            new ShoppingListItem("pack(s) of salt",2),
            new ShoppingListItem("pack(s) of limes",5),
            new ShoppingListItem("litres of tequila",2),
            new ShoppingListItem("times have a good PARTY!",8),
        ];
        var alreadyBoughtArray = [];

//returns Shopping list
        slcoService.getToBuyItems = function(){
            return toBuyArray;
        };
//returns already bought items list
        slcoService.getAlreadyBoughtItems = function(){
            return alreadyBoughtArray;
        }
//On Item Buy Click handler
        slcoService.clickBoughtBtn = function(itemIndex){
            alreadyBoughtArray.push(
                new ShoppingListItem(toBuyArray[itemIndex].name,
                                    toBuyArray[itemIndex].quantity)
            );
            toBuyArray.splice(itemIndex,1);
        };

    };
//Shopping list Item object description (for convenience)
    function ShoppingListItem(name, quantity){
        this.name = name;
        this.quantity = quantity;
    };

})();

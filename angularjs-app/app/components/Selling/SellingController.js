(function () {
    // Getting the PacLeaseApp module and use chaining with getter syntax
    angular
        .module('SellingModule')
        .controller('SellingController', ['$scope','$state', 'SellingService', SellingController]);

    function SellingController($scope, $state, SellingService) {
        
                //Load all the templates
                $scope.getDetails = function () {
                SellingService.getTemplateDetails().then(function (resp) {
                $scope.templateDetails = resp.data.template_data;
                });
                };

                //Load a specific template details in the payment screen
                $scope.prefillTemplateData = function (dataObj) {
                    $scope.templateObj = null;
                    $scope.templateObj = angular.copy(dataObj);                    
                };

                //Make Payment 
                $scope.MakePayment = function (form) {
                    if (form.$valid) {
                        var cardObj = {
                            CardNumber: $scope.card.number,
                            ExpireyDate: $scope.card.expirey,
                            CVV: $scope.card.cvv
                        };
                        console.log(cardObj);
                        SellingService.MakePayment(cardObj)
                        .success(function (response) {
                            alert('Your payment will be processed soon !!');
                        })
                       .error(function (error) {
                           alert('Unable to proceed with the payment, Please try again later !');
                       });
                    }
                };       
    };
})();

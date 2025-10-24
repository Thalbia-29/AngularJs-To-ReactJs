(function () {
    angular
        .module('SellingModule')
        .config(['$stateProvider', '$urlRouterProvider', SellingRoute]);

    //routing config for Payment page
    function SellingRoute($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('buy.buynow', {
                url: '/BuyNow',
                templateUrl: 'components/Selling/paymentGateway.html',
                controller: 'SellingController',
            });
    }

})();
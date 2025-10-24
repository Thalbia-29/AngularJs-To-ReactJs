(function () {
    angular
        .module('ContactModule')
        .config(['$stateProvider', '$urlRouterProvider', ContactRoute]);


    function ContactRoute($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    }

})();
(function () {
    angular
        .module('AboutModule')
        .config(['$stateProvider', '$urlRouterProvider', AboutRoute]);


    function AboutRoute($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
      
    }

})();
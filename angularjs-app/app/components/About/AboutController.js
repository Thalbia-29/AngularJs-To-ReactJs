(function () {

    // Registering a controller as a named function (instead of anonymous function)
    angular
        .module('AboutModule')
        .controller('AboutController', ['$scope', 'AboutService', AboutController]);

    function AboutController($scope, AboutService) {
       
    };

})();
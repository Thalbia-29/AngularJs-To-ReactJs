(function () {
    angular
        .module('AboutModule')
        .factory('AboutService', ['$http', 'apiurls', AboutService]);

    function AboutService($http, apiurls) {

        var service = {
        };

        return service;
    };

})();
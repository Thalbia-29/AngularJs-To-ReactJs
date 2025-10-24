(function () {
    angular
        .module('TemplateSellingApp')
        .factory('AppService', ['$http', 'apiurls', AppService]);

    function AppService($http, apiurls) {

        var service = {
            SubmitForm: SubmitForm
        };
        return service;

        //Validating the Log-In - HARDCODED AUTHENTICATION
        function SubmitForm(userName, password) {
            // Single hardcoded login credentials for demo purposes
            var validUsername = 'admin';
            var validPassword = 'password';
            
            // Simulate API response with promise
            return {
                success: function(callback) {
                    var isValid = (userName === validUsername && password === validPassword);
                    setTimeout(function() {
                        callback(isValid);
                    }, 500); // Simulate network delay
                    return this;
                },
                error: function(callback) {
                    // No error callback needed for hardcoded auth
                    return this;
                }
            };
            
            /* COMMENTED OUT - ORIGINAL BACKEND CALL
            return $http({
                method: 'GET',
                url: apiurls.apiDomain + apiurls.login + apiurls.loginMethod + apiurls.userName + userName + apiurls.password + password
             });
            */
        };
    };

})();
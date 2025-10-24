(function () {

	// Registering a controller as a named function (instead of anonymous function)
    angular
        .module('TemplateSellingApp')
        .controller('TemplateController', ['$rootScope', '$scope', '$state', 'AppService', TemplateController]);

    function TemplateController($rootScope, $scope, $state, AppService) {
        //Validating the Log-In
        $scope.SubmitForm = function (form) {          
            $rootScope.isLoggedIn = false;
            if(form.$valid){            
                AppService.SubmitForm($scope.user.username, $scope.user.password)
               .success(function (response) {                   
                   $rootScope.isLoggedIn = response;
                   $state.go('buy')
                   console.log('Response from the API is ' +response);                   
                })
               .error(function (error) {
                  alert('Unable to submit your request !');
               });            
            }
        };
        //Perform Log-Out
        $scope.LogOut = function () {
            alert('You are now logged out. Log In again to continue browsing our awesome templates');
            $rootScope.isLoggedIn = false;
        };
    };

})();
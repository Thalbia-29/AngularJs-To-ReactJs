(function () {

    // Registering a controller as a named function (instead of anonymous function)
    angular
        .module('ContactModule')
        .controller('ContactController', ['$scope', 'ContactService', ContactController]);

    function ContactController($scope, ContactService) {
        $scope.ContactUs = function (form) {
            if(form.$valid)
            {
                var msgObj = {
                    Name: $scope.contact.name,
                    Email: $scope.contact.email,
                    Subject: $scope.contact.subject,
                    Message: $scope.contact.message
                };

                console.log(msgObj);

                ContactService.ContactUs(msgObj)
                .success(function (response) {
                    alert('Your request is succesfully submitted. You will hear from us soon !!');
                })
               .error(function (error) {
                   alert('Unable to submit your request !');
               });
            }
        };
    };

})();
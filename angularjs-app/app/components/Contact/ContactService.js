(function () {
    angular
        .module('ContactModule')
        .factory('ContactService', ['$http', 'apiurls', ContactService]);

    function ContactService($http, apiurls) {

        var service = {
            ContactUs: ContactUs
        };

        return service;
        
        //Submit a contact request - MOCKED FOR FRONTEND ONLY
        function ContactUs(msgObj) {
            // Mock successful response for frontend demo
            return {
                success: function(callback) {
                    setTimeout(function() {
                        callback({ message: 'Contact form submitted successfully' });
                    }, 300);
                    return this;
                },
                error: function(callback) {
                    return this;
                }
            };
            
            /* COMMENTED OUT - ORIGINAL BACKEND CALL
            return $http({
                method: 'POST',
                url: apiurls.apiDomain + apiurls.contact,
                data: JSON.stringify(msgObj),
                dataType: "json"
            });
            */
        };
    };

})();
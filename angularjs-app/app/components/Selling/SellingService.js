(function () {   
    angular
        .module('SellingModule')
        .factory('SellingService', ['$http', 'apiurls', SellingService]);

    function SellingService($http, apiurls) {

        var service = {
            getTemplateDetails: getTemplateDetails,
            MakePayment: MakePayment
        };

        return service;

        //Load all the templates
            function getTemplateDetails() {
                var path = "../../../assets/json/template_data.json";
            return $http.get(path);
            };

        //Make Payment - MOCKED FOR FRONTEND ONLY
            function MakePayment(cardObj) {
                // Mock successful payment response for frontend demo
                return {
                    success: function(callback) {
                        setTimeout(function() {
                            callback({ 
                                success: true, 
                                transactionId: 'TXN_' + Math.random().toString(36).substr(2, 9),
                                message: 'Payment processed successfully' 
                            });
                        }, 800); // Simulate payment processing delay
                        return this;
                    },
                    error: function(callback) {
                        return this;
                    }
                };
                
                /* COMMENTED OUT - ORIGINAL BACKEND CALL
                return $http({
                    method: 'POST',
                    url: apiurls.apiDomain + apiurls.payment,
                    data: JSON.stringify(cardObj),
                    dataType: "json"
                });
                */
            };            
    };

})();
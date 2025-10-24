(function () {
    //This file contains all the Web-Api constants - COMMENTED OUT FOR FRONTEND ONLY
    angular
        .module('TemplateSellingApp')
        .constant('apiurls', {
            // All API URLs commented out since we're running frontend only
            apiDomain: 'http://localhost/REST-WebApi/api/', // NOT USED
            contact: 'Contact', // NOT USED
            login: 'LogIn/', // NOT USED
            loginMethod: 'Authenticate', // NOT USED
            userName: '?userName=', // NOT USED
            password: '&password=', // NOT USED
            payment: 'Payment' // NOT USED
        })
        
        /* COMMENTED OUT - ORIGINAL API CONSTANTS
        .constant('apiurls', {
            apiDomain: 'http://localhost/REST-WebApi/api/',
            contact: 'Contact',
            login: 'LogIn/',
            loginMethod: 'Authenticate',
            userName: '?userName=',
            password: '&password=',
            payment: 'Payment'
        })
        */
        .constant('constants', {

        });

})();
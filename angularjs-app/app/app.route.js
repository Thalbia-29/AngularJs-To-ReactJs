/// <reference path="components/Contact/contact.html" />
(function () {
//Using ui-router instead of ngRouter
    angular
        .module('TemplateSellingApp')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', TemplateSellingRoute]);

    function TemplateSellingRoute($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');        
        $stateProvider
            //Routing config for "Log-In" state
            .state('login', {
                url: '/LogIn',             
                templateUrl: 'components/LogIn/logIn.html',
                controller: 'TemplateController'           
            })
           //Routing config for "Browse Products" state along with a log in restriction
            .state('buy', {
                url: '/Buy',
                templateUrl: 'components/Selling/displayTemplate-All.html',
                controller: 'SellingController',
                resolve: {
                    security: function ($rootScope, $state) {
                        if (!$rootScope.isLoggedIn) {
                            alert('Kindly log in to browse our awesome templates');
                            $state.go('login');
                        }
                    }
                }
            })
            //Routing config for "Contact Us" state along with a log in restriction
            .state('contact', {
                url: '/Contact',
                templateUrl: 'components/Contact/contact.html',
                controller: 'ContactController',
                resolve: {
                    security: function ($rootScope, $state) {
                        if (!$rootScope.isLoggedIn) {
                            alert('Kindly log in to submit your contact request');
                            $state.go('login');
                        }
                    }
                }
            })
            //Routing config for "About Team" state along with a log in restriction
            .state('about', {
                url: '/About',
                templateUrl: 'components/About/about.html',
                controller: 'AboutController',
                resolve: {
                    security: function ($rootScope, $state) {
                        if (!$rootScope.isLoggedIn) {
                            alert('Kindly log in to find out more about us');
                            $state.go('login');
                        }
                    }
                }
            });
    }
})();
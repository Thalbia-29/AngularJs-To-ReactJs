//Code to make the LogIn state as the default state
var app = angular.module('TemplateSellingApp')
.run(['$state', function ($state) {
    $state.transitionTo('login');
}])

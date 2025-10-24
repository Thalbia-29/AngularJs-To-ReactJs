//Custom Directive for Products
(function () {
    var myapp = angular.module('SellingModule');
    myapp.directive('templateInfo', function () {
        var directive = {};
        directive.restrict = 'AE';
        directive.scope = { data: '=' };
        directive.templateUrl = 'components/Selling/sellingTemplate.html';
        return directive;
    });
})();
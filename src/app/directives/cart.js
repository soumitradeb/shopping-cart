import myModule from '../app.module.js';

export default myModule.directive('scCart', function(){
  let directive = {};
  directive.controller = 'appController';
  directive.restrict = 'E';
  directive.link = function(scope, elem, attr) {
    console.log(scope.totalCartItems);
  }
  directive.templateUrl = 'src/app/views/cart.html';
  return directive;
});


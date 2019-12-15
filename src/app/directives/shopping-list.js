import myModule from '../app.module.js';

export default myModule.directive('shoppingList', function() {
  let directive = {};
  directive.controller = 'appController';
  directive.restrict = 'E';
  directive.link = function(scope, elem, attr){
  }
  directive.templateUrl = 'src/app/views/shopping-list.html';
  return directive;
});
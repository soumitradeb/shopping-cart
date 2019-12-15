import myModule from '../app.module.js';

export default myModule.directive('scSort', function(){
  let directive = {};
  directive.controller = 'appController';
  directive.restrict = 'E';
  directive.templateUrl = 'src/app/views/sort.html';
  return directive;
});
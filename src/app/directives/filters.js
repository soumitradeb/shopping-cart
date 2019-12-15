import myModule from '../app.module.js';

export default myModule.directive('scFilters', function(){
  let directive = {};
  directive.controller = 'appController';
  directive.restrict = 'E';
  directive.templateUrl = 'src/app/views/filters.html';
  return directive;
});
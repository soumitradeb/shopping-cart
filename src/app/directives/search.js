import myModule from '../app.module.js';

export default myModule.directive('scSearch', function(){
  let directive = {};
  directive.controller = 'appController';
  directive.restrict = 'E';
  directive.templateUrl = 'src/app/views/search.html';
  return directive;
});

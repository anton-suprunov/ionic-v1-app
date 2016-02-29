angular
  .module('sf.controllers')
  .controller('ArticlesCtrl', ArticlesController);

ArticlesController.$inject = ['articlesPrepService', 'teamsPrepService', '$stateParams'];

function ArticlesController(articlesPrepService, teamsPrepService, $stateParams) {
  var vm = this;

  vm.teams = teamsPrepService;
  vm.list = articlesPrepService;

  vm.getCountry = function(country) {
    var item = _.findWhere(vm.teams, {
      id : country
    });
    return item && item.title;
  };
}

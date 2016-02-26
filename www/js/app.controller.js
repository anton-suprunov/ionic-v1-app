angular.module('sf.controllers')
  .controller('AppCtrl', AppCtrl);

AppCtrl.$inject = ['$scope', '$ionicPopover', 'Teams'];

function AppCtrl($scope, $ionicPopover, Teams) {
  var vm = this;
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  vm.userTeams = Teams.getUserTeams();

  vm.closeTeamSelect = function() {
    vm.popover.hide();
  };

  vm.showTeamSelect = function(e) {
    vm.popover.show(e);
  };

  vm.toggleTeam = function(id) {
    Teams.toggleTeam(id);
    vm.userTeams = $scope.userTeams = Teams.getUserTeams();
  };

  Teams.getTeams()
    .then(function(data) {
      vm.teams = data;
      return $ionicPopover.fromTemplateUrl('templates/team-select.html', {
        scope: angular.extend($scope, vm)
      })
    })
    .then(function(popover) {
      vm.popover = popover;
    }, function() {
      console.log(arguments);
    });
}

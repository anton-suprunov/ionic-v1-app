angular
  .module('sf.services')
  .service('Teams', Teams);

Teams.$inject = ['$http', '$window', 'config'];

function Teams($http, $window, config) {
  var service = {
    getTeams : getTeams,
    getUserTeams : getUserTeams,
    toggleTeam : toggleTeam
  };

  return service;

  function getTeams() {
    return $http.get('/test-data/teams.json')
      .then(function(response) {
        return response.data;
      }, function() {
        console.log(arguments);
      });
  }

  function getUserTeams() {
    return JSON.parse($window.localStorage.getItem('userTeams')) || [];
  }

  function toggleTeam(id) {
    var teams = getUserTeams(),
        i = teams.indexOf(id);

    console.log(teams);

    if (i === -1) {
      if (teams.length < config.maxTeams) {
        teams.push(id);
      } else {
        return false;
      }
    } else {
      if (i > -1) {
        teams.splice(i, 1);
      }
    }

    //console.log(teams);

    $window.localStorage.setItem('userTeams', JSON.stringify(teams));
    return teams;
  }
}

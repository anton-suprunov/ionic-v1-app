angular
  .module('sf.services')
  .service('Articles', Articles);

Articles.$inject = ['$http', '$window', 'config'];

function Articles($http, $window, config) {
  var service = {
    getArticles : getArticles
  };

  return service;

  function getArticles(path) {
    var url = path ? path : '/test-data/articles.json';
    return $http.get(url)
      .then(function(response) {
        return response.data;
      }, function() {
        console.log(arguments);
      });
  }
}

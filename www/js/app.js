// Ionic Starter App

angular.module('sf.controllers', []);
angular.module('sf.services', []);

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('sf', ['ionic', 'sf.controllers', 'sf.services', 'angularMoment', 'angular.filter'])

  .constant('config', {
    maxTeams : 4
  })

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl',
        controllerAs : 'app'
      })

      .state('home', {
        parent : 'app',
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'templates/home.html',
            controller: 'HomeCtrl',
            controllerAs : 'home',
            params : [1,2,3]
          },
          'slidebox@home' : {
            templateUrl : 'templates/articles-slidebox.html',
            controller : 'ArticlesCtrl',
            controllerAs : 'articles',
            resolve: {
              articlesPrepService : slideboxPrepService,
              teamsPrepService : teamsPrepService
            },
            params : {
              limit : 4,
              asd : 'asd'
            }
          },
          'grid@home' : {
            templateUrl : 'templates/articles-grid.html',
            controller : 'ArticlesCtrl',
            controllerAs : 'articles',
            resolve: {
              articlesPrepService : gridPrepService,
              teamsPrepService : teamsPrepService
            }
          },
          'cards@home' : {
            templateUrl : 'templates/articles-cards.html',
            controller : 'ArticlesCtrl',
            controllerAs : 'articles',
            resolve: {
              articlesPrepService : cardsPrepService,
              teamsPrepService : teamsPrepService
            }
          }
        }
      })

      .state('app.article', {
        url: '/article/:articleId',
        views: {
          'menuContent': {
            templateUrl: 'templates/article.html',
            controller: 'ArticleCtrl',
            controllerAs: 'article'
          }
        }
      })

      .state('app.more', {
        url : '/more',
        views : {
          'menuContent' : {
            templateUrl : 'templates/more.html'
          }
        }
      });
    $urlRouterProvider.otherwise('/app/home');
  });

teamsPrepService.$inject = ['Teams'];
function teamsPrepService(Teams) {
  return Teams.getTeams();
}

slideboxPrepService.$inject = ['Articles'];
function slideboxPrepService(Articles) {
  return Articles.getArticles()
    .then(function(list) {
      list && (list.length = 4);
      return list;
    })
}

gridPrepService.$inject = ['Articles'];
function gridPrepService(Articles) {
  return Articles.getArticles();
}

cardsPrepService.$inject = ['Articles'];
function cardsPrepService(Articles) {
  return Articles.getArticles('/test-data/cards.json');
}

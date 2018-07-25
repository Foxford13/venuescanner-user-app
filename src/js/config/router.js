angular
.module('venueScannerApp')
.config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

	$stateProvider
	.state('usersIndex', {
		url: '/users',
		templateUrl: '/js/views/index.html'
	})
	.state('usersNew', {
		url: '/users/new',
		templateUrl: '/js/views/new.html'
	})
	.state('usersEdit', {
    url: '/users/:id/edit',
    templateUrl: '/js/views/edit.html'
  });
	$urlRouterProvider.otherwise('/users');
}

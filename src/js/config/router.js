angular
.module('venueScannerApp')
.config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

	$stateProvider
	.state('usersIndex', {
		url: '/users',
		templateUrl: '/js/views/index.html',
		    controller: 'UserIndexCtrl as userIndex'
	})
	.state('userNew', {
		url: '/users/new',
		templateUrl: '/js/views/new.html',
		    controller: 'UserNewCtrl as userNew'
	})
	.state('userEdit', {
    url: '/users/:id/edit',
    templateUrl: '/js/views/edit.html',
		    controller: 'UserEditCtrl as userEdit'
  });
	$urlRouterProvider.otherwise('/users');
}

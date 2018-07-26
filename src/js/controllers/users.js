angular
.module('venueScannerApp')
.controller('UserIndexCtrl', UserIndexCtrl)
.controller('UserNewCtrl', UserNewCtrl)
.controller('UserEditCtrl', UserEditCtrl);


UserIndexCtrl.$inject = ['$http'];
function UserIndexCtrl($http) {
  console.log('i work');
  const vm        = this;
  vm.all          = [];
  vm.index        = usersIndex;
  vm.delete       = userDelete;

  usersIndex();

  function usersIndex() {
    $http
    .get('/api/users')
    .then(response => {
      console.log(response);
      vm.all = response.data;
    });
  }

  function userDelete(user) {

    $http
    .delete(`/api/users/${user._id}`)
    .then(() => {
      const index = vm.all.indexOf(user);
      vm.all.splice(index, 1);
    });
  }
}

UserNewCtrl.$inject = ['$http', '$state'];

function UserNewCtrl($http, $state) {
  const vm = this;
  vm.newUser = {};
  vm.create = userCreate;
  console.log( vm.newUser);

  function userCreate() {
      console.log('i work');
    $http
    .post('/api/users/new', vm.newUser)
    .then(() => {
      console.log(err);
      $state.go('usersIndex');
    }, function errorCallback(response) {
  console.log(response.data);
  });
  }
}

function UserEditCtrl($http, $state) {
  const vm = this;
  vm.user = {};
  vm.update = usersUpdate;

  $http.get(`api/users/${$state.params.id}`)
  .then((response) => {
    vm.user = response.data;
  });

  function usersUpdate() {
    $http.put(`api/users/${$state.params.id}`, vm.user)
    .then((response) => {
        $state.go('usersIndex');
    });

  }
}

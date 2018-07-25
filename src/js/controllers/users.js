angular
.module('venueScannerApp')
.controller('UsersCtrl', UsersCtrl);

UsersCtrl.$inject = ['$http'];
function UsersCtrl($http) {
  const vm = this;
  // vm.usersDelete = usersDelete;
  // vm.usersCreate = usersCreate;
  // vm.newDonut = {};
  vm.all = [];

  function usersIndex() {
    $http({
      method: 'GET',
      url: 'api/users'
    }).then(function successCallback(response) {
      console.log(response);
      vm.all = response.data;
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  }
  usersIndex();
  console.log('i work');
  // function usersCreate() {
  //   $http.post('/api/users/new', vm.newDonut)
  //   .then((response) => {
  //
  //     vm.all.push(response.data);
  //     vm.newDonut = {};
  //   });
  // }
  function usersDelete(user) {

    console.log('i work too');
    $http({
      method: 'DELETE',
      url: `/api/users/${user._id}`
    }).then(function successCallback(response) {
      const index = vm.all.indexOf(user);
      console.log(index);
      vm.all.splice(index, 1);
    }, function errorCallback(response) {
      console.log(response);
    });


  }
  vm.usersDelete = usersDelete;



  function userAdd (user) {

    this.credentials = {
      firstName: '',
      lastName: '',
      email: ''
    };

    var req = {
      method: 'POST',
      url: '/api/users/new',
      headers: {
        'Content-Type': 'application/json'
      },
      data: this.credentials
    }

    $http(req).then(function(){
      console.log('sucess');

    }, function(err){
      console.log(err);
    });

  }
  vm.userAdd = userAdd;
}

var myApp = angular.module( 'myApp', [] );

myApp.controller( 'apiController',[ '$scope', '$http', function( $scope, $http ){
console.log('test');
  var urll = 'http://www.fantasyfootballnerd.com/service/players/json/j7rfhwpep6dk';
  console.log(url);

  $http({
    method: 'GET',
    url: urll
  }).then(function(response){
    console.log(response.data);
  });
}]);

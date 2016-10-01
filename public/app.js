angular.module( 'loginApp', [] )

.controller( "loginCtrl", function ( $scope, loginService ) {

  $scope.login = () => {
    loginService.login()
      .then( ( response ) => {
        console.log( response );
      } );
  };

} )

.service( "loginService", function ( $http ) {

  this.login = () => {
    return $http.get( "http://localhost:3000/auth/facebook" );
  }

} );

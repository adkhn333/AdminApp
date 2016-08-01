adminApp
.config(function($routeProvider){
  $routeProvider.when("/",
    {
      templateUrl: "app.html",
      controller: "AppCtrl",
      controllerAs: "app"
    }
  );
});
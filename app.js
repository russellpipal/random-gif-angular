
var app = angular.module("gifApp", []);

function addPlus(item){
    return item.replace(/ /g, "+");
}

app.controller('GifController', function($scope, $http){
  $scope.gifList = [];

  $scope.addRandomGif = function(){
    $http.get('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC').then(function(response){
      $scope.gifList.push(response.data.data.image_url);
    });
  }

  $scope.searchGif = function(){
    console.log($scope.searchText);
    var searchString = "http://api.giphy.com/v1/gifs/search?q=" + addPlus($scope.searchText) + "&api_key=dc6zaTOxFJmzC";
    $http.get(searchString).then(function(response){
      console.log(response);
      for(var i=0; i<10; i++){
        $scope.gifList.push(response.data.data[i].images.fixed_height.url);
      }
    });
    $scope.searchText = '';
  }

  $scope.removeAll = function(){
    $scope.gifList = [];
  }

});

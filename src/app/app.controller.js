import myModule from './app.module.js';

export default myModule.controller('appController',  ['$scope', '$http', function($scope, $http) {
  $scope.title ='Hello Angular';
  $scope.displaySearchBox = false;
  $scope.products = {};
  $scope.productsMain = {};
  $scope.cartList = {};
  $scope.sortHigh = false;
  $scope.sortLow = false;
  $scope.sortDis = false;
  $scope.searchBoxText = '';
  $scope.totalCartItems = 0;
  $scope.showCart = false;
  $scope.payable = {};
  $scope.lower_price_bound = 100;
  $scope.upper_price_bound = 10000;
  //$scope.products = [{"id":9090,"name":"Item1","price":200,"discount":10,"category":"fiction","img_url":"http://lorempixel.com/500/600/technics/"},{"id":9091,"name":"Item2","price":250,"discount":15,"category":"literature","img_url":"http://lorempixel.com/500/600/technics/"},{"id":9092,"name":"Item3","price":320,"discount":5,"category":"literature","img_url":"http://lorempixel.com/500/600/technics/"},{"id":9093,"name":"Item4","price":290,"discount":0,"category":"thriller","img_url":"http://lorempixel.com/500/600/technics/"},{"id":9094,"name":"Item1","price":500,"discount":25,"category":"thriller","img_url":"http://lorempixel.com/500/600/technics/"},{"id":9095,"name":"Item2","price":150,"discount":5,"category":"literature","img_url":"http://lorempixel.com/500/600/technics/"},{"id":9096,"name":"Item3","price":700,"discount":22,"category":"literature","img_url":"http://lorempixel.com/500/600/technics/"},{"id":9097,"name":"Item4","price":350,"discount":18,"category":"fiction","img_url":"http://lorempixel.com/500/600/technics/"}];
  getProducts();
  function getProducts() {
    $http.get('https://api.myjson.com/bins/qzuzi').then(
      function(response) {
        for(let i=0; i < response.data.length; i++) {
          $scope.products[response.data[i]['id']] = response.data[i];
          $scope.productsMain[response.data[i]['id']] = response.data[i];
        }
      }.bind($scope),
      function(){
      });
  }
  
  $scope.openSearch = function() {
    $scope.displaySearchBox = !$scope.displaySearchBox;
  }
  $scope.addToCart = function(id) {
    if($scope.cartList[id]) {
      $scope.cartList[id]++;
    }
    else {
      $scope.cartList[id] = 1;
    }
    $scope.totalCartItems = $scope.totalCartItems +1;
    updatePayable();
  }
  $scope.deleteFromCart = function(id) {
    if($scope.cartList[id]) {
      $scope.cartList[id]--;
    }
    if($scope.cartList[id] == 0) {
      delete $scope.cartList[id];
    }
    $scope.totalCartItems = $scope.totalCartItems -1;
    updatePayable();
  }
  $scope.removeItem = function(id) {
    if($scope.cartList[id]) {
      $scope.totalCartItems = $scope.totalCartItems - $scope.cartList[id];
      delete $scope.cartList[id];
    }
    updatePayable();
  }

  function updatePayable() {
    let price = 0;
    let discount = 0;
    let items = 0;
    angular.forEach($scope.cartList, function(value, key){
      price = price + ($scope.productsMain[key]['price'] * value);
      if($scope.productsMain[key]['discount'] > 0) {
        discount = discount + (($scope.productsMain[key]['price']* $scope.productsMain[key]['discount']/100) * value);
      }
      items = items + value;
    });
    $scope.payable = {
      price : price,
      items: items,
      discount: discount
    }
  }
  $scope.sortPrice = function(option) {
    $scope.sortHigh = false;
    $scope.sortLow = false;
    $scope.sortDis = false;
    if(option == 'high') {
      $scope.sortHigh = true;
      angular.forEach($scope.products, function(value, key){
        angular.forEach($scope.products, function(value1, key1){
          if($scope.products[key]['price'] > $scope.products[key1]['price']) {
            let temp = $scope.products[key];
            $scope.products[key] = $scope.products[key1];
            $scope.products[key1] = temp;
          }
        });
      });
    }

    if(option == 'low') {
      $scope.sortLow = true;
      angular.forEach($scope.products, function(value, key){
        angular.forEach($scope.products, function(value1, key1){
          if($scope.products[key]['price'] < $scope.products[key1]['price']) {
            let temp = $scope.products[key];
            $scope.products[key] = $scope.products[key1];
            $scope.products[key1] = temp;
          }
        });
      });
    }

    if(option == 'dis') {
      $scope.sortDis = true;
      angular.forEach($scope.products, function(value, key){
        angular.forEach($scope.products, function(value1, key1){
          if($scope.products[key]['discount'] > $scope.products[key1]['discount']) {
            let temp = $scope.products[key];
            $scope.products[key] = $scope.products[key1];
            $scope.products[key1] = temp;
          }
        });
      });
    }
  }

  $scope.applyFilter = function() {
    $scope.products = {};
    angular.forEach($scope.productsMain, function(value, key){
      if(value['price'] > $scope.lower_price_bound && value['price'] < $scope.upper_price_bound ) {
        $scope.products[key] = value;
      }
    });
  }

  $scope.search = function(e, text) {
    var charCode = (e.which) ? e.which : e.keyCode;
    if(charCode == 13) {
      return;
    }
    $scope.products = {};
    angular.forEach($scope.productsMain, function(value, key){
      if(value['name'].match(new RegExp(text,'gi'))) {
        $scope.products[key] = value;
        
      }
    });
  }

  $scope.displayCart = function(){
    $scope.showCart = true;
  }

  $scope.cartInit = function(products) {
    console.log(products);
  }
}]
);
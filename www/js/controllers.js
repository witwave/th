angular.module('starter.controllers', ['starter.services']).controller('DashCtrl', function($scope, $http, $ionicLoading, $timeout, Users, Activity) {
    $scope.hasNextPage = true;
    $scope.doRefresh = function() {
        Users.refresh(function(response) {
            $scope.items = response.data;
            $scope.$broadcast('scroll.refreshComplete');
        });
    }
    $scope.loadMore = function() {
        Users.pagination(function(hasNextPage, response) {
            $scope.hasNextPage = false;
            $timeout(function() {
                $scope.hasNextPage = hasNextPage;
            }, 100);
            $scope.items = $scope.items.concat(response.data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }
    $scope.items = [];
    //$scope.doRefresh();
}).controller('ActivityCtrl', function($scope, $http, $ionicLoading, $timeout, Activity) {
    $scope.hasNextPage = true;
    $scope.items = [];
    $scope.doRefresh = function() {
        Activity.refresh(function(response) {
            $scope.items = response.data;
            $scope.$broadcast('scroll.refreshComplete');
        });
    }
    $scope.loadMore = function() {
        Activity.pagination(function(hasNextPage, response) {
            $scope.hasNextPage = false;
            $timeout(function() {
                $scope.hasNextPage = hasNextPage;
            }, 100);
            console.log('load more....');
            $scope.items = $scope.items.concat(response.data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }
}).controller('StoryCtrl', function($scope, $http, $ionicLoading, $timeout, Story) {
    $scope.hasNextPage = true;
    $scope.items = [];
    $scope.doRefresh = function() {
        Story.refresh(function(response) {
            $scope.items = response.data;
            $scope.$broadcast('scroll.refreshComplete');
        });
    }
    $scope.loadMore = function() {
        Story.pagination(function(hasNextPage, response) {
            $scope.hasNextPage = false;
            $timeout(function() {
                $scope.hasNextPage = hasNextPage;
            }, 100);
            $scope.items = $scope.items.concat(response.data);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }
}).controller('AccountCtrl', function($scope, $http, $ionicLoading) {
    $scope.data = 'Loading...';
    navigator.geolocation.getCurrentPosition(function(position) {
        $scope.data = {
            'long': position.coords.longitude,
            'lat': position.coords.latitude
        };
        $scope.lng = position.coords.longitude;
        $scope.lat = position.coords.latitude;
        $scope.$apply();
    }, function(error) {
        $scope.data = {
            error: error
        };
        $scope.$apply();
        alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    });
}).
controller('LoginCtrl', ['$scope', '$state', '$http', function($scope, $state, $http) {
    $scope.userData = {
        username: "",
        password: ""
    };
    $scope.login = function() {
        $scope.userData.message = '';
        $http.post('/api/login', {
            user: $scope.userData
        }).success(function(data, status, headers, config) {
            /*$cookieStore.put("token", data.token);*/
            $state.go('tab.dash');
        }).error(function(data, status, headers, config) {
            /*$cookieStore.remove("token");*/
            $scope.userData.message = data;
        });
    };
}]).run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        setTimeout(function() {
            navigator.splashscreen.hide();
        }, 2000);
    });
});
angular.module('starter.services', []).factory('Users', function($http) {

    var users = [],
        nextPage = 1,
        hasNextPage = true;
    var getUsers = function(category, page, callback) {
        $http.post(server + '/api/home/user', {
            withCredentials: true,
            category: 1
        }).success(function(res) {
            return callback && callback(res)
        })
    };
    return {
        refresh: function(callback) {
            return getUsers(1, 1, function(response) {
                nextPage = 2;
                hasNextPage = true;
                users = response.data;
                return callback && callback(response);
            });
        },
        pagination: function(callback) {
            return getUsers(1, nextPage, function(response) {
                if (response.data.length < 8) {
                    hasNextPage = false;
                }
                nextPage++;
                users = users.concat(response.data);
                return callback && callback(hasNextPage, response);
            });
        }
    }
}).factory('Activity', function($http) {
    var activityList = [],
        nextPage = 1,
        hasNextPage = true;
    var getActivity = function(category, page, callback) {
        $http.post(server + '/api/home/activity', {
            withCredentials: true
        }).success(function(res) {
            return callback && callback(res)
        })
    };
    return {
        refresh: function(callback) {
            return getActivity(1, 1, function(response) {
                nextPage = 2;
                hasNextPage = true;
                activityList = response.data;
                return callback && callback(response);
            });
        },
        pagination: function(callback) {
            return getActivity(1, nextPage, function(response) {
                console.log(response.data.length);
                if (response.data.length < 8) {
                    hasNextPage = false;
                }
                nextPage++;
                activityList = activityList.concat(response.data);
                return callback && callback(hasNextPage, response);
            });
        }
    }
}).factory('Story', function($http) {
    var storyList = [],
        nextPage = 1,
        hasNextPage = true;
    var getStory = function(category, page, callback) {
        $http.post(server + '/api/home/story', {
            withCredentials: true
        }).success(function(res) {
            return callback && callback(res)
        })
    };
    return {
        refresh: function(callback) {
            return getStory(1, 1, function(response) {
                nextPage = 2;
                hasNextPage = true;
                activityList = response.data;
                return callback && callback(response);
            });
        },
        pagination: function(callback) {
            return getStory(1, nextPage, function(response) {
                if (response.data.length < 8) {
                    hasNextPage = false;
                }
                nextPage++;
                storyList = storyList.concat(response.data);
                return callback && callback(hasNextPage, response);
            });
        }
    }
});
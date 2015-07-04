

// date counter
	var now = new Date();
	var start = new Date(now.getFullYear(), 0, 0);
	var diff = now - start;
	var oneDay = 1000 * 60 * 60 * 24;
	var day = Math.floor(diff / oneDay);
	$('.today').append(now.toDateString());
    // $('.day-count').append(day);

var app = angular.module('RSSFeedApp', [], function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});



app.controller("FeedCtrl", ['$scope','FeedService', function ($scope, Feed) {

        Feed.parseFeed("http://doodleandletters.tumblr.com/rss").then(function(res){
            $scope.feeds= res.data.responseData.feed.entries;
            $scope.latest = res.data.responseData.feed.entries[0].title.match("^[0-9]{3}")[0];
        });



        $scope.today =  day ;

				// $scope.diff = function{
				// 		return latest - today;
				// }

//feeds[0].title.match("^[0-9]{3}")

}]);


app.factory('FeedService',['$http',function($http){
    return {
        parseFeed : function(url){
            return $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=9&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
        }
    }
}]);


app.filter('html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}])


//<img([\w\W]+?)/>
// new RegExp('<img([\w\W]+?)/>', 'gi');

app.filter('img', ['$sce', function ($sce) {
    return function (text) {

        //http://stackoverflow.com/questions/26962297/angularjs-regex-json-data-for-img-src-or-other-selectors
        var imgSrc = text.match(/src="([^"]*)"/i)[1];
        //


        return $sce.trustAsHtml(imgSrc);
    };
}])


app.filter('num', function() {
    return function(input) {
      return parseInt(input, 10);
    }
});

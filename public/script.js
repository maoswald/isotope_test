var app = angular.module('app',[]);

app.controller('feedcontroller', ['$scope', function($scope) {
    $scope.posts = [
        {type:'fb', title:'fbTitle', date:'2015-01-10'},
        {type:'fb', title:'afbTitle', date:'2015-01-30'},
        {type:'tw', title:'twTitle', date:'2015-01-02'},
        {type:'in', title:'inTitle', date:'2015-02-05'},
        {type:'pt', title:'ptTitle', date:'2015-02-03'},
        {type:'gp', title:'gpTitle', date:'2015-01-09'},
        {type:'gp', title:'gpTitle', date:'2015-01-10'}
    ],



     $scope.readyload = function () {
        console.log('fnk newsfeed')
        // init Isotope
        var $newsFeedContainer = $('.news-feed').isotope({
            itemSelector: '.post',
            layoutMode: 'fitRows',
            getSortData: {
                type: '.type',
                title: '.title',
                date: '.date'
            }
        });

        // filter functions
        var filterFns = {

        };

        // bind filter button click
        $('.news-feed-filter').on( 'click', 'button', function() {
            var filterValue = $( this ).attr('data-filter');
            // use filterFn if matches value
            filterValue = filterFns[ filterValue ] || filterValue;
            $newsFeedContainer.isotope({ filter: filterValue });
        });
        // bind sort button click
        $('.news-feed-sorts').on( 'click', 'button', function() {
            var sortByValue = $(this).attr('data-sort-by');
            var sortOrderReverse = true;
            var reverse = $(this).attr('reverse');
            if (typeof reverse !== typeof undefined && reverse !== false) {
                console.log('false')
                sortOrderReverse = false;
            }
            $newsFeedContainer.isotope({ sortBy: sortByValue, sortAscending: sortOrderReverse });
        });

        // change is-checked class on buttons
        $('.button-group').each( function( i, buttonGroup ) {
            var $buttonGroup = $( buttonGroup );
            $buttonGroup.on( 'click', 'button', function() {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                $( this ).addClass('is-checked');
            });
        });

     }

}]);

app.directive('post', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            type: '@',
            title: '@',
            date: '@'
        },
        templateUrl: 'post'
    }
});
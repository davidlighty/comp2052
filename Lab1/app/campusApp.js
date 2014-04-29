/*
	CampusApp
	David Lighty A00843511
	Comp 2052
*/
// Create a new Angular App
var CampusApp = angular.module('campusApp', ['campusApp.services', 'google-maps']);
// Create the controller for the app.
CampusApp.controller('campusAppCtrl', function($scope, CampusData) {
    // Get and bind our data.
    $scope.campuses = CampusData.getData();
    $scope.showCampus = function() {
        console.log($scope.item);
        $scope.currentCampus = $scope.item.campus;
        var geo = $scope.currentCampus.geocode;
        console.log(geo);
        // Center on this campus and zoom in a bit more.
        $scope.map.center= {
                latitude: geo.latitude,
                longitude: geo.longitude
            }
           $scope.map.zoom= 15
    };
    // Add markers
    var markers = [];
    angular.forEach($scope.campuses, function(v, k) {
        console.log(k + ":" + JSON.stringify(v));
        var camp = v.campus;
        markers.push({
            id: k,
            title: camp.title,
            latitude: camp.geocode.latitude,
            longitude: camp.geocode.longitude
        });
    });
    // Init Map on main Vancouver area
    google.maps.visualRefresh = true;
    $scope.map = {
        center: {
            latitude: 49.251392,
            longitude: -123.001395
        },
        zoom: 10,
        draggable:true,
        markers: markers
    };
});

// jQuery Mobile Setup
$(document).on("pageshow", ".ui-page", function () {
    var $page  = $(this),
        vSpace = $page.children('.ui-header').outerHeight() + $page.children('.ui-footer').outerHeight() + $page.children('.ui-content').height();

    if (vSpace < $(window).height()) {
        var vDiff = $(window).height() - $page.children('.ui-header').outerHeight() - $page.children('.ui-footer').outerHeight() - 30;//minus thirty for margin
        $page.children('.ui-content').height(vDiff);
    }
});
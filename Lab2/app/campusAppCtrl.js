/*
    CampusApp
    David Lighty A00843511
    Comp 2052
*/
// Append to StudentApp
// Create the controller for the app.
StudentApp.controller('campusAppCtrl', function($scope, CampusData) {
    // Get and bind our data.
    $scope.campuses = CampusData.getSampleData();
    $scope.showCampus = function() {
        //console.log($scope.item);
        $scope.currentCampus = $scope.item.campus;
        var geo = $scope.currentCampus.geocode;
        $scope.currentCoords = {
            latitude: geo.latitude,
            longitude: geo.longitude
        };
        //console.log(geo);
        // Center on this campus and zoom in a bit more.
        $scope.map.center = $scope.currentCoords;
        $scope.map.zoom = 15;
        $scope.map.control.refresh();
    };
    // Add markers
    var markers = [];
    angular.forEach($scope.campuses, function(v, k) {
        //console.log(k + ":" + JSON.stringify(v));
        var camp = v.campus;
        markers.push({
            id: k,
            title: camp.title,
            latitude: camp.geocode.latitude,
            longitude: camp.geocode.longitude
        });
    });
    // Init Map on main Vancouver area
    $scope.initMapCoords = {
        latitude: 49.251392,
        longitude: -123.001395
    };
    $scope.currentCoords = $scope.initMapCoords;
    $scope.map = {
        control: {},
        center: $scope.initMapCoords,
        zoom: 10,
        draggable: true,
        markers: markers
    };
    $scope.refreshMap = function() {
        //optional param if you want to refresh you can pass null undefined or false or empty arg
        $scope.map.control.refresh($scope.currentCoords);
        return;
    };
});
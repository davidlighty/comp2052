/*
    StudentApp
    David Lighty A00843511
    Comp 2052
*/
// Create a new Angular App
var StudentApp = angular.module('studentApp', ['studentApp.services', 'campusApp.services', 'google-maps', 'highcharts-ng']);
// Create the controller for the app.
StudentApp.controller('studentAppCtrl', function($scope, StudentData, CampusData) {
    // Gender Stats
    $scope.SeedData = function() {
        console.log("Seeding Database");
        StudentData.seedServerDataWithSampleData().then(function(data) {
            getStudentData();
        });
    };
    $scope.AddStudent = function() {
        //console.log($scope.newStudent);
        StudentData.insertData($scope.newStudent);
        $scope.newStudent = null;
        getStudentData();
    };
    $scope.campusTitle = function(campusID) {
        if (campusID) {
            // console.log("Find: " + campusID);
            return CampusData.getCampusTitle(campusID);
        }
    };
    var handleStudentData = function() {
        $scope.studentSort = "lastName";
        $scope.totalStudents = $scope.students.length || 0;
        generateStudentStats();
    };
    var getStudentData = function() {
        $scope.totalMales = 0;
        $scope.totalFemales = 0;
        $scope.noGender = 0;
        // Get and bind our data.
        StudentData.getData().then(function(data) {
            //console.log(resp);
            $scope.students = data;
            // console.log("Scope Data: " + JSON.stringify($scope.students));
            handleStudentData();
        });
    };
    var generateStudentStats = function() {
        var count = 0,
            foundObj = [],
            $c10 = 0,
            $c20 = 0,
            $c30 = 0,
            $c40 = 0,
            $c50 = 0,
            $c60 = 0,
            $notSet = 0;
        // Loop students
        angular.forEach($scope.students, function(student) {
            //console.log(JSON.stringify(student));
            var $student = student;
            // Gender
            if ($student.gender == "M") {
                $scope.totalMales++;
            } else if ($student.gender == "F") {
                $scope.totalFemales++;
            } else {
                $scope.noGender++;
            }
            // Campus
            switch ($student.defaultCampus) {
                case 10:
                    $c10++;
                    break;
                case 20:
                    $c20++;
                    break;
                case 30:
                    $c30++;
                    break;
                case 40:
                    $c40++;
                    break;
                case 50:
                    $c50++;
                    break;
                case 60:
                    $c60++;
                    break;
                default:
                    $notSet++;
            }
            $scope.campusByStudentData = [
                [$scope.campusTitle(10), $c10],
                [$scope.campusTitle(20), $c20],
                [$scope.campusTitle(30), $c30],
                [$scope.campusTitle(40), $c40],
                [$scope.campusTitle(50), $c50],
                [$scope.campusTitle(60), $c60],
                ['Not Set', $notSet]
            ];
            console.log($scope.campusByStudentData);
        });
        // Set our chart data.
        generateGenderChart();
        generateCampusChart();
    };
    var generateGenderChart = function() {
        $scope.genderPieConfig = {
            options: {
                chart: {
                    type: 'pie'
                }
            },
            title: {
                text: "Gender"
            },
            series: [{
                data: [
                    ['Males', $scope.totalMales],
                    ['Females', $scope.totalFemales],
                    ['not set', $scope.noGender]
                ]
            }],
            loading: false
        }
    };
    var generateCampusChart = function() {
        $scope.campusPieConfig = {
            options: {
                chart: {
                    type: 'pie'
                }
            },
            title: {
                text: "Campus"
            },
            series: [{
                data: $scope.campusByStudentData
            }],
            loading: false
        }
    };
    // Notes (manual)
    $scope.author = "David Lighty";
    $scope.notes = [{
        text: "Added Campus by student counts, interesting issue of looking up a different collection's value and pushing that with a value into an array for the chart.  Easy in the end, difficult in the beginning.",
        author: $scope.author
    },{
        text: "Fixed Google maps directive + accoridion not refreshing/re-sizing correctly.  " + "Had to dig into how the directive interfaces with the real google-maps API.  " + "Had to write a custom function and create scope variables for current coordinates for a proper refresh.",
        author: $scope.author
    }, {
        text: "Fixed API/REST calls for mongoDB in PHP server controller. " + "Would be better to create a class, but this is not required for a simple demo app.  " + "Problem with mongo/upside of mongo is data is natively JSON.  " + 
        "But with PHP & json_encode this creates an object of objects, not an array of objects.  " + 
        "This makes it very simple in PHP to get data and return it, but then you need to massage the data in angularJS.  " + 
        "I found this easier than massaging the data in the server php code.",
        author: $scope.author
    }];
    // INIT
    getStudentData();
});
// jQuery Mobile Setup
$(document).on("pageshow", ".ui-page", function() {
    var $page = $(this),
        vSpace = $page.children('.ui-header').outerHeight() + $page.children('.ui-footer').outerHeight() + $page.children('.ui-content').height();
    if (vSpace < $(window).height()) {
        var vDiff = $(window).height() - $page.children('.ui-header').outerHeight() - $page.children('.ui-footer').outerHeight() - 30; //minus thirty for margin
        $page.children('.ui-content').height(vDiff);
    }
    // JQuery Mobile Map Refresh
    $('.section-map .ui-collapsible-heading').on('click', function() {
        //console.log("Attempt Maps Refresh");
        angular.element('#campusMap').scope().refreshMap();
    });
    $('#btnAboutPnl').on('click',function(){
        console.log("Open Panel");
        $('#aboutPanel').panel('open');
    })
});
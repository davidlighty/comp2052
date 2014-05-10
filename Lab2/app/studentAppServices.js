/*
    Data Module for campusApp
    This will pretend to Ajax/REST data services
    and return queries for data.

    David Lighty
*/
angular.module('studentApp.services', []).factory('StudentData', function($http, $q) {
    var service = {};
    service.dataPath = 'server/student.php?type=student';
    // Get Data with Promise
    service.getData = function() {
        var defer = $q.defer();
        // GET for the data.
        $http.get('server/student.php?type=student').then(function(resp) {
            var $data = resp.data;
            $resp = [];
            for (var $i in $data) {
                //console.log($data[$i]);
                $resp.push($data[$i]);
            }
            defer.resolve($resp);
        });
        return defer.promise;
    };
    service.deleteData = function() {
        // DELETE data at server.
        return null;
    };
    service.updateData = function() {
        // POST data at server.
        return null;
    };
    service.insertData = function($newStudent) {
        // POST data at server.
        var defer = $q.defer();
        $http.post(service.dataPath, JSON.stringify({
            'action': 'addStudent',
            'data': $newStudent
        })).then(function(resp) {
            defer.resolve(resp);
        });
        return defer.promise;
    };
    service.getSampleData = function() {
        return studentData;
    };
    service.seedServerDataWithSampleData = function() {
        // Use our sample data to seed the database
        return $http.post('server/student.php?type=student', JSON.stringify({
            'action': 'seedData',
            'data': service.getSampleData()
        })).then(function(resp, status) {
            return true;
        });
    };
    return service;
});
angular.module('campusApp.services', []).factory('CampusData', function($http,$q) {
    return {
        getData: function() {
            // GET for the data.
            return null;
        },
        deleteData: function() {
            // DELETE data at server.
            return null;
        },
        updateData: function() {
            // POST data at server.
            return null;
        },
        insertData: function() {
            // POST data at server.
            return null;
        },
        getSampleData: function() {
            return campusData;
        },
        seedServerDataWithSampleData: function() {
            // Use our sample data to seed the database
            return null;
        },
        getCampusTitle: function(id) {
            //console.log("Find campusid :" + id);
            var $title="";
            angular.forEach(campusData, function(v, k) {
                var camp = v.campus;
                if (camp.id === id) {
                   // console.log("Found : " +camp.title);
                    $title=camp.title;
                }
            });
            return $title;
        }
    };
});
// JSON Student Sample Data for drop down // Server less test data
// student:{
//     id:"",                          // String A + 9 digits 
//     firstName:"",                   // String
//     lastName:"",                    // String
//     gender:"",                      // String
//     defaultCampus:"",               // campusID
//     courses:[]                      // List of course ids attending?
// }
var studentData = [{
    student: {
        id: "A0012345",
        firstName: "John",
        lastName: "Smith",
        gender: "M",
        defaultCampus: 10,
        courses: []
    }
}, {
    student: {
        id: "A0012346",
        firstName: "Mary",
        lastName: "Brown",
        gender: "F",
        defaultCampus: 10,
        courses: []
    }
}, {
    student: {
        id: "A0012347",
        firstName: "Madeline",
        lastName: "Doe",
        gender: "",
        defaultCampus: 30,
        courses: []
    }
}, {
    student: {
        id: "A0012348",
        firstName: "Jane",
        lastName: "Smith",
        gender: "F",
        defaultCampus: 20,
        courses: []
    }
}, {
    student: {
        id: "A0012349",
        firstName: "David",
        lastName: "Lighty",
        gender: "M",
        defaultCampus: 30,
        courses: []
    }
}, {
    student: {
        id: "A0012350",
        firstName: "Jack",
        lastName: "Lonsdale",
        gender: "",
        defaultCampus: 20,
        courses: []
    }
}, {
    student: {
        id: "A0012351",
        firstName: "Adam",
        lastName: "John",
        gender: "M",
        defaultCampus: 20,
        courses: []
    }
}];
var coursesData = [{
    course: {
        id: 0, // INT based id
        title: "", // String
        category: "", // String
        instructor: "", // String
        campus: "", // String
        room: "" // String
    }
}];
var campusData = [{
    campus: {
        id: 10,
        title: "Burnaby Campus",
        address: {
            street: "3700 Willingdon Avenue",
            city: "Burnaby",
            prov: "BC",
            postalcode: "V5G 3H2"
        },
        geocode: {
            latitude: 49.251392,
            longitude: -123.001395
        },
        web: "http://www.bcit.ca/about/burnaby.shtml"
    }
}, {
    campus: {
        id: 20,
        title: "Downtown Campus",
        address: {
            street: "555 Seymour Street",
            city: "Vancouver",
            prov: "BC",
            postalcode: "V6B 3H6"
        },
        geocode: {
            latitude: 49.283264,
            longitude: -123.1152
        },
        web: "http://www.bcit.ca/about/downtown.shtml"
    }
}, {
    campus: {
        id: 30,
        title: "Marine Campus",
        address: {
            street: "265 West Esplanade",
            city: "North Vancouver",
            prov: "BC",
            postalcode: "V7M 1A5"
        },
        geocode: {
            latitude: 49.313114,
            longitude: -123.084219
        },
        web: "http://www.bcit.ca/about/marine.shtml"
    }
}, {
    campus: {
        id: 40,
        title: "Aerospace Technology Campus",
        address: {
            street: "3800 Cessna Drive",
            city: "Richmond",
            prov: "BC",
            postalcode: "V7B 0A1"
        },
        geocode: {
            latitude: 49.185051,
            longitude: -123.144722
        },
        web: "http://www.bcit.ca/about/aerospace.shtml"
    }
}, {
    campus: {
        id: 50,
        title: "Great Northern Way Campus",
        address: {
            street: "555 Great Northern Way",
            city: "Vancouver",
            prov: "BC",
            postalcode: "V5T 1E2"
        },
        geocode: {
            latitude: 49.267483,
            longitude: -123.091279
        },
        web: "http://www.bcit.ca/about/gnwc.shtml"
    }
}, {
    campus: {
        id: 60,
        title: "Annacis Island Campus",
        address: {
            street: "1608 Cliveden Avenue",
            city: "Delta",
            prov: "BC",
            postalcode: "V3M 6M2"
        },
        geocode: {
            latitude: 49.164514,
            longitude: -122.968973
        },
        web: "http://www.bcit.ca/about/annacis.shtml"
    }
}];
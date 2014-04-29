/*
    Data Module for campusApp
    This will pretend to Ajax/REST data services
    and return queries for data.

    David Lighty
*/
angular.module('campusApp.services', []).factory('CampusData', function() {
    return {
        getData: function() {
            return campusData;
        }
    };
});
// JSON Campus Data for drop down.
var campusData = [{
    campus: {
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
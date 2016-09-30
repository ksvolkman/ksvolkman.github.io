$(function() {
    getReservations();
} );


// Step 1: Initialize Firebase
var config = {
    apiKey: "AIzaSyCsgtuaeSmFJv_blSRdZsSMfxLPzoI_iYE",
    authDomain: "reservation-site-8de84.firebaseapp.com",
    databaseURL: "https://reservation-site-8de84.firebaseio.com",
    storageBucket: "reservation-site-8de84.appspot.com",
    messagingSenderId: "289706182277"
};
firebase.initializeApp(config);

// Connect to Database
var database = firebase.database();

// Step 2: Create empty object reservationData
var reservationData = {}

// Step 3: Add click event to each reservation option (li)

$('.reservation-day li').on('click', function () {
    reservationData.day = $(this).text();
});

// Step 4: Update name property of reservationData when user submits form
// Step 4: Add event listener for when user submits form
$('.reservation-form').on('submit', function (event) {
    // Step 4: prevent default 
    event.preventDefault();
    // Step 4: Add name user entered to reservationData object
    reservationData.name = $('.reservation-name').val();

    // Step 5: send reservation information to database 
    var reservationsReference = database.ref('reservations');
    reservationsReference.push(reservationData);
});

// Step 6: create function getReservations, listen for changes to firebase datasbase, update view using Handlebars
function getReservations() {
    database.ref('reservations').on('value', function (results) {
        
        var allReservations = results.val();
        $('.reservation-list').empty();

        for (var reservation in allReservations) {
            var context = {
                name: allReservations[reservation].name,
                day: allReservations[reservation].day,
                reservationId: reservation
            };

            var source = $('#reservation-template').html();
            var template = Handlebars.compile(source);
            var reservationListItem = template(context);
            $('.reservation-list').append(reservationListItem);
        }
    });
}

// Step 7: define callback used by google maps api to initialize the app's map

function initMap() {
    // Step 8: Use the Google Maps' Map constructor to create a map
    var myLatLng = { lat: 40.8054491, lng: -73.9654415 };
    var map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 10,
        scrollwheel: false
    });
    // Step 9: Use Marker constructor to add a marker to map
    var marker = new google.maps.Marker({
        map: map,
        position: myLatLng,
        title: 'Monks Cafe'
    });
}


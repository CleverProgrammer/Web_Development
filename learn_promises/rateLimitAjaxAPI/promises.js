/**
 *
 * Created by ChessTastic on 1/13/16.
 */

function directionsRequest(origin, destination) {
    return {
        origin: origin,
        destination: destination,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
}

var limiter = new Bottleneck(1, 400);
function googlePromise() {
    var destinations = [
        'Montreal', 'California', 'Chicago', 'New York',
        'Boston', 'Washington', '7023 west dempster st', '8844 n wisner st',
        'New Jersey', '9053 laramie ave', 'pleasant hill', 'pleasant ridge',
        'San Francisco', 'San José', 'Nevada', 'Las Vegas'
    ];

    var counter = 0;
    destinations.forEach(function (destination) {
        var request = directionsRequest("Toronto", destination);
        var directionsService = new google.maps.DirectionsService();

        limiter.submit(directionsService.route, request, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                counter += 1;
                console.log("Address ", counter, ": ", destination);
                console.log("Google directions request was successful!");
                console.log(response);
            } else {
                console.log(status);
            }
        });

    });

}

// limiter.schedule(googlePromise, success, error);
googlePromise();

/**
 *
 * Created by ChessTastic on 1/13/16.
 */

var URL = 'http://www.html5rocks.com/en/tutorials/es6/promises/';

var promise = $.ajax({
    url: URL
});

function success(data) {
    console.log("Success!", data);
    document.write(data);
    console.log($("<div>").html(data));
}

function error() {
    console.error("Failed!", error);
}

promise.done(success);
promise.fail(error);

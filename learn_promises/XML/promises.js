/**
 *
 * Created by ChessTastic on 1/13/16.
 */

var URL = 'http://www.html5rocks.com/en/tutorials/es6/promises/';

/**
 * Makes a request to a URL to get the contents.
 * @param {string} method
 * @param {string} url
 * @returns {Promise}
 */
function get(method, url) {
    // Return a new promise.
    return new Promise(function(resolve, reject) {
        // Do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open(method, url);

        req.onload = function() {
            // This is called even on 404 etc
            // so check the status
            if (req.status == 200) {
                // Resolve the promise with the response text
                resolve(req.response);
            }
            else {
                // Otherwise reject with the status text
                // which will hopefully be a meaningful error
                reject(Error(req.statusText));
            }
        };

        // Handle network errors
        req.onerror = function() {
            reject(Error("Network Error"));
        };

        // Make the request
        req.send();
    });
}

function success(data) {
    console.log("Success!", data);
    document.write(data);
    console.log($("<div>").html(data));
}

function error() {
    console.error("Failed!", error);
}

get('GET', URL).then(success, error);

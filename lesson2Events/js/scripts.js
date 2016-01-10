/**
 *
 * Created by ChessTastic on 1/9/16.
 */

$(document).ready(function () {
    var userInput1 = $("#userInput1");
    var userInput2 = $("#userInput2");
    var userButton = $("#userButton");
    userButton.click(function () {
        alert(parseInt(userInput1.val()) + parseInt(userInput2.val()));
    });
});

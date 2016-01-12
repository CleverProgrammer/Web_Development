/**
 * Validate if it is an actual phone numbers.
 * Created by Rafeh on 1/11/16.
 */

/**
 * Validate if a phone number is an actual phone number
 *
 * @param {string} number will be the telephone number
 * @return {boolean} whether it is an actual number or not
 */
// > telephoneCheck("555-555-5555")
// true
// > telephoneCheck("1 555-555-5555")
// true
// > telephoneCheck("1 (555) 555-5555")
// true
// > telephoneCheck("2 (757) 622-7382")
// false

function telephoneCheck(number) {
    if (number.indexOf('(') >= 0) {
        if ((number.indexOf(')') - number.indexOf('(')) <= 4) {
            if (!(number.indexOf(')') >= 0)) {
                return false
            }
        } else {
            return false;
        }
    }

    if (number.indexOf(')') >= 0) {
        if (!(number.indexOf('(') >= 0)) {
            return false
        }
    }

    // d is for digit and g looks for a global match.
    nums = number.match(/\d/g);
    if (nums.length === 10 && number[0] !== '1') {
        return true;
    } else if (nums.length === 11 && number[0] === '1') {
        return true;
    }
    return false;
}

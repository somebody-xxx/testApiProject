'use strict'

module.exports = {

/**
 * Get random number in diapason
 * @param {Number} min 
 * @param {Number} max 
 * @returns {Number}
 */
getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

}
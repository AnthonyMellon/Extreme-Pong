/**
 * 
 * @param {number} num 
 * @returns num converted to radians
 */
let degToRad = (num) => {
    return num * Math.PI / 180;
}

/**
 * 
 * @param {Int} min 
 * @param {Int} max 
 * @returns a random number between min(invlusive) and max(exclusive)
 */
let getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min) + min);
}
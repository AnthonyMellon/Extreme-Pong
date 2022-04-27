/**
 * 
 * @param {number} num angle in degrees
 * @returns num converted to radians
 */
let degToRad = (num) => {
    return num * Math.PI / 180;
}

/**
 * 
 * @param {number} num angle in radians
 * @returns num converted to degrees
 */
let radToDeg = (num) => {
    return num * 180 / Math.PI;
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

/**
 * 
 * @param {num} mag The magnitude of the vector
 * @param {num} ang  The angle of the vector (in degrees)
 * @returns a polar vector converted to a rectangular vector object {x, y}
 */
let polToRect = (mag, ang) => {
    const angRad = degToRad(ang);
    const x = mag * Math.cos(angRad);
    const y = mag * Math.sin(angRad);
    return {x, y};
}


/**
 * 
 * @param {num} x The X component of the vector 
 * @param {num} y The Y component of the vector
 * @returns a rectangular vector converted to a polar vector object {r, theta} (angle given in degrees)
 */
let recToPol = (x, y) => {
    const r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    const theta = radToDeg(Math.atan2(y, x));
    return {r, theta};
}

/**
 * 
 * @param {} c1 an object containing information on the first cirlce {X, Y, r}
 * @param {} c2 an object containing information on the first cirlce {X, Y, r}
 * @returns true if the circles collide, false if they do not
 */
let circleCollision = (c1, c2) => {
    const distBetweenCenters = Math.sqrt(Math.pow(c1.X - c2.X, 2) + Math.pow(c1.Y - c2.Y, 2));
    if(distBetweenCenters > (c1.r + c2.r)) return false;
    return true;
}
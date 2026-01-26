export const stars = await fetch("/data/stars.json")
    .then(r => r.json());

export const toCartesianCoordinates = (radius = 1, coord = stars) => {
    const count = coord.length;
    const cartesian = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const raDeg = coord[i].RA;
        const decDeg = coord[i].DE;

        const ra = raDeg * Math.PI / 180;
        const dec = decDeg * Math.PI / 180;

        const x = radius * Math.cos(dec) * Math.sin(ra);
        const y = radius * Math.sin(dec);
        const z = radius * Math.cos(dec) * Math.cos(ra);
        
        cartesian[i * 3 ] = x;
        cartesian[i * 3 +1] = y;
        cartesian[i * 3 +2] = z;
    }
    return cartesian;
};

export const getMagnitude = (db = stars) => {
    const starsNumber = db.length;
    const particlesSizes = new Float32Array(starsNumber);
    for(let i = 0; i < starsNumber; i++) {
        
        particlesSizes[i] = db[i].Vmag < 6.0 ? Math.pow(10, -0.2 * db[i].Vmag) : 0.0; 
        //this method needs to be fixed from the shader because the stars with small size are
        // still show (probably there is a min size in the shader)
    }
    return particlesSizes;
}
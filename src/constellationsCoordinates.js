import { toCartesianCoordinates } from "./particlesCoordinates";

export const constellations = await fetch("/data/rawConstellations.json")
    .then(r => r.json());
export const stars = await fetch("/data/stars.json")
    .then(r => r.json());


export const polarConstellations = () => {
    let arr = [];
    const  count = constellations.length;

    for (let i = 0; i < count; i++) {
        let constellation = {};
        constellation.abr = constellations[i].abr;
        constellation.nr = constellations[i].nr;
        for (let j = 1; j <= constellations[i].nr; j++) {
            const tag = (j < 10 ? "s0" : "s") + j;
            constellation[tag] = {
                "RA": stars[constellations[i][tag]*1 - 1].RA,
                "DE": stars[constellations[i][tag]*1 - 1].DE
            };
        }
        arr.push(constellation);
    }
    return(arr);
};


export const cartesianConstellations = radius => {
    const cartesianStars = toCartesianCoordinates(radius, stars); //this is Flaot32Array
    //the points coordinates of star i can be found at (i-1)*3

    let arr2 = [];
    const  count = constellations.length;
    
    for (let i = 0; i < count; i++) {
        let constellation = {};
        constellation.abr = constellations[i].abr;
        constellation.nr = constellations[i].nr;
        for (let j = 1; j <= constellations[i].nr; j++) {
            const tag = (j < 10 ? "s0" : "s") + j;
            constellation[tag] = {
                "x": cartesianStars[(constellations[i][tag]*1 - 1)*3],
                "y": cartesianStars[(constellations[i][tag]*1 - 1)*3 + 1],
                "z": cartesianStars[(constellations[i][tag]*1 - 1)*3 + 2]
            }
        }
        arr2.push(constellation);
    }
    return arr2;
}

import * as THREE from 'three';
import { cartesianConstellations } from './constellationsCoordinates';
import { LineGeometry } from 'three/examples/jsm/Addons.js';

export const constellationsLines = (coordinates = cartesianConstellations) => {
    const count = coordinates.length;
    const constellationsArray = [];
    const lineMaterial = new THREE.LineBasicMaterial( { color: 0xff00ff } );

    for (let i = 0; i < count; i++) {
        const lineGeometry = new THREE.BufferGeometry();
        const thisConstellation = coordinates[i];
        const last = thisConstellation.nr;
        const linePoints = new Float32Array(last * 3);
        for (let j = 1; j <= last; j++) {
            const tag = (j < 10 ? 's0' : 's') + j;
            linePoints[(j-1)*3] = thisConstellation[tag].x;
            linePoints[(j-1)*3 + 1] = thisConstellation[tag].y;
            linePoints[(j-1)*3 + 2] = thisConstellation[tag].z;
        }
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePoints, 3));
        constellationsArray[i] = new THREE.Line(lineGeometry, lineMaterial);

    }
    return constellationsArray;
};
precision mediump float;

void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard; // circular points
    gl_FragColor = vec4(1.0);
}
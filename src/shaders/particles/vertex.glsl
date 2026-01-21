uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute float aSize;

void main() {
    gl_PointSize = aSize * 6.7;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
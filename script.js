import * as THREE from "three";

// Create Canvas
const canvas = document.querySelector("#canvask");
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

//Create Ball
const geometry = new THREE.SphereGeometry(15, 64, 32);
// Colors Ball
const material = new THREE.MeshStandardMaterial({
  color: "blue",
});
const mesh = new THREE.Mesh(geometry, material);
//Activates Shadow
mesh.castShadow = true; //default is false
mesh.receiveShadow = false;

// Creates Sun
const sunGeometry = new THREE.SphereGeometry(15, 64, 32);
const sunMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffaa,
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);

const aspectRatio = { width: window.innerWidth, height: window.innerHeight };

// Creates Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
);

sun.position.y = 70;
sun.position.x = -140;

camera.position.z = 100;

renderer.setSize(aspectRatio.width, aspectRatio.height);

const sunlight = new THREE.DirectionalLight(0xffffaa, 1.0);

const scene = new THREE.Scene();

// Sets the background color of the scene
renderer.setClearColor(0x666600, 0.5);
scene.add(mesh);
sunlight.position.set(-50, 0, 0);
scene.add(sunlight);
scene.add(sun);

// Generates animations
function animate() {
  requestAnimationFrame(animate);
  render();
}

let y = "up";
let x = "right";

// Colors to change the ball to
const colors = [
  0xff0000, 0xff7f00, 0xffff00, 0x00ff00, 0x0000ff, 0x4b0082, 0x8a2be2,
];

// Randomly pick a color for the ball
function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

// moves the ball on the y axis
function yAxis() {
  const reachPosY = mesh.position.y < 50;
  const reachNegY = mesh.position.y > -50;

  if (y === "up" && reachPosY) mesh.position.y++;
  else if (y === "up" && !reachPosY) {
    y = "down";
    material.color.set(getRandomColor());
    mesh.position.y--;
  } else if (y === "down" && reachNegY) {
    mesh.position.y--;
  } else if (y === "down" && !reachNegY) {
    y = "up";
    material.color.set(getRandomColor());

    mesh.position.y++;
  }
}

// moves the ball on the x axis
function xAxis() {
  const reachPosX = mesh.position.x < 120;
  const reachNegX = mesh.position.x > -120;

  if (x === "right" && reachPosX) mesh.position.x++;
  else if (x === "right" && !reachPosX) {
    x = "left";
    material.color.set(getRandomColor());
    mesh.position.x--;
  } else if (x === "left" && reachNegX) {
    mesh.position.x--;
  } else if (x === "left" && !reachNegX) {
    x = "right";
    material.color.set(getRandomColor());
    mesh.position.x++;
  }
}

// renders the scene to screen
function render() {
  yAxis();
  xAxis();
  renderer.render(scene, camera);
}

animate();

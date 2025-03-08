const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector('.background').appendChild(renderer.domElement);

const starCount = 50000;
const starGeometry = new THREE.BufferGeometry();
const starPositions = new Float32Array(starCount * 3);

for (let i = 0; i < starCount * 3; i++) {
    starPositions[i] = (Math.random() - 0.5) * 4000;
}

starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

const starMaterial = new THREE.PointsMaterial({
    color: 0xff5555,
    size: 0.2,
    opacity: 0.7,
    transparent: true
});

const starPoints = new THREE.Points(starGeometry, starMaterial);
scene.add(starPoints);

camera.position.z = 1000;

function animate() {
    requestAnimationFrame(animate);
    starPoints.rotation.x += 0.0005;
    starPoints.rotation.y += 0.0005;
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});
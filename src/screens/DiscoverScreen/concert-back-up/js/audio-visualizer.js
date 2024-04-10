const canvas = document.getElementById('analyserCanvas');
const ctx = canvas.getContext('2d');
const audioEl = document.querySelector('#bg-music');
let audioContext;
let analyser;
let sourceNode;
let dataArray;
let lastColorChangeTime = 0;
let currentColor = `rgb(255, 0, 0)`; // Start with red

// Set up the audio context and analyser
function setupAudio() {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  analyser = audioContext.createAnalyser();
  sourceNode = audioContext.createMediaElementSource(audioEl);

  sourceNode.connect(analyser);
  analyser.connect(audioContext.destination);
  sourceNode.connect(audioContext.destination);

  dataArray = new Uint8Array(analyser.frequencyBinCount);
}

// Draw the visualizer
function draw() {
  requestAnimationFrame(draw);

  analyser.getByteFrequencyData(dataArray);

  // Check for color change every second
  const now = Date.now();
  if (now - lastColorChangeTime > 1000) {
    // Change color
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    currentColor = `rgb(${r},${g},${b})`;
    lastColorChangeTime = now;
  }

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let barWidth = canvas.width / dataArray.length;
  let barHeight;

  // Draw each bar
  for (let i = 0; i < dataArray.length; i++) {
    barHeight = (dataArray[i] / 256) * canvas.height; // Scale bar height
    ctx.fillStyle = currentColor;
    ctx.fillRect(
      i * barWidth, // x
      canvas.height - barHeight, // y
      barWidth, // width
      barHeight, // height
    );
  }

  // Trigger the texture update for A-Frame
  const visualizerEl = document.querySelector('#visualizer');
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  visualizerEl.getObject3D('mesh').material.map = texture;
  visualizerEl.getObject3D('mesh').material.needsUpdate = true;
}

// User interaction to start everything
document.body.addEventListener('click', function () {
  if (!audioContext) {
    setupAudio();
    draw();
    audioEl.play();
  } else if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('analyserCanvas');
  const ctx = canvas.getContext('2d');
  const audioEl = document.querySelector('#bg-music');
  let audioContext;
  let analyser;
  let sourceNode;
  let dataArray;

  // Set up the audio context and analyser
  function setupAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    sourceNode = audioContext.createMediaElementSource(audioEl);

    sourceNode.connect(analyser);
    analyser.connect(audioContext.destination);
    sourceNode.connect(audioContext.destination);

    dataArray = new Uint8Array(analyser.frequencyBinCount);
    danceToMusic(); // Start the dance loop
  }

  function danceToMusic() {
    if (!dataArray) return;

    // Get the average frequency of the first few bins to determine the intensity
    let sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += dataArray[i];
    }
    let average = sum / 10;

    // Map this average to a scale factor
    let scale = average / 128 + 0.5; // +0.5 to ensure the model doesn't get too small

    // Apply the scale to the model
    const animeGirl = document.querySelector('#animated-girl');
    animeGirl.object3D.scale.set(scale, scale, scale);

    // Rotate the model based on the frequency
    animeGirl.object3D.rotation.y += 0.05;

    // Repeat this function on the next animation frame
    requestAnimationFrame(danceToMusic);
  }

  // User interaction to start everything
  document.body.addEventListener('click', function () {
    if (!audioContext) {
      setupAudio();
      audioEl.play();
    } else if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
  });
});

// === STATE HUD ===
let hudState = {
  speed: 0,
  gear: 'gear',
  fuel: 'fuel',
  health: 'health',
  engineOn: false,
};

// === DOM ELEMENTS ===
const speedDisplay = document.getElementById('speed');
const gearDisplay = document.getElementById('gear');
const fuelDisplay = document.getElementById('fuel');
const fuelBar = document.getElementById('fuelBar');
const healthDisplay = document.getElementById('health');

// === UPDATE FUNCTION ===
function updateHUD({ speed, gear, fuel, health, engineOn }) {
  if (typeof speed === 'number') {
    hudState.speed = speed;
    speedDisplay.textContent = String(speed).padStart(3, '0');
  }

  if (gear) {
    hudState.gear = gear;
    gearDisplay.textContent = gear;
  }

  if (typeof fuel === 'number') {
    hudState.fuel = Math.max(0, Math.min(100, fuel));
    fuelDisplay.textContent = hudState.fuel;
    fuelBar.style.width = hudState.fuel + '%';
  }

  if (typeof health === 'number') {
    hudState.health = Math.max(0, Math.min(100, health));
    healthDisplay.textContent = hudState.health + '%';
  }

  if (typeof engineOn === 'boolean') {
    hudState.engineOn = engineOn;
    document.querySelector('.hud').style.opacity = engineOn ? '1' : '0.4';
  }
}

// === YOUTUBE PLAYER ===
function loadVideo() {
  const url = document.getElementById('ytUrl').value;
  const ytFrame = document.getElementById('ytFrame');
  let videoId = '';

  if (url.includes('v=')) {
    videoId = url.split('v=')[1].split('&')[0];
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1];
  }

  if (videoId) {
    ytFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  } else {
    alert('URL YouTube tidak valid!');
  }
}

// === LISTENER UNTUK GAME (NUI EVENT) ===
window.addEventListener('message', (event) => {
  if (event.data.type === 'updateHUD') {
    updateHUD(event.data.payload);
  }
});

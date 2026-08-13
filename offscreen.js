chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'play_audio') {
    playChime();
    sendResponse({ success: true });
  }
});

let audioCtx = null;

function playChime() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  // Memutar suara notifikasi yang lembut (soft chime) menggunakan Web Audio API
  const playTone = (freq, time, duration) => {
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime + time);
    
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime + time);
    gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + time + 0.05); // Attack
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + time + duration); // Decay
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start(audioCtx.currentTime + time);
    osc.stop(audioCtx.currentTime + time + duration);
  };

  // Mainkan 2 nada (C5 kemudian E5)
  playTone(523.25, 0, 0.4); 
  playTone(659.25, 0.15, 0.6); 
}

document.addEventListener('DOMContentLoaded', async () => {
  const waterToggle = document.getElementById('water-toggle');
  const stretchToggle = document.getElementById('stretch-toggle');
  const intervalSelect = document.getElementById('interval-select');
  const testBtn = document.getElementById('test-btn');
  const statusBadge = document.getElementById('status-badge');
  const statusText = document.getElementById('status-text');

  // Load saved settings
  const result = await chrome.storage.local.get(['waterEnabled', 'stretchEnabled', 'interval']);
  waterToggle.checked = result.waterEnabled !== false; // Default true
  stretchToggle.checked = result.stretchEnabled !== false; // Default true
  intervalSelect.value = result.interval || '30';

  updateStatusDisplay();

  // Save settings on change
  waterToggle.addEventListener('change', async () => {
    await chrome.storage.local.set({ waterEnabled: waterToggle.checked });
    updateStatusDisplay();
    updateAlarms();
  });

  stretchToggle.addEventListener('change', async () => {
    await chrome.storage.local.set({ stretchEnabled: stretchToggle.checked });
    updateStatusDisplay();
    updateAlarms();
  });

  intervalSelect.addEventListener('change', async () => {
    await chrome.storage.local.set({ interval: intervalSelect.value });
    updateAlarms();
  });

  // Test Notification Button
  if (testBtn) {
    testBtn.addEventListener('click', async () => {
      // Visual click effect feedback
      testBtn.style.opacity = '0.7';
      setTimeout(() => { testBtn.style.opacity = '1'; }, 200);

      await chrome.runtime.sendMessage({ action: 'testNotification' });
    });
  }

  function updateStatusDisplay() {
    const isWater = waterToggle.checked;
    const isStretch = stretchToggle.checked;

    if (isWater && isStretch) {
      statusText.textContent = 'Dewi Aktif';
      statusBadge.classList.remove('disabled');
    } else if (isWater) {
      statusText.textContent = 'Minum Saja';
      statusBadge.classList.remove('disabled');
    } else if (isStretch) {
      statusText.textContent = 'Peregangan Saja';
      statusBadge.classList.remove('disabled');
    } else {
      statusText.textContent = 'Nonaktif';
      statusBadge.classList.add('disabled');
    }
  }

  async function updateAlarms() {
    await chrome.runtime.sendMessage({ action: 'updateAlarms' });
  }
});

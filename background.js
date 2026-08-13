// Install / Startup
chrome.runtime.onInstalled.addListener(async () => {
  const result = await chrome.storage.local.get(['waterEnabled', 'stretchEnabled', 'interval']);
  if (result.waterEnabled === undefined) {
    await chrome.storage.local.set({
      waterEnabled: true,
      stretchEnabled: true,
      interval: '30'
    });
  }
  setupAlarms();
});

chrome.runtime.onStartup.addListener(() => {
  setupAlarms();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateAlarms') {
    setupAlarms();
    sendResponse({ success: true });
  } else if (message.action === 'testNotification') {
    chrome.storage.local.get(['waterEnabled', 'stretchEnabled']).then(result => {
      let alarmName = 'combinedAlarm';
      if (result.waterEnabled && result.stretchEnabled) {
        alarmName = 'combinedAlarm';
      } else if (result.waterEnabled) {
        alarmName = 'waterAlarm';
      } else if (result.stretchEnabled) {
        alarmName = 'stretchAlarm';
      }
      fireNotification(alarmName);
    });
    sendResponse({ success: true });
  }
  return true;
});

async function setupAlarms() {
  await chrome.alarms.clearAll();
  
  const result = await chrome.storage.local.get(['waterEnabled', 'stretchEnabled', 'interval']);
  const intervalMinutes = parseInt(result.interval || '30', 10);

  if (result.waterEnabled && result.stretchEnabled) {
    chrome.alarms.create('combinedAlarm', { periodInMinutes: intervalMinutes });
  } else if (result.waterEnabled) {
    chrome.alarms.create('waterAlarm', { periodInMinutes: intervalMinutes });
  } else if (result.stretchEnabled) {
    chrome.alarms.create('stretchAlarm', { periodInMinutes: intervalMinutes });
  }
}

let creatingOffscreenPromise = null;
async function createOffscreen() {
  if (await chrome.offscreen.hasDocument()) return;
  
  if (creatingOffscreenPromise) {
    await creatingOffscreenPromise;
    return;
  }
  
  creatingOffscreenPromise = chrome.offscreen.createDocument({
    url: 'offscreen.html',
    reasons: ['AUDIO_PLAYBACK'],
    justification: 'Memutar suara notifikasi pengingat'
  });
  
  try {
    await creatingOffscreenPromise;
  } catch (e) {
    // Ignore error if document was created in the meantime
  } finally {
    creatingOffscreenPromise = null;
  }
}

async function fireNotification(alarmName) {
  // Create offscreen document and send message to play sound
  await createOffscreen();
  chrome.runtime.sendMessage({ action: 'play_audio' }).catch(() => {});

  if (alarmName === 'combinedAlarm') {
    chrome.notifications.create('combined-notify-' + Date.now(), {
      type: 'basic',
      iconUrl: 'icons/icon-128.png',
      title: 'Waktunya Minum Air & Peregangan!',
      message: 'Halo! Dewi di sini mengingatkanmu untuk minum air dan regangkan badanmu sejenak agar tetap segar dan fokus.',
      priority: 2
    });
  } else if (alarmName === 'waterAlarm') {
    chrome.notifications.create('water-notify-' + Date.now(), {
      type: 'basic',
      iconUrl: 'icons/icon-128.png',
      title: 'Waktunya Minum Air!',
      message: 'Halo! Dewi di sini mengingatkanmu untuk minum air agar tetap segar dan fokus.',
      priority: 2
    });
  } else if (alarmName === 'stretchAlarm') {
    chrome.notifications.create('stretch-notify-' + Date.now(), {
      type: 'basic',
      iconUrl: 'icons/icon-128.png',
      title: 'Waktunya Peregangan!',
      message: 'Yuk, regangkan badanmu sejenak! Tarik napas panjang dan lemaskan otot-ototmu.',
      priority: 2
    });
  }
}

chrome.alarms.onAlarm.addListener(async (alarm) => {
  await fireNotification(alarm.name);
});

importScripts('userAgents.js');

// User-Agent Randomization
chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    let randomAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
    for (let header of details.requestHeaders) {
      if (header.name.toLowerCase() === 'user-agent') {
        header.value = randomAgent;
      }
    }
    return { requestHeaders: details.requestHeaders };
  },
  { urls: ["<all_urls>"] },
  ["blocking", "requestHeaders"]
);

// WebRTC Blocking
chrome.runtime.onInstalled.addListener(() => {
  chrome.privacy.network.webRTCIPHandlingPolicy.set({
    value: 'disable_non_proxied_udp'
  });
});




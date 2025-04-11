// Block Cloudways tracking scripts
const blockCloudways = () => {
  const blockedDomains = [
    'cloudways.com',
    'tracking.cloudways.com',
    'stats.cloudways.com'
  ];

  const observer = new MutationObserver(() => {
    document.querySelectorAll('script').forEach(script => {
      if (blockedDomains.some(domain => script.src.includes(domain))) {
        script.remove();
      }
    });
  });

  observer.observe(document, { childList: true, subtree: true });
};

blockCloudways();

// Spoof location
navigator.geolocation.getCurrentPosition = function(success, error) {
  const position = {
    coords: {
      latitude: 37.7749,
      longitude: -122.4194,
      accuracy: 100
    }
  };
  success(position);
};

// Time bypass (override Date object)
(function() {
  const fakeDate = new Date('2023-01-01T00:00:00Z');
  const OriginalDate = Date;

  window.Date = class extends OriginalDate {
    constructor(...args) {
      return args.length === 0 ? new OriginalDate(fakeDate) : new OriginalDate(...args);
    }
    static now() {
      return fakeDate.getTime();
    }
  };
})();

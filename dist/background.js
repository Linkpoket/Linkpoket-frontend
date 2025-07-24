// Background script
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'SAVE_ACCESS_TOKEN') {
    chrome.storage.local.set({
      access_token: message.payload,
    });
  }

  if (message.type === 'GET_ACCESS_TOKEN') {
    chrome.storage.local.get(['access_token'], (result) => {
      sendResponse({ data: result.access_token });
    });
    return true;
  }

  if (message.type === 'SAVE_PERSONAL_PAGE_DATA') {
    chrome.storage.local.set({
      personalPageData: message.payload,
    });
  }

  if (message.type === 'GET_PERSONAL_PAGE_DATA') {
    chrome.storage.local.get(['personalPageData'], (result) => {
      sendResponse({ data: result.personalPageData });
    });
    return true;
  }
});

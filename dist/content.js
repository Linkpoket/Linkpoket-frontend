// Content script
//accessToken을 chrome.runtime.sendMessage를 통해 전달 (로컬 환경 및 프로덕션 환경)
if (
  ['http://localhost:5173', 'https://linkrew.com'].includes(location.origin)
) {
  const token = localStorage.getItem('access_token');
  const pageData = localStorage.getItem('personalPageData');

  if (token) {
    chrome.runtime.sendMessage({ type: 'SAVE_ACCESS_TOKEN', payload: token });
  }
  if (pageData) {
    chrome.runtime.sendMessage({
      type: 'SAVE_PERSONAL_PAGE_DATA',
      payload: pageData,
    });
  }
}

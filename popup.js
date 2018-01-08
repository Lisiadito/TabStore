function getAllUrls(sessionName) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  let queryInfo = {
    currentWindow: true
  };

  chrome.tabs.query(queryInfo,function(tabs){    
    let tabUrls = []
    tabs.forEach(tab => {
      tabUrls.push(tab.url)
    }) 
    saveSession(sessionName, tabUrls)
 })
}

function saveSession(sessionName, tabs) {
  let session = {}
  session[sessionName] = tabs
  chrome.storage.sync.set(session)
}

/**
 * Change the background color of the current page.
 *
 * @param {string} color The new background color.
 */
function changeBackgroundColor(color) {
  let script = 'document.body.style.backgroundColor="' + color + '";';
  // See https://developer.chrome.com/extensions/tabs#method-executeScript.
  // chrome.tabs.executeScript allows us to programmatically inject JavaScript
  // into a page. Since we omit the optional first argument "tabId", the script
  // is inserted into the active tab of the current window, which serves as the
  // default.
  chrome.tabs.executeScript({
    code: script
  });
}

document.addEventListener('DOMContentLoaded', () => {
  let saveButton = document.getElementById('savebtn')
  

  saveButton.addEventListener('click', () => {
    let sessionName = document.getElementById('sessionname').value
    if(sessionName) {
      getAllUrls(sessionName) 
    } else {
      //dont know maybe an alert 
    }
  })
})

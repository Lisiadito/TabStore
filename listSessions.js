async function loadSessionList() {
  const sessions = await getSavedSessions()
  
  $('#SessionList').empty()

  $.each(sessions, (key, value) => {
    $('#SessionList').append(`<option value=${key}>${key}</option><`)
  })
}

function getSavedSessions() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get((sessions) => {
      
      if(!chrome.runtime.lastError) {
        resolve(sessions)
      } else {
        reject(chrome.runtime.lastError)
      }
    })
  })
}

function restoreSavedSession() {
  const session = document.getElementById('SessionList');
  const sessionKey = session.options[session.selectedIndex].value;
  
  chrome.storage.sync.get(sessionKey, (sessionObj) => {
    chrome.tabs.query({}, function (tabs) {
      
      for (let i = 0; i < tabs.length; i++) {
        chrome.tabs.remove(tabs[i].id);
      }
    })

    const links = sessionObj[sessionKey]
    
    for(let link of links) {      
      chrome.tabs.create({url:link})
    }
  })
}

function removeSavedSession() {
  const session = document.getElementById('SessionList');
  const sessionKey = session.options[session.selectedIndex].value;
  chrome.storage.sync.remove(sessionKey)
  // update list
  loadSessionList()
}

document.addEventListener('DOMContentLoaded', () => {
    loadSessionList()
    let restore = document.getElementById('restore')
    let remove = document.getElementById('remove')
    restore.addEventListener('click', () => restoreSavedSession())
    remove.addEventListener('click', () => removeSavedSession())
})
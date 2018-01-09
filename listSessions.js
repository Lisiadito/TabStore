async function loadSessionList() {
  let sessions = await getSavedSessions()

  $.each(sessions, (key, value) => {
    $("#SessionList").append(`<option value=${key}>${key}</option><`)
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
  var session = document.getElementById("SessionList");
  var sessionKey = session.options[session.selectedIndex].value;
  
  chrome.storage.sync.get(sessionKey, (sessionObj) => {
    chrome.tabs.query({}, function (tabs) {
      
      for (var i = 0; i < tabs.length; i++) {
        chrome.tabs.remove(tabs[i].id);
      }
    })

    let links = sessionObj[sessionKey]
    
    for(let link of links) {      
      chrome.tabs.create({url:link})
    }
  })
}

function removeSavedSession() {
  var session = document.getElementById("SessionList");
  var sessionKey = session.options[session.selectedIndex].value;
  chrome.storage.sync.remove(sessionKey)

  //reload page and new list
}

document.addEventListener('DOMContentLoaded', () => {
    loadSessionList()
    let restore = document.getElementById('restore')
    let remove = document.getElementById('remove')
    restore.addEventListener('click', () => restoreSavedSession())
    remove.addEventListener('click', () => removeSavedSession())
})
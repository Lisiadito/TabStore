function getAllUrls(sessionName) {
  const queryInfo = {
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

document.addEventListener('DOMContentLoaded', () => {
  let saveButton = document.getElementById('savebtn')
  
  saveButton.addEventListener('click', () => {
    const sessionName = document.getElementById('sessionname').value
    if(sessionName) {
      getAllUrls(sessionName) 
    }
  })
})

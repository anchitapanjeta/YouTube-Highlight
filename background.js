/*what we want to do here is listen to any updates in our tab system and find the most recent tab
or the tab that we're on currently and see if it's a youtube page So we're going to have a listner
that's going to listen the tabs. And if ypu remeber we got permissions to acceess thr chrome tabs API. 
And we're going to listen for an update to tabs. 
// The parameters we are given is a tabID and a tab.*/

// chrome.tabs.onUpdated.addListener((tabID,tab)=>{
//     // l9-> we just want to make sure we're on a page that has that specifically as a url
//     if(tab.url && tab.url.includes("youtube.com/watch")){
//         // set our query parameters as a unique id for each videos.so we can grab it from storage
//         const queryParameter = tab.url.split("?")
//         // add your URL prameters. 
//         const urlParameters = new URLSearchParams(queryParameters);
//         console.log(urlParameters);
//         // send message takes a tab id it takes a unique object
//         chrome.tabs.sendMessage(tabId, {
//             type: "NEW", //this a type of event is a new video event
//             videoId: urlParameters.get("v"),
        
//         })
// })

chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("youtube.com/watch")) {
      const queryParameters = tab.url.split("?")[1];
      const urlParameters = new URLSearchParams(queryParameters);
  
      chrome.tabs.sendMessage(tabId, {
        type: "NEW",
        videoId: urlParameters.get("v"),
      });
    }
  });
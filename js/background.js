// background logic lives in chrome extension; therefore, web features are available in this js; for example: console
// console.log('--------background-------');

/*
*
* A background page is loaded when it is needed, and unloaded when it goes idle. Some examples of events include:
* The extension is first installed or updated to a new version.
* The background page was listening for an event, and the event is dispatched.
* A content script or other extension sends a message.
* Another view in the extension, such as a popup, calls runtime.getBackgroundPage.
* */

/*
* Notification [type="image"]
* */

const notificationOption = (number, url) => {
  if(number > 5) {
    return {
      type: "basic",
      iconUrl: "../assets/danger.png",
      title: "DANGER",
      message: "Too many bad words...",
      contextMessage: url
    }
  }
  if(number > 3) {
    return {
      type: "basic",
      iconUrl: "../assets/warning.png",
      title: "WARNING",
      message: "bad words...",
      contextMessage: url
    }
  }
};

$('body').append('<h1>TEST purpose</h1>');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  // sendResponse("Got message");
  if(request.msg === "BadgeUpdate") {
    // typeof request.counter = number
    // alert(typeof request.counter);
    chrome.browserAction.setBadgeText({"text": request.counter.toString()});
    if(request.counter > 5) {
      chrome.browserAction.setBadgeBackgroundColor({"color": "#FF0000"});
      chrome.notifications.create("dangerNotification", notificationOption(request.counter, request.url));
    }
    else if(request.counter > 3) {
      chrome.browserAction.setBadgeBackgroundColor({"color": "#FFA500"});
      chrome.notifications.create("warningNotification", notificationOption(request.counter, request.url));
    } else {
      chrome.browserAction.setBadgeBackgroundColor({"color": "#00008b"});
    }

    const user = window.localStorage.getItem('loggedIn');

    if(user) { // logged in? then, save it
      console.log('logged in!');
      console.log(user);
      const string = window.localStorage.getItem(user);
      const data = JSON.parse(string);
      data.badWords.push({
        counter: request.counter,
        url: request.url,
        title: request.title,
        time: request.time
      });

      window.localStorage.setItem(user, JSON.stringify(data));
    }
  }
});

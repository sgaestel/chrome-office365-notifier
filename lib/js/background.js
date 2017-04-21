chrome.runtime.onMessage.addListener(function(message) {
    chrome.notifications.create({
        title: "Meeting: " + message.title,
        type: "basic",
        "message": message.location,
        contextMessage: message.remainingTime + " " + message.remainingTimeUnit,
        iconUrl: "icon.png"
    });
});

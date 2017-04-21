chrome.runtime.onMessage.addListener(function(message) {
    if (message.type === "calendar") {
        chrome.notifications.create({
            title: message.title,
            type: "basic",
            message: message.location,
            contextMessage: message.remainingTime + " " + message.remainingTimeUnit,
            iconUrl: "calendar.png"
        });
    } else if (message.type === "email") {
        chrome.notifications.create({
            title: message.sender,
            type: "basic",
            message: message.object || "(No Object)",
            contextMessage: message.content,
            iconUrl: "email.png"
        });
    }
});

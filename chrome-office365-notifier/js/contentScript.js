console.log("Loaded extension !!!");
var calendarNotifications = [];
var emailNotifications = [];

function checkMeetings() {
    var newNotifications = [];
    var notificationsToWarn = [];

    $(".o365cs-notifications-notificationPopup .o365cs-notifications-reminders-listPanel").each(function(index, elem) {
        newNotifications.push({
            type: "calendar",
            title: $(elem).find(".o365cs-notifications-reminders-title").text(),
            remainingTime: $(elem).find(".o365cs-notifications-toastReminders-timeToStartValue").text(),
            remainingTimeUnit: $(elem).find(".o365cs-notifications-reminders-timeToStartUnit").text(),
            location: $(elem).find(".o365cs-notifications-reminders-location").text()
        });
    });

    notificationsToWarn = _.differenceBy(newNotifications, calendarNotifications, function(notif) {
        return notif.title;
    });
    notificationsToWarn = notificationsToWarn.concat(_.filter(newNotifications, function(notif) {
        return notif.remainingTime === "0";
    }));

    notificationsToWarn = _.sortedUniqBy(notificationsToWarn, function(notif) {
        return notif.title;
    });

    calendarNotifications = newNotifications;

    _.forEach(notificationsToWarn, function(notif) {
        chrome.runtime.sendMessage(notif);
    });

    setTimeout(checkMeetings, 5000);
}

function checkEmails() {
    var newNotifications = [];
    var notificationsToWarn = [];

    $(".o365cs-notifications-newMailPopupButtonContent").each(function(index, elem) {
        var notificationContent = $(elem).find(".o365cs-notifications-text");
        newNotifications.push({
            type: "email",
            sender: $(notificationContent[1]).text(),
            object: $(notificationContent[2]).text(),
            content: $(notificationContent[3]).text()
        });
    });

    notificationsToWarn = _.differenceBy(newNotifications, emailNotifications, function(notif) {
        return notif.sender + notif.object + notif.content;
    });

    emailNotifications = newNotifications;

    _.forEach(notificationsToWarn, function(notif) {
        chrome.runtime.sendMessage(notif);
    });

    setTimeout(checkEmails, 3000);
}

checkMeetings();
checkEmails();

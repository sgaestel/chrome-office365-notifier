console.log("Loaded extension !!!");
var notifications = [];

function checkNotifications() {
    var newNotifications = [];
    $(".o365cs-notifications-notificationPopup .o365cs-notifications-reminders-listPanel").each(function(index, elem) {
        newNotifications.push({
            title: $(elem).find(".o365cs-notifications-reminders-title").text(),
            remainingTime: $(elem).find(".o365cs-notifications-toastReminders-timeToStartValue").text(),
            remainingTimeUnit: $(elem).find(".o365cs-notifications-reminders-timeToStartUnit").text(),
            location: $(elem).find(".o365cs-notifications-reminders-location").text()
        });
    });

    notificationsToWarn = _.differenceBy(newNotifications, notifications, function(notif) {
        return notif.title;
    });
    notificationsToWarn = notificationsToWarn.concat(_.filter(newNotifications, function(notif) {
        return notif.remainingTime === "0";
    }));

    notificationsToWarn = _.sortedUniqBy(notificationsToWarn, function(notif) {
        return notif.title;
    });

    notifications = newNotifications;

    _.forEach(notificationsToWarn, function(notif) {
        chrome.runtime.sendMessage(notif);
    });

    setTimeout(checkNotifications, 5000);
}

checkNotifications();

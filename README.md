# Chrome Push Notifications (for Meteor)

## Play with the Push Notification API
> Currently, this only logs into the console the subscriptionId. It should send that subscriptionId to the server and link it to the current user.

### How to use

1. Add package (`canotto90:chrome-push-notifications`).
2. Add an enabling button:
  1. If using MaterializeCSS, just declare `{{> push_notification_enabling_button}}` somewhere in your HTML.
  2. If not, you have to create an HTML template for the enabling button, containing a checkbox. The id of the Checkbox must be "push-button".
3. Add `"gcm_sender_id": "<your project number>"` and `"gcm_user_visible_only": true`, to your `manifest.json` file.
4. Define your service worker in `/public/service-worker.js`.

#### Sample service worker

```javascript
self.addEventListener('push', showNotification)
self.addEventListener('notificationclick', closeNotificationAndOpenWindow)

function showNotification(event) {
  console.log('Received a push message', event)

  var title = 'Yay a message.'
  var body = 'We have received a push message.'
  var icon = '/images/icon-192x192.png'
  var tag = 'simple-push-demo-notification-tag'

  event.waitUntil(
    self.registration.showNotification(title, {
    body: body,
    icon: icon,
    tag: tag
  })
  )
}

function closeNotificationAndOpenWindow(event) {
  console.log('On notification click: ', event.notification.tag)
  // Android doesn’t close the notification when you click on it
  // See: http://crbug.com/463146
  event.notification.close()

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i]
      if (client.url == '/' && 'focus' in client)
        return client.focus()
    }
    if (clients.openWindow)
      return clients.openWindow('/')
  }))
}
```

> Note: the service worker cannot be added (at least easily) from an smart package, as it needs to be at the root path, and all files exported from a package go into '/package/package_name/'. Redirections aren't allowed to bypass this restriction.

### How to send push notifications once you have the subscriptionId

`curl --header "Authorization: key={{your_api_key}}" --header Content-Type:"application/json" https://android.googleapis.com/gcm/send -d "{\"registration_ids\":[\"{{subscriptionId}}\"]}"`

#### Others

Most code has been extracted (and quite refactored) from http://updates.html5rocks.com/2015/03/push-notificatons-on-the-open-web.

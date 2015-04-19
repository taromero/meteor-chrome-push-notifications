Package.describe({
  name: 'canotto90:chrome-push-notifications',
  version: '0.0.3',
  summary: 'Add push notifications for Chrome browsers',
  git: 'https://github.com/taromero/meteor-chrome-push-notifications.git',
  documentation: 'README.md'
})

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.1')
  api.use('templating@1.1.0')
  api.addFiles('subscription-manager.js', 'client')
  api.addFiles('service-worker.js', 'client')
  api.addFiles('service-worker-registration.js', 'client')
  api.addFiles('push_notification_enabling_button.html', 'client')
  api.addFiles('push_notification_enabling_button.js', 'client')
})


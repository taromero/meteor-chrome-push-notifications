Template.push_notification_enabling_button.rendered = function() {
  registerServiceWorker()
}

Template.push_notification_enabling_button.events({
  'click #push-button': manageSubscription
})

function manageSubscription(evt) {
  var subscriptionManager = SubscriptionManager(evt.currentTarget)
  if (isPushEnabled) {
    subscriptionManager.unsubscribe()
  } else {
    subscriptionManager.subscribe()
  }
}

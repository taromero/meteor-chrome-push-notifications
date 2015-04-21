Meteor.methods({
  save_subscription: function(subscriptionId) {
    if (!PnSubscriptions.findOne({ subscription_id: subscriptionId })) {
      PnSubscriptions.insert({ subscription_id: subscriptionId })
    }
    return true
  },
  broadcast_push_notifications: function() {
    subscription_ids = PnSubscriptions.find().map(getSubscriptionIds)
    HTTP.post('https://android.googleapis.com/gcm/send', {
      headers: {
        'Authorization': 'key=' + Meteor.settings.push_notifications_key,
        'Content-Type': 'application/json'
      },
      data: {
        registration_ids: subscription_ids
      }
    })

    function getSubscriptionIds(subscription) {
      return subscription.subscription_id
    }
  }
})

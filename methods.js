Meteor.methods({
  save_subscription: function(subscriptionId) {
    if (!PnSubscriptions.findOne({ subscription_id: subscriptionId })) {
      PnSubscriptions.insert({ subscription_id: subscriptionId })
    }
    return true
  },
  remove_subscription: function(subscriptionId) {
    return PnSubscriptions.remove({ subscription_id: subscriptionId })
  },
  broadcast_push_notifications: function(password) {
    if (Meteor.settings.push_notifications_password) {
      if (password != Meteor.settings.push_notifications_password) {
        throw new Meteor.Error(401, 'Incorrect password to send push notification broadcast')
      }
    }
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

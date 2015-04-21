SubscriptionManager = function(pushButton) {
  return {
    subscribe: function() {
      navigator.serviceWorker.ready
        .then(getPushManagerSubscription)
        .then(linkSubscriptionToUser)
        .catch(informSubscriptionError)
    },
    unsubscribe: function() {
      navigator.serviceWorker.ready
        .then(getPushManagerSubscription)
        .then(checkAndUnsubscribe)
        .then(updateUI)
        .catch(informUnsubscriptionError)
    }
  }

  function getPushManagerSubscription(serviceWorkerRegistration) {
    return serviceWorkerRegistration.pushManager.subscribe()
  }

  function linkSubscriptionToUser(subscription) {
    isPushEnabled = true

    console.log(subscription)

    return sendSubscriptionToServer(subscription)

    function sendSubscriptionToServer(subscription) {
      return new Promise(function(resolve, reject) {
        Meteor.call('save_subscription', subscription.subscriptionId, function(err, res) {
          if (err) {
            reject(Error(err))
          } else {
            resolve(res)
          }
        })
      })
    }
  }

  function informSubscriptionError(e) {
    if (Notification.permission === 'denied') {
      // Push permission denied previously by the user.
      console.warn('Permission for Notifications was denied')
      pushButton.disabled = true
    } else {
      // A problem occurred with the subscription; common reasons
      // include network errors, and lacking gcm_sender_id and/or
      // gcm_user_visible_only in the manifest.
      console.error('Unable to subscribe to push.', e)
      pushButton.disabled = false
    }
  }

  function checkAndUnsubscribe(pushSubscription) {
    if (!pushSubscription) {
      return;
    }
    var subscriptionId = pushSubscription.subscriptionId
    // UnlinkSubscriptionFromUser()
    console.warn('unsubscribing ', pushSubscription)
    return pushSubscription && pushSubscription.unsubscribe()
  }

  function updateUI() {
    console.warn('unsubscribed')
    pushButton.disabled = false
    isPushEnabled = false
  }

  function informUnsubscriptionError(e) {
    console.log('Unsubscription error: ', e)
    pushButton.disabled = false
  }
}


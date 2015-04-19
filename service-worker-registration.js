registerServiceWorker = function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(checkPreconditions)
      .then(waitForServiceWorkerToBeReady)
      // subscriptions are per device/browser, not per user. if there's an existing one, link it with current user.
      .then(getPushManagerSubscription)
      .then(sendSubscriptionToServer)
      .then(enablePushOnUI)
      .catch(warn)
  } else {
    console.warn('Service workers aren\'t supported in this browser.')
  }

  return;

  function waitForServiceWorkerToBeReady() {
    return navigator.serviceWorker.ready
  }

  function getPushManagerSubscription(serviceWorkerRegistration) {
    return serviceWorkerRegistration.pushManager.getSubscription()
  }

  function sendSubscriptionToServer(subscription) {
    if (!subscription) {
      return;
    }
    // change switch state
    $('#push-button').attr('checked', 'checked')

    // call that resolves promise sending subscription to server
    console.log(subscription)
  }

  function warn(msg) {
    console.warn(msg)
  }

  function enablePushOnUI() {
    var pushButton = document.querySelector('#push-button')
    pushButton.disabled = false
    isPushEnabled = true
  }

  function checkPreconditions() {
    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
      console.warn('Notifications aren\'t supported.')
      return false;
    }

    if (Notification.permission === 'denied') {
      console.warn('The user has blocked notifications.')
      return false;
    }

    if (!('PushManager' in window)) {
      console.warn('Push messaging isn\'t supported.')
      return false;
    }

    return true
  }
}


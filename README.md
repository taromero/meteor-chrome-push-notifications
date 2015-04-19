# Chrome Push Notifications (for Meteor)

### How to use

1. Add package (`canotto90:chrome-push-notifications`).
2.
  a. If using MaterializeCSS, just add a call to `{{> push_notification_enabling_button}}` somewhere in your HTML.
  b. If not, you have to create an HTML template for the enabling button. The input should have a "push-button" id.
3. Add `"gcm_sender_id": "<your project number>"` and `"gcm_user_visible_only": true`, to your `manifest.json` file.

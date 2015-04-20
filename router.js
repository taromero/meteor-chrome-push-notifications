// we need to serve the service-worker file from the root path, to avoid scope issues
Router.route('/service-worker.js', function() {
  this.response.writeHead(302, {
    'Location': '/packages/canotto90_chrome-push-notifications/service-worker.js'
  });

  this.response.end();
}, { where: 'server' })

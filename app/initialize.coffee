Application = require 'application'

# Initialize the application on DOM ready event.
$(document).on 'ready', ->
  window.app = Application
  window.app.initialize({errorLevel:'DEBUG'})

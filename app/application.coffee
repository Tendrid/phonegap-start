Application =
  _errorLevels:
    DEBUG:10
    INFO:20
    WARN:30
    ERROR:40
    CRITICAL:50
  headers: ->
    'X-Xsrftoken' :$.cookie('_xsrf')
    'X-Errorlevel':@_errorLevels[@errorLevel]

  initialize: ->
    @bindEvents()
    return

  
  bindEvents: ->
    document.addEventListener "deviceready", @onDeviceReady, false
    return

  
  onDeviceReady: ->
    app.receivedEvent "deviceready"
    return

  
  receivedEvent: (id) ->
    parentElement = document.getElementById(id)
    listeningElement = parentElement.querySelector(".listening")
    receivedElement = parentElement.querySelector(".received")
    listeningElement.setAttribute "style", "display:none;"
    receivedElement.setAttribute "style", "display:block;"
    console.log "Received Event: " + id
    return
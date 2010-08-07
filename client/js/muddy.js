var output     = '#output pre',
    input      = '#input input',
    cmdHistory = [], server

var format = function(data) {
  return data.replace(/;40/g, '')
             .replace(/�/g, '')
             .replace(/\[0m/g,    "</span>")
             .replace(/\[0;30m/g, "<span class='black'>")
             .replace(/\[1;30m/g, "<span class='black bold'>")
             .replace(/\[0;31m/g, "<span class='red'>")
             .replace(/\[1;31m/g, "<span class='red bold'>")
             .replace(/\[0;32m/g, "<span class='green'>")
             .replace(/\[1;32m/g, "<span class='green bold'>")
             .replace(/\[0;33m/g, "<span class='yellow'>")
             .replace(/\[1;33m/g, "<span class='yellow bold'>")
             .replace(/\[0;34m/g, "<span class='blue'>")
             .replace(/\[1;34m/g, "<span class='blue bold'>")
             .replace(/\[0;35m/g, "<span class='magenta'>")
             .replace(/\[1;35m/g, "<span class='magenta bold'>")
             .replace(/\[0;36m/g, "<span class='cyan'>")
             .replace(/\[1;36m/g, "<span class='cyan bold'>")
             .replace(/\[0;37m/g, "<span class='white'>")
             .replace(/\[1;37m/g, "<span class='white bold'>")
             .replace(/\[1m/g, "<span class='bold'>")
             .replace(/\[3m/g, "<span class='italic'>")
             .replace(/\[4m/g, "<span class='underline'>")
             .replace(/\[22m/g, "<span class='no-bold'>")
             .replace(/\[23m/g, "<span class='no-italic'>")
             .replace(/\[24m/g, "<span class='no-underline'>")
}

var sendCommand = function(command) {
  server.send(command)

  $(output).append("<span class='self'>> " + command + "</span>\n")
  
  lockScroll()
  updateHistory(command)
}

var updateTerminal = function(data) {
  $(output).append(format(data))

  lockScroll()
}

var lockScroll = function() {
  $(output).attr({
    scrollTop: $(output).attr('scrollHeight')
  })
}

var updateHistory = function(command) {
  if (cmdHistory.length == 25) {
    cmdHistory.pop(0)
  }

  cmdHistory.push(command)
}

var initialize = function() {
  server = new WebSocket('ws://127.0.0.1:6660/muddy') 
  server.onmessage = function(event) {
    updateTerminal(event.data)
  }

  $('form').submit(function() {
    sendCommand($(input).val())
    $(input).val('')

    return false;
  })
}

$(document).ready(function() {
  initialize()
})

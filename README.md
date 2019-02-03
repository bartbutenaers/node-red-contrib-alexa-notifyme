# node-red-contrib-alexa-notification
Node-RED node to take control of your Alexa, by sending it your own notifications

## Install
Run the following npm command in your Node-RED user directory (typically ~/.node-red):
```
npm install node-red-contrib-alexa-notifyme
```

## Node configuration

### Notification
This notification will be send to the Alexa device.  

Remarks:
+ When empty, the notification needs to be specified inside the ```msg.payload``` of the input message.
+ Needs to be empty when the ```msg.payload``` wants to override it.

### Access code
See this <a target="_blank" href="http://www.thomptronics.com/notify-me">link</a> for detailed information how to get your own private access code.</p>

## Disclaimer
Remark: The icon made by <a href="https://www.flaticon.com/authors/those-icons" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>

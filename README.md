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
There are two ways to send notifications: 
+ hard coding the notification in the node or 
+ sending the notification to the node in ```msg.payload```.

If you hard code the notification in the node, that notification will always be used no matter what you have in ```msg.payload```.

If you leave the 'notification' option empty in the node, then the contents of ```msg.payload``` will be sent. Valid msg.payload types are string', 'number', 'boolean', and 'timestamp'. 'JSON' and 'buffer' are not allowed.

When empty, the notification needs to be specified in ```msg.payload``` of the input message.

### Access code
```Access Code``` is ```required``` for communications with Alexa. See this <a target="_blank" href="http://www.thomptronics.com/notify-me">link</a> for detailed information how to get your own private access code.</p>

## Disclaimer
Remark: The icon made by <a href="https://www.flaticon.com/authors/those-icons" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>

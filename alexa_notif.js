/**
 * Copyright 2019 Bart Butenaers
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
module.exports = function(RED) {
    "use strict";
    var request = require("request");

    function AlexaNotifyMeNode(config) {
        RED.nodes.createNode(this, config);
        this.notification = config.notification;
        
        var node = this;

        // Use the timeout specified in the settings.js file, or a default of 120 seconds
        if (RED.settings.httpRequestTimeout) { 
            this.reqTimeout = parseInt(RED.settings.httpRequestTimeout) || 120000; 
        }
        else { 
            this.reqTimeout = 120000; 
        }

        this.on("input",function(msg) {
            var notification = node.notification;  // start by grabbing the node's notification content
            var errmsg = "";

			var msgType = typeof msg.payload;
			
 			switch(msgType) {
 				case "boolean" :  
 					// if msg.payload is a BOOLEAN make it a string
 					msg.payload = (msg.payload) ? "True":"False";
 	                notification = msg.payload;
 					break;
 				case "number"  :  
 					// if msg.payload is a NUMBER make it a string
 	                notification =  msg.payload;
 					break;
 				case "string"  :  
 					// if msg.payload is a string use it unless it is empty 
 					// then use the node's notification
 					if (msg.payload == ""){
        		    	msg.payload = node.notification;
 		           		notification = msg.payload;
        		    } else {
 		           		notification = msg.payload;
        		    }
 					break;
 				case "object":
					// OBJECTs are not allowed
     				errmsg = "JSON and Buffers not allowed";
     				break;
   				default: 
     				errmsg = "No matching TYPEOF";
 			}

           
            if (!errmsg) {
                node.status({});
            } else {
                node.warn(RED._(errmsg));
                node.status({fill:"red",shape:"ring",text: errmsg});
                return;
            }

            if (!notification) {
                node.warn(RED._("No notification has been specified (in node config or msg.payload"));
                node.status({fill:"red",shape:"ring",text:"no notification"});
                return;
            }

            var opts = {};
            opts.url = "https://api.notifymyecho.com/v1/NotifyMe";
            opts.timeout = node.reqTimeout;
            opts.method = "POST";
            
            // Setup the URL parameters
            opts.body = JSON.stringify({
                "notification": msg.payload,
                "accessCode": node.credentials.accessCode
            });

            opts.headers = {};
            opts.headers["Content-Type"] = "application/json";
            opts.headers["Content-Length"] = opts.body.length;

            // Send the notification request to the Alexa service
            request(opts, function(err, res, body) {
                if (err) {
                    if(err.code === 'ETIMEDOUT' || err.code === 'ESOCKETTIMEDOUT') {
                        node.error("no response from alexa service within timeout interval", msg);
                        node.status({fill:"red", shape:"ring", text:"no response"});
                    }
                    else{
                        node.error(err,msg);
                        node.status({fill:"red", shape:"ring", text:err.code});
                    }
                    msg.payload = err.toString() + " : " + url;
                    msg.statusCode = err.code;
                }
                else {
                    msg.statusCode = res.statusCode;
                    msg.headers = res.headers;
                    msg.responseUrl = res.request.uri.href;
                    msg.payload = body;

                    node.status({});
                }
                
                node.send(msg);
            });
        });

        this.on("close",function() {
            node.status({});
        });
    }

    RED.nodes.registerType("alexa-notifyme",AlexaNotifyMeNode,{
        credentials: {
            accessCode: {type: "password"}
        }
    });
}

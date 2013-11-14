Node HTTP/JSON Client
=============

In developing Service Oriented Architectures, I find that it's helpful to create 
clients for HTTP services so developers writing applications that consume the 
the service can skip learning the details and use a simplified interface. This 
client of "layered architecture" is a handy way to ensure code reuse across 
system components and reduce complexity (which, in SOAs, is even more important 
than normal). 

On my projects we almost always use JSON as the data format, so to save everyone some 
time I wrote this thin wrapper around the venerable [request](https://github.com/mikeal/request) 
project.

Usage
----- 
    httpjson = require('node-httpjson-client');

    var MyClient = function() {};
    MyClient.prototype = new httpjson.Client();

    MyClient.prototype.getUser = function(id, callback) {
        this._request("GET", "http://myserver.com/user/" + id, null, null, callback);
    };

Now you can package your MyClient module as an npm project and other components 
in your system that need to consume the "myserver.com" service can include 
your MyClient module as a dependency.

For example
-----
    MyServerClient = require("myserver-client");

    myServerClient = new MyServerClient();
    myServerClient.get(1, function(user) { console.log(user); });

Added bonus is that, as your "myserver.com" service evolves, you can change 
whatever you want as long as you honor the interface defined in your MyServer
package. Woot.
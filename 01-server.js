//creating my first own web server

const http = require('http')
/*This loads the core http module and stores it in our http variable. require()²⁰ is a globally
accessible function in Node.js and is always available. http is a core module, which means that
it is always available to be loaded via require(). Later on we’ll cover third-party modules that need
to be installed before we can load them using require().*/

const port = process.env.PORT || 1338
/*Here we choose which port our web server should listen to for requests. We store the port number
in our port variable.
Also, we encounter a Node.js global object, process²¹. process is a global object²² with information
about the currently running process, in our case it’s the process that is spawned when we run node
01-server.js. process.env is an object that contains all environment variables. If we were to run
the server with PORT=3000 node 01-server.js instead, process.env.PORT would be set to 3000.
Having environment variable control over port usage is a useful convention for deployment, and
we’ll be starting that habit early */

const server = http.createServer(function(req, res){

    res.setHeader('Content-Type', 'application/json') /*In this example, we’re going to let the client know our response is JSON-formatted data by setting
    the Content-Type response header. In certain browsers this will allow the JSON data to be displayed
    with pretty printing and syntax highlighting. To set the Content-Type we use the res.setHeader()²⁶
    method */
    res.end(JSON.stringify({text: 'h1', number: [1, 2, 3]})) /*Next, we use the same method as last time to send data and close the connection. The only difference
    is that instead of sending plain text, we’re sending a JSON-stringified object*/

    //res.end('h1')
});
/*We use http.createServer()²³ to create a HTTP server
object and assign it to the server variable. http.createServer() accepts a single argument: a request
listener function.
Our request listener function will be called every time there’s an HTTP request to our server (e.g.,
each time you hit http://localhost:1337 in your browser). Every time it is called, this function
will receive two arguments: a request object²⁴ (req) and a response object²⁵ (res).
For now we’re going to ignore req, the request object. Later on we’ll use it to get information about
the request like url and headers.
The second argument to our request listener function is the response object, res. We use this object
to send data back to the browser. We can both send the string 'hi' and end the connection to the
browser with a single method call: res.end('hi').
At this point our server object has been created. If a browser request comes in, our request listener
function will run, and we’ll send data back to the browser.*/

server.listen(port);
/*Finally, for convenience, we print a message telling us that our server is running and which port it’s
listening on*/

console.log(`Server listening on port ${port}`)
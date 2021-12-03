/*
------------------ BASIC ROUTING ------------------------

Not all client requests are the same, and to create a useful API, we should be able to respond
differently depending on the requested url path.
We previously ignored the request object argument, req, and now we’re going to use that to see
what url path the client is requesting. Depending on the path, we can do one of three things:
• respond with plain text,
• respond with JSON, or
• respond with a 404 “Not Found” error.*/

const http = require('http')

const port = process.env.PORT || 1339

function respondText(req, res){
    res.setHeader('Content-Type', 'text/plain')
    res.end('hi')
}

function respondJson(req, res){
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ text: 'hi', numbers: [1, 2, 3] }))
}

/*The third function will have new behavior. For this one, we’ll respond with a 404 “Not Found” error.
To do this, we use the res.writeHead()²⁹ method. This method will let us set both a response status
code and header. We use this to respond with a 404 status and to set the Content-Type to text/plain.

The 404 status code tells the client that the communication to the server was successful, but the
server is unable to find the requested data.
After that, we simply end the response with the message "Not Found":
*/
function respondNotFound(req, res){
    res.writeHead(404, {'Content-Type': 'text/plain'})
    res.end('Not Found')
}

const server = http.createServer(function(req, res){
   if(req.url === '/') return respondText(req, res)
   if(req.url === '/json') return respondJson(req, res)

   respondNotFound(req, res)
})

server.listen(port)
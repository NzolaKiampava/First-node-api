const http = require('http')
const querystring = require('querystring')

const port = process.env.PORT || 1340

function respondText(req, res){
    res.setHeader('Content-Type', 'plain/text')
    res.end('h1')
}

function respondJson(req, res){
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({text : 'h1', numbers : [1, 2, 3]}))
}

function respondNotFound(req, res){
    res.writeHead(404, {'Content-Type' : 'text/plain'})
    res.end('404 - NOT FOUND')
}

/*Next, we create the respondEcho() function that will accept the request and response objects. Here’s
what the completed function looks like:*/
function respondEcho(req, res){
    const { input = ''} = querystring.parse(
        req.url
          .split('?')
          .slice(1)
          .join('')
    ) /*We expect the client to access this endpoint with a url like /echo?input=someinput. querystring.parse()
    accepts a raw querystring argument. It expects the format to be something like query1=value1&query2=value2.
    The important thing to note is that querystring.parse() does not want the leading ?. Using some
    quick string transformations we can isolate the input=someinput part of the url, and pass that in as
    our argument.
    querystring.parse() will return a simple JavaScript object with query param key and value pairs.
    For example, { input: 'someinput' }. Currently, we’re only interested in the input key, so that’s
    the only value that we’ll store. If the client doesn’t provide an input parameter, we’ll set a default
    value of ''. */
    
    res.setHeader('Content-Type', 'application/json')

    /*Finally, we use res.end() to send data to the client and close the connection: */
    res.end(
        JSON.stringify({
            normal: input,
            shouty: input.toUpperCase(),
            characterCount: input.length,
            backwards: input
                .split('')
                .reverse()
                .join('')
        })
    )
} 

const server = http.createServer(function(req, res){
    if (req.url === '/') return respondText(req, res)
    if (req.url === '/json') return respondJson(req, res)
    if (req.url.match(/^\/echo/)) return respondEcho(req, res)

    respondNotFound(req, res)
})

server.listen(port)
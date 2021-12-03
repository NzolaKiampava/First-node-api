/**
 * FILE SERVING
 * 
 * One of the most common uses of a web server is to serve html and other static files. Let’s take a look
at how we can serve up a directory of files with Node.js.
What we want to do is to create a local directory and serve all files in that directory to the browser. If
we create a local directory called public and we place two files in there, index.html and ember.jpg,
we should be able to visit http://localhost:1337/static/index.html and http://localhost:1337/static/ember.
to receive them. If we were to place more files in that directory, they would behave the same way.
To get started, let’s create our new directory public and copy our two example files, index.html
and ember.jpg into it.

The first thing we’ll need to do is to create a new function for static file serving and call it when a
request comes in with an appropriate req.url property. To do this we’ll add a fourth conditional to
our request listener that checks for paths that begin with /static and calls respondStatic()
 */
const fs = require('fs')
const http = require('http')
const querystring = require('querystring')


const port = process.env.PORT || 1350

function respondText(req, res){
    res.setHeader('Content-Type', 'text/plain')
    res.end('WELCOME')
}

function respondJson(req, res){
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({Deloper : 'Nzola', Numbers : [1,2,3]}))
}

function respondNotFound(req, res){
    res.writeHead(404, {'Content-Type':'text/plain'})
    res.end('PAGE NOT FOUND')
}

function respondEcho(req, res){
    const {input = ''} = querystring.parse(
        req.url
            .split('?')
            .slice(1)
            .join('')
    )
    res.setHeader('Content-Type', 'application/json')

    res.end(
        JSON.stringify({
            Name: input,
            Shouty: input.toUpperCase(),
            CharacterCount: input.length,
            Backwards: input
                .split('')
                .reverse()
                .join('')
        })
    )
}

function respondStatic(req, res){
    const filename = `${__dirname}/public${req.url.split('/static')[1]}`
    fs.createReadStream(filename)
      .on('error', () => respondNotFound(req, res))
      .pipe(res)
}
/**
 * The first line is fairly straightforward. We perform a simple conversion so that we can translate the
incoming req.url path to an equivalent file in our local directory. For example, if the req.url is
/static/index.html, this conversion will translate it to public/index.html.
Next, once we have our filename from the first line, we want to open that file and send it to the
browser. However, before we can do that, we need to use a module that will allow us to interact with
the filesystem. Just like http and querystring, fs is a core module that we can load with require().

We use the fs.createReadStream() method to create a Stream object representing our chosen file.
We then use that stream object’s pipe() method to connect it to the response object. Behind the
scenes, this efficiently loads data from the filesystem and sends it to the client via the response
object.

We also use the stream object’s on() method to listen for an error. When any error occurs when
reading a file (e.g. we try to read a file that doesn’t exist), we send the client our “Not Found”
response.
If this doesn’t make much sense yet, don’t worry. We’ll cover streams in more depth in later chapters.
The important thing to know is that they’re a very useful tool within Node.js, and they allow us to
quickly connect data sources (like files) to data destinations (client connections).

*/

const server = http.createServer(function(req, res){
    if(req.url === '/') return respondText(req, res)
    if(req.url === '/json') return respondJson(req, res)
    if(req.url.match(/^\/echo/)) return respondEcho(req, res)
    if(req.url.match(/^\/static/)) return respondStatic(req, res)

    respondNotFound(req, res)
})

server.listen(port)
console.log(`server listening on port ${port}`)
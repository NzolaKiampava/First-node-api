             // EXPRESS

const express = require('express')
const fs = require('fs')
const querystring = require('querystring')

const port = process.env.PORT || 1351

const app = express()

app.get('/',respondText)
app.get('/json', respondJson)
app.get('/echo', respondEcho)
app.get('/static/*', respondStatic)
/** 
 * This means that our server will call respondStatic() for any path that begins with /static/.
What makes this particularly helpful is that express will make the wildcard match available on
the request object. Later we’ll be able to use req.params to get the filenames for file serving. For
our respondStatic() function, we can take advantage of wildcard routing. In our /static/* route,
the star will match anything that comes after /static/. That match will be available for us at
req.params[0].
Behind the scenes, express uses path-to-regexp³² to convert route strings into regular expressions.
To see how different route strings are transformed into regular expressions and how parts of the
path are stored in req.params there’s the excellent Express Route Tester³³ tool.
 */

app.listen(port, () => console.log(`Server listening on port ${port}`))

function respondText(req, res){
    res.setHeader('Content-Type', 'text/plain')
    res.end('WELCOME')
}

function respondJson(req, res){
    res.setHeader('Content-Type', 'text/plain')
    res.end(JSON.stringify({Nome : 'Kiampava', Numbers : [1, 2, 3]}))
}

function respondEcho(req, res){
    const {input = ''} = querystring.parse(
        req.url
            .split('?')
            .slice(1)
            .join('')
    )

    res.setHeader('Content-Type', 'text/plain')
    res.end(
        JSON.stringify(
        input = input,
            CharacterCount = input.lenght,
            Upper = input.isUpperCase,
            Lower = input.isLowerCase,
            Backwards = input
                .split('')
                .reverse()
                .join('')
    ))
}
//Here’s how we can take advantage of req.params in our respondStatic() function:
function respondStatic(req, res){
    const filename = `${__dirname}/public${req.params[0]}`
    fs.createReadStream(filename)
      .on('error', () => respondNotFound(req, res))
      .pipe(res)
}
function respondNotFound(req, res){
    res.setHeader('Content-Type', 'text/plain')
    res.end('ERRO 404')
}

/**
 * With just a few changes we’ve converted our core http server to an express server. In the process
we gained more powerful routing and cleaned up a few of our functions.
 */

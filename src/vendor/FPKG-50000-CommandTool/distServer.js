require('dotenv').config()
var express = require('express')
var app = express()
var opn = require('opn')
var proxy = require('express-http-proxy'); 
var port = process.env.DIST_PORT;
var distPath = process.cwd() + '/dist'

app.use('/api', proxy('118.232.237.16:33199'));
app.use('/static', express.static(distPath + '/static'))


app.get('/*', (req, res) => {
    res.sendfile(distPath + '/index.html')
})

app.listen(port, () => {
    let url = `http://localhost:${port}`
    console.log(`打包後檢視位址: ${url}`)
    opn(url, {app: 'google chrome'});
})
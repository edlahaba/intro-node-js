const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')

/**
 * this function is blocking, fix that
 * @param {String} name full file name of asset in asset folder
 */
const findAsset = (name, cb) => {
  const assetPath = path.join(__dirname, 'assets', name)

  return fs.readFile(assetPath, {encoding: 'utf-8'}, (err, data) => {
    cb.write(data || '');
    cb.end();
  });
}

const hostname = '127.0.0.1'
const port = 3000

// log incoming request coming into the server. Helpful for debugging and tracking
const logRequest = (method, route, status) => console.log(method, route, status)

const server = http.createServer((req, res) => {
  const method = req.method
  const route = url.parse(req.url).pathname
  // this is sloppy, especially with more assets, create a "router"
  if (route === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'})
    findAsset('index.html', res);
    logRequest(method, route, 200)
  } else {
    try {
      findAsset(route.replace('/',''), res);
    } catch(e) {
      console.log(`resource not found ${e}`)
      return;
    }
  }
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

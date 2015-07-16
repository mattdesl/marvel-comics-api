var urljoin = require('url-join')
var assign = require('object-assign')
var md5 = require('md5')

// replaced by xhr in browser
var request = require('got')

var version = 'v1'
var endpoint = 'https://gateway.marvel.com'

module.exports = marvelApi
function marvelApi (api, opt, cb) {
  opt = assign({ json: true }, opt)

  var publicKey = opt.publicKey
  var privateKey = opt.privateKey
  if (typeof publicKey !== 'string' || typeof privateKey !== 'string') {
    throw new Error('must specify both publicKey and privateKey')
  }

  var time = String(Date.now())
  
  // strip start and end slash to avoid Marvel 404ing
  api = api.replace(/^\/|\/$/g, '')
  var url = urljoin(endpoint, version, 'public', api)
  
  opt.query = assign({}, opt.query, {
    apikey: publicKey,
    ts: time,
    hash: md5(time + privateKey + publicKey)
  })

  request(url, opt, cb)
}

var assign = require('object-assign')
var xhr = require('xhr')
var querystring = require('querystring')
var URL = require('url')

module.exports = request
function request (url, opt, cb) {
  opt = assign({}, opt)

  var parsed = URL.parse(url)
  var query = opt.query

  if (query) {
    if (typeof query !== 'string') {
      query = querystring.stringify(query)
    }
    parsed.search = '?' + query
    parsed.path = parsed.pathname + parsed.search
    parsed.query = query
  }
  
  delete opt.uri
  opt.url = URL.format(parsed)
  xhr(opt, function (err, resp, body) {
    cb(err, body, resp)
  })
}

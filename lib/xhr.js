// The client-side request
var assign = require('object-assign')
var xhr = require('xhr')
var querystring = require('querystring')

module.exports = requestXHR
function requestXHR (url, opt, cb) {
  opt = assign({}, opt)

  var query = opt.query
  if (query) {
    if (typeof query !== 'string') {
      query = querystring.stringify(query)
    }
    url = url + '?' + query
  }

  delete opt.uri
  opt.url = url
  xhr(opt, function (err, resp, body) {
    cb(err, body, resp)
  })
}

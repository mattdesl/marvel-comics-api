var noop = function () {}
var api = require('../')
var publicKey = require('./key-public.json')

var pages = 2
var numPages = 0
var images = []
var ignores = [
  'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708'
]

var container = document.querySelector('.images')
var error = document.querySelector('.error')

paginate({
  limit: 50
}, function (err) {
  if (err) {
    error.innerText = 'Error: ' + err.message
    error.removeAttribute('hidden')
    throw err
  }
  
  console.log('Total images:', images.length)
})

function paginate (query, cb) {
  cb = cb || noop
  query = query || {}
  api('characters', {
    publicKey: publicKey,
    query: query,
    timeout: 6000
  }, function (err, body, resp) {
    if (err) {
      return cb(new Error('invalid request; Marvel server may have timed out'))
    }
    if (!(/^2/.test(resp.statusCode))) {
      return cb(new Error(body.status || body.message))
    }
    var data = body.data
    data.results
      .filter(validItem)
      .forEach(function (item) {
        var thumb = item.thumbnail
        var uri = thumb.path + '/standard_medium.' + thumb.extension
        images.push(uri)
        
        var figure = document.createElement('figure')
        figure.style.backgroundImage = 'url(' + uri + ')'
        container.appendChild(figure)
      })

    // paginate
    var offset = data.offset
    var count = data.count
    numPages++
    if (numPages < pages && offset + count < data.total) {
      query.offset = offset + count
      paginate(query, cb)
    } else {
      cb(null)
    }
  })

  function validItem (item) {
    if (!item.thumbnail || !item.thumbnail.path) {
      return false
    }
    var thumb = item.thumbnail
    return thumb.path.indexOf('image_not_available') === -1
      && ignores.indexOf(thumb.path) === -1
  }
}

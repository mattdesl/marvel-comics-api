var noop = function () {}
var api = require('../')
var publicKey = require('./key-public.json')

var pages = 4
var numPages = 0
var images = []
var ignores = [
  'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708',
  'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708'
]

paginate({ limit: 40 }, function (err) {
  if (err) throw err
  console.log('Total images:', images.length)
})

var parent = document.createElement('div')
document.body.appendChild(parent)

function paginate (query, cb) {
  cb = cb || noop
  query = query || {}
  api('characters', {
    publicKey: publicKey,
    query: query
  }, function (err, body, resp) {
    if (err) return cb(err)
    if (!(/^2/.test(resp.statusCode))) {
      throw new Error(body.status || body.message)
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
        parent.appendChild(figure)
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

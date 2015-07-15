var conf = require('./.api.json')
var noop = function () {}
var api = require('../')

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
    publicKey: conf.publicKey,
    privateKey: conf.privateKey,
    query: query
  }, function (err, body) {
    if (err) return cb(err)
    var data = body.data

    data.results
      .filter(validItem)
      .forEach(function (item) {
        var thumb = item.thumbnail
        var uri = thumb.path + '/standard_medium.' + thumb.extension

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

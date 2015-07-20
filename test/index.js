var api = require('../')
var test = require('tape')
var publicKey = require('./key-public.json')
var privateKey = require('./key-private.json')

test('requests Marvel API JSON', function (t) {
  t.plan(3)
  api('characters', {
    publicKey: publicKey,
    privateKey: privateKey,
    query: {
      limit: 2
    }
  }, function (err, body, res) {
    if (err) t.fail(err)
    t.equal(res.statusCode, 200)
    t.equal(body.code, res.statusCode)
    t.equal(body.data.count, 2)
  })
})

test('allows slashes in API entry', function (t) {
  t.plan(3)
  api('/characters/', {
    publicKey: publicKey,
    privateKey: privateKey,
    query: {
      limit: 2
    }
  }, function (err, body, res) {
    if (err) t.fail(err)
    t.equal(res.statusCode, 200)
    t.equal(body.code, res.statusCode)
    t.equal(body.data.count, 2)
  })
})

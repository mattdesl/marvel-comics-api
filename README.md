# marvel-comics-api

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

A simple interface around the [Marvel Comics API](http://developer.marvel.com/documentation/getting_started). Suited for Node and the Browser.

<img src="http://i.imgur.com/bwmmTSt.jpg" width="80%" />  
<sup>screenshot from [the demo](./test/demo.js)</sup>

## Motivation

The existing modules are a bit over-engineered and also 300-400kb after compression. This one has a simpler interface, uses [xhr](http://npmjs.com/package/xhr) in the browser, and bundles to about 12kb.

## Install

```sh
npm install marvel-comics-api --save
```

## Example

```js
var api = require('marvel-comics-api')

// fetch 50 Marvel characters
api('characters', {
  publicKey: '.. your public key ..',
  privateKey: '.. your private key ..',
  timeout: 4000,
  query: {
    limit: 50
  }
}, function (err, body) {
  if (err) throw err
  
  // total # of items
  console.log(body.data.total)
  
  // array of characters
  console.log(body.data.results)
})
```

## Usage

[![NPM](https://nodei.co/npm/marvel-comics-api.png)](https://www.npmjs.com/package/marvel-comics-api)

#### `marvelApi(api, opt, cb)`

Requests the given `api` string, like `'characters'` or `'{characterId}/stories'`. 

Options:

- `publicKey` (string) 
  - **required** - your public API key
- `privateKey` (string)
  - **required** - your private API key
- `query` (object) 
  - query parameters given to the request, such as `limit` or `'nameStartsWith'`
- `timeout` (number)
  - number of milliseconds before timeout; default 0 (no timeout)
- `headers` (object)
  - optional headers to pass along with the request
  
Other parameters will be sent to [got](npmjs.com/package/got) (node) and [xhr](npmjs.com/package/xhr).

The `cb` is called with `(err, body, response)` where `err` will be null/undefined if the request succeeds, `body` will be a parsed JSON object from the request, and `response` will be the response headers from the XHR/HTTP request.

## Running Demos & Tests

Clone & install:

```sh
git clone https://github.com/mattdesl/marvel-comics-api.git
cd marvel-comics-api
npm install
```

You will need a Marvel Developer account. Once you have API keys, copy them into a file in `test/.api.json` that looks like this:

```json
{
  "privateKey": "egadg545151232d02ea0b9asdfasdfd5699a",
  "publicKey": "badsg1cbadsggagafdh0"
}
```

Now you can run the tests and demos:

```
# run browser demo on localhost:9966
npm start

# run node/browser unit tests
npm test
```

## See Also

- [marvel](https://www.npmjs.com/package/marvel)
- [marvel-api](https://www.npmjs.com/package/marvel-api)

## License

MIT, see [LICENSE.md](http://github.com/Jam3/marvel-comics-api/blob/master/LICENSE.md) for details.

# marvel-comics-api

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

A simple interface around the [Marvel Comics API](http://developer.marvel.com/documentation/getting_started). Suited for Node and the Browser.

[demo](http://mattdesl.github.io/marvel-comics-api/test/) - [source](./test/demo.js)

[<img src="http://i.imgur.com/bwmmTSt.jpg" width="80%" />](http://mattdesl.github.io/marvel-comics-api/test/)

## Motivation

The existing modules ([marvel](https://www.npmjs.com/package/marvel), [marvel-api](https://www.npmjs.com/package/marvel-api)) are a bit over-engineered and also 300-400kb after compression. This one has a simpler interface, uses [xhr](http://npmjs.com/package/xhr) in the browser, and bundles to roughly 13kb.

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

In the browser, and once you've set up referrers, the `privateKey` field is not needed.

[Consult the API documentation](https://developer.marvel.com/) for details on the JSON response.

## Usage

[![NPM](https://nodei.co/npm/marvel-comics-api.png)](https://www.npmjs.com/package/marvel-comics-api)

#### `req = marvelApi(api, opt, cb)`

Requests the given `api` string, like `'characters'` or `'{characterId}/stories'`. 

Options:

- `publicKey` (string) 
  - **required** - your public API key
- `privateKey` (string)
  - **optional** - your private API key, see [Private Key](#private-key) for details
- `query` (object) 
  - query parameters given to the request, such as `limit` or `'nameStartsWith'`
- `timeout` (number)
  - number of milliseconds before timeout; default 0 (no timeout)
- `headers` (object)
  - optional headers to pass along with the request
  
Other parameters will be sent to [got](npmjs.com/package/got) (node) and [xhr](npmjs.com/package/xhr).

The `cb` is called with `(err, body, response)` where `err` will be null/undefined if the request succeeds, `body` will be a parsed JSON object from the request, and `response` will be the response headers from the XHR/HTTP request.

#### `req.abort()`

Aborts the request early, sending an error to the callback.

## Private Key

The `privateKey` is necessary for server-side use. 

In the browser, if you've set up authorized referrers in your [Marvel Developer Account](https://developer.marvel.com/account), you can ignore the `privateKey` field. This way you can avoid publishing your private key in the final JavaScript bundle. 

However, it can still be useful to use `privateKey` in the browser for quick prototyping and a unified code path.

## Building from Source

If you want to run the unit tests and demo from source:

```sh
git clone https://github.com/mattdesl/marvel-comics-api.git
cd marvel-comics-api
npm install
```

#### running the demo

You can run the demo without a Marvel Developer account.

```sh
npm run start
```

Now open [http://127.0.0.1:9966/](http://127.0.0.1:9966/) in your browser to see the result.

#### running tests

You will need a Marvel Developer account to run the tests. Once you have API keys, you will need to change the `test/key-public.json` to a string with your public API. Then you will need to add a new file, `test/key-private.json` with a string containing your private key, like this:

```json
"fgavg545151232d02ea0b9asdfasdfd5699a"
```

After that, you should be able to run the tests in Node/browser:

```sh
npm test
```

Using your own Marvel Account, the browser demo will only work locally once you've authorized `127.0.0.1` (your local IP) as a referrer.

## See Also

- [marvel-comics-api-stream](https://github.com/mattdesl/marvel-comics-api-stream)

## License

MIT, see [LICENSE.md](http://github.com/Jam3/marvel-comics-api/blob/master/LICENSE.md) for details.

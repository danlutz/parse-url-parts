# parse-url-parts

![npm](https://img.shields.io/npm/v/parse-url-parts.svg)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/parse-url-parts.svg)

A lightweight JavaScript library for parsing RFC 1738 compliant Uniform Resource Locators (URLs).

# Description

Parses the following parts any RFC 1738 compliant url:

- protocol
- userinfo (username + password, as found in FTP urls)
- host
- subDomains
- rootDomain
- topLevelDomain
- port
- path
- query parameters
- fragment

<div align="center" style="background-color: #fff; padding: 10px">
    <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/URI_syntax_diagram.png" alt="URI syntax diagram">
</div>

This [syntax diagram from Wikipedia](https://en.wikipedia.org/wiki/URL#/media/File:URI_syntax_diagram.png) visualizes the supported structure of urls for this module.

It also supports localhost- and FTP-urls.

# Usage

```js
const parseUrlParts = require('parse-url-parts')

const url =
  'https://foo:bar@www.example.com:80/path/deeper-path?q=amazingQuery#id'

const urlParts = parseUrlParts(url)
```

In this example, urlParts will contain object of the following structure:

```js
{ protocol: 'https',
  username: 'foo',
  password: 'bar',
  host: 'www.example.com',
  subDomains: 'www',
  rootDomain: 'example',
  topLevelDomain: 'com',
  port: 80,
  path: '/path/deeper-path',
  queryParams: 'q=amazingquery',
  fragment: 'id' }
```

If a non-valid url is passed, it will return `null`.

If any non-required part is not found, its value will `undefined`:

```js
const parseUrlParts = require('parse-url-parts')

const url = 'https://example.com'

const urlParts = parseUrlParts(url)
```

```js
{ protocol: 'https',
  username: undefined,
  password: undefined,
  host: 'example.com',
  subDomains: undefined,
  rootDomain: 'example',
  topLevelDomain: 'com',
  port: undefined,
  path: undefined,
  queryParams: undefined,
  fragment: undefined }
```

# Contributing

![GitHub contributors](https://img.shields.io/github/contributors/danlutz/parse-url-parts.svg)

Contributions and/or critics are welcome! Just open pull requests and issues on things that matter to you!

# Testing

```
$ npm run jest
```

# parse-url-parts

![npm](https://img.shields.io/npm/v/parse-url-parts.svg)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/parse-url-parts.svg)

> A lightweight JavaScript library for parsing RFC 1738 compliant Uniform Resource Locators (URLs).

# Description

Parses any RFC 1738 compliant url, including localhost and ftp urls.

<div align="center" style="background-color: #fff; padding: 10px">
    <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/URI_syntax_diagram.png" alt="URI syntax diagram">
</div>

The above [Syntax diagram from Wikipedia](https://en.wikipedia.org/wiki/URL#/media/File:URI_syntax_diagram.png) visualizes the supported structure of urls for this module.

# Documentation

## `parseUrlParts(url)`

Parses parts of an url.

**Note**: If a non-valid url is passed, it will return `null`.

**Note**: Urls need to have at least a `protocol` and a `host` part

### Params

-   **String** `url`: The url to be parsed.

### Return

-   **Object** An object containing the following fields:
-   `protocol` (String): The protocol.
-   `username` (null|String): The username of urls with userinfo (e.g. FTP urls).
-   `password` (null|String): The password of urls with userinfo (e.g. FTP urls).
-   `host` (String): Full host (subDomains + rootDomain + topLevelDomain).
-   `subDomains` (null|String): Comma-separated list of subDomains
-   `rootDomain` (String): The rootDomain of the url.
-   `topLevelDomain` (null|String): The topLevelDomain of the url.
-   `port` (null|Number): The port of the url.
-   `path` (String): Full path of the url, without query params of fragment.
-   `queryParams` (null|String): Query parameters of the url.
-   `fragment` (null|String): Fragment of the url, without leading "#".

# Usage

```ts
import { parseUrlParts } from "parse-url-parts"

const url = "https://foo:bar@www.example.com:80/path/deeper-path?q=amazingQuery#id"

console.log(parseUrlParts(url))
// { protocol: 'https',
//   username: 'foo',
//   password: 'bar',
//   host: 'www.example.com',
//   subDomains: 'www',
//   rootDomain: 'example',
//   topLevelDomain: 'com',
//   port: 80,
//   path: '/path/deeper-path',
//   queryParams: 'q=amazingquery',
//   fragment: 'id' }
```

If any non-required part is not found, its value will `null`:

```js
import { parseUrlParts } from "parse-url-parts"

const url = "https://example.com"

console.log(parseUrlParts(url))
// { protocol: 'https',
//   username: null,
//   password: null,
//   host: 'example.com',
//   subDomains: null,
//   rootDomain: 'example',
//   topLevelDomain: 'com',
//   port: null,
//   path: "",
//   queryParams: null,
//   fragment: null }
```

# Contributing

![GitHub contributors](https://img.shields.io/github/contributors/danlutz/parse-url-parts.svg)

Contributions and/or critics are welcome! Just open pull requests and issues on things that matter to you!

# Testing

```
$ npm run jest
```

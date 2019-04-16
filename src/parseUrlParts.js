const urlRegex = /(\w+):\/\/((\w+):(\w+)@)?((([\w-]+)\.)*[\w-]+)?(:(\d+))?((\/[\w-]+)*)?(\?(((\w+)=(\w+)(&|;)?)+))?(#(\w+))?/

const parseHostParts = host => {
  const hostParts = host.split('.')

  // (e.g "localhost")
  if (hostParts.length === 1)
    return {
      subDomains: undefined,
      rootDomain: host,
      topLevelDomain: undefined,
    }

  // No subDomains (e.g. "example.com")
  if (hostParts.length === 2)
    return {
      subDomains: undefined,
      rootDomain: hostParts[0],
      topLevelDomain: hostParts[1],
    }

  // One or more subDomains are present (e.g "www.example.com" or "a.b.example.com")
  // The regex backslashes need to be escaped because they are used in a template literal
  // Original regex: (([\w-]+\.){NUMBER_OF_SUB_DOMAINS})([\w-]+)\.(\w+)
  const match = host.match(
    `(([\\w-]+\\.){${hostParts.length - 2}})([\\w-]+)\\.(\\w+)`,
  )
  const [, subDomains, , rootDomain, topLevelDomain] = match

  return {
    subDomains: subDomains.substring(0, subDomains.length - 1), // Remove trailing dot
    rootDomain,
    topLevelDomain,
  }
}

const parseUrlParts = url => {
  if (!url) return null

  const lowerCaseUrl = url.toLowerCase()

  const match = lowerCaseUrl.match(urlRegex)
  if (!match) return null

  const [
    ,
    protocol,
    ,
    username,
    password,
    host,
    ,
    ,
    ,
    port,
    path,
    ,
    ,
    queryParams,
    ,
    ,
    ,
    ,
    ,
    fragment,
  ] = match
  const { subDomains, rootDomain, topLevelDomain } = parseHostParts(host)

  return {
    protocol,
    username,
    password,
    host,
    subDomains,
    rootDomain,
    topLevelDomain,
    port: port ? Number(port) : undefined,
    path,
    queryParams,
    fragment,
  }
}

module.exports = parseUrlParts

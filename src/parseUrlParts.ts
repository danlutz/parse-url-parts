export type URLProtocol = "http" | "https" | "ftp" | "mailto" | "file" | "data" | "irc"

export interface ParsedURL {
	protocol: URLProtocol
	username?: string
	password?: string
	host: string
	subDomains?: string
	rootDomain: string
	topLevelDomain?: string
	port?: number
	path?: string
	queryParams?: string
	fragment?: string
}

const urlRegex = /(\w+):\/\/((\w*[-.]*\w+)(:{0,1})(\w*)@)?((([\w-]+)\.)*[\w-]+)?(:(\d+))?((\/[\w-.]+)*)?(\?(((\w+)=(\w+)(&|;)?)+))?(#(\w+))?/

const parseHostParts = (host: string) => {
	const hostParts = host.split(".")

	// (e.g "localhost")
	if (hostParts.length === 1)
		return {
			subDomains: null,
			rootDomain: host,
			topLevelDomain: null,
		}

	// No subDomains (e.g. "example.com")
	if (hostParts.length === 2)
		return {
			subDomains: null,
			rootDomain: hostParts[0],
			topLevelDomain: hostParts[1],
		}

	// One or more subDomains are present (e.g "www.example.com" or "a.b.example.com")
	// The regex backslashes need to be escaped because they are used in a template literal
	// Original regex: (([\w-]+\.){NUMBER_OF_SUB_DOMAINS})([\w-]+)\.(\w+)
	const match = host.match(`(([\\w-]+\\.){${hostParts.length - 2}})([\\w-]+)\\.(\\w+)`)
	const [, subDomains, , rootDomain, topLevelDomain] = match

	return {
		subDomains: subDomains.substring(0, subDomains.length - 1), // Remove trailing dot
		rootDomain,
		topLevelDomain,
	}
}

const parseUrlParts = (url: string) => {
	if (!url) return null

	const lowerCaseUrl = url.toLowerCase()

	const match = lowerCaseUrl.match(urlRegex)
	if (!match) return null

	const [
		,
		protocol,
		,
		username = null,
		,
		password = null,
		host,
		,
		,
		,
		port,
		path = "",
		,
		,
		queryParams = null,
		,
		,
		,
		,
		,
		fragment = null,
	] = match

	const { subDomains, rootDomain, topLevelDomain } = parseHostParts(host)

	const parsedUrl: ParsedURL = {
		protocol: protocol as URLProtocol,
		username,
		password,
		host,
		subDomains,
		rootDomain,
		topLevelDomain,
		port: port ? Number(port) : null,
		path,
		queryParams,
		fragment,
	}

	return parsedUrl
}

export default parseUrlParts

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

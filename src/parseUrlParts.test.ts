import parseUrlParts from "./parseUrlParts"

const undefinedProperties = {
	protocol: null,
	username: null,
	password: null,
	host: null,
	subDomains: null,
	rootDomain: null,
	topLevelDomain: null,
	port: null,
	path: "",
	queryParams: null,
	fragment: null,
}

it("Returns null on invalid urls", () => {
	expect(parseUrlParts(null)).toBe(null)
	expect(parseUrlParts("randomStringThatIsNoUrl")).toBe(null)
})

it("Converts urls to lowercase", () => {
	expect(parseUrlParts("httP://www.eXamplE.cOm")).toMatchObject({
		...undefinedProperties,
		protocol: "http",
		host: "www.example.com",
		subDomains: "www",
		rootDomain: "example",
		topLevelDomain: "com",
	})
})

it("Parses protocols", () => {
	expect(parseUrlParts("http://www.example.com")).toMatchObject({
		...undefinedProperties,
		protocol: "http",
		host: "www.example.com",
		subDomains: "www",
		rootDomain: "example",
		topLevelDomain: "com",
	})
	expect(parseUrlParts("https://www.example.com")).toMatchObject({
		...undefinedProperties,
		protocol: "https",
		host: "www.example.com",
		subDomains: "www",
		rootDomain: "example",
		topLevelDomain: "com",
	})
	expect(parseUrlParts("ftp://www.example.com")).toMatchObject({
		...undefinedProperties,
		protocol: "ftp",
		host: "www.example.com",
		subDomains: "www",
		rootDomain: "example",
		topLevelDomain: "com",
	})
	expect(parseUrlParts("ftps://www.example.com")).toMatchObject({
		...undefinedProperties,
		protocol: "ftps",
		host: "www.example.com",
		subDomains: "www",
		rootDomain: "example",
		topLevelDomain: "com",
	})
})

it("Parses topLevelDomains", () => {
	expect(parseUrlParts("http://www.example.com")).toMatchObject({
		...undefinedProperties,
		protocol: "http",
		host: "www.example.com",
		subDomains: "www",
		rootDomain: "example",
		topLevelDomain: "com",
	})
	expect(parseUrlParts("http://example.at")).toMatchObject({
		...undefinedProperties,
		protocol: "http",
		host: "example.at",
		rootDomain: "example",
		topLevelDomain: "at",
	})
	expect(parseUrlParts("http://localhost:3000")).toMatchObject({
		...undefinedProperties,
		protocol: "http",
		host: "localhost",
		rootDomain: "localhost",
		port: 3000,
	})
})

it("Parses localhost urls", () => {
	expect(parseUrlParts("http://localhost:8080")).toMatchObject({
		...undefinedProperties,
		protocol: "http",
		host: "localhost",
		rootDomain: "localhost",
		port: 8080,
	})
})

it("Parses subDomains", () => {
	expect(parseUrlParts("http://example.com")).toMatchObject({
		...undefinedProperties,
		protocol: "http",
		host: "example.com",
		rootDomain: "example",
		topLevelDomain: "com",
	})
	expect(parseUrlParts("http://www.example.com")).toMatchObject({
		...undefinedProperties,
		protocol: "http",
		host: "www.example.com",
		subDomains: "www",
		rootDomain: "example",
		topLevelDomain: "com",
	})
	expect(parseUrlParts("http://a.b.c.d.e.example.com")).toMatchObject({
		...undefinedProperties,
		protocol: "http",
		host: "a.b.c.d.e.example.com",
		subDomains: "a.b.c.d.e",
		rootDomain: "example",
		topLevelDomain: "com",
	})
})

it("Parses paths", () => {
	expect(parseUrlParts("http://www.example.com")).toMatchObject({
		...undefinedProperties,
		protocol: "http",
		host: "www.example.com",
		subDomains: "www",
		rootDomain: "example",
		topLevelDomain: "com",
	})
	expect(parseUrlParts("http://www.example.com/")).toMatchObject({
		...undefinedProperties,
		protocol: "http",
		host: "www.example.com",
		subDomains: "www",
		rootDomain: "example",
		topLevelDomain: "com",
	})
	expect(parseUrlParts("http://www.example.com/subpath")).toMatchObject({
		...undefinedProperties,
		protocol: "http",
		host: "www.example.com",
		subDomains: "www",
		rootDomain: "example",
		topLevelDomain: "com",
		path: "/subpath",
	})
	expect(parseUrlParts("http://www.example.com/subPath/anothersubPath")).toMatchObject({
		...undefinedProperties,
		protocol: "http",
		host: "www.example.com",
		subDomains: "www",
		rootDomain: "example",
		topLevelDomain: "com",
		path: "/subpath/anothersubpath",
	})
})

it("Parses ports", () => {
	expect(parseUrlParts("http://www.example.com:8080")).toMatchObject({
		...undefinedProperties,
		protocol: "http",
		host: "www.example.com",
		subDomains: "www",
		rootDomain: "example",
		topLevelDomain: "com",
		port: 8080,
	})
	expect(parseUrlParts("http://localhost:3000")).toMatchObject({
		...undefinedProperties,
		protocol: "http",
		host: "localhost",
		rootDomain: "localhost",
		port: 3000,
	})
})

it("Parses query params", () => {
	expect(parseUrlParts("http://www.example.com?query=a")).toMatchObject({
		...undefinedProperties,
		protocol: "http",
		host: "www.example.com",
		subDomains: "www",
		rootDomain: "example",
		topLevelDomain: "com",
		queryParams: "query=a",
	})
	expect(parseUrlParts("http://www.example.com/path?query=a&anotherquery=b")).toMatchObject({
		...undefinedProperties,
		protocol: "http",
		host: "www.example.com",
		subDomains: "www",
		rootDomain: "example",
		topLevelDomain: "com",
		path: "/path",
		queryParams: "query=a&anotherquery=b",
	})
})

it("Parses urls witch special characters", () => {
	expect(parseUrlParts("http://a-b.u_x.com?query=a")).toMatchObject({
		...undefinedProperties,
		protocol: "http",
		host: "a-b.u_x.com",
		subDomains: "a-b",
		rootDomain: "u_x",
		topLevelDomain: "com",
		queryParams: "query=a",
	})
})

it("Parses userinfo of urls", () => {
	expect(parseUrlParts("ftps://username:password@example.com")).toMatchObject({
		...undefinedProperties,
		protocol: "ftps",
		username: "username",
		password: "password",
		host: "example.com",
		rootDomain: "example",
		topLevelDomain: "com",
	})
})

it("Parses fragments of urls", () => {
	expect(parseUrlParts("https://example.com#id")).toMatchObject({
		...undefinedProperties,
		protocol: "https",
		host: "example.com",
		rootDomain: "example",
		topLevelDomain: "com",
		fragment: "id",
	})
})

it("Parses url with dash in username", () => {
	expect(
		parseUrlParts("https://gitlab-ee:xxxxxxxx@system.example.com/diffusion/41/car-order.git"),
	).toMatchObject({
		...undefinedProperties,
		protocol: "https",
		username: "gitlab-ee",
		password: "xxxxxxxx",
		subDomains: "system",
		host: "system.example.com",
		rootDomain: "example",
		topLevelDomain: "com",
		path: "/diffusion/41/car-order.git",
	})
})

it("Parses url without password", () => {
	expect(
		parseUrlParts("https://gitlab-ee@system.example.com/diffusion/41/car-order.git"),
	).toMatchObject({
		...undefinedProperties,
		protocol: "https",
		username: "gitlab-ee",
		password: "",
		subDomains: "system",
		host: "system.example.com",
		rootDomain: "example",
		topLevelDomain: "com",
		path: "/diffusion/41/car-order.git",
	})
})

it("Parses ssh git url without password", () => {
	expect(
		parseUrlParts("ssh://git@ticket.hochguertel.work:22222/diffusion/41/car-order.git"),
	).toMatchObject({
		...undefinedProperties,
		protocol: "ssh",
		username: "git",
		password: "",
		subDomains: "ticket",
		host: "ticket.hochguertel.work",
		rootDomain: "hochguertel",
		topLevelDomain: "work",
		path: "/diffusion/41/car-order.git",
		port: 22222,
	})
})

it("Parses urls that contain all possible urlParts", () => {
	expect(
		parseUrlParts(
			"ftps://user:pw@x.sub-domain.example.com:9000/path/subpath?abc=def;hij=klm#id",
		),
	).toMatchObject({
		...undefinedProperties,
		protocol: "ftps",
		username: "user",
		password: "pw",
		subDomains: "x.sub-domain",
		host: "x.sub-domain.example.com",
		port: 9000,
		rootDomain: "example",
		topLevelDomain: "com",
		path: "/path/subpath",
		queryParams: "abc=def;hij=klm",
		fragment: "id",
	})
})

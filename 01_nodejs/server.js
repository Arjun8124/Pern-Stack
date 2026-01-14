import http from "http";

const server = http.createServer((req, res) => {
	res.writeHead(200, { "Content-Type": "text/plain" });
	res.end("This is a server in node.js");
});

server.listen(3000, () => "Server is running on port http://localhost:3000");

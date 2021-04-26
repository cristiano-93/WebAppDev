const http = require("http");

const server = http.createServer(
    (request, response) =>
    {
        response.write(`Requested with a method of ${request.method}`);
        response.end();
    }
);

server.listen(3000);
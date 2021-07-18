var Requests = /** @class */ (function () {
    function Requests(method, uri, version, message, response, fulfilled) {
        if (fulfilled === void 0) { fulfilled = false; }
        this.method = method;
        this.uri = uri;
        this.version = version;
        this.message = message;
        this.response = response;
        this.fulfilled = fulfilled;
    }
    return Requests;
}());
var myData = new Requests('GET', 'http://google.com', 'HTTP/1.1', '');
console.log(myData);

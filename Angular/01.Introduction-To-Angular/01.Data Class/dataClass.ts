class Requests {
    constructor(public method: string, public uri: string, public version: string,
        public message: string, public response: void, public fulfilled: boolean = false) {
    }

}

let myData = new Requests('GET', 'http://google.com', 'HTTP/1.1', '');

console.log(myData);



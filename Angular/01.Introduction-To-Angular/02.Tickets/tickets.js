function tickets(arr, criteria) {
    var Ticket = /** @class */ (function () {
        function Ticket(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
        return Ticket;
    }());
    var allTickets = [];
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var ticket = arr_1[_i];
        var _a = ticket.split('|'), dest = _a[0], price = _a[1], status_1 = _a[2];
        allTickets.push(new Ticket(dest, Number(price), status_1));
    }
    return allTickets.sort(function (a, b) {
        if (criteria == 'destination') {
            return a.destination.localeCompare(b.destination);
        }
        else if (criteria == 'price') {
            return a.price - b.price;
        }
        else if (criteria == 'status') {
            return a.status.localeCompare(b.status);
        }
    });
}
console.log(tickets([
    'Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'
], 'destination'));
console.log(tickets([
    'Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'
], 'status'));

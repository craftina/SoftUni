function tickets(arr: Array<string>, criteria: string) {
    class Ticket {
        constructor(public destination: string, public price: number, public status: string) { }
    }
    let allTickets = [];

    for (const ticket of arr) {
        let [dest, price, status] = ticket.split('|');
        allTickets.push(new Ticket(dest, Number(price), status));
    }

    return allTickets.sort((a, b) => {
        if(criteria == 'destination'){
            return a.destination.localeCompare(b.destination);
        } else if(criteria == 'price'){
            return a.price - b.price;
        } else if(criteria == 'status'){
            return a.status.localeCompare(b.status);
        }
    });
}
console.log(tickets([
    'Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'
],
    'destination'
));

console.log(tickets([
    'Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'
],
    'status'
));



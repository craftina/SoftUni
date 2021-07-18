class Box {
    constructor() {
        this._boxes = [];
    }
    get count() {
        return this._boxes.length;
    }
    add(element) {
        this._boxes.unshift(element);
    }
    remove() {
        this._boxes.shift();
    }
}
let box = new Box();
box.add(1);
box.add(2);
box.add(3);
console.log(box.count);
console.log('-----------------------');
let box2 = new Box();
box2.add("Pesho");
box2.add("Gosho");
console.log(box2.count);
box2.remove();
console.log(box2.count);

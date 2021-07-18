class Box<T>{
    private _boxes = [];

    get count(){
        return this._boxes.length;
    }

    public add(element): void{
        this._boxes.unshift(element);
    }

    public remove(): void{
        this._boxes.shift();
    }
}

let box = new Box<Number>();
box.add(1);
box.add(2);
box.add(3);
console.log(box.count);
console.log('-----------------------');
let box2 = new Box<String>();
box2.add("Pesho");
box2.add("Gosho");
console.log(box2.count);
box2.remove();
console.log(box2.count);




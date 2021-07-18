class Melons {
    constructor(weight, melonSort) {
        this.weight = weight;
        this.melonSort = melonSort;
        this._elementIndex = this.weight * this.melonSort.length;
        this.element;
    }
    get elementIndex() {
        return this._elementIndex;
    }
    toString() {
        let output = [];
        output.push(`Element: ${this.element}`);
        output.push(`Sort: ${this.melonSort}`);
        output.push(`Element Index: ${this.elementIndex}`);
        return output.join('\n');
    }
}
class Watermelon extends Melons {
    constructor(weight, melonSort) {
        super(weight, melonSort);
        this.element = 'Water';
    }
}
class Firemelon extends Melons {
    constructor(weight, melonSort) {
        super(weight, melonSort);
        this.element = 'Fire';
    }
}
class Earthmelon extends Melons {
    constructor(weight, melonSort) {
        super(weight, melonSort);
        this.element = 'Earth';
    }
}
class Airmelon extends Melons {
    constructor(weight, melonSort) {
        super(weight, melonSort);
        this.element = 'Air';
    }
}
class Melolemonmelon extends Watermelon {
    constructor(weight, melonSort) {
        super(weight, melonSort);
        this.element = 'Water';
        this.elements = ['Water', 'Fire', 'Earth', 'Air'];
    }
    morph() {
        let el = this.elements.shift();
        this.elements.push(el);
        this.element = this.elements[0];
    }
}
let water = new Watermelon(20, 'Kingsize');
console.log(water.toString());
let other = new Melolemonmelon(10, 'Ladybug');
console.log(other.toString());
other.morph();
console.log(other.toString());
other.morph();
console.log(other.toString());

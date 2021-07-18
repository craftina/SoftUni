class Employee {
    public salary: number;
    public tasks: Array<string>;
    constructor(public name: string, public age: number) {
        this.salary = 0;
        this.tasks = [];
     }

   public work(): void {
        let output = this.tasks.shift();
        this.tasks.push(output);
        console.log(this.name + output);
    }

    public collectSalary(): void{
        console.log(`${this.name} received ${this.getSalary()} this month.`);
        
    }

    public getSalary(): number{
        return this.salary;
    }

}

export class Juniour extends Employee{
    constructor(name: string, age: number){
        super(name, age);
        this.tasks.push(' is working on a simple task.');
    }
}

export class Senior  extends Employee{
    constructor(name: string, age: number){
        super(name, age);
        this.tasks.push(' is working on a complicated task.');
        this.tasks.push(' is taking time off work.');
        this.tasks.push(' is supervising junior workers.');
    }
}

export class Manager  extends Employee{
    public divident: number;
    constructor(name: string, age: number){
        super(name, age);
        this.divident = 0;
        this.tasks.push(' scheduled a meeting.');
        this.tasks.push(' is preparing a quarterly report.');
    }

    public getSalary(): number{
        return this.salary + this.divident;
    }
}

let ivan = new Senior('Ivan', 30);
ivan.salary = 1600;
console.log(ivan);
ivan.work();
ivan.work();
ivan.work();
ivan.work();
ivan.collectSalary();


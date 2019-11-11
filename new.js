function Person(name) {
    this.name = name;

    console.log('執行Person()');
}

let p = new Person();

let p2 = {};
p2.__proto__ = Person.prototype;
p2.__proto__.constructor('Jhon') // Person.call(p2, 'Jhon')


console.log('p1, p2', p, p2)
console.log('Person === Person.prototype.constructor', Person === Person.prototype.constructor ); // true
console.log('p2 instanceof Person:', p2 instanceof Person); // true
console.log('p2.constructor === Person', p2.constructor === Person ); // true


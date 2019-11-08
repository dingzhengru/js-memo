function Person(name, age) {
  this.name = name;
  this.age = age;
  this.log = function () {
    console.log(this.name + ', age:' + this.age);
  }
}
Person.prototype.getName = function() {
  return this.name
}

let nick = new Person('nick', 18);
let peter = new Person('peter', 20);
  
console.log(`Prototype.log: ${nick.log === peter.log}`) // false

console.log(`Prototype.prototype.getName: ${nick.getName === peter.getName}`) // true
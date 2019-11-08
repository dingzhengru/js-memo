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
  
console.log('Prototype:', nick.log === peter.log) // false
console.log('Prototype:', nick.getName === peter.getName) // true

console.log('__proto__:', nick.__proto__ === Person.prototype) // true
console.log('__proto__:', Person.prototype.__proto__ === Object.prototype) // true
console.log('__proto__:', Object.prototype.__proto__) // null (已經到頂端了)

console.log('hasOwnProperty:', nick.hasOwnProperty('getName')); // false
console.log('hasOwnProperty:', nick.__proto__.hasOwnProperty('getName')); // true

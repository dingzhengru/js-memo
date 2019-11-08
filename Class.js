class Animal {
  constructor(age) {
    this.age = age || 1;
  }
  printInfo() {
    console.log(`age: ${this.age}`)
  }
}
class Dog extends Animal {
  constructor() {
    super(); //super()代表調用父類的構造函數
  }
  printInfo() {
    console.log(`this dog age: ${this.age}`)
  }
}

let classFoo = new Dog(5);
classFoo.printInfo();
class Animal {
  static count = 0;
  constructor(age) {
    this.age = age || 1;
    Animal.addCount();
    console.log(`Animal this: ${JSON.stringify(this)}`)
  }
  printInfo() {
    console.log(`age: ${this.age}`)
  }
  static addCount() {
    Animal.count++
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

console.log(`靜態變數 Animal.count: ${Animal.count}`);

let classFoo = new Dog(5);
classFoo.printInfo();

console.log(`靜態變數 Animal.count: ${Animal.count}`);
# Javascript 筆記

*   <a href="#型態types">型態(Types)</a>
*   <a href="#hoisting">Hoisting</a>
*   <a href="#閉包closure">閉包(Closure)</a>
*   <a href="#深拷貝">深拷貝</a>
*   <a href="#es6-class">ES6 Class</a>
*   <a href="#非同步平行處理--es6-promise">非同步(平行處理) & Promise</a>
*   <a href="#es6-generator">ES6 Generator</a>
*   <a href="#await--async">Await & Async</a>
*   <a href="#this">This</a>
## 型態(Types)
**String**  
**Number**  
**Array**  
**Object**: { key:value }  
**undefined**: 未賦值的變數的預設值為undefined  
```typeof undefined // undefined```
**null**: 意思是「沒有值」的值  
```typeof null // object```
```
null == undefined // true
null === undefined // false
```
**NaN**(Not a Number)  
```
typeof NaN // number
NaN + 1 // NaN (NaN與任何數字運算都是NaN)
Number.isNaN(123) // false (可以用isNaN判斷是否為NaN)
Number.isNaN(NaN) // true
```
## Hoisting
執行JS程式碼時，會分成編譯時期與執行時期  
下面的var a 就是編譯時期，會宣告後先給預設值undefined  
所以執行時期印出來的會是undefined，而不是直接報錯誤(ReferenceError: a is not defined)  
```
console.log(a); // undefined 執行時期
var a = 1; // var a => 編譯時期，a=1 => 執行時期
```
## 閉包(Closure)
**1.沒有一個非常明確的定義**  
**2.會發生於函數回傳一個函數時**  
**3.說閉包就是可以把值關在裡面的函數，聽起來也怪怪的**  
**4.閉包可以存取到應該被釋放的值（但卻因為閉包的存在無法被釋放）**  

正常一個 function 執行完成以後本來會把所有相關的資源釋放掉，可是我 test 已經執行結束了，  
照理來說變數 a 的記憶體空間也被釋放，但我呼叫 inner 的時候居然還存取得到 a  
(就像是a被inner關起來了，沒辦法被釋放)
```
function test() {
  let a = 10
  function inner() {
    console.log(a) // 還是 10
  }
  return inner
}
  
let inner = test()
inner()
```
### 會用到閉包的情況
**透過閉包讓 function 能夠有 private 變數(不過現在有了let，不需要如此麻煩)**  
<img src="https://i.imgur.com/ft2rUd6.png" height="200">

## 深拷貝
**複製一個完全新的物件，而非參考原物件(避免修改到原本的物件)**  

可以用lodash套件中的_.cloneDeep(yourObj)
```
let cloneTestA = { name: 'ding' };
let cloneTestB = cloneTestA;
cloneTestB.name = 'change';

console.log(cloneTestA); // change cloneTestA被改了

cloneTestB = _.cloneDeep(cloneTestA);
cloneTestB.name = 'change again'; 

console.log(cloneTestA); // change 沒有被改變
```

## ES6 Class
### 事實上這裡的"類別"並非真正的類別，根本上還是使用 Prototype 機制來實作
**只是單純模擬其他語言的類別寫法，讓程式碼更清楚**

```
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
classFoo.printInfo(); // this dog age: 1
```
## 非同步(平行處理) & ES6 Promise
**利用Promise可以把事情排好**  
**多個Promise一起執行可以用Promise.all([p1,p2,p3]).then()(平行處理，不會等前一個結束才執行)**  
**all() 回傳給then會是一個陣列(所有Promise resolve的集合)**  
```
function promiseTest() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('jfklsdjflskdjf')
        }, 100)
    })
}

promiseTest()
.then((data) => {
    // get resolve()
    console.log(`這個會等promiseTest處理完才執行 data: ${data}`);
})
.catch((error) => {
    // get reject()
})

console.log('這個會先印出來(Promise也是非同步)')
```
## ES6 Generator
**用法:方法前面加個"星號"，並且用 yield 設置停止點**  

執行此函數時，每次執行到 yield 就會停下來，且可以傳送一個值至next()  
相反，也可以用next(x)來傳值到yield，可以用next()讓函數繼續執行，執行到yield又會再停下來  
next.value可以取到yield傳送過來的值，next.done可以用來判斷函數是否執行完畢
```
function *get_counter(){
  let i = 1;
  while(true){
    let x = yield i;
    i++;
    console.log(`next傳過來得值 x: ${x}`); //x: next2 ~ next4
  }
}

let counter = get_counter();

console.log(counter.next('next1')); // {value: 1, done: false}
console.log(counter.next('next2')); // {value: 2, done: false}
console.log(counter.next('next3')); // {value: 3, done: false}
console.log(counter.next('next4')); // {value: 4, done: false}
```

## Await & Async
### 其實跟Promise.all[]有點像(但all裡面還是平行處理)  
### 不過await實現了同步(會等前一個結束才執行下一個)
**await需要在前面有"async"的函式裡面出現 ex(async getAll())**  
**這種async function本身也是類似 Promise，在正確執行的情況下 return 會傳回 resolve 可以使用 then 來接收**  
**中途如果有錯誤，會自動觸發reject，一樣是用catch去接下來處理**
```
function getA() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('A')
    }, 1000)
  })
}

function getB() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('B')
    }, 1000)
  })
}

function getC() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('C')
    }, 1000)
  })
}

async function getAll() {
    console.log(await getA());
    console.log(await getB());
    console.log(await getC());
    // 如果用原本Promise.then 要讓ABC照順序執行

    getA().then((data) => {
        console.log(data);
        getB().then((data) => {
            console.log(data);
            getC().then((data) => {
                console.log(data);
            })
        })
    })

    return '成功時回傳此，也是用.then()接'
}

getAll().then((data) => {
    console.log(data);
}).catch((error) => {
    // 如果中途有執行錯誤，會跑來這邊
    console.log(error);
})
```

## This
### 指向"當前作用域的實體"
**在網頁的最外層實體就是從 Window 開始**  
```
console.log(this) // window物件
```

## Prototype
### 有點類似其他語言Class的靜態變數與靜態方法(static)

下面範例兩個實例中的log方法是不同的，就代表佔用了兩塊空間  
放在prototype的getName就會是一樣的
```
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
  
console.log(nick.log === peter.log) // false

console.log(nick.getName === peter.getName) // true
```
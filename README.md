# Javascript 筆記

- [Javascript 筆記](#javascript-筆記)
  - [型態(Types)](#型態types)
  - [Hoisting](#hoisting)
  - [閉包(Closure)](#閉包closure)
    - [會用到閉包的情況](#會用到閉包的情況)
  - [深拷貝 & 淺拷貝](#深拷貝--淺拷貝)
  - [ES6 Class](#es6-class)
    - [事實上這裡的"類別"並非真正的類別，根本上還是使用 Prototype 機制來實作](#事實上這裡的類別並非真正的類別根本上還是使用-prototype-機制來實作)
  - [非同步(平行處理) & ES6 Promise](#非同步平行處理--es6-promise)
  - [ES6 Generator](#es6-generator)
  - [Await & Async](#await--async)
    - [其實跟 Promise.all[]有點像(但 all 裡面還是平行處理)](#其實跟-promiseall有點像但-all-裡面還是平行處理)
    - [不過 await 實現了同步(會等前一個結束才執行下一個)](#不過-await-實現了同步會等前一個結束才執行下一個)
  - [This](#this)
  - [Prototype & **proto**](#prototype--proto)
    - [prototype 其實就是 Class 的靜態變數與靜態方法(static)](#prototype-其實就是-class-的靜態變數與靜態方法static)
    - [`__proto__`會去指向此實體所屬物件的 prototype](#__proto__會去指向此實體所屬物件的-prototype)
  - [IIFE (Immediately Invoked Function Expression)](#iife-immediately-invoked-function-expression)
  - ["匿名函數"通常用在哪](#匿名函數通常用在哪)
  - [call、apply、bind](#callapplybind)
    - [三個主要目的都一樣: 指定函數的 this](#三個主要目的都一樣-指定函數的-this)
  - [Arrow Function(箭頭函式)](#arrow-function箭頭函式)
  - [Event: 捕獲、冒泡(Capturing, Bubbling)](#event-捕獲冒泡capturing-bubbling)
  - [Event Delegation(事件委派)](#event-delegation事件委派)
    - [為什麼會有事件委派的模式呢](#為什麼會有事件委派的模式呢)
    - [為什麼可以將事件委派?](#為什麼可以將事件委派)
  - [Attribute & Property](#attribute--property)
  - [Ternary Operator(一行式 if-else)](#ternary-operator一行式-if-else)
  - [嚴格模式('use strict')](#嚴格模式use-strict)
    - [常見錯誤](#常見錯誤)
  - [為何使用需在編譯轉成 js 的語言(ex: TypeScript)](#為何使用需在編譯轉成-js-的語言ex-typescript)
  - [Debugging JavaScript(Eslint)](#debugging-javascripteslint)
    - [Eslint 就可以解決這個問題，同時也有 debug 的功能](#eslint-就可以解決這個問題同時也有-debug-的功能)
  - [事件循環(event loop)](#事件循環event-loop)
  - [高階函數](#高階函數)
  - [解構賦值(Destructuring)](#解構賦值destructuring)
  - [ES6 樣板字面值(template Literals)](#es6-樣板字面值template-literals)
  - [Curry(柯里化)](#curry柯里化)
  - [Spread syntax & Rest syntax(展開、其餘語法)](#spread-syntax--rest-syntax展開其餘語法)
  - [export & import](#export--import)
  - [靜態成員(static class members)](#靜態成員static-class-members)
  - [Cookie & LocalStorage & SessionStorage](#cookie--localstorage--sessionstorage)
  - [Function Statements & Function Expressions](#function-statements--function-expressions)
  - [new 做了哪些事](#new-做了哪些事)
  - [JavaScript 中的參數傳遞](#javascript-中的參數傳遞)
  - [動態引入模組](#動態引入模組)
  - [event loop](#event-loop)

## 型態(Types)

**String**  
**Number**  
**Array**  
**Object**: { key:value }  
**undefined**: 未賦值的變數的預設值為 undefined  
`typeof undefined // undefined`  
**null**: 「沒有值」的值  
`typeof null // object`

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

執行 JS 程式碼時，會分成編譯時期與執行時期  
下面的 var a 就是編譯時期，會宣告後先給預設值 undefined  
所以執行時期印出來的會是 undefined，而不是直接報錯誤(ReferenceError: a is not defined)

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
(就像是 a 被 inner 關起來了，沒辦法被釋放)

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

**透過閉包讓 function 能夠有 private 變數(不過現在有了 let，不需要如此麻煩)**  
<img src="https://i.imgur.com/ft2rUd6.png" height="200">

## 深拷貝 & 淺拷貝

- 淺拷貝後的物件，修改會動到原物件
- 深拷貝複製一個完全新的物件，而非參考原物件(避免修改到原本的物件)
- 利用 JSON 轉字串 再轉回來，`JSON.parse(JSON.stringify(data))`
- 使用展開運算子即可快速深拷貝: `{ ...data } & [ ...data ]`

可以用 lodash 套件中的\_.cloneDeep(yourObj)

```
let cloneTestA = { name: 'ding' };
let cloneTestB = cloneTestA; // 淺拷貝
cloneTestB.name = 'change';

console.log(cloneTestA); // change cloneTestA被改了

cloneTestB = _.cloneDeep(cloneTestA); // 深拷貝
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
  static abc() {// 靜態方法}
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

**利用 Promise 可以把事情排好**  
**多個 Promise 一起執行可以用 Promise.all([p1,p2,p3]).then()(平行處理，不會等前一個結束才執行)**  
**all() 回傳給 then 會是一個陣列(所有 Promise resolve 的集合)**

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

執行此函數時，每次執行到 yield 就會停下來，且可以傳送一個值至 next()  
相反，也可以用 next(x)來傳值到 yield，可以用 next()讓函數繼續執行，執行到 yield 又會再停下來  
next.value 可以取到 yield 傳送過來的值，next.done 可以用來判斷函數是否執行完畢

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

### 其實跟 Promise.all[]有點像(但 all 裡面還是平行處理)

### 不過 await 實現了同步(會等前一個結束才執行下一個)

**await 需要在前面有"async"的函式裡面出現 ex(async getAll())**  
**這種 async function 本身也是類似 Promise，在正確執行的情況下 return 會傳回 resolve 可以使用 then 來接收**  
**中途如果有錯誤，會自動觸發 reject，一樣是用 catch 去接下來處理**

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

參考文章: https://github.com/aszx87410/blog/issues/39

指向當前作用域的實體

```js
console.log(this); // 在瀏覽器的話，會是 window 物件；nodejs 的話會是 global
```

function 內的 this 可用 bind、apply 、call 來改變 this 的值；也會根據呼叫方式而改變

文章重點

> this 的值會根據你怎麼呼叫它而變得不一樣，call、apply 、bind 就是其中一個範例，你可以用不同的方式去呼叫 function，讓 this 的值變得不同
> 所以你要很清楚知道這是兩種完全不同的運行模式，一個是靜態（作用域）、一個是動態（this）。要看作用域，就看這個函式在程式碼的「哪裡」；要看 this，就看這個函式「怎麽」被呼叫。

文章內的判斷 this 的小撇步

> 其實我們可以把所有的 function call，都轉成利用 call 的形式來看，以下面那個例子來說，會是這樣
> obj.hello.call(obj)
> hey.call()
> 轉成這樣子的形式之後，還記得 call 的第一個參數就是 this 嗎？所以你就能立刻知道 this 的值是什麼了！
> 下面較複雜的例子轉換會是
> obj.inner.hello.call(obj.inner) => 2
> obj2.hello.call(obj2) => 2
> hello.call() => undefined

簡易範例

```js
const obj = {
  value: 1,
  hello: function () {
    console.log(this.value);
  },
};

obj.hello(); // 1
const hey = obj.hello;
hey(); // undefined
```

較複雜範例

```js
const obj = {
  value: 1,
  hello: function () {
    console.log(this.value);
  },
  inner: {
    value: 2,
    hello: function () {
      console.log(this.value);
    },
  },
};

const obj2 = obj.inner;
const hello = obj.inner.hello;
obj.inner.hello(); // 2
obj2.hello(); // 2
hello(); // undefined
```

## Prototype & **proto**

### prototype 其實就是 Class 的靜態變數與靜態方法(static)

下面範例兩個實例中的 log 方法是不同的，就代表佔用了兩塊空間  
放在 prototype 的 getName 就會是一樣的，代表這變數或方法是共享的

### `__proto__`會去指向此實體所屬物件的 prototype

nick 這個 instance 本身並沒有 getName 這個 function。但 nick 是 Person 的 instance  
所以如果在 nick 本身找不到，它就會利用**proto**去找 Person.prototype  
<br>
**原型鍊**: 就是在說**proto**一直不斷往上找 prototype 直到 null 的鍊(Object.prototype.**proto**)  
**hasOwnProperty**: 可以確認一個屬性是存在 instance 身上，還是存在於它屬於的原型鍊當中

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

console.log(nick.__proto__ === Person.prototype) // true
console.log(Person.prototype.__proto__ === Object.prototype) // true
console.log(Object.prototype.__proto__) // null (已經到頂端了)

console.log(nick.hasOwnProperty('getName')); // false
console.log(nick.__proto__.hasOwnProperty('getName')); // true
```

## IIFE (Immediately Invoked Function Expression)

**宣告後馬上執行此函數的寫法**

```
function a(){ console.log(123) }() // 錯誤寫法，需用小括號把函數括起來
(function a(){ console.log(123) })() // 123
```

## "匿名函數"通常用在哪

**通常用在參數是函數的時候**

```
// ex1: callback
function a(callback) {
    callback()
}
a(function(){})

// ex2: callback
let squaredArray = inputArray.map(function(x) { return x * x; });
let squaredArray = inputArray.map(x => x * x); // ES6 syntax

// ex3: IIFE
(function() { })(); // IIFE
```

## call、apply、bind

### 三個主要目的都一樣: 指定函數的 this

**call: 執行函數，第一個參數放想使用的 this，後面的參數跟一般使用函數一樣**  
**apply: 跟 call 一樣，不一樣在於只允許兩個變數傳入，第二個變數等於是原始 function 的參數陣列(argsArray)**  
**bind: 綁定這個函數的 this**

```
function wtf(argv0, argv1) {
  console.log('wtf:', this.v, argv0, argv1);
}
var obj = { v: 'I am obj' };
var obj2 = { v: 'I am obj2' }
// 如果我們希望這個function能吃到obj的this
// 可以把function放在物件裡頭
obj.func = wtf;
obj.func(1, 2); // obj 1 2

// 或是我們在第一個參數告訴function你的receiver是obj或obj2
wtf.call(obj, 1, 2); // obj 1 2
wtf.apply(obj2, [1, 2]); // obj2 1 2
wtf.bind(obj2)(1, 2); // obj2 1 2
```

## Arrow Function(箭頭函式)

多數時候一般函數無異，但是最大的差別在於 — 其 this 完全綁定在語彙上的位置  
也就是說在 arrow 裡面的 this 永遠都是語意上的 this  
不管是誰呼叫他，或是被如何 bind 、 call 、 apply ，他永遠都是拿到原先作用域的 this

```
let x = {
  name: 'foo',
  hello: function() {
    setTimeout(() => {
      console.log(this.name); // foo
    }, 100);

    setTimeout(function() {
      console.log(this.name); // ''
    }, 100);
  }
}
x.hello()
```

## Event: 捕獲、冒泡(Capturing, Bubbling)

**事件順序: 先捕獲，在冒泡**
**捕獲事件: 最先觸發的事件，會將事件往目標送**  
**冒泡事件: 當事件到目標時會觸發，會再將事件往回送**  
**event.stopPropagation(): 不再讓事件繼續往下傳(可以解決冒泡問題)**  
**event.preventDefault(): 阻止原本事件會做的事情(例如阻止表單傳送、阻止超連結)**

**點擊 list_item_link 發生的事件順序**  
捕獲 list => 捕獲 list_item => 捕獲 list_item_link(target)
=> 冒泡 list_item_link => 冒泡 list_item => 冒泡 list

addEventListener 的第三個參數可以決定是要接捕獲階段，還是冒泡階段  
**(true 是捕獲, 預設是 false 冒泡階段)**  
html

```
<ul id="list">
  <li id="list_item">
    <a id="list_item_link" href="#">
      link
    </a>
  </li>
</ul>
```

js

```
const $list = document.getElementById('list');
const $list_item = document.getElementById('list_item');
const $list_item_link = document.getElementById('list_item_link');

// list 的捕獲
$list.addEventListener('click', (e) => {
  console.log('list capturing', e.eventPhase);
}, true)

// list 的冒泡
$list.addEventListener('click', (e) => {
  console.log('list bubbling', e.eventPhase);
}, false)

// list_item 的捕獲
$list_item.addEventListener('click', (e) => {
  console.log('list_item capturing', e.eventPhase);
}, true)

// list_item 的冒泡
$list_item.addEventListener('click', (e) => {
  console.log('list_item bubbling', e.eventPhase);
}, false)

// list_item_link 的捕獲
$list_item_link.addEventListener('click', (e) => {
  console.log('list_item_link capturing', e.eventPhase);
}, true)

// list_item_link 的冒泡
$list_item_link.addEventListener('click', (e) => {
  console.log('list_item_link bubbling', e.eventPhase);
}, false)
```

## Event Delegation(事件委派)

### 為什麼會有事件委派的模式呢

- 為了減少監聽器，缺點是要多寫判斷程式碼
- 過多重複的監聽器 — 10x10 的 W 按鈕 掛載一百個重複的 click 事件
- 掛載、移除事件是有成本的 — removeEventListener

### 為什麼可以將事件委派?

- 事件的冒泡機制 — 把子節點們的事件統一處理
- 事件的 target 屬性 — 辨別事件的位置

```
<div id="parent">
    <div class="child" data-name="a"></div>
    <div class="child" data-name="b"></div>
    <div class="child" data-name="c"></div>
</div>

let $parent = document.querySelector('#parent')

$parent.addEventListener('click', (e) => {
    console.log(e.target.getAttribute('data-name'));
})
```

## Attribute & Property

**attribute: 是 html 代碼常看到的 key-value**  
**property: 是 attribute 對應 DOM 的對象屬性**

```
<!-- attribute -->
<input id="username" type="text" value="foo">

<!-- property -->
element.id // username
element.type // text
element.value // foo
```

**attribute 會始終保持 html 代碼中的初始值**  
**property 是會變化、可以修改的(可以說是現在實際的值)**

```
<input type="zzz">

let inputEl = document.getElementById('username');

console.log(inputEl.getAttribute('type')) // zzz
console.log(inputEl.type) // text (代表實際上type是text)
```

**attribute 可以自定義，property 則不行**

```
<input customTag="123">

console.log(inputEl.getAttribute('customTag')) // 123
console.log(inputEl.customTag) // undefined
```

## Ternary Operator(一行式 if-else)

**判斷式 ? true-value : false-value**

```
const isGood = true ? 'good' : 'not good' // good

// with arrow funcion(es6)
const grade = (score) => score < 60 ? 'fail' : 'pass';
```

## 嚴格模式('use strict')

**'use strict' 直接加入在程式碼的前方就可以開始運作**

1. 消除 Javascript 語法的一些不合理、不嚴謹之處，減少一些怪異行為
2. 消除程式碼執行的一些不安全之處，保證程式碼執行的安全
3. 提高編譯器效率，增加執行速度
4. 為未來新版本的 Javascript 做好鋪墊

### 常見錯誤

1. 不宣告直接賦予變數
2. 刪除已經宣告的錯誤
3. 物件內有重複屬性
4. 數值使用 8 進位語法
5. 禁止使用 with 語法
6. arguments、eval 不能作為變數名稱(也包含新的保留字 implements, interface, let, package, private, protected, public, static, yield)

```
'use strict' //放上最上面 整個檔案都套用
```

```
function a () {
  'use strict' // 這樣只套用在這個scope裡面
}
```

## 為何使用需在編譯轉成 js 的語言(ex: TypeScript)

1. Type: 此類型語言會出現的主因，因為 js 變數宣告並不會綁定其形態，雖然可以靈活運用，但不嚴謹
2. Class: 為了讓程式碼結構可讀性更高而使用，不過在 ES6 就有了 class 寫法了

## Debugging JavaScript(Eslint)

JS 寫法太過自由，獨自開發是還好，但當多人開發時，就需要統一寫法

### Eslint 就可以解決這個問題，同時也有 debug 的功能

```
{
    // 可以選擇error, warn, off三種方式提醒你
    "rules": {
        "quotes": ["error", "double"] // 規定用雙引號，單引號會出錯誤
    }
}
```

## 事件循環(event loop)

1. 同步和異步任務分別進入不同的執行 "場所"，同步的進入主線程，異步的進入 Event Table 並註冊函數
2. 當指定的事情完成時，Event Table 會將這個函數移入 Event Queue
3. 主線程內的任務執行完畢為空，會去 Event Queue 讀取對應的函數，進入主線程執行

**上述過程會不斷重複，也就是常說的 Event Loop(事件循環)**  
<img src="https://i.imgur.com/TORBpmM.jpg" height="300">
<img src="https://i.imgur.com/bVYf6vF.jpg" height="300">  
參考: https://medium.com/@amosricky95/ricky%E7%AD%86%E8%A8%98-javascript-%E7%9A%84-event-loop-c17a0a49d6e4

## 高階函數

單純是指以下這兩種函數  
**1. 回傳結果是一個函數**  
**2. 參數是接收一個或多個函數(callback)**

```
function ex1 (callback) {
  callback();
}

function ex2 () {
  return function() {}
}
```

## 解構賦值(Destructuring)

**是一個在 ES6 的新特性，用於提取陣列或物件中的資料，新語法可以讓程式碼在撰寫時更為簡短與提高閱讀性**  
解構賦值的語法並不難，基本上是一種陣列與物件指定值運算語法的簡短改進

**陣列解構賦值(Array destructuring)**

```
// 基本用法
const [a, b] = [1, 2] //a=1, b=2

// 略過某些值
const [a, , b] = [1, 2, 3] // a=1, b=3

// 其餘運算
const [a, ...b] = [1, 2, 3] //a=1, b=[2,3]

// 失敗保護(Fail-safe)
const [, , , a, b] = [1, 2, 3] // a=undefined, b=undefined

// 交換值
let a = 1, b = 2;
[b, a] = [a, b] //a=2, b=1

// 多維複雜陣列
const [a, [b, [c, d]]] = [1, [2, [[[3, 4], 5], 6]]]

// 字串
const str = "hello";
const [a, b, c, d, e] = str
```

**物件解構賦值(Object destructuring)**

```
// 基本用法
const { user: x } = { user: 5 } // x=5

// 失敗保護(Fail-safe)
const { user: x } = { user2: 5 } //x=undefined

// 賦予新的變數名稱
const { prop: x, prop2: y } = { prop: 5, prop2: 10 } // x=5, y=10

// 簡短語法(Short-hand syntax)
const { prop, prop2 } = { prop: 5, prop2: 10 } //prop = 5, prop2=10

// ES7的物件屬性其餘運算符
const {a, b, ...rest} = {a:1, b:2, c:3, d:4} //a=1, b=2, rest={c:3, d:4}
```

```
// 常見錯誤的示範
let a, b
{ a, b } = {a: 1, b: 2}
```

## ES6 樣板字面值(template Literals)

**除了提高可讀性，還包含下列功能**

1. 放入 HTML 的內容
2. 很長的字串包含換行
3. 字串連結變數 (${變數名稱})

```
// es5
let component_es5 = '<header>\n'+
'<div class="banner">\n'+
'<img src="img1.jpg"\n'+
'</div>\n'+
'</header>'

// es6
let component_es6 = `
<header>
    <div class='banner'>
        <img src="img1.jpg>
    </div>
</header>`
```

## Curry(柯里化)

**Curry 的概念很簡單: 你可以只透過部分的參數呼叫一個 function，它會回傳一個 function 去處理剩下的參數**

```
let add = function(x) {
  return function(y) {
    return x + y;
  };
};

let a = add(1);
let b = add(10);

a(2); // 3 (1+2)
a(3); // 4 (1+3)
b(2); // 12(10+2)
b(5); // 15(10+5)
```

## Spread syntax & Rest syntax(展開、其餘語法)

**兩者的差異與共同點**

1. 符號都是三個點(...)
2. 都與陣列有關
3. 一個是展開陣列中的值，一個是集合其餘的值成為陣列  
   **展開語法: 把一個陣列展開成個別值，最常見的是用來"連接陣列"，對應的陣列方法是 Array.concat()**

```
// 展開語法(Spread)
let list = [ "hello", true, 5 ]
let list2 = [ 1, 2, ...list ] // [ 1, 2, "hello", true, 5 ]

// 字串展開
let aString = "foo"
let chars = [ ...aString ] // [ "f", "o", "o" ]

// 傳入多個參數時
function spreadSum(a, b, c) {
  return a + b + c
}
const args = [1, 2, 3]
spreadSum(...args); //6
```

**其餘語法: 會用在兩個地方，一個是比較常見的"當作接收參數使用"時，另一種情況是用在解構賦值時(上面有)**

```
// 其餘語法(Rest)
function restSum(...numbers) {
  let sum = 0;
  for(let [key,value] of Object.entries(numbers)){
    sum = sum + value
  }
  return sum;
}

restSum(1) // [1] => 1
restSum(1, 2, 3, 4, 5) // [1,2,3,4,5] => 15
```

## export & import

**export 分兩種**

1. 公開多個指定的變數 export{ 變數, 變數 2 }, 就算只有一個也要括起來，import 一定要對應到變數才能引入
2. 公開一個預設的 export default 變數，import 時可以自己指定變數名稱  
   **注意: 使用在 html 上的話，需幫 sciprt 標籤加上 type="module"，這樣這個 js 擋才能 import**

```
<script type="module" src="module.js"></script>
```

```
export {a, b, c}

import {a, b} from 'xxx.js'
```

```
export default a

import foo from 'xxx.js'
```

## 靜態成員(static class members)

**其實就只是 class 的共用區域，避免每個實體都多占用一個空間**  
**這在上面的 prototype 有說過，不過這邊範例是用 class 來做**  
靜態方法: 可以不實體化就呼叫，**但無法被已實體化的類別物件呼叫**，前面+個 static 宣告即可  
靜態變數: 跟方法一樣，只是型態是一個變數

```
class Animal {
  static count = 0; // 靜態變數
  constructor() {
    Animal.addCount(); // 調用靜態方法
  }
  static addCount() { // 靜態方法
    Animal.count++
  }
}
Animal.count // 0

let classFoo = new Animal(); // 會觸發Animal.addCount()

Animal.count // 1
```

## Cookie & LocalStorage & SessionStorage

**Cookie**

- 為 server 傳送給 client(瀏覽器)的一個小片段資料
- 通常被用來保持使用者的登入狀態
- 可設定失效時間。 預設是關閉瀏覽器後失效
- 大小約 4kb
- 每次 request 時都會帶上

**LocalStorage & SessionStorage**  
**共同點:**

- 都是使用 key / value 的方式 給值或取值
- 大小預設有 5mb
- 每次 request 不會帶上  
  **不同點:**
- LocalStorage: 不會過期，除非手動清除
- SessionStorage: 每次分頁或瀏覽器關掉後就會清除

<img src="https://i.imgur.com/wjRUpnP.png" height="200">

```
// Cookie 寫入

// 基本使用
document.cookie="username=John Doe";

// 添加過期時間
document.cookie="username=John Doe; expires=Thu, 18 Dec 2043 12:00:00 GMT";

// 添加Path(告訴瀏覽器 cookie 的路徑，default: '/')
document.cookie="username=John Doe; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/";

// Cookie 讀取
let x = document.cookie;

// Cookie 修改(參數重複的話會直接蓋過去)
document.cookie="username=Dan Smith; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/";

// Cookie 刪除(設置 expires 參數為以前的時間即可)
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT";

// localStorage, sessionStorage
// 寫入
localStorage.setItem('key', 'value');
sessionStorage.setItem('key', 'value');

// 讀取
localStorage.getItem('key');
sessionStorage.getItem('key');

// 刪除
localStorage.removeItem('key');
sessionStorage.removeItem('key');

// 清空
localStorage.clear();
sessionStorage.clear();
```

## Function Statements & Function Expressions

- Function Statements: 宣告一個函數，並給予這個函數一個 name (又稱 function declaration)
- Function Expressions: 創建一個匿名函數，並把他指定給一個變數

```
// function statements = function declaration
function greet() {
  console.log('Hi');
}

// function expressions
const greet = function() {
  console.log('Hi');
};
```

<img src="https://i.imgur.com/ssO2tmG.png" height="200">  
<img src="https://i.imgur.com/Eh6xHBM.png" height="200">  
參考:https://pjchender.blogspot.com/2016/03/javascriptfunction-statements-and.html

## new 做了哪些事

**當 new Person('Jhon') 的時候，做了這些事情:**

1. 創建一個空的 object `let p2 = {}`
2. 新物件繼承 Person.prototype `p2.__proto__ = Person.prototype`
3. 執行剛剛繼承的建構式，並把參數帶入`p2.__proto__.constructor('Jhon')`
4. 回傳這個新物件

```
function Person(name) {
    this.name = name;

    console.log('執行Person()');
}

let p = new Person();

let p2 = {};
p2.__proto__ = Person.prototype;
p2.__proto__.constructor('Jhon') // 或是執行 Person.call(p2, 'Jhon') 一樣意思

console.log(Person === Person.prototype.constructor); // true
console.log(p2 instanceof Person); // true
console.log(p2.constructor === Person); // true
```

## JavaScript 中的參數傳遞

- 參考: https://blog.techbridge.cc/2018/06/23/javascript-call-by-value-or-reference/
- 重點: JavaScript 傳 object 進去的時候，可以更改原本物件的值，但重新賦值並不會影響到外部的 object

## 動態引入模組

- 參考: https://v8.dev/features/modules#dynamic-import
- 以往都只能先引入完全部模組，才能執行主程式
- 此功能包含可以用變數載入、懶載入(需要時才載)
- 雖然參考文件是引入 .mjs 但經測試後，.js 也可以

```js
<script type="module">
  (async () => {
    const moduleSpecifier = './DynamicImport.js';

    const {catShout, dogShout} = await import(moduleSpecifier);

    catShout()
    dogShout()
  })();
</script>
```

**DynamicImport.js**

```js
export function catShout() {
  console.log('meow!');
}

export function dogShout() {
  console.log('woof!');
}
```

## event loop

參考文章

- https://github.com/aszx87410/blog/issues/49
- https://medium.com/infinitegamer/why-event-loop-exist-e8ac9d287044

有 function 要執行 => 丟入 call stack (call stack 未滿的話)

=> 執行時發現 function 是 Web API => 丟入 callback queue
=> 用 event loop 一直確認 callback queue 是否可丟入 call stack (call stack 未滿的話)
=> 丟回 call stack 執行

第一篇文章的簡易要點

> 這邊只要掌握一個重點就好：「非同步的 callback function 會先被放到 callback queue，並且等到 call stack 為空時候才被 event loop 丟進去 call stack」。
> Event loop 就是那種只會出一張嘴不會做事的人，它不負責幫你執行 callback function，只會幫你把 function 丟到 call stack，真正在執行的還是 JavaScript 的 main thread。

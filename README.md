# Javascript 筆記

*   <a href="#型態Types">型態(Types)</a>
*   <a href="#Hoisting">Hoisting</a>
*   <a href="#閉包closure">閉包(Closure)</a>
*   <a href="#深拷貝">深拷貝</a>


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
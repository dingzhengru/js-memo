// 展開語法(Spread)
let list = [ "hello", true, 5 ]
let list2 = [ 1, 2, ...list ] // [ 1, 2, "hello", true, 5 ]

console.log(`spread: `, list2);

// 字串展開
let aString = "foo"
let chars = [ ...aString ] // [ "f", "o", "o" ]

console.log(`spread chars:`, chars);

// 傳入多個參數時
function spreadSum(a, b, c) {
  return a + b + c
}
const args = [1, 2, 3]
console.log(`spreadSum: `, spreadSum(...args)); //6

// 其餘語法(Rest)
function restSum(...numbers) {
  let sum = 0;
  for(let [key,value] of Object.entries(numbers)){
    sum = sum + value
  }
  console.log('restSum:', sum);
  return sum;
}

restSum(1) // [1] => 1
restSum(1, 2, 3, 4, 5) // [1,2,3,4,5] => 15
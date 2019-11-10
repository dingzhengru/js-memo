let add = function(x) {
  return function(y) {
    return x + y;
  };
};

let a = add(1);
let b = add(10);

console.log(a(2)); // 3 (1+2)
console.log(a(3)); // 4 (1+3)
console.log(b(2)); // 12(10+2)
console.log(b(5)); // 15(10+5)

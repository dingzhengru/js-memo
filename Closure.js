// 閉包(Closure)

function closureTest() {
  let a = 10
  function inner() {
    console.log(a) // 還是 10
  }
  return inner
}
  
let foo = closureTest()
foo()
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

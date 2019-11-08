function wtf(argv0, argv1) {
  console.log('wtf:', this.v, argv0, argv1);
}
var obj = { v: 'I am obj' };
var obj2 = { v: 'I am obj2' }
// 如果我們希望這個function能吃到obj的this
// 把function放在物件裡頭
obj.func = wtf;
obj.func(1, 2); // obj 1 2

// 或是我們在第一個參數告訴function你的receiver是obj
wtf.call(obj, 1, 2); // obj 1 2
wtf.apply(obj2, [1, 2]); // obj2 1 2
wtf.bind(obj2)(1, 2); // obj2 1 2

let cloneTestA = { name: 'ding' };
let cloneTestB = cloneTestA;
cloneTestB.name = 'change';
console.log(cloneTestA); // change cloneTestA被改了
cloneTestB = _.cloneDeep(cloneTestA);
cloneTestB.name = 'change again'; 
console.log(cloneTestA); // change 沒有被改變
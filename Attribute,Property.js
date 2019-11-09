let inputEl = document.getElementById('username');

console.log(inputEl.getAttribute('id')) // username
console.log(inputEl.getAttribute('type')) // zzz
console.log(inputEl.getAttribute('value')) // foo

console.log(inputEl.id); // username
console.log(inputEl.type); // text
console.log(inputEl.value); // foo

console.log(inputEl.getAttribute('customTag')) // 123
console.log(inputEl.customTag)
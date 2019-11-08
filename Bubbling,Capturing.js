const $list = document.getElementById('list');
const $list_item = document.getElementById('list_item');
const $list_item_link = document.getElementById('list_item_link');

// eventPhase: 1,2,3
// 1:CAPTURING_PHASE, 2:AT_TARGET, 3:BUBBLING_PHASE
// list 的捕獲
$list.addEventListener('click', (e) => {
  console.log('list 捕獲', e.eventPhase);
}, true)
  
// list 的冒泡
$list.addEventListener('click', (e) => {
  console.log('list 冒泡', e.eventPhase);
}, false)
  
// list_item 的捕獲
$list_item.addEventListener('click', (e) => {
  console.log('list_item 捕獲', e.eventPhase);
}, true)
  
// list_item 的冒泡
$list_item.addEventListener('click', (e) => {
  console.log('list_item 冒泡', e.eventPhase);
}, false)
  
// list_item_link 的捕獲
$list_item_link.addEventListener('click', (e) => {
  console.log('list_item_link 捕獲', e.eventPhase);
}, true)
  
// list_item_link 的冒泡
$list_item_link.addEventListener('click', (e) => {
  console.log('list_item_link 冒泡', e.eventPhase);
}, false)
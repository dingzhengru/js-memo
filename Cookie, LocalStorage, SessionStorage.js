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

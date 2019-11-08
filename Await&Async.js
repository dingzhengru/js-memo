function getA() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('A')
    }, 1000)
  })
}

function getB() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('B')
    }, 1000)
  })
}

function getC() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('C')
    }, 1000)
  })
}

async function getAll() {
    console.log(await getA());
    console.log(await getB());
    console.log(await getC());
    
    // 如果用原本Promise.then 要讓ABC照順序執行
    getA().then((data) => {
        console.log(data);
        getB().then((data) => {
            console.log(data);
            getC().then((data) => {
                console.log(data);
            })
        })
    })

    return '成功時回傳此，也是用.then()接'
}

getAll().then((data) => {
    console.log(data);
}).catch((error) => {
    // 如果中途有執行錯誤，會跑來這邊
    console.log(error);
})
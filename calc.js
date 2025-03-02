// self代替webworker实例
self.onmessage = function (e) {
    //接收传递来的数值
    calc(e.data)
}

function calc(num) {
    let result = 0
    for (let i = 0; i <= num; i++) {
        result += i
    }
    self.postMessage(result)
}

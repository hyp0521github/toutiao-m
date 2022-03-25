// 封装存储数据的函数

// 1.存储数据
export const setItem = (key, value) => {
  // 判断数据是否为object类型
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 2.取出数据
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    // 我们可以使用 JSON.parse() 方法将数据转换为 JavaScript 对象。
    // 解析前要确保你的数据是标准的 JSON 格式，否则会解析出错。
    // return 相当于把JSON.parse(data)赋值给了getTtem(),getTtem() = JSON.parse(data)
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

// 3.删除数据
export const remove = key => {
  window.localStorage.removeItem(key)
}

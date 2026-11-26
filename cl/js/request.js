// ========== 环境地址配置 ==========
// 开发环境
const DEV_BASE_URL = 'http://127.0.0.1:3000/api'
// 生产环境，先注释，上线再打开
// const PROD_BASE_URL = 'https://xxx.com/api'

// 当前使用开发地址
const BASE_URL = DEV_BASE_URL

/**
 * 通用请求封装
 * @param {string} url 接口路径
 * @param {string} method GET / POST
 * @param {object} data 请求参数
 * @returns {Promise<any>}
 */
function request(url, method = 'GET', data = {}) {
    const fullUrl = BASE_URL + url
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // GET 参数拼在url上，POST放body
    if (method.toUpperCase() === 'GET') {
        const params = new URLSearchParams(data).toString()
        if (params) {
            fullUrl += '?' + params
        }
    } else {
        options.body = JSON.stringify(data)
    }

    return fetch(fullUrl, options)
        .then(res => {
            if (!res.ok) {
                throw new Error(`请求错误：${res.status}`)
            }
            return res.json()
        })
        .catch(err => {
            console.error('请求失败：', err)
            throw err
        })
}

// 方便直接调用的简写
function get(url, data) {
    return request(url, 'GET', data)
}
function post(url, data) {
    return request(url, 'POST', data)
}

// 导出（浏览器直接用可以挂到window，模块化用export）
window.$get = get
window.$post = post

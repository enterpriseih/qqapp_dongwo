/**
 * 函数式报错
 */
const error = (error, value) => {
    console.error(error)
    return value
}
/**
 * qq接口 Promise 化
 * @param {function} api qq接口
 *
 * @return {function} Promise 化的新函数
 */
export function qqPromisify (api) {
    return (typeof api === 'function' && function (config) {
        config = typeof config === 'object' ? config : {}
        return new Promise(function (resolve, reject) {
            api(Object.assign({}, config, {
                success (data) {
                    resolve(data)
                },
                fail (error) {
                    reject(error)
                },
                complete () {}
            }))
        })
    }) || error('接口 Promise 化入参类型错误', function () {})
}

import { qqPromisify } from './utils';
/**
 * 封装qq.request为Promise格式
 * @param {Object} option
 * @property {String} option.url    请求URL
 * @property {String} option.method 请求方式 ‘GET'|'POST'
 * @property {Object} option.data   请求携带的数据
 */
const request = qqPromisify(qq.request);
export default function (option = { url: '', method: 'GET', data: {} }) {
    return request({
        url: option.url,
        data: option.data,
        method: option.method
    }).then(res => {
        return res.data;
    })
}
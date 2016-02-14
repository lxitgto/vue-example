/**
 * Created by ethan-liu on 16/2/8.
 */


import { CUSTOMER_URL } from './constants.js'

export default {

    getCustomer() {
        var res = { success: false};
        var resource = Vue.resource(CUSTOMER_URL);

        return new Promise((resolve, reject) => {
            resource.get().then(response => {
                resolve({success: true, customer: response.data})
            }, response => {
                console.warn(response.status)
                reject(res)
            })
        })
    },

    updateCustomer(customer) {
        var res = { success: false, message: '信息保存不成功'};
        var resource = Vue.resource(CUSTOMER_URL);

        return new Promise((resolve, reject) => {
            resource.update(JSON.stringify(customer)).then(response => {
                resolve({success: true, message: '信息保存成功'})
            }, response => {
                console.warn(response.status)
                reject(res)
            })
        })
    }
}
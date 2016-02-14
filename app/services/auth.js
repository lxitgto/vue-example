/**
 * Created by ethan-liu on 16/1/6.
 */

import { API_URL,LOGIN_URL } from './constants.js'

export default {

    login(credentials) {
        var res = { success: false, message: '用户名或密码不正确' }
        return new Promise((resolve, reject) => {
            Vue.http.post(LOGIN_URL, credentials).then(() => {
                resolve({success: true})
            }, response => {
                console.warn(response.status + ' ' + response.data)
                reject(res)
            })
        })
    },

    register(user) {
        var resource = Vue.resource(API_URL + 'user');
        var res = { success: false, message: '注册信息不正确' };

        return new Promise((resolve, reject) => {
            resource.save(JSON.stringify(user)).then(response => {
                if(response.status == 201) {
                    res = {success: true}
                }
                resolve(res)
            }, response => {
                console.warn(response.status + ' ' + response.data)
                reject(res)
            })
        })
    },

    getUser() {
        var res = { success: false};
        var resource = Vue.resource(API_URL + 'user');
        return new Promise((resolve, reject) => {
            resource.get().then(response => {
                resolve({success: true, user: response.data})
            }, response => {
                console.warn(response.status)
                reject(res)
            })
        })
    }
}
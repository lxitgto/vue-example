/**
 * Created by ethan-liu on 16/1/3.
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueValidator from 'vue-validator'
import {configRouter} from 'route-config.js'
require('es6-promise').polyfill();

// install router
Vue.use(VueRouter);
// install Resource
Vue.use(VueResource);
// install Validator
Vue.use(VueValidator);

//Vue.config.silent = true;

Vue.http.interceptors.push(() => {
    return {
        request: (request) => {
            var token;
            token = localStorage.getItem('jwt-token');
            if ( token !== null && token !== 'undefined') {
                Vue.http.headers.common['Authorization'] = token;
            }
            return request;
        },
        response: (response) => {
            if (response.status == 401) {
                localStorage.removeItem('jwt-token');
            }
            if (response.headers('Authorization')) {
                localStorage.setItem('jwt-token', 'Bearer ' + response.headers('Authorization'));
            }
            if (response.data.jwtToken && response.data.jwtToken.length > 10) {
                localStorage.setItem('jwt-token', 'Bearer ' + response.data.jwtToken);
            }
            return response;
        }
    };
});

// `email` custom validator is global registration
Vue.validator('email', function (val) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
});

// add custom directive
Vue.directive( 'checked', function( val ){
    this.el.checked = val;

    if ("createEvent" in document) {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", false, true);
        this.el.dispatchEvent(evt);
    }
    else {
        this.el.fireEvent("onchange");
    }
});

// create router
const router =new VueRouter({
    root: "/vue-example",
    history: true,
    _saveScrollPosition: false
});

// configure router
configRouter(router);

// boostrap the app
const App = Vue.extend(require('./app.vue'));
router.start(App, '#app');

// just for debugging
window.router = router;
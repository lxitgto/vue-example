/**
 * Created by ethan-liu on 16/1/4.
 */

export function configRouter (router) {

    // normal routes
    router.map({
        // not found handler
        '*': {
            component: require('./components/404.vue')
        },

        '/main': {
            component: require('./components/main.vue'),
            subRoutes: {
                '/conferences': {
                    component: require('./components/main/conferences.vue'),
                    auth: true,
                    mpath: 'conferences'
                },
                '/settings': {
                    component: require('./components/main/settings.vue'),
                    auth: true,
                    mpath: 'settings',
                    subRoutes: {
                        '/customerInfo': {
                            component: require('./components/main/settings/customerInfo.vue'),
                            auth: true,
                            cpath: 'customerInfo'
                        },
                        '/customerSetting': {
                            component: require('./components/main/settings/customerSetting.vue'),
                            auth: true,
                            cpath: 'customerSetting'
                        },
                        '/userInfo': {
                            component: require('./components/main/settings/userInfo.vue'),
                            auth: true,
                            cpath: 'userInfo'
                        },
                        '/changePassword': {
                            component: require('./components/main/settings/changePassword.vue'),
                            auth: true,
                            cpath: 'changePassword'
                        }
                    }
                }
            }
        },

        '/auth': {
            component: require('./components/auth.vue'),
            subRoutes: {
                '/login': {
                    component: require('./components/auth/login.vue'),
                    guest: true
                },
                '/register': {
                    component: require('./components/auth/register.vue'),
                    guest: true
                }
            }
        }
    });

    router.alias({
        '': '/auth/login'
    });

    // global before
    // 3 options:
    // 1. return a boolean
    // 2. return a Promise that resolves to a boolean
    // 3. call transition.next() or transition.abort()
    router.beforeEach((transition) => {
        var token = localStorage.getItem('jwt-token');

        if (transition.to.auth) {
            if (!token || token === null) {
                transition.redirect('/')
            }
        }
        if (transition.to.guest) {
            if (token) {
                transition.redirect('/')
            }
        }
        transition.next()
    })
}
<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script type="text/babel">

    export default {
    ready() {
        this.$on('userHasLoggedIn', user => this.setLogin(user))
        this.$on('userHasLoggedOut', () => this.destroyLogin())
        var token = localStorage.getItem('jwt-token')
        if (token !== null && token !== 'undefined') {
            this.$route.router.go('/main/conferences')
        }
    },
    methods: {
        setLogin() {
            this.token = localStorage.getItem('jwt-token')
        },
        destroyLogin() {
            localStorage.removeItem('jwt-token')
            if (this.$route.auth) this.$route.router.go('/')
        }
    }
    }
</script>
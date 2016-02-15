<style>
</style>

<template>
    <div class="row">
        <div class="col-md-2">
            <ul class="nav nav-pills nav-stacked">
                <li role="presentation" class="{{ navClass('userInfo') }}">
                    <a v-link="{ path: '/main/settings/userInfo' }">个人信息</a>
                </li>
                <li role="presentation" class="{{ navClass('changePassword') }}">
                    <a v-link="{ path: '/main/settings/changePassword' }">修改密码</a>
                </li>
            </ul>
        </div>
        <div class="col-md-10">
            <router-view></router-view>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        data () {
            return {}
        },
        methods: {
            navClass: function(path) {
                if(path == this.$route.cpath) {
                    return 'active'
                }
                return ''
            }
        }
    }
</script>
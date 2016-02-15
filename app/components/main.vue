<style>
    .custom-active-class {
        color: #555;
        background-color: #e7e7e7;
    }
</style>

<template>
    <div class="container">
        <!-- Static navbar -->
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" v-link="{ path: '/main/conferences' }">会议系统</a>
                </div>
                <!--/.navbar-header -->
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <li class="{{ navClass('conferences') }}"><a v-link="{ path: '/main/conferences' }">会议室</a></li>
                        <li class="{{ navClass('settings') }}"><a v-link="{ path: '/main/settings/userInfo' }">系统设置</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a>欢迎您{{ user.name }} 您的账户余额: {{ user.balance | currency '¥'}}元</a></li>
                        <li><a href="#"><span class="label label-info">账户充值</span> </a></li>
                        <li><a @click.stop.prevent="logout()" href="#"><i class="icon-off"> </i> 退出</a></li>
                        <li><a href="#"><i class="icon-question-sign"> </i> 帮助中心</a></li>
                    </ul>
                </div>
                <!--/.nav-collapse -->
            </div>
            <!--/.container-fluid -->
        </nav>

        <div>
            <router-view></router-view>
        </div>
    </div>
    <!-- /container -->
</template>

<script type="text/babel">
    import auth from '../services/auth.js'

    export default {
        data () {
            return {
                user: '',
                error: ''
            }
        },
        route: {
            data({to, next}) {
                var user = ''
                var customer = ''
                var p1 = auth.getUser().then(response => user = response.user)
                Promise.all([p1]).then(() => next({user: user})).catch(() => this.$dispatch('userHasLoggedOut'))
            }
        },
        methods: {
            logout() {
                this.$dispatch('userHasLoggedOut')
            },
            navClass: function(path) {
                if(path == this.$route.mpath) {
                    return 'active'
                }
                return ''
            }
        }
    }
</script>
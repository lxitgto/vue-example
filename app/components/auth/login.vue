<style>
    body {
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #eee;
    }

    .form-signin {
        max-width: 330px;
        padding: 15px;
        margin: 0 auto;
    }

    .form-signin .form-signin-heading,
    .form-signin .checkbox {
        margin-bottom: 10px;
    }

    .form-signin .checkbox {
        font-weight: normal;
    }

    .form-signin .form-control {
        position: relative;
        height: auto;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px;
        font-size: 16px;
    }

    .form-signin .form-control:focus {
        z-index: 2;
    }

    .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }

    .register-link {
        float: right;
    }

</style>

<template>
    <div class="container">
        <validator name="loginValidation">
            <div class="form-signin">
                <h2 class="form-signin-heading">请登录</h2>
                <label for="inputEmail" class="sr-only">Email address</label>
                <input
                        type="email"
                        id="inputEmail"
                        class="form-control"
                        placeholder="Email address"
                        v-model="credentials.email"
                        v-validate:credentials.email="['email']"
                        required autofocus>
                <p class="text-warning" v-show="$loginValidation.credentials.email">请输入正确的Email地址</p>
                <label for="inputPassword" class="sr-only">Password</label>
                <input
                        type="password"
                        id="inputPassword"
                        class="form-control"
                        placeholder="Password"
                        v-model="credentials.password"
                        v-validate:password="{required: true, minlength: 6}"
                        required>
                <p class="text-warning" v-if="$loginValidation.password.required">请输入密码</p>
                <p class="text-warning" v-if="$loginValidation.password.minlength">密码长度不能小于6位</p>
                <div class="checkbox">
                    <label>
                        <input type="checkbox" value="remember-me"> Remember me
                    </label>
                    <a class="register-link" v-link="{ path: '/auth/register' }">注册</a>
                </div>
                <button class="btn btn-lg btn-primary btn-block" @click="submit()" v-if="$loginValidation.valid">登录</button>
                <button class="btn btn-lg btn-primary btn-block" v-else >登录</button>
                <p v-if="error" class="text-danger">{{ error }}</p>
            </div>
        </validator>
    </div>
    <!-- /container -->
</template>

<script type="text/babel">
    import auth from '../../services/auth.js'

    export default {
        data () {
            return {
                credentials: {
                    email: '',
                    password: ''
                },
                error: ''
            }
        },
        methods: {
            submit() {
                var credentials = {
                    email: this.credentials.email,
                    password: this.credentials.password
                }
                auth.login(credentials).then(response => {
                    if (response.success) {
                        router.go("/main/conferences")
                    } else {
                        this.error = response.message
                    }
                })
            }
        }
    }
</script>
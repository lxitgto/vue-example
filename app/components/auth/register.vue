<template>
    <div class="container">
        <validator name="regValidation">
            <form class="form-horizontal" role="form" v-on:submit.prevent="registerUser">
                <fieldset>
                    <div id="legend">
                        <legend class="">Register</legend>
                    </div>
                    <div class="control-group">
                        <!-- Username -->
                        <label class="control-label" for="name">Username</label>

                        <div class="controls">
                            <input type="text" id="name" v-model="user.name"
                                   v-validate:name="{required: true}" placeholder="" class="input-xlarge">
                            <p class="text-warning" v-if="$regValidation.name.required">请输入密码</p>
                        </div>
                    </div>

                    <div class="control-group">
                        <!-- E-mail -->
                        <label class="control-label" for="email">E-mail</label>

                        <div class="controls">
                            <input type="text" id="email" v-model="user.email"
                                   v-validate:user.email="['email']" placeholder="" class="input-xlarge">
                            <p class="text-warning" v-show="$regValidation.user.email">请输入正确的Email地址</p>
                        </div>
                    </div>

                    <div class="control-group">
                        <!-- Password-->
                        <label class="control-label" for="password">Password</label>

                        <div class="controls">
                            <input type="password" id="password" v-model="user.password"
                                   v-validate:password="{required: true, minlength: 6}" placeholder="" class="input-xlarge">

                            <p class="text-warning" v-if="$regValidation.password.required">请输入密码</p>
                            <p class="text-warning" v-if="$regValidation.password.minlength">密码长度不能小于6位</p>
                        </div>
                    </div>

                    <div class="control-group">
                        <!-- Password -->
                        <label class="control-label" for="password_confirmation">Password (Confirm)</label>

                        <div class="controls">
                            <input type="password" id="password_confirmation" v-model="user.password_confirmation"
                                   v-validate:password_confirmation="{required: true, minlength: 6}" placeholder=""
                                   class="input-xlarge">

                            <p class="text-warning" v-if="$regValidation.password_confirmation.required">请输入密码</p>
                            <p class="text-warning" v-if="$regValidation.password_confirmation.minlength">密码长度不能小于6位</p>
                        </div>
                    </div>

                    <div class="control-group" v-if="$regValidation.valid">
                        <!-- Button -->
                        <div class="controls">
                            <button class="btn btn-success">Register</button>
                        </div>
                    </div>
                </fieldset>
                <p v-if="messages" class="text-danger">{{ messages }}</p>
            </form>
        </validator>
    </div>
</template>

<script type="text/babel">
    import auth from '../../services/auth.js'

    export default {
        data () {
            return {
                user: {
                    name: null,
                    email: null,
                    password: null,
                    password_confirmation: null
                },
                messages: ''
            }
        },
        methods: {
            registerUser() {
                if (this.user.password === this.user.password_confirmation) {
                    var user = {
                        name: this.user.name,
                        email: this.user.email,
                        password: this.user.password
                    }
                    auth.register(user).then(response => {
                        if (response.success) {
                            router.go("/")
                        } else {
                            this.messages = response.message
                        }
                    })
                } else {
                    this.messages = "输入密码不一致"
                }
            }
        }
    }
</script>
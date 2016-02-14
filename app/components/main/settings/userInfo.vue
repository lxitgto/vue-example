<template>
    <form class="form-horizontal">
        <div class="form-group">
            <label for="inputName" class="col-sm-2 control-label">姓名</label>

            <div class="col-sm-4">
                <input type="text" class="form-control" id="inputName" v-model="user.name"
                       value="{{ user.name }}">
            </div>
        </div>
        <div class="form-group">
            <label for="inputCellPhoneNum" class="col-sm-2 control-label">手机号码</label>

            <div class="col-sm-4">
                <input type="text" class="form-control" id="inputCellPhoneNum"
                       v-model="user.phonenum" value="{{ user.phonenum }}">
            </div>
            <div class="col-sm-2">
                <button type="button" class="btn btn-info" @click='verifyCellPhone()'>验证手机</button>
            </div>
        </div>
        <div class="form-group">
            <label for="inputEmail" class="col-sm-2 control-label">邮箱</label>

            <div class="col-sm-4">
                <input type="text" class="form-control" id="inputEmail" v-model="user.email"
                       value="{{ user.email }}">
            </div>
            <div class="col-sm-2">
                <button type="button" class="btn btn-info" @click='verifyEmail()'>验证邮箱</button>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <button class="btn btn-primary" @click.stop.prevent='saveUser()'>保存</button>
            </div>
        </div>
    </form>
</template>

<script type="text/babel">
    import auth from '../../../services/auth.js'

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
                auth.getUser().then(response => {
                    user = response.user
                    next({user: user})
                })
            }
        },
        methods: {
            verifyEmail() {

            },
            verifyCellPhone() {

            },
            saveUser() {

            }
        }
    }
</script>
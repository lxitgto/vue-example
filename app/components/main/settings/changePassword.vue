<template>
    <form class="form-horizontal">
        <div class="form-group">
            <label for="inputPassword" class="col-sm-2 control-label">*旧密码：</label>

            <div class="col-sm-4">
                <input type="password" v-model="oldPassword" class="form-control" id="inputPassword" placeholder="旧密码">
            </div>
        </div>
        <div class="form-group">
            <label for="inputPassword1" class="col-sm-2 control-label">*新密码：</label>

            <div class="col-sm-4">
                <input type="password" v-model="newPassword" class="form-control" id="inputPassword1" placeholder="新密码">
            </div>
        </div>
        <div class="form-group">
            <label for="inputPassword2" class="col-sm-2 control-label">*确认密码：</label>

            <div class="col-sm-4">
                <input type="password" v-model="newPassword2" class="form-control" id="inputPassword2" placeholder="确认密码">
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <button type="submit" class="btn btn-primary" @click.stop.prevent='changePassword()'>确认</button>
            </div>
        </div>
    </form>
</template>

<script type="text/babel">
    export default {
        data () {
            return {
                oldPassword: '',
                newPassword: '',
                newPassword2: ''
            }
        },
        methods: {
            changePassword() {

            }
        }
    }
</script>
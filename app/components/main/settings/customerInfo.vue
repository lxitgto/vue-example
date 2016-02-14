<template>
    <form class="form-horizontal">
        <div class="form-group">
            <label for="inputName" class="col-sm-2 control-label">企业名称：</label>

            <div class="col-sm-4">
                <input type="text" class="form-control" id="inputName" v-model="customer.name"
                       value="{{ customer.name }}">
            </div>
        </div>
        <div v-if="msg.success" class="form-group alert alert-success" role="alert">
            <label class="col-sm-2 control-label">操作结果:</label>
            <div class="col-sm-4">{{ msg.message }}</div>
        </div>
        <div v-if="msg.success == false" class="form-group alert alert-warning" role="alert">
            <label class="col-sm-2 control-label">操作结果:</label>
            <div class="col-sm-4">{{ msg.message }}</div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <button class="btn btn-primary" @click.stop.prevent='submit()'>保存</button>
            </div>
        </div>
    </form>
</template>

<script type="text/babel">
    import customerservice from '../../../services/customer.js'

    export default {
        data () {
        return {
            customer: '',
            msg: ''
        }
    },
    route: {
        data({to, next}) {
            var customer = ''
            customerservice.getCustomer().then(response => {
                next({customer: response.customer})
            })
        }
    },
    methods: {
        submit() {
            customerservice.updateCustomer(this.customer).then(response => {
                this.msg = response
            })
        }
    }
    }
</script>
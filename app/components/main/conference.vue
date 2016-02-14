<template>
    <div class="row">
        <div class="col-md-4">
            <form class="form-horizontal">
                <div class="form-group">
                    <label for="Topic" class="col-sm-4 control-label">*主题：</label>

                    <div class="col-sm-8 input-group">
                        <input type="text" class="form-control" id="Topic" v-model="conference.topic">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-4 control-label">时间：</label>

                    <div class='col-sm-8 input-group date' id='datetimepicker1'>
                        <input type='text' class="form-control" v-model="result1"/>
                    <span class="input-group-addon">
                        <span class="glyphicon glyphicon-calendar"></span>
                    </span>
                    </div>
                </div>
                <div class="form-group">
                    <label for="moderator" class="col-sm-4 control-label">*主持人：</label>

                    <div class="col-sm-8 input-group">
                        <input type="text" class="form-control" id="moderator" v-model="conference.moderator">
                    </div>
                </div>
                <div class="form-group">
                    <table class="table table-striped table-bordered">
                        <thead>
                        <tr>
                            <th>姓名</th>
                            <th>电话号码</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="member in members">
                            <td>{{ member.name }}</td>
                            <td>{{ member.cellPhoneNum }}</td>
                            <td>
                                <button type="button" class="btn btn-default btn-sm" @click="modifyContact(contact)">
                                    <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="form-group">
                    <div class="col-sm-offset-4 col-sm-10">
                        <button type="submit" class="btn btn-primary">立即开始</button>
                    </div>
                </div>
            </form>
        </div>
        <div class="col-md-2">
            <ul class="nav nav-pills nav-stacked">
                <li role="presentation" :class="{ 'active': group.active }" v-for="group in groups">
                    <a href="" @click.stop.prevent="changeGroup(group.id)">{{ group.name }}</a>
                </li>
            </ul>
        </div>
        <div class="col-md-6">
            <div class="btn-group" role="group" aria-label="...">
                <button type="button" class="btn btn-primary" @click="joinConference()">加入会议</button>
            </div>
            <div class="table-responsive">
                <table class="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th><input type="checkbox" v-model="checkAll" id="all"></th>
                        <th>姓名</th>
                        <th>部门</th>
                        <th>职位</th>
                        <th>电话号码</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="contact in contacts">
                        <td><input type="checkbox" value="{{ contact.id }}" v-checked="checkAll" v-model="checkedNames"></td>
                        <td>{{ contact.name }}</td>
                        <td>{{ contact.department }}</td>
                        <td>{{ contact.position }}</td>
                        <td>{{ contact.cellPhoneNum }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
    import contactservice from '../../services/contact.js'

    export default {
        data () {
            return {
                contacts: [],
                groups: [],
                members: [],
                conference: {
                    topic: '',
                    datetime: '',
                    moderator: '',
                    allMute: ''
                },
                result1: null,
                checkAll: false,
                checkedNames: []
            }
        },
        route: {
            data({to, next}) {
                var contacts = []
                var groups = []
                groups.push({
                    "id": "all",
                    "name": "所有联系人",
                    "userId": "all",
                    "active": true
                })
                var p1 = contactservice.getContacts().then((response) => contacts = response.contacts)
                var p2 = contactservice.getGroups().then((response) => response.groups.forEach(v => {
                    v.active = false
                    groups.push(v)
                }))
                Promise.all([p1, p2]).then(() => next({contacts: contacts, groups: groups}))
            }
        },
        methods: {
            changeGroup(id) {
                this.groups.find(group => {
                    group.active = false
                    if (group.id == id) {
                        if(id == 'all') {
                            contactservice.getContacts().then(response => this.contacts = response.contacts)
                        } else {
                            contactservice.getContactsByGroupId(id).then(response => this.contacts = response.contacts)
                        }
                        group.active = true
                    }
                })
                this.checkAll = false
            },
            joinConference() {

            },
            submit() {
            }
        },
        ready () {
            $(function () {
                $('#datetimepicker1').datetimepicker({
                    locale: 'zh-CN',
                    format: 'YYYY-MM-DD HH:mm',
                    sideBySide: true,
                    showTodayButton: true,
                    allowInputToggle: true,
                    minDate: moment()
                });
            });
        }
    }
</script>
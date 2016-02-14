<template>
    <div class="row">
        <div class="col-md-2">
            <ul class="nav nav-pills nav-stacked">
                <li role="presentation" :class="{ 'active': group.active }" v-for="group in groups">
                    <a href="" @click.stop.prevent="changeGroup(group.id)">{{ group.name }}
                        <span v-if="$index > 0" @click.stop.prevent="deleteGroup(group.id)"
                              class="pull-right glyphicon glyphicon-remove" aria-hidden="true"></span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="col-md-10">
            <div class="btn-group" role="group" aria-label="...">
                <button type="button" class="btn btn-primary" @click="showModal = true">新建联系人</button>
                <button class="btn btn-warning" type="button" @click="deleteContact">删除联系人</button>
                <dropdown>
                    <button type="button" class="btn btn-info" data-toggle="dropdown">
                        复制到组
                        <span class="caret"></span>
                    </button>
                    <ul name="dropdown-menu" class="dropdown-menu">
                        <li v-for="group in groups">
                            <a v-if="$index > 0" href="#" @click.stop.prevent="addGroupId(group.id)">{{ group.name }}</a>
                        </li>
                    </ul>
                </dropdown>
                <button v-if="activeGroup" type="button" class="btn btn-success" @click="removeFromGroup">从组中移除</button>
                <button type="button" class="btn btn-success" @click="showGroupModal = true">新建联系人组</button>
            </div>
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>姓名</th>
                        <th>部门</th>
                        <th>职位</th>
                        <th>电话号码</th>
                        <th>邮箱</th>
                        <th>修改</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="contact in contacts">
                        <td><input type="checkbox" value="{{ contact.id }}" v-model="checkedNames"></td>
                        <td>{{ contact.name }}</td>
                        <td>{{ contact.department }}</td>
                        <td>{{ contact.position }}</td>
                        <td>{{ contact.cellPhoneNum }}</td>
                        <td>{{ contact.email }}</td>
                        <td>
                            <button type="button" class="btn btn-default btn-sm" @click="modifyContact(contact)">
                                <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <modal :show.sync="showModal" title="新建联系人" effect="fade">
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal">
                <div class="form-group">
                    <label for="inputName" class="col-sm-2 control-label">姓名</label>

                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputName" v-model="contact.name"
                               placeholder="姓名">
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputDepartment" class="col-sm-2 control-label">部门</label>

                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputDepartment"
                               v-model="contact.department" placeholder="部门">
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputPosition" class="col-sm-2 control-label">职位</label>

                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputPosition"
                               v-model="contact.position" placeholder="职位">
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputCellPhoneNum" class="col-sm-2 control-label">手机号码</label>

                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputCellPhoneNum"
                               v-model="contact.cellPhoneNum" placeholder="手机号码">
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputEmail" class="col-sm-2 control-label">邮箱</label>

                    <div class="col-sm-10">
                        <input type="email" class="form-control" id="inputEmail" v-model="contact.email"
                               placeholder="邮箱">
                    </div>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click='closeModal()'>关闭</button>
            <button type="button" class="btn btn-primary" @click='addContact()'>保存</button>
        </div>
    </modal>
    <modal :show.sync="showGroupModal" title="新建联系人组" effect="fade">
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal">
                <div class="form-group">
                    <label for="inputGroupName" class="col-sm-2 control-label">组名称</label>

                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputGroupName" v-model="group.name"
                               placeholder="组名称">
                    </div>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click='closeGroupModal()'>关闭</button>
            <button type="button" class="btn btn-primary" @click='addGroup()'>保存</button>
        </div>
    </modal>
    <modal :show.sync="showModifyModal" title="修改联系人" effect="fade">
        <div slot="modal-body" class="modal-body">
            <form class="form-horizontal">
                <div class="form-group">
                    <label for="inputModifName" class="col-sm-2 control-label">姓名</label>

                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputModifName" v-model="contact.name"
                               placeholder="姓名" value="{{ contact.name }}">
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputModifDepartment" class="col-sm-2 control-label">部门</label>

                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputModifDepartment"
                               v-model="contact.department" placeholder="部门" value="{{ contact.department }}">
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputModifPosition" class="col-sm-2 control-label">职位</label>

                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputModifPosition"
                               v-model="contact.position" placeholder="职位" value="{{ contact.position }}">
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputModifCellPhoneNum" class="col-sm-2 control-label">手机号码</label>

                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputModifCellPhoneNum"
                               v-model="contact.cellPhoneNum" placeholder="手机号码" value="{{ contact.cellPhoneNum }}">
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputModifEmail" class="col-sm-2 control-label">邮箱</label>

                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputModifEmail"
                               v-model="contact.email" placeholder="邮箱" value="{{ contact.email }}">
                    </div>
                </div>
            </form>
        </div>
        <div slot="modal-footer" class="modal-footer">
            <button type="button" class="btn btn-default" @click='closeModifyModal()'>关闭</button>
            <button type="button" class="btn btn-primary" @click='doModifyContact()'>保存</button>
        </div>
    </modal>
</template>

<script type="text/babel">
    import contactservice from '../../services/contact.js'
    import { modal } from 'vue-strap'
    import { dropdown } from 'vue-strap'

    export default {
        data () {
            return {
                contacts: [],
                groups: [],
                contact: this.initContact(),
                group: this.initGroup(),
                error: '',
                showModal: false,
                showModifyModal: false,
                showGroupModal: false,
                checkedNames: []
            }
        },
        components: {
            modal,dropdown
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
            addContact() {
                var contact = {
                    userId: this.$root.user.id,
                    name: this.contact.name,
                    department: this.contact.department,
                    position: this.contact.position,
                    cellPhoneNum: this.contact.cellPhoneNum,
                    email: this.contact.email,
                    groupIdList: this.contact.groupIdList
                }
                contactservice.saveContact(contact).then(() => {
                    this.showModal = false
                    this.contact = this.initContact()
                    contactservice.getContacts().then((response) => this.contacts = response.contacts)
                })
            },
            deleteContact() {
                if (this.checkedNames.length > 0) {
                    contactservice.deleteContact(this.checkedNames).then(() => {
                        contactservice.getContacts().then((response) => this.contacts = response.contacts)
                    })
                }
            },
            modifyContact(contact) {
                this.contact = contact
                this.showModifyModal = true
            },
            doModifyContact() {
                contactservice.updateContact(this.contact).then(() => {
                    this.contact = this.initContact()
                    contactservice.getContacts().then((response) => this.contacts = response.contacts)
                    this.showModifyModal = false
                })
            },
            removeFromGroup() {
                var group = this.groups.find(group => group.active && group.id != 'all')
                if (this.checkedNames.length > 0) {
                    this.checkedNames.forEach(contactId => {
                        var c = this.contacts.find(contact => contact.id == contactId)
                        c.groupIdList = c.groupIdList.filter(groupId => groupId != group.id)
                        contactservice.updateContact(c).then(() => {
                            contactservice.getContactsByGroupId(group.id).then((response) => this.contacts = response.contacts)
                        })
                    })
                    this.checkedNames = []
                }
            },
            addGroupId(groupId) {
                if (this.checkedNames.length > 0) {
                    this.checkedNames.forEach(contactId => {
                        this.contacts.find(contact => {
                            if(contact.id == contactId) {
                                if(contact.groupIdList.includes(groupId) == false) {
                                    contact.groupIdList.push(groupId)
                                    contactservice.updateContact(contact)
                                }
                            }
                        })
                    })
                    this.checkedNames = []
                }
            },
            getGroupsAndBind() {
                contactservice.getGroups().then(response => {
                    var groups = []
                    groups.push({
                        "id": 1,
                        "name": "所有联系人",
                        "active": true
                    })
                    response.groups.forEach(v => {
                        v.active = false
                        groups.push(v)
                    })
                    this.groups = groups
                })
            },
            addGroup() {
                var group = {name: this.group.name, userId: this.$root.user.id}
                contactservice.addGroup(group).then(() => {
                    this.closeGroupModal()
                    this.getGroupsAndBind()
                })
            },
            deleteGroup(id) {
                contactservice.deleteGroup(id).then(() => this.getGroupsAndBind())
            },
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
            },
            closeModal() {
                this.contact = this.initContact()
                this.showModal= false
            },
            closeModifyModal() {
                this.contact = this.initContact()
                this.showModifyModal= false
            },
            closeGroupModal() {
                this.group = this.initGroup()
                this.showGroupModal= false
            },
            initGroup() {
                return {name: '', userId: this.$parent.user.id}
            },
            initContact() {
                return {
                    id: '',
                    userId: this.$parent.user.id,
                    name: '',
                    department: '',
                    position: '',
                    cellPhoneNum: '',
                    email: '',
                    groupIdList: []
                }
            }
        },
        computed: {
            activeGroup: function() {
                var group = this.groups.find(group => group.active && group.id != 'all')
                if(group === undefined) {
                    return false
                }
                return true
            }
        }
    }
</script>
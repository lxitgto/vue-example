<script type="text/babel">
    export default {
        data () {
            return {
                error: ''
            }
        },
        methods: {
            logout() {
                localStorage.removeItem('jwt-token')
                this.$root.authenticated = false
                router.go("/")
            }
        }
    }
</script>
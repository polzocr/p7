<template>
    <div>
        <p> {{ getUser.email}}</p>
        <p> {{getUser.username}}</p>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name:'ProfileView',
    data: function(){
        return {

        }
    },
    beforeCreate(){
        this.$store.dispatch('GetUserRequest', this.$route.params.id)
    },
    computed: {
        ...mapState(['getUser'])
    }
}
</script>

<template>
    <div>
        <p>lolilol monsieur {{ this.$store.state.user.userId }}</p>
        <p> {{ this.$store.state.getUser.email}}</p>
        <p> {{ this.$store.state.getUser.username}}</p>
    </div>
</template>

<script>
export default {
    name:'ProfileView',
    data: function(){
        return {

        }
    },
    beforeCreate(){
        this.$store.dispatch('GetUserRequest', this.$route.params.id)
    }
}
</script>

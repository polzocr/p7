<template>
    <main>
        <section>
            <div>
                <h1>Page administrateur</h1>
            </div>
            <div class="users">
                <User v-for="(user,index) in this.$store.state.users"
                :key="index"
                :id="user.id"
                :firstName="user.firstName"
                :lastName="user.lastName"
                :email="user.email"
                />
            </div>
        </section>
    </main>
</template>

<script>

import User from '@/components/UserComp.vue'

export default {
    name: 'HomeView',
    components:{
        User
    },
    data: function(){
        return {
            
        }
    },
    beforeCreate(){
        this.$store.dispatch('GetAllUsersRequest');
    },
}
</script>

<style lang="scss">
    
main{
    margin-top: 25%;
    min-height: 1000px;
}

</style>

<template>
    <main>
        <section>
            <div class="title">
                <h1>Page administrateur</h1>
                <p>{{ this.$store.state.users.length }} utilisateurs</p>
            </div>
                <User v-for="(user,index) in this.$store.state.users"
                :key="index"
                :id="user.id"
                :firstName="user.firstName"
                :lastName="user.lastName"
                :email="user.email"
                />
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
    @include not-mobiles{
        margin-top: 10%;
    }
}

.title{
    p{
        font-size: 20px;
        color: $tertiary-color;
        font-weight: 700;
    }
}

</style>

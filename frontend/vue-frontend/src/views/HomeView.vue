<template>
   <div>
       <button @click="deconnexion()">
           Deconnexion
       </button>
   </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'HomeView',
    mounted() {
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user || this.$store.state.user.userId !== user.userId){
            console.log(user)
            this.$router.push('/login');
            return ;
        }
    },
    methods: {
        deconnexion(){
            this.$store.dispatch('deconnexion', {
                userId: -1,
                token: ''
            });
            this.$router.push('/login')
        },
    },
}
</script>

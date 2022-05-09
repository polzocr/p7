<template>
    <div>
       <div v-if="modify">
            <div>
                <p> {{ lastName }}</p>
                <p> {{ firstName }}</p>
                <p> {{ email }}</p>
            </div>
            <div>
                <button @click.prevent="ModifyUser()">Modifier le profil</button>
            </div> 
        </div>
        <div v-else>
            <div>
                <div>
                <input type="text" v-model="lastName">
                </div>
                <div>
                <input type="text" v-model="firstName">
                </div>
                <div>
                <input type="text" v-model="email">
                </div>
            </div>
            <div>
                <div>
                    <button @click.prevent="UpdateUserRequest()">Modifier le profil</button>
                </div>
                <div>
                    <button @click.prevent="DeleteUserRequest()">Supprimer le compte</button>
                </div>
            </div>
            
            
        </div>
    </div>
</template>

<script>


export default {
    name:'ProfileView',
    data: function(){
        return {
            modify: true,
            lastName: this.$store.state.getUser.lastName,
            firstName: this.$store.state.getUser.firstName,
            email: this.$store.state.getUser.email,
        }
    },
    beforeCreate(){
        const user = JSON.parse(localStorage.getItem('user'));
        if(user && this.$store.state.user.userId == user.userId && this.$route.params.id == user.userId){
            this.$store.dispatch('GetUserRequest', this.$route.params.id);
        } else {
            console.log('Unauthorized')
            console.log(this.$store.state.user.userId)
            console.log(user.userId)
            console.log(this.$route.params.id)
            this.$router.push('/');
        }
    },
    computed: {
        
    },
    methods:{
        ModifyUser(){
            this.modify= false
        },
        UpdateUserRequest(){
            this.$store.dispatch('UpdataUserRequest', {
                lastName: this.lastName,
                firstName: this.firstName,
                email: this.email
            })
        },
        DeleteUserRequest(){
            const id = this.$route.params.id;
            this.$store.dispatch('DeleteUserRequest', id);
        }
    },
}
</script>

<template>
    <section class="profil">
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
    </section>
</template>

<script>

import axios from 'axios'

export default {
    name:'ProfileView',
    data: function(){
        return {
            modify: true,
            lastName: '',
            firstName: '',
            email: '',
        }
    },
    beforeCreate(){
        const user = JSON.parse(localStorage.getItem('user'));
        const instance = axios.create({baseURL: 'http://localhost:3000/',});
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
        if(user && this.$store.state.user.userId == user.userId && this.$route.params.id == user.userId){
                instance.get('/user/' + this.$store.state.user.userId)
                .then(user => {
                this.lastName = user.data.lastName;
                this.firstName = user.data.firstName;
                this.email = user.data.email;
                })
                .catch(error => console.log(error));
        } else {
            console.log('Unauthorized')
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
            const user = JSON.parse(localStorage.getItem('user'));
            const instance = axios.create({baseURL: 'http://localhost:3000/',});
            instance.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
            const id = this.$store.state.user.userId;
            instance.put('/user/' + id, {
                lastName: this.lastName,
                firstName: this.firstName,
                email: this.email
            })
            .then(user => {
                console.log(user.data);
                this.$router.push('/')
                .then(() => {
                    this.$router.push('/profile/' + id)
                })
                .catch(error => console.log({error}))
                
            })
            .catch(error => console.log(error));
        },
        DeleteUserRequest(){
            const id = this.$route.params.id;
            this.$store.dispatch('DeleteUserRequest', id);
        }
    },
}
</script>

<style lang="scss">
.profil{
    margin-top:10%
}

</style>

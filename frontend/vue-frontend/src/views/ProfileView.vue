<template>
    <section class="profilePage">
       <section class="profile" v-if="modify">
            <div class="profile__perso">
                <div class="profile__perso__icon">
                    <i class="fa fa-user-circle" aria-hidden="true"></i>
                </div>
                <div class="infos">
                    <div class="infos__name">
                        <p> {{ lastName }}</p>
                        <p> {{ firstName }}</p>
                    </div>
                    <div class="infos__email">
                        <p> {{ email }}</p>
                    </div>
                    <div class="infos__button">
                        <button class="btn" @click.prevent="ModifyUser()">Modifier le profil</button>
                    </div>
                </div>
            </div>
            <div class="profile__content">
                <div class="profile__content__posts">
                    <i class="fa fa-file-image-o" aria-hidden="true"></i>
                    <p>25</p>
                </div>
                <div class="profile_content__comments">
                    <i class="fa fa-comment" aria-hidden="true"></i>
                    <p>25</p>
                </div>
                <div class="profile__content__likes">
                    <i class="fa fa-heart" aria-hidden="true"></i>
                    <p>25</p>
                </div>
            </div>
        </section>
        <section v-else>
            <div class="profile">
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
            
            
        </section>
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
.profilePage{
    height: 856px;
    margin-top:12%
}

.profile{
    background-color:$secondary-color;
    border-radius: 20px;
    padding: 2%;
    width: 70%;
    height: 70%;
    margin: auto;
    display: flex;
    &__perso{
        width: 50%;
        position: relative;
        &__icon{
            height: 65%;
            i{
                //font-size: 390px;
                font-size: 2420%;
                color: $primary-color;
            }
        }
    }
    &__content{
        border-left: 1px solid black;
        width: 50%;
    }
}

.infos{
    padding-left: 3%;
    height: 35%;
    &__name{
        display: flex;
        justify-content: start;
        gap: 20px;
        font-size: 30px;
        color: $tertiary-color;
    }
    &__email{
        font-size: 20px;
        color: $tertiary-color; 
        text-align: start;
        margin-top: -5%;
    }
    &__button{
        width: 45%;
        position: absolute;
        bottom: 10px;
        left: 10px;
        button{
            
        }
    }
}

</style>

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
                    <i class="fa fa-file-image" aria-hidden="true"></i>
                    <p>{{ nbPosts }} Posts</p>
                </div>
                <div id = "comments">
                    <i class="fa fa-comment" aria-hidden="true"></i>
                    <p>{{ nbComments }} Commentaires</p>
                </div>
                <div class="profile__content__likes">
                    <i class="fa fa-heart" aria-hidden="true"></i>
                    <p>{{ nbLikes }} Likes</p>
                </div>
            </div>
        </section>
        <section v-else class="profile">
            <div class="profile__perso">
                <div class="profile__perso__icon">
                    <i class="fa fa-user-circle" aria-hidden="true"></i>
                </div>
                <div class="modify">
                    <div class="modify__name">
                        <input type="text" v-model="lastName">
                        <input type="text" v-model="firstName">
                    </div>
                    <div class="modify__email">
                        <input type="text" v-model="email">
                    </div>
                    <div class="modify__button">
                        <div class="modify__button__1">
                            <button @click.prevent="UpdateUserRequest()" class="btn">Valider</button>
                        </div>
                        <div class="modify__button__2">
                            <button @click.prevent="DeleteUserRequest()" class="btn">Supprimer</button>
                        </div>
                    </div>
                </div>
            </div>



            <div class="profile__content">
                <div class="profile__content__posts">
                    <i class="fa fa-file-image" aria-hidden="true"></i>
                    <p>{{ nbPosts }} Posts</p>
                </div>
                <div id = "comments">
                    <i class="fa fa-comment" aria-hidden="true"></i>
                    <p>{{ nbComments }} Commentaires</p>
                </div>
                <div class="profile__content__likes">
                    <i class="fa fa-heart" aria-hidden="true"></i>
                    <p>{{nbLikes}} Likes</p>
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
            nbPosts: 0,
            nbComments: 0,
            nbLikes: 0,
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
                this.nbPosts = user.data.posts.length
                this.nbComments = user.data.comments.length
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
    margin-top:12%;
    
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
        &__icon{
            height: 65%;
            i{
                //font-size: 390px;
                font-size: 2420%;
                //color: $primary-color;
                color: $tertiary-color;
            }
        }
    }
    &__content{
        border-left: 1px solid black;
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 70px;
        i{
                font-size: 70px;
                color: $primary-color;
        }
        p{
            font-size: 25px;
            color: $tertiary-color;
        }
        &__posts{
            display: flex;
            margin-left:25%;
            gap: 30px;
        }
        &__likes{
            display: flex;
            margin-left:25%;
            gap: 30px;
        }
    }
}

#comments {
    display: flex;
    margin-left:25%;
    gap: 30px;
}

.infos{
    height: 35%;
    &__name{
        display: flex;
        justify-content: start;
        gap: 20px;
        font-size: 30px;
        height: 30%;
        color: $tertiary-color;
    }
    &__email{
        font-size: 20px;
        height: 30%;
        color: $tertiary-color; 
        text-align: start;
    }
    &__button{
        width: 45%;
        height: 40%;
        margin-top: 2%;
        padding-left: 0;
        button{
            padding: 12px 45px;
        }
    }
}

.modify{
    height: 40%;
    input{
            height: 60%;
            width: 43%;
            font-size: 20px;
            color: $tertiary-color;  
            border: none;
            border-radius: 20px;   
            padding-left: 2%; 
            &:focus{
                    outline: 2px solid $primary-color;
            }      
        }
    &__name{
        height: 30%;
        display: flex;
        justify-content:start;
        align-items: center;
        gap: 4%;
        box-sizing: border-box;
    }
    &__email{
        height: 30%;
        display: flex;
        align-items: center;
        input{
            width: 92%;
        }
    }
    &__button{
        width: 100%;
        height: 40%;
        padding-right: 5%;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        button{
            padding: 12px 45px;
        }
    }
}

</style>

<template>
    <section class="profilePage" role="region" aria-label="conteneur page profil utilisateur">
       <section class="profile" v-if="modify" role="region" aria-label="page profil utilisateur">
            <div class="profile__perso">
                <div class="profile__perso__icon">
                    <i class="fa fa-user-circle" aria-describedby="icon profil"></i>
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
                        <button class="btn" @click.prevent="ModifyUser()" role="button" aria-label="bouton modifier profil">Modifier le profil</button>
                    </div>
                </div>
            </div>
            <div class="profile__content">
                <div class="profile__content__posts">
                    <i class="fa fa-file-image" aria-describedby="icon articles"></i>
                    <p>{{ nbPosts }} Posts</p>
                </div>
                <div id = "comments">
                    <i class="fa fa-comment" aria-describedby="icon commentaires"></i>
                    <p>{{ nbComments }} Commentaires</p>
                </div>
                <div class="profile__content__likes">
                    <i class="fa fa-heart" aria-describedby="icon likes"></i>
                    <p>{{ nbLikes }} Likes/Dislikes</p>
                </div>
            </div>
        </section>
        <section v-else class="profile" role="region" aria-label="page profil utilisateur">
            <div class="profile__perso">
                <div class="profile__perso__icon">
                    <i class="fa fa-user-circle" aria-describedby="icon profil"></i>
                </div>
                <div class="modify">
                    <div class="modify__name">
                        <input id="lastname" type="text" v-model="lastName" aria-required="true" aria-invalid="true">
                        <input type="text" v-model="firstName" aria-required="false" aria-invalid="false">
                    </div>
                    <div class="modify__email">
                        <input id="email" type="text" v-model="email" aria-required="true" aria-invalid="true">
                    </div>
                    <div class="modify__button">
                        <div class="modify__button__1">
                            <button @click.prevent="UpdateUserRequest()" class="btn" role="button" aria-label="modifier utilisateur">Valider</button>
                        </div>
                        <div class="modify__button__2">
                            <button @click.prevent="DeleteUserRequest()" class="btn" role="button" aria-label="supprimer utilisateur">Supprimer</button>
                        </div>
                    </div>
                </div>
            </div>



            <div class="profile__content">
                <div class="profile__content__posts">
                    <i class="fa fa-file-image" aria-describedby="icon articles"></i>
                    <p>{{ nbPosts }} Posts</p>
                </div>
                <div id = "comments">
                    <i class="fa fa-comment" aria-describedby="icon commentaires"></i>
                    <p>{{ nbComments }} Commentaires</p>
                </div>
                <div class="profile__content__likes">
                    <i class="fa fa-heart" aria-describedby="icon likes"></i>
                    <p>{{nbLikes}} Likes/Dislikes</p>
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

    //affichage des infos utilisateur par la requete getUser
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
                this.nbLikes = user.data.likes.length
                })
                .catch(error => console.log(error));
        } else {
            this.$router.push('/');
        }
    },
    methods:{
        //on passe avec l'affichage de la modification
        ModifyUser(){
            this.modify= false
        },
        //validation email
        testEmail(){
            const regexEmail = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(regexEmail.test(this.email)){
                return true;
            } else {
                document.getElementById('email').value = "L'email n'est pas valide!"
                return false;
            }
        },
        //validation Nom de famille obligatoire
        nameExist(){
            if(this.lastName == ""){
                document.getElementById('lastname').placeholder = "Votre nom est requis"
                document.getElementById('email').placeholder = "Votre e-mail est requis"
                return false;
            }else {
                return true;
            }
        },
        //validation email obligatoire
        emailExist(){
            if(this.email == ""){
                document.getElementById('email').placeholder = "Votre e-mail est requis"
                return false;
            }else {
                return true;
            }
        },
        //appel de la requete modification user
        UpdateUserRequest(){
            if(this.nameExist() && this.emailExist() && this.testEmail()){
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
                        this.$router.push('/profile/' + id);
                        this.$store.commit('toasting', 'Modification réussie !')
                    })
                    .catch(() => {
                        this.$store.commit('error_toasting', 'Une erreur est survenue')
                    })
                })
                .catch(() => {
                    this.$store.commit('error_toasting', 'Une erreur est survenue')
                });
            }
        },
        //suppression de l'utilisateur
        DeleteUserRequest(){
            const id = this.$route.params.id;
            this.$store.dispatch('DeleteUserRequest', id)
        }
    },
}
</script>

<style lang="scss">

//=================================
//    style conteneur
//=================================
.profilePage{
    height: 1044px;
    margin-top:12%;
    @include big-desktop{
        margin-top: 8%;
    }
    @include tablets{
        height: 980px;
    }
    @include mobiles{
        margin-top: 25%;
        height: 1000px;
    }
    
}

//=================================
//   style affichage du profil
//=================================

.profile{
    background-color:$secondary-color;
    border-radius: 20px;
    padding: 2%;
    width: 70%;
    height: 60%;
    margin: auto;
    display: flex;
    @include small-desktop{
        height: 50%;
    }
    @include tablets{
        flex-direction: column;
        gap: 20px;
    }
    @include mobiles{
        flex-direction: column;
        height: 80%;
        width: 87%;
        margin: auto;

    }
    &__perso{
        width: 50%;
            @include tablets{
                width: 100%;
                height: 70%;
            }
            @include mobiles{
                width: 100%;
                height: 50%;
            }
        &__icon{
            height: 65%;
            @include tablets{
                height: 55%;
            }
            @include mobiles{
                height: 50%;
            }
            i{
                //font-size: 390px;
                font-size: 2420%;
                //color: $primary-color;
                color: $tertiary-color;
                @include small-desktop{
                    font-size: 2100%;
                }
                @include tablets{
                    font-size: 1300%;
                }
                @include mobiles{
                    font-size: 1000%;
                }
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
        @include tablets{
            flex-direction: row;
            border-top: 1px solid black;
            border-left: none;
            width: 100%;
            justify-content: space-around;
            height: 30%;
            align-items: end;
        }
        @include mobiles{
            border-top: 1px solid black;
            border-left: none;
            width: 100%;
            height: 50%;
            margin-top: 2%;
            padding-top: 2%;
            gap: 20px;
        }
        i{
                font-size: 70px;
                color: $primary-color;
                @include small-desktop{
                    font-size: 50px;
                    display: flex;
                    align-items: center;
                }
                @include tablets{
                    font-size: 40px;
                }
                @include mobiles{
                    font-size: 30px;
                }
        }
        p{
            font-size: 25px;
            color: $tertiary-color;
        }
        &__posts{
            display: flex;
            margin-left:25%;
            gap: 30px;
            @include tablets{
                margin: 0;
                flex-direction: column;
                gap: 0;
            }
            @include mobiles{
                margin: 0;
                flex-direction: column;
                gap: 0;
            }
        }
        &__likes{
            display: flex;
            margin-left:25%;
            gap: 30px;
            @include tablets{
                margin: 0;
                flex-direction: column;
                gap:0;
            }
            @include mobiles{
                margin: 0;
                flex-direction: column;
                gap:0;
            }
        }
    }
}

//=================================
// style des activites des users
//=================================

#comments {
    display: flex;
    margin-left:25%;
    gap: 30px;
    @include tablets{
        flex-direction: column;
        gap:0;
        margin: 0;
    }
    @include mobiles{
        flex-direction: column;
        gap:0;
        margin: 0;
    }
}

.infos{
    height: 35%;
    @include tablets{
        height: 45%;
    }
    @include mobiles{
        height: 45%;
    }
    &__name{
        display: flex;
        justify-content: start;
        gap: 20px;
        font-size: 30px;
        height: 30%;
        color: $tertiary-color;
        @include mobiles{
            font-size: 20px;
            justify-content: space-around;
        }
    }
    &__email{
        font-size: 20px;
        height: 30%;
        color: $tertiary-color; 
        text-align: start;
        @include mobiles{
            font-size: 18px;
            text-align: center;
        }
    }
    &__button{
        width: 45%;
        height: 40%;
        margin-top: 2%;
        padding-left: 0;
        @include small-desktop{
            width: 100%;
            display: flex;
            justify-content: center;
        }
        @include tablets{
            margin: auto;
        }
        @include mobiles{
            width: 100%;
            display: flex;
            justify-content: center;
            padding-bottom: 2%;
        }
        
        button{
            padding: 12px 45px;
            @include mobiles{
            padding: 10px 10px;
            }
        }
    }
}

//=================================
//    style de la modification
//=================================

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
        @include mobiles{
            flex-direction: column;
            gap: 10px;
            padding: 0;
            padding-top: 2%;
            width: 100%;
        }
        button{
            padding: 12px 45px;
            @include small-desktop{
                padding: 12px 30px;
            }
            @include mobiles{
                width: 70%;
                padding: 10px 30px;
                display: flex;
                justify-content: center;
            }
        }
        &__1, &__2{
            width: 100%;
            display: flex;
            justify-content: center;
        }
    }
}

</style>

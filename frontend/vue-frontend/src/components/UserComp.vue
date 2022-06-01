<template>
    <section id="card" role="region" aria-label="carte-utilisateur">
        <div class="userCard">
            <div class="userCard__infos">
                <div class="userCard__infos__names">
                    <p>{{ lastName }}</p>
                    <p>{{ firstName }}</p>
                </div>
                <div class="userCard__infos__email">
                    <p>{{ email }}</p>
                </div>
            </div>
            <div class="userCard__buttons">
                <button class="btn btn-admin" @click.prevent="ActivityUser()" role="button" aria-label="Activités">Activités</button>
                <button v-if="!isAdmin()" class="btn btn-admin" @click.prevent="DeleteUser()" role="button" aria-label="Supprimer">Supprimer</button>
            </div>
        </div>
    </section>
</template>

<script>

export default{
    name:"UserComp",
    data: function(){
        return {

        }
    },
    props: {
        id:{
            type: Number
        },
        firstName:{
            type: String
        },
        lastName:{
            type: String
        },
        email:{
            type: String
        }
    },
    methods:{
        //supprimer l'utilisateur
        DeleteUser(){
            const id = this.id;
            this.$store.dispatch('DeleteUserRequest', id)
        },
        //voir les activités de l'utilisateur
        ActivityUser(){
            alert('Bientôt disponible !')
        },
        //vérification admin
        isAdmin(){
            if(this.id == 1){
                return true
            } else {
                return false
            }
        },
    },
    
}
</script>

<style lang="scss">

.userCard{
    border: 1px solid $tertiary-color;
    border-radius: 20px;
    width: 95%;
    margin: auto;
    background-color: $secondary-color;
    display: flex;
    flex-direction: column;
    @include not-mobiles{
        width: 50%;
        flex-direction: row;
        padding: 1%;
    }
    @include all-desktop{
        width: 40%;
    }
    @include big-desktop{
        width: 30%;
    }
    &__infos{
        display: flex;
        flex-direction: column;
        color: $tertiary-color;
        font-size: 20px;
        @include not-mobiles{
        width: 70%;
        }
        &__names{
            display: flex;
            justify-content: space-around;
            @include not-mobiles{
                justify-content: start;
                gap: 10%;
            }
        }
        &__email{
            p{
                margin-top: 0;
                @include not-mobiles{
                    text-align: start;
                }
            }
        }
    }
    &__buttons{
        display: flex;
        justify-content: space-around;
        padding: 2%;
        @include not-mobiles{
        width: 30%;
        flex-direction: column;
        justify-content: center;
        gap: 30%;
        padding: 0;
        }
        .btn-admin{
            width: 40%;
            display: flex;
            justify-content: center;
            padding: 10px 45px;
            @include not-mobiles{
                width: 100%;
            }
        }
    }
}

#card{
    margin-top:3%;
}

</style>
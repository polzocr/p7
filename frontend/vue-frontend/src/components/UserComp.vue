<template>
    <section id="card">
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
                <button class="btn btn-admin" @click.prevent="ActivityUser()">Activités</button>
                <button class="btn btn-admin" @click.prevent="DeleteUser()">Supprimer</button>
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
        DeleteUser(){
            const id = this.id;
            this.$store.dispatch('DeleteUserRequest', id);
        },
        ActivityUser(){
            alert('Bientôt disponible !')
        },
    },
    
}
</script>

<style lang="scss">

.userCard{
    border: 1px solid black;
    border-radius: 20px;
    width: 95%;
    margin: auto;
    background-color: $secondary-color;
    display: flex;
    flex-direction: column;
    &__infos{
        display: flex;
        flex-direction: column;
        color: $tertiary-color;
        font-size: 20px;
        &__names{
            display: flex;
            justify-content: space-around;
        }
        &__email{
            p{
                margin-top: 0;
            }
        }
    }
    &__buttons{
        display: flex;
        justify-content: space-around;
        padding: 2%;
        .btn-admin{
            width: 40%;
            display: flex;
            justify-content: center;
            padding: 10px 45px;
        }
    }
}

#card{
    margin-top:2%;
}

</style>
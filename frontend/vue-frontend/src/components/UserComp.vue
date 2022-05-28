<template>
    <section>
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
                <button class="btn">Activités</button>
                <button class="btn" @click="DeleteUser()">Supprimer</button>
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
        }
    },
    
}
</script>

<style lang="scss">

</style>
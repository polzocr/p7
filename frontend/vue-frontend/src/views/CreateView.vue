<template>
    <section class="createPost">
        <form action="" @submit.prevent="PostRequest" class="createPost__form">
            <div class="createPost__form__post">
                <input v-model="name" type="text" placeholder="Titre">
            </div>
            <div class="createPost__form__post">
                <input v-model="text" type="text" placeholder="Text">
                <!-- <textarea rows="5" cols="60" name="text" placeholder="Enter text"></textarea> -->
            </div>
            <div class="createPost__form__file">
                <input @change="changeFile()" type="file" accept="image/*" ref="fileInput" name="image">
            </div>  
            <div class="createPost__form__button">
                <button class="btn" type="submit">Créer votre post</button>
            </div>            
        </form>
    </section>
</template>

<script>

export default {
    name: 'CreateView',
    data: function(){
        return {
            name: '',
            text: '',
            file: '',
        }
    },
    methods:{
        changeFile(){
                this.file = this.$refs.fileInput.files[0];
            },
        PostRequest(){
            const data = {'image': this.file, 'name':this.name, 'text':this.text, 'userId': this.$store.state.user.userId}
            this.$store.dispatch('PostPostRequest', {data})
        },
    },
    beforeCreate(){
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user || this.$store.state.user.userId !== user.userId){
            console.log(user)
            this.$router.push('/login');
            return ;
        } 
    },

}
</script>

<style lang="scss">
.createPost{
    height: 856px;
    margin-top: 10%;
    &__form{
        background-color: $secondary-color;
        border-radius: 20px;
        padding: 2%;
        width: 40%;
        height: 70%;
        margin: auto;
        &__post{
            border: 1px solid black;
            height: 7%;
            input{
                padding-left: 2%;
                font-size: 20px;
                color: $tertiary-color;
                border: none;
                border-radius: 20px;
                width: 60%;
                height: 85%;
                //word-break: break-word;
                &:focus{
                    outline: 2px solid $primary-color;
                }
            }
        }
        &__text{
            border: 1px solid black;
        }
        &__file{
            border: 1px solid black;
        }
        &__button{
            border: 1px solid black;
        }
    }
    
}
</style>
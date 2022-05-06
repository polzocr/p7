<template>
    <div>
        <form action="" @submit.prevent="PostRequest">
            <div>
                <label for="name">Nom</label>
                <input v-model="name" type="text">
            </div>
            <div>
                <label for="text">Texte</label>
                <input v-model="text" type="text">
            </div>
            <div>
                <input @change="changeFile()" type="file" accept="image/*" ref="fileInput" name="image">
            </div>  
            <div>
                <button type="submit">Créer votre post</button>
            </div>            
        </form>
    </div>
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
    }

}
</script>

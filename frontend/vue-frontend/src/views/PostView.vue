<template>
    <main>
        <!-- <div v-if="ownPost()">
            <router-link  @click.native="modifier()" to="">Modifier l'élément</router-link>
        </div> -->
<!--         
        <div class="createPost">
            <PostComp 
            @Commenting="CommentRequest" 
            :clickable="false"
            :modify="modify"
            :id="post.id"
            :userId="post.userId"
            :name="post.name"
            :text="post.text"
            :image_url="post.image_url"
            />
        </div>
         -->

         <section id="test">
                <form enctype="multipart/form-data">
                    <div>
                        <input id="name" :value="post.name" type="text" />
                    </div>
                    <div>
                        <input id="text" :value="post.text" type="textarea" />
                    </div>
                    <div>
                        <div>
                            <img :src="post.image_url" alt="image_PutRequest"/>
                        </div>
                        <div>
                            <input @change="changeFile()" type="file" accept="image/*" ref="fileInput" name="image">
                        </div>
                    </div>
                    <div>
                        <button @click.prevent="ModifyRequest()">Modifier</button>
                    </div>
                    <div>
                        <button @click.prevent="DeleteRequest()">Supprimer</button>
                    </div>
                </form>                
        </section>
    </main>
</template>

<script>

// import PostComp from '@/components/PostComp.vue'
import {mapState} from 'vuex'
//import axios from 'axios'

    export default {
        name:'PostView',
        data: function() {
            return {
                modify: false,
                newPost: {
                    name: '',
                    text: '',
                    image_url:''
                },
            }
        },
        computed:{
            ...mapState(['post'])
        },
        methods:{
            ownPost(){
                const user = JSON.parse(localStorage.getItem('user'))
                if(this.post.userId == user.userId){
                    return true
                } else {
                    return false
                }
            },
            modifier(){
                this.modify = !this.modify;
            },
             ModifyRequest(){
                const name = document.getElementById('name').value;
                const text = document.getElementById('text').value;
                const data = {'image': this.file, 'name':name, 'text':text , 'id':this.$route.params.id}
                this.$store.dispatch('PutPostRequest', {data})
            },
             DeleteRequest(){
                // this.$emit('modify', {postId: this.id})
                if(confirm('Vous-vous supprimer cet article ?')){
                    this.$store.dispatch('DeleteRequest', {id:this.post.id})
                }
            },
            changeFile(){
                this.file = this.$refs.fileInput.files[0];
                console.log(this.name)
                console.log(this.localName)
            },
            CommentRequest(data){
            this.$store.dispatch('CreateCommentRequest', data)
            },
        },
        beforeMount(){
            const user =  JSON.parse(localStorage.getItem('user'))
            if(user.userId !== this.$store.state.postUserId){
                this.$router.push('/login')
            } else {
                this.$store.dispatch('GetPostRequest', this.$route.params.id)
            }
            
            // const user =  JSON.parse(localStorage.getItem('user'))
            // const instance = axios.create({baseURL: 'http://localhost:3000/',});
            // instance.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
            // instance.get('/' + this.$route.params.id)
            // .then(post => {
            //     this.$store.state.post = post.data;
            //     if(post.data.userId !== user.userId){
            //         this.$router.push('/login')
            //     }
            // })
            // .catch(error => console.log(error))
             },
        // async mounted(){
        //     const postId = await this.$store.state.post.userId
        //     const user =  JSON.parse(localStorage.getItem('user'))
        //     if(user.userId !== postId){
        //         console.log(user.userId)
        //         console.log(postId)
        //         this.$router.push('/login')
        //     }
        // }
    }
</script>

<style lang="scss">

#test{
    margin-top: 10%
}
</style>

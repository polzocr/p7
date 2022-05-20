<template>
    <main>
        <div v-if="ownPost()">
            <router-link  @click.native="modifier()" to="">Modifier l'élément</router-link>
        </div>
        
        <div class="createPost">
            <PostComp @Modifying="ModifyRequest" @Deleting="DeleteRequest"
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
        
    </main>
</template>

<script>

import PostComp from '@/components/PostComp.vue'
import {mapState} from 'vuex'

    export default {
        name:'PostView',
        components: {
           PostComp,
        },
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
            ModifyRequest(infos){
                this.$store.dispatch('PutPostRequest', infos)
            },
            DeleteRequest(id){
                this.$store.dispatch('DeleteRequest', id)
            },
            CommentRequest(data){
            this.$store.dispatch('CreateCommentRequest', data)
            },
        },
        beforeMount(){
            this.$store.dispatch('GetPostRequest', this.$route.params.id);
        }
    }
</script>

<style lang="scss">


</style>

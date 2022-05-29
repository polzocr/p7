<template>
    <main>
        
       <PostComp  v-for="(post, index) in postsReverse"
       @Commenting="CommentRequest" 
       @modify="getToPost"
       :modify="modify"
       :key="index"
       :id="post.id"
       :userId="post.userId"
       :created_at="post.createdAt"
       :user="post.User"  
       :title="post.name"
       :text="post.text"
       :image_url="post.image_url"
       :nbComments="post.Comments"
       :likes="post.Likes"
       />
    </main>
</template>

<script>

import PostComp from '@/components/PostComp.vue'

export default {
    name: 'HomeView',
    components:{
        PostComp,
    },
    data: function(){
        return {
            idLocal: this.$route.params.id,
            modify: false,
        }
    },
    beforeCreate(){
        this.$store.dispatch('GetPostsRequest');
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user || this.$store.state.user.userId !== user.userId){
            console.log(user)
            this.$router.push('/login');
            return ;
        } 
    },
    mounted() {
    },
    methods: {
        CreateRequest(){
           this.$store.dispatch()
        },
        CommentRequest(data){
            this.$store.dispatch('CreateCommentRequest', data)
        },
        getToPost(data){
            this.$router.push('/' + data.postId)                
        },
    },
    computed:{
        postsReverse(){
            return this.$store.state.posts.slice().reverse()
        }
    }
}
</script>

<style lang='scss'>
    main{
        padding-bottom: 20%;
    }
</style>

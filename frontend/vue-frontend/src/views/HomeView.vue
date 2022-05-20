<template>
    <main>
        
       <PostComp v-for="(post, index) in this.$store.state.posts.slice().reverse()"
       @Commenting="CommentRequest" 
       :key="index"
       :id="post.id"
       :userId="post.userId" 
       :name="post.name"
       :text="post.text"
       :image_url="post.image_url"
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
        }
    },
}
</script>

<style lang='scss'>
main{
    margin-top: 6%;
}
</style>

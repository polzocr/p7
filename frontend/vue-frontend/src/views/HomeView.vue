<template>
    <main>
        <div class="scrollTop" :class="{'visibility': visible}"><button @click="topOrFeed()" class="btn"><i class="fa fa-arrow-up" aria-hidden="true"></i></button></div>
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
            visible: false,
        }
    },
    beforeCreate(){
        this.$store.dispatch('GetPostsRequest');
        // const user = JSON.parse(localStorage.getItem('user'));
        // if(!user || this.$store.state.user.userId !== user.userId){
        //     console.log(user)
        //     this.$router.push('/login');
        //     return ;
        // } 
    },
    created(){
        window.addEventListener('scroll', () => {
        if(window.scrollY > 600){
            this.visible = true
        } else {
            this.visible = false
        }
        });
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
        topOrFeed(){
            window.scrollTo(0,0)
        }
    },
    computed:{
        postsReverse(){
            return this.$store.state.posts.slice().reverse()
        }
    }
}
</script>

<style lang='scss'>
html {
  scroll-behavior: smooth;
}
main{
    padding-bottom: 20%;
}

.scrollTop{
    opacity: 0;
    button{
        position: fixed;
        z-index: 100;
        right: 10px;
        bottom: 50px;
        padding: 13px 15px;
        background-color: $tertiary-color;
        @include mobiles{
            bottom: 10px;
        }
        @include small-desktop {
            right: 50px;
        }
        @include normal-desktop {
            right: 70px;
        }
        @include big-desktop {
            right: 150px;
        }
        i{
            font-size: 20px;
            color: $primary-color;
        }
    }
}
.visibility{
    opacity: 1;
    transition: opacity 1s ease;
}
</style>

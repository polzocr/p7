<template>
    <div>
        
       <PostComp v-for="(post, index) in this.$store.state.posts" 
       :key="index"
       :id="post.id"
       :userId="post.userId" 
       :name="post.name"
       :text="post.text"
       :image_url="post.image_url"
       />
    </div>
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
       }
    },
}
</script>

<template>
   <div>
       <button @click="deconnexion()">
           Deconnexion
       </button>
       <button @click="PostsRequest()">
           Requete post
       </button>
       <PostComp v-for="post in this.$store.state.posts" 
       :key="post" 
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
    mounted() {
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user || this.$store.state.user.userId !== user.userId){
            console.log(user)
            this.$router.push('/login');
            return ;
        }
    },
    methods: {
        deconnexion(){
            this.$store.dispatch('deconnexion', {
                userId: -1,
                token: ''
            });
            this.$router.push('/login')
        },
         PostsRequest(){
             this.$store.dispatch('PostsRequest');
             
         }
    },
}
</script>

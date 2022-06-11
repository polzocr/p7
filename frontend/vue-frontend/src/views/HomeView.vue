<template>
    <main role="main">
        <div class="scrollTop" :class="{'visibility': visible}" role="navigation"><button @click="topOrFeed()" class="btn" role="button"><i class="fa fa-arrow-up"></i></button></div>
        <PostComp  v-for="(post, index) in postsReverse"
        :key="index"
        :id="post.id"
        :userId="post.UserId"
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
            visible: false,
        }
    },
    //appel des articles
    beforeCreate(){
        this.$store.dispatch('GetPostsRequest');
    },
    //écoute du scroll pour le goToTop
    created(){
        window.addEventListener('scroll', () => {
        if(window.scrollY > 600){
            this.visible = true
        } else {
            this.visible = false
        }
        });
    },
    methods: {
        //retour en haut de page
        topOrFeed(){
            window.scrollTo(0,0)
        }
    },
    computed:{
        //affichage du dernier post en haut de page
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
//=================================
//    style btn haut de page
//=================================
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

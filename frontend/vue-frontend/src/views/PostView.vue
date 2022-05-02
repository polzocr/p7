<template>
    <div>
        <div v-if="ownPost()">
            <router-link to="/">Modifier l'élément</router-link>
        </div>
        
        <div>
            <PostComp
            :id="post.id"
            :userId="post.userId"
            :name="post.name"
            :text="post.text"
            :image_url="post.image_url"
            />
        </div>
        
    </div>
</template>

<script>

import PostComp from '@/components/PostComp.vue'
import {mapState} from 'vuex'

    export default {
        name:'PostView',
        components: {
           PostComp 
        },
        computed:{
            ...mapState(['post'])
        },
        methods:{
            ownPost(){

            },
        },
        beforeMount(){
            this.$store.dispatch('GetPostRequest', this.$route.params.id);
        }
    }
</script>

<style scoped lang="scss">

</style>

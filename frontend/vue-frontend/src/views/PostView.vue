<template>
    <div>
        
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
            
        },
        beforeMount(){
            this.$store.dispatch('GetPostRequest', this.$route.params.id);
            console.log(this.$store.state.post.UserId)
        }
    }
</script>

<style scoped lang="scss">

</style>

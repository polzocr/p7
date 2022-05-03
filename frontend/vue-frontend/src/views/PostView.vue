<template>
    <div>
        <div v-if="ownPost()">
            <router-link  :to="'/'+ post.id + '/modify'">Modifier l'élément</router-link>
        </div>
        
        <div>
            <PostComp
            :id="post.id"
            :userId="post.userId"
            :name="post.name"
            :text="post.text"
            :image_url="post.image_url"
            />
            <PutComp/>
        </div>
        
    </div>
</template>

<script>

import PostComp from '@/components/PostComp.vue'
import PutComp from '@/components/PutComp.vue'
import {mapState} from 'vuex'

    export default {
        name:'PostView',
        components: {
           PostComp, PutComp
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
            PutPostRequest(){
                
            }
        },
        beforeMount(){
            this.$store.dispatch('GetPostRequest', this.$route.params.id);
        }
    }
</script>

<style scoped lang="scss">

</style>

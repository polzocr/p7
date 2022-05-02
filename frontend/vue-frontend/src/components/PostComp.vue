<template>
    <div>
        <router-link :to="'/' + id">
            <p>{{ id }}</p>
            <p>Titre: {{ name }} : {{ userId }}</p>
            <p>Text: {{ text }}</p>
            <img :src="image_url" alt="imagePost"/>
        </router-link>
            
        
    </div>
</template>

<script>
    export default {
        name: "PostComp",
        props: {
            id:{
                type: Number,
                required: true,
                default: 0
            },
            userId: {
                type: Number,
                required: true,
                default: 0
            },
            name: {
                type: String,
                default: () => 'JolieTitre'
            },
            text: {
                type: String
            },
            image_url: {
                type: String,
            }
        }, 
        methods: {
           
        }
    }
</script>

<style scoped lang="scss">

</style>

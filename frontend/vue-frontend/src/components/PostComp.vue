<template>
    <div>
        <p>Titre: {{ name }} : {{ userId }}</p>
        <p>Text: {{ text }}</p>
        <img :src="image_url" alt="imagePost"/>
    </div>
</template>

<script>
    export default {
        name: "PostComp",
        props: {
            userId: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                default: () => 'JolieTitre'
            },
            text: {
                type: String,
                required:true
            },
            image_url: {
                type: String,
            }
        }, 
        methods: {
           
        }
    }
</script>

<style scoped="scss">

</style>

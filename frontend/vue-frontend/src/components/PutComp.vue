<template>
    <div>
        <div>
            <input type="text" :placeholder="name" />
        </div>
        <div>
            <input type="textarea" :placeholder="text" />
        </div>
        <div>
            <div>
                <img :src="image_url" alt="image_Put"/>
            </div>
            <div>
                <input type="file">
            </div>
        </div>
        <div>
            <button type="submit">Modifier</button>
        </div>
        <div>
            <button type="submit">Supprimer</button>
        </div>
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

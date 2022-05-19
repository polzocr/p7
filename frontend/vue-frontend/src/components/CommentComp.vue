<template>
    <div>
        <div> 
            <p>Voici le commentaire : </p>
            <p>UserId : {{ userId }}</p>
            <p> Text: {{ text }} </p>
        </div>

    </div>
</template>

<script>
export default {
    name: "CommentComp",
    props:{
        userId:{
            type: Number
        },
        text: {
            type: String,
        },
        postId:{
            type: Number,
        }
    },
}
</script>
